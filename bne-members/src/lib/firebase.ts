import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Firebase is initialized but authentication can be handled via the main OAuth system
// when running inside the Manus environment. If no OAuth server is configured,
// we fall back to Firebase popup auth (requires valid Firebase project config).

// Track if we're in an environment with OAuth available
const hasOAuthPortal = () => {
  const env = (import.meta as any).env;
  const oauthPortalUrl = env.VITE_OAUTH_PORTAL_URL;
  const appId = env.VITE_APP_ID;
  return oauthPortalUrl && appId;
};

// Generate OAuth login URL for redirect-based auth
export const getOAuthLoginUrl = () => {
  const env = (import.meta as any).env;
  const oauthPortalUrl = env.VITE_OAUTH_PORTAL_URL;
  const appId = env.VITE_APP_ID;
  const siteUrl = env.VITE_SITE_URL || window.location.origin;
  
  if (!oauthPortalUrl || !appId) {
    console.warn("[Auth] OAuth portal not configured (VITE_OAUTH_PORTAL_URL / VITE_APP_ID missing)");
    return null;
  }

  // Use the main server's OAuth callback endpoint
  // Ensure redirect URI uses the canonical site URL to avoid "invalid domain" errors in production
  const redirectUri = `${siteUrl.replace(/\/+$/, "")}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const loginWithGoogle = async () => {
    isSigningIn = true;
    try {
        // First, try OAuth redirect if available (preferred method)
        const oauthUrl = getOAuthLoginUrl();
        if (oauthUrl) {
            window.location.href = oauthUrl;
            return; // Redirect happens, function exits
        }

        // Fallback to Firebase popup (requires valid Firebase config)
        console.warn("[Auth] Using Firebase popup fallback - check if Firebase config is valid");
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/keep');
        
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential?.accessToken) {
                cachedAccessToken = credential.accessToken;
            }
            return result;
        } catch (firebaseError: any) {
            const errorCode = firebaseError?.code || 'unknown';
            const errorMessage = firebaseError?.message || 'Unknown Firebase error';
            
            // Handle specific Firebase auth errors
            if (errorCode === 'auth/popup-blocked') {
                throw new Error('Popup was blocked by browser. Please allow popups and try again.');
            } else if (errorCode === 'auth/popup-closed-by-user') {
                throw new Error('Popup was closed. Please try again.');
            } else if (errorCode === 'auth/cancelled-popup-request') {
                throw new Error('Sign-in cancelled. Please try again.');
            } else if (errorCode === 'auth/unauthorized-domain') {
                throw new Error('Domain not authorized in Firebase. Check Firebase console for authorized domains.');
            } else if (errorCode === 'auth/invalid-api-key' || errorCode === 'auth/invalid-auth-domain') {
                throw new Error(`Firebase configuration error: ${errorMessage}. Please configure a valid Firebase project.`);
            }
            
            console.error("[Auth] Firebase login error:", errorCode, errorMessage);
            throw firebaseError;
        }
    } finally {
        isSigningIn = false;
    }
};

export const logout = async () => {
    cachedAccessToken = null;
    // For OAuth-based auth, logout via API endpoint
    if (hasOAuthPortal()) {
        try {
            await fetch('/api/oauth/logout', { method: 'POST' });
        } catch (e) {
            console.warn("[Auth] OAuth logout request failed", e);
        }
    }
    return signOut(auth);
};

export const getAccessToken = async (): Promise<string | null> => {
   return cachedAccessToken;
};

export const getIsSigningIn = () => isSigningIn;
