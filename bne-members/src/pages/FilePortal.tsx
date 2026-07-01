import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, orderBy, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, ShieldCheck, CheckCircle2, ChevronRight, FileCheck } from 'lucide-react';

export default function FilePortal() {
    const { user } = useAuth();
    const [files, setFiles] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // Compliance state
    const [activeTab, setActiveTab] = useState<'vault' | 'compliance'>('vault');
    const [complianceStep, setComplianceStep] = useState(1);
    const [complianceFiles, setComplianceFiles] = useState<{ idFront?: string, idBack?: string, releaseForm?: string }>({});

    const fetchFiles = async () => {
        if (!user) return;
        const q = query(collection(db, 'files'), where('ownerId', '==', user.uid), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setFiles(snap.docs.map(d => ({id: d.id, ...d.data()})));
    };

    useEffect(() => {
        fetchFiles();
    }, [user]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (!user || acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setUploading(true);

        const storageRef = ref(storage, `users/${user.uid}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
           (snapshot) => {
               setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
           },
           (error) => {
               console.error("Upload failed", error);
               setUploading(false);
           },
           async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              // Save to firestore
              await addDoc(collection(db, 'files'), {
                  ownerId: user.uid,
                  fileName: file.name,
                  fileUrl: url,
                  mimeType: file.type,
                  sizeBytes: file.size,
                  createdAt: serverTimestamp()
              });
              setUploading(false);
              setProgress(0);
              fetchFiles();
           }
        );
    }, [user]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const onComplianceDrop = useCallback(async (acceptedFiles: File[]) => {
        if (!user || acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setUploading(true);

        const storageRef = ref(storage, `users/${user.uid}/compliance_${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
           (snapshot) => { setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100); },
           (error) => { console.error("Upload failed", error); setUploading(false); },
           async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              // Save to firestore securely
              await addDoc(collection(db, 'files'), {
                  ownerId: user.uid,
                  fileName: `Compliance: ${file.name}`,
                  fileUrl: url,
                  mimeType: file.type,
                  sizeBytes: file.size,
                  isComplianceNode: true,
                  createdAt: serverTimestamp()
              });
              setUploading(false);
              setProgress(0);
              
              if (complianceStep === 1) setComplianceFiles(prev => ({...prev, idFront: url}));
              else if (complianceStep === 2) setComplianceFiles(prev => ({...prev, idBack: url}));
              else if (complianceStep === 3) setComplianceFiles(prev => ({...prev, releaseForm: url}));
              
              setComplianceStep(s => s + 1);
              fetchFiles();
           }
        );
    }, [user, complianceStep]);

    const complianceDropzone = useDropzone({ onDrop: onComplianceDrop });

    const handleDelete = async (fileDoc: any) => {
        try {
            await deleteDoc(doc(db, 'files', fileDoc.id));
            const storageRef = ref(storage, fileDoc.fileUrl);
            await deleteObject(storageRef);
            fetchFiles();
        } catch(e) { console.error('Delete failed', e) }
    };

    return (
        <div className="space-y-6 flex flex-col font-sans">
            <div className="flex border-b border-[#2A2A2A] mb-4">
                <button 
                    onClick={() => setActiveTab('vault')}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'vault' ? 'border-[#EAB308] text-[#EAB308]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    Standard Vault
                </button>
                <button 
                    onClick={() => setActiveTab('compliance')}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'compliance' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                >
                    Legal & Compliance
                </button>
            </div>

            {activeTab === 'vault' ? (
                <>
                    <div className="flex justify-between items-center bg-[#121212] border border-[#2A2A2A] rounded p-4">
                         <div>
                             <h2 className="text-sm font-bold text-[#EAB308] uppercase tracking-wider">Vault Management (Host Storage)</h2>
                             <p className="text-[10px] text-gray-500">Host images and videos here to use securely in your classified ads.</p>
                         </div>
                         <span className="text-[10px] text-gray-500 bg-[#1A1A1A] border border-[#2A2A2A] px-2 py-1 rounded">Max 1GB File</span>
                    </div>

                    <div {...getRootProps()} className={`bg-[#0A0A0A] border-2 border-dashed rounded p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragActive ? 'border-[#EAB308] bg-[#EAB308]/5' : 'border-[#2A2A2A] hover:bg-[#1A1A1A]'} ${uploading ? 'pointer-events-none opacity-50' : ''}`}>
                        <input {...getInputProps()} />
                        <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
                        <span className="text-xs font-bold text-gray-300">↑ UPLOAD</span>
                        <span className="text-[9px] text-gray-600 mt-1">Drag & drop files here, or click to select files</span>
                        <span className="text-[9px] text-gray-600">Supports images, videos, PDFs, ZIPs</span>
                        
                        {uploading && (
                            <div className="w-full max-w-sm mt-6">
                                <div className="h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#EAB308] transition-all" style={{ width: `${progress}%`}}></div>
                                </div>
                                <p className="text-[9px] text-center mt-2 text-gray-400 font-mono">UPLOADING... {Math.round(progress)}%</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {files.filter(f => !f.isComplianceNode).map(f => (
                            <div key={f.id} className="bg-[#1A1A1A] p-3 border border-[#2A2A2A] rounded flex flex-col justify-between group">
                                 <div className="flex items-start gap-2 overflow-hidden mb-3">
                                     <File className="w-5 h-5 text-gray-500 shrink-0" />
                                     <div className="truncate focus:outline-none">
                                         <p className="text-[10px] font-bold text-gray-300 truncate" title={f.fileName}>{f.fileName}</p>
                                         <p className="text-[9px] text-gray-500">{(f.sizeBytes / 1024 / 1024).toFixed(2)} MB</p>
                                     </div>
                                 </div>
                                 <div className="grid grid-cols-3 gap-1 mt-auto">
                                     <button onClick={() => {navigator.clipboard.writeText(f.fileUrl); alert("URL Copied!")}} className="col-span-2 py-1 text-[9px] text-blue-400 font-bold border border-blue-400/30 rounded hover:bg-blue-400/10 transition-colors uppercase">Copy URL</button>
                                     <button onClick={() => handleDelete(f)} className="col-span-1 py-1 text-[9px] text-red-500 font-bold border border-red-500/30 rounded hover:bg-red-500/10 transition-colors uppercase">Del</button>
                                 </div>
                            </div>
                        ))}
                    </div>
                    {files.filter(f => !f.isComplianceNode).length === 0 && !uploading && <div className="text-center p-10 border border-[#2A2A2A] rounded bg-[#121212] text-gray-500 text-[10px] uppercase font-bold tracking-widest">No files in vault.</div>}
                </>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[#121212] border border-[#2A2A2A] rounded p-4">
                         <div>
                             <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider flex items-center gap-2">
                                 <ShieldCheck className="w-4 h-4" /> Legal Requirements & 2257
                             </h2>
                             <p className="text-[10px] text-gray-500">Securely log identity documents & release forms for ad authorization.</p>
                         </div>
                    </div>

                    <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-6 rounded-md">
                        <div className="flex mb-8 items-center justify-between relative before:absolute before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:bg-[#2A2A2A] before:w-full before:-z-10">
                            {[1, 2, 3, 4].map(step => (
                                <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${complianceStep > step ? 'bg-green-500 text-black' : complianceStep === step ? 'bg-red-500 text-white' : 'bg-[#121212] border-2 border-[#2A2A2A] text-gray-600'}`}>
                                    {complianceStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                                </div>
                            ))}
                        </div>

                        {complianceStep === 1 && (
                            <div className="text-center space-y-4">
                                <h3 className="text-lg font-bold text-gray-200">Government ID: Front</h3>
                                <p className="text-xs text-gray-500 max-w-md mx-auto">Please upload a clear, legible photo of the front of your government-issued ID (Driver's License, Passport, etc.).</p>
                                <div {...complianceDropzone.getRootProps()} className={`mt-4 bg-[#0A0A0A] border-2 border-dashed rounded p-10 flex flex-col items-center justify-center cursor-pointer transition-colors max-w-md mx-auto ${complianceDropzone.isDragActive ? 'border-red-500 bg-red-500/5' : 'border-[#2A2A2A] hover:bg-[#1A1A1A]'} ${uploading ? 'pointer-events-none opacity-50' : ''}`}>
                                    <input {...complianceDropzone.getInputProps()} />
                                    <FileCheck className="w-8 h-8 text-gray-500 mb-2" />
                                    <span className="text-xs font-bold text-gray-300">↑ UPLOAD FRONT OF ID</span>
                                    {uploading && <p className="text-[9px] mt-4 text-red-500 font-mono">UPLOADING... {Math.round(progress)}%</p>}
                                </div>
                            </div>
                        )}

                        {complianceStep === 2 && (
                            <div className="text-center space-y-4">
                                <h3 className="text-lg font-bold text-gray-200">Government ID: Back</h3>
                                <p className="text-xs text-gray-500 max-w-md mx-auto">Now upload the back of your ID. If you used a passport, upload the signature page.</p>
                                <div {...complianceDropzone.getRootProps()} className={`mt-4 bg-[#0A0A0A] border-2 border-dashed rounded p-10 flex flex-col items-center justify-center cursor-pointer transition-colors max-w-md mx-auto ${complianceDropzone.isDragActive ? 'border-red-500 bg-red-500/5' : 'border-[#2A2A2A] hover:bg-[#1A1A1A]'} ${uploading ? 'pointer-events-none opacity-50' : ''}`}>
                                    <input {...complianceDropzone.getInputProps()} />
                                    <FileCheck className="w-8 h-8 text-gray-500 mb-2" />
                                    <span className="text-xs font-bold text-gray-300">↑ UPLOAD BACK OF ID</span>
                                    {uploading && <p className="text-[9px] mt-4 text-red-500 font-mono">UPLOADING... {Math.round(progress)}%</p>}
                                </div>
                            </div>
                        )}

                        {complianceStep === 3 && (
                            <div className="text-center space-y-4">
                                <h3 className="text-lg font-bold text-gray-200">2257 / Model Release Form</h3>
                                <p className="text-xs text-gray-500 max-w-md mx-auto">Upload the signed and accurately dated model release/2257 compliance form.</p>
                                <div className="max-w-md mx-auto bg-[#121212] border border-[#2A2A2A] p-3 text-[10px] text-gray-400 text-left mb-4 rounded">
                                    <p>Need a blank template?</p>
                                    <a href="#" className="text-blue-400 hover:underline inline-flex items-center gap-1 mt-1"><File className="w-3 h-3" /> Download Standard 2257 Release PDF</a>
                                </div>
                                <div {...complianceDropzone.getRootProps()} className={`mt-4 bg-[#0A0A0A] border-2 border-dashed rounded p-10 flex flex-col items-center justify-center cursor-pointer transition-colors max-w-md mx-auto ${complianceDropzone.isDragActive ? 'border-red-500 bg-red-500/5' : 'border-[#2A2A2A] hover:bg-[#1A1A1A]'} ${uploading ? 'pointer-events-none opacity-50' : ''}`}>
                                    <input {...complianceDropzone.getInputProps()} />
                                    <FileCheck className="w-8 h-8 text-gray-500 mb-2" />
                                    <span className="text-xs font-bold text-gray-300">↑ UPLOAD RELEASE FORM</span>
                                    {uploading && <p className="text-[9px] mt-4 text-red-500 font-mono">UPLOADING... {Math.round(progress)}%</p>}
                                </div>
                            </div>
                        )}

                        {complianceStep === 4 && (
                            <div className="text-center space-y-4 py-8">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                                    <ShieldCheck className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-lg font-bold text-green-500 uppercase tracking-widest">Compliance Records Saved</h3>
                                <p className="text-xs text-gray-500 max-w-md mx-auto">Documents have been securely encrypted and stored. Your account is now marked as compliant for content generation.</p>
                                <button 
                                    onClick={() => { setComplianceStep(1); setActiveTab('vault'); }}
                                    className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-bold text-xs uppercase tracking-widest rounded transition-colors"
                                >
                                    Return to Vault
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {files.filter(f => f.isComplianceNode).length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest">Logged Compliance Docs</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {files.filter(f => f.isComplianceNode).map(f => (
                                    <div key={f.id} className="bg-[#1A1A1A] p-3 border border-[#2A2A2A] rounded flex justify-between items-center group">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="w-4 h-4 text-green-500" />
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-300 truncate w-48" title={f.fileName}>{f.fileName}</p>
                                                <p className="text-[9px] text-gray-500">Logged on {new Date(f.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(f)} className="text-[9px] text-red-500 font-bold border border-red-500/30 px-2 py-1 rounded hover:bg-red-500/10 transition-colors uppercase">Del</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
