import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { FaDownload, FaTimes, FaCheckCircle, FaFileDownload } from "react-icons/fa";

const TicketBookingDialog = ({ open, onClose }) => {
  const handleDownloadPDF = async () => {
    const ticketElement = document.getElementById("ticket-to-download");

    if (!ticketElement) {
      alert("Ticket not found. Make sure the ticket is rendered.");
      return;
    }

    // Scroll into view if needed
    ticketElement.scrollIntoView({ behavior: "smooth", block: "center" });

    const canvas = await html2canvas(ticketElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ticket.pdf");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <motion.div
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
              Your museum visit has been successfully booked
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
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">Present this ticket at the entrance</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">Arrive 15 minutes before your slot</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">Carry valid ID for verification</span>
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
  );
};

export default TicketBookingDialog;
