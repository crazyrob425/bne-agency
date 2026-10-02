import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, Download, X, ZoomIn } from "lucide-react";

interface InfographicModalProps {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function InfographicModal({ url, title, isOpen, onClose }: InfographicModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print - ${title}</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: white; }
            img { max-width: 100%; max-height: 100vh; object-fit: contain; }
            @media print { body { margin: 0; } img { page-break-after: avoid; } }
          </style>
        </head>
        <body>
          <img src="${url}" />
          <script>
            const img = document.querySelector('img');
            if (img.complete) { window.print(); setTimeout(() => window.close(), 500); }
            else { img.onload = () => { window.print(); setTimeout(() => window.close(), 500); }; }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + url.slice(url.lastIndexOf("."));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-lg font-display">{title}</h3>
                <p className="text-zinc-500 text-xs font-body">Click to zoom. Use buttons below to print or download.</p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all"
                  title="Zoom"
                >
                  <ZoomIn size={18} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="p-2.5 rounded-xl bg-[oklch(0.78_0.16_85)] text-slate-950 hover:bg-[oklch(0.72_0.12_85)] transition-all"
                  title="Print"
                >
                  <Printer size={18} />
                </motion.button>
                <a
                  href={url}
                  download
                  onClick={(e) => { e.stopPropagation(); handleDownload(); }}
                  className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all inline-flex items-center justify-center"
                  title="Download"
                >
                  <Download size={18} />
                </a>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-all"
                  title="Close"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 overflow-auto rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center">
              <img
                src={url}
                alt={title}
                className={`object-contain transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
