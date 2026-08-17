/**
 * BNE Security Measures Page
 * Threat protection, scam defense, and operational security
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import VideoPlayer from "@/components/VideoPlayer";
import InfographicModal from "@/components/InfographicModal";
import FAQAccordion, { SERVICE_FAQS } from "@/components/FAQAccordion";
import { useMediaCatalog } from "@/hooks/useMediaCatalog";
import {
  Shield, Lock, AlertTriangle, ArrowRight, Eye, Zap, Building2,
  TrendingUp, Star, Users, Heart, BarChart3, Siren, ScanSearch,
  PhoneCall
} from "lucide-react";
