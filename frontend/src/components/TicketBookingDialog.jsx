import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaTimes, FaCheckCircle, FaFileDownload } from "react-icons/fa";

/**
 * Props:
 * - onClose: () => void
 * - open?: boolean (optional; you usually render this conditionally so it's true by default)
 */
const TicketBookingDialog = ({ open = true, onClose }) => {
const handleDownloadPDF = async () => {
  try {
    // 1) Capture ONLY the card
    const card = document.getElementById("ticket-card");
    if (!card) {
      alert("Ticket card not found.");
      return;
    }

    // 2) Wait a tick for images/fonts (esp. QR canvas) to settle
    card.scrollIntoView({ behavior: "auto", block: "center" });
    await new Promise((r) => setTimeout(r, 100));

    // 3) Render with safe options; no stylesheet removal needed
    const canvas = await html2canvas(card, {
      useCORS: true,
      backgroundColor: "#ffffff",
      scale: Math.min(window.devicePixelRatio || 2, 3), // nice DPI without huge PDFs
      onclone: (doc) => {
        const el = doc.getElementById("ticket-card");
        if (!el) return;

        // Force HEX/RGB so html2canvas never sees oklch()
        el.style.backgroundColor = "#ffffff";
        el.style.color = "#000000";

        // If your ticket uses Tailwind opacity utilities like bg-black/40,
        // convert them here to RGBA so the dark panel survives:
        doc.querySelectorAll("[data-print-bg='dark']").forEach((n) => {
          n.style.backgroundColor = "rgba(0,0,0,0.4)";
        });

        // Ensure all <img> are anonymous
        doc.querySelectorAll("img").forEach((img) => {
          img.setAttribute("crossorigin", "anonymous");
        });
      },
    });

    // 4) Make a PDF that matches the canvas size (no white margins)
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      unit: "px",
      format: [canvas.width, canvas.height],
      orientation: canvas.width >= canvas.height ? "landscape" : "portrait",
      compress: true,
    });
    const margin = 40; // adjust as needed (in px)
const printableWidth = canvas.width - margin * 2;
const printableHeight = canvas.height - margin * 2;


    pdf.addImage(
  imgData,
  "PNG",
  margin,
  margin,
  printableWidth,
  printableHeight,
  undefined,
  "FAST"
);
    pdf.save("ticket.pdf");
  } catch (err) {
    console.error("PDF download failed:", err);
    alert("Could not generate the PDF. Please try again.");
  }
};






  // If you render conditionally (showDialog && <Dialog/>), 'open' is always true.
  // This guard also supports a parent that leaves the dialog mounted.
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl border border-gray-300 w-full max-w-lg shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-300 relative">
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-black"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <FaCheckCircle className="w-8 h-8 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-black mb-2"
              >
                Booking Confirmed!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-sm"
              >
                Your museum visit has been successfully booked.
              </motion.p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <FaFileDownload className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-black text-lg">Download Your Ticket</h3>
                  <p className="text-sm text-gray-600">Keep this for your museum visit</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">Present this ticket at the entrance.</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">Arrive 15 minutes before your slot.</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">Carry a valid ID for verification.</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                className="flex-1 bg-black text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 focus:outline-none flex items-center justify-center gap-2 group"
                onClick={handleDownloadPDF}
              >
                <FaDownload className="w-4 h-4 group-hover:animate-bounce" />
                Download Ticket
              </button>

              <button
                className="flex-1 bg-white text-black border border-gray-300 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none flex items-center justify-center gap-2"
                onClick={onClose}
              >
                <FaTimes className="w-4 h-4" />
                Close
              </button>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Need help? Contact us at support@museum.com
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TicketBookingDialog;
