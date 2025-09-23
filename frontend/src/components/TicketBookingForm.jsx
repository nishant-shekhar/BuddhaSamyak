import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DateSelector from "./DateSelector";
import { FaMinus, FaPlus } from "react-icons/fa";
import Ticket from "./Ticket";
import TicketBookingDialog from "./TicketBookingDialog";
import Navbar from "./Navbar";
import { BiError } from "react-icons/bi";

import db from "./firebase";
import { ref, push, set, get, child, increment, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid"; // Optional for generating unique values
import CountrySelector from "./CountrySelector";


const steps = ["Personal Info", "Booking Details", "Confirm"];


import { FaInfoCircle } from "react-icons/fa";

const BookingNoticeDialog = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 text-center relative animate-fade-in-up">
        <div className="flex flex-col items-center space-y-3">
          <FaInfoCircle className="text-blue-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">
            🎟️ Ticket Booking Update
          </h2>
        </div>

        <div className="mt-6 text-gray-700 space-y-4 text-sm md:text-base font-medium text-left">
          <p>🌐 <strong>English:</strong> Ticket booking is not open yet. It will begin soon for everyone.</p>
          <p>🇮🇳 <strong>हिन्दी:</strong> टिकट बुकिंग अभी शुरू नहीं हुई है। यह सभी के लिए जल्द शुरू होगी।</p>
          <p>🇯🇵 <strong>日本語:</strong> チケット予約はまだ開始されていません。まもなく全ての方に向けて始まります。</p>
          <p>🇰🇷 <strong>한국어:</strong> 티켓 예약은 아직 시작되지 않았습니다. 곧 모두를 위해 시작됩니다.</p>
          <p>🇨🇳 <strong>中文:</strong> 购票尚未开放，很快将向所有人开放。</p>
        </div>

        <p className="text-xs text-gray-500 mt-6 italic">
          Please check back soon for the official opening.
        </p>
      </div>
    </div>
  );
};



const TicketBookingForm = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [step, setStep] = useState(0);
  const [ticketNo, setTicketNo] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    sessionType: "",
    adults: "0",
    children: "0",
    country: "",
    email: "",
  });
const handleConfirmBooking = async () => {
  if (!validateStep()) return;

  try {
    const ticketListRef = ref(db, "BuddhaSamyak/Tickets");
    const totalTicketRef = ref(db, "BuddhaSamyak/GlobalParameter/Data/TotalTickets");

    // ✅ Get current ticket number and set in state
    const totalSnap = await get(totalTicketRef);
    let currentTicketNo = (totalSnap.exists() ? totalSnap.val() : 0) + 1;
    setTicketNo(currentTicketNo);

    const newTicketRef = push(ticketListRef);

    const ticketData = {
      ticketNo: currentTicketNo,
      ...formData,
      qrData: {
        id: newTicketRef.key,
        fullName: formData.fullName,
        phone: formData.phone,
        date: formData.date,
        sessionType: formData.sessionType,
        ticketNo: currentTicketNo,
      },
      createdAt: new Date().toISOString(),
    };

    await set(newTicketRef, ticketData);

    await update(ref(db, "BuddhaSamyak/GlobalParameter/Data"), {
      TotalTickets: currentTicketNo,
      [`Country/${formData.country}`]: increment(1),
    });

    setStep(2);
    setShowDialog(true);
  } catch (error) {
    console.error("Ticket booking failed:", error);
    alert("Something went wrong. Please try again.");
  }
};



  const validateStep = () => {
    const errors = {};

    if (step === 0) {
      if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
      if (!formData.phone.trim() || !/^\d{10,}$/.test(formData.phone))
        errors.phone = "Enter a valid phone number.";
      if (!formData.country.trim()) errors.country = "Country is required.";
      if (
        !formData.email.trim() ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
      )
        errors.email = "Enter a valid email address.";
      
    }

    if (step === 1) {
      if (!formData.date) errors.date = "Date is required.";
      if (!formData.sessionType) errors.sessionType = "Select a session slot.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (eOrType, op) => {
    if (typeof eOrType === "string") {
      // Custom counter logic for adults/children
      setFormData((prev) => {
        const currentValue = Number(prev[eOrType]) || 0; // Ensure it's a number
        const updatedValue =
          op === "inc" ? currentValue + 1 : Math.max(0, currentValue - 1);
        return { ...prev, [eOrType]: updatedValue };
      });
    } else {
      // Input field logic
      const { name, value } = eOrType.target;
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "adults" || name === "children" ? Number(value) : value,
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Reference to the root parameter
    const ticketListRef = ref(db, "BuddhaSamyak/Tickets");
    const totalTicketRef = ref(db, "BuddhaSamyak/GlobalParameter/Data/TotalTickets");

    // Get current totalTickets
    const totalSnap = await get(totalTicketRef);
    let currentTicketNo = (totalSnap.exists() ? totalSnap.val() : 0) + 1;

    // Push new ticket entry
    const newTicketRef = push(ticketListRef);

    const ticketData = {
      ticketNo: currentTicketNo,
      ...formData,
      qrData: {
        id: newTicketRef.key,
        fullName: formData.fullName,
        phone: formData.phone,
        date: formData.date,
        sessionType: formData.sessionType,
        ticketNo: currentTicketNo,
      },
      createdAt: new Date().toISOString(),
    };

    // Save to Firebase
    await set(newTicketRef, ticketData);

    // Update Global Count
    await update(ref(db, "BuddhaSamyak/GlobalParameter/Data"), {
      TotalTickets: currentTicketNo,
      [`Country/${formData.country}`]: increment(1),
    });

    setShowDialog(true); // Open confirmation dialog
  } catch (error) {
    console.error("Ticket booking failed:", error);
    alert("Something went wrong. Please try again.");
  }
};


  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <>
      <Navbar />
      <div className="bg-white p-6 max-w-xl mx-auto mt-10 rounded-xl ">
        <div className="relative mb-8">
          <div className="flex justify-between items-center">
            {steps.map((label, i) => (
              <div key={i} className="flex flex-col items-center w-full">
                <div
                  className={`z-10 w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${
                    step >= i ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    step >= i ? "text-black font-medium" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute top-5 left-[5%] w-[90%] h-1 bg-gray-300 z-0 rounded-full">
            <motion.div
              className="h-1 bg-black rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

         
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 0 && (
            <>
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
                {formErrors.fullName && (
                  <p className="text-red-500 bg-red-50 py-1 pl-2 rounded border border-red-200 text-sm mt-1 flex items-center gap-1">
                    <BiError className="text-lg" />
                    {formErrors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
               <input
  name="phone"
  type="tel"
  maxLength={10}
  value={formData.phone}
  onChange={(e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    if (onlyNums.length <= 10) {
      setFormData((prev) => ({ ...prev, phone: onlyNums }));
    }
  }}
  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
  placeholder="Enter 10-digit mobile number"
  required
/>

                {formErrors.phone && (
                  <p className="text-red-500 bg-red-50 py-1 pl-2 rounded border border-red-200 text-sm mt-1 flex items-center gap-1">
                    <BiError className="text-lg" />
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium">Country</label>
                 <CountrySelector
  value={formData.country}
  onChange={(val) => setFormData((prev) => ({ ...prev, country: val }))}
/>
{formErrors.country && (
  <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
)}
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    name="email" // ✅ FIXED
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="example@mail.com"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 bg-red-50 py-1 pl-2 rounded border border-red-200 text-sm mt-1 flex items-center gap-1">
                      <BiError className="text-lg" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Number of Adults
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleChange("adults", "dec")}
                      className="px-3 py-4 bg-gray-700 hover:bg-gray-800 text-white"
                    >
                      <FaMinus size={12} />
                    </button>
                    <input
                      type="number"
                      readOnly
                      className="w-full text-center px-4 py-2 focus:outline-none"
                      value={formData.adults}
                    />

                    <button
                      type="button"
                      onClick={() => handleChange("adults", "inc")}
                      className="px-3 py-4 bg-gray-700 hover:bg-gray-800 text-white"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  {formErrors.adults && (
                    <p className="text-red-500 bg-red-50 py-1 pl-2 rounded border border-red-200 text-sm mt-1 flex items-center gap-1">
                      <BiError className="text-lg" />
                      {formErrors.adults}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Number of Children
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleChange("children", "dec")}
                      className="px-3 py-4 bg-gray-700 hover:bg-gray-800 text-white"
                    >
                      <FaMinus size={12} />
                    </button>
                    <input
                      type="number"
                      readOnly
                      className="w-full text-center px-4 py-2 focus:outline-none"
                      value={formData.children}
                    />

                    <button
                      type="button"
                      onClick={() => handleChange("children", "inc")}
                      className="px-3 py-4 bg-gray-700 hover:bg-gray-800 text-white"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                  {formErrors.children && (
                    <p className="text-red-500 bg-red-50 py-1 pl-2 rounded border border-red-200 text-sm mt-1 flex items-center gap-1">
                      <BiError className="text-lg" />
                      {formErrors.children}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <DateSelector
                  value={formData.date} // format 'YYYY-MM-DD'
                  onChange={(date) =>
                    setFormData((prev) => ({
                      ...prev,
                      date, // string like '2025-07-20'
                    }))
                  }
                />
               {formErrors.date && (
                    <p className="text-red-500 bg-red-50 py-1 pl-2 rounded border border-red-200 text-sm mt-1 flex items-center gap-1">
                      <BiError className="text-lg" />
                      {formErrors.date}
                    </p>
                  )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 mt-6">
                {[
                  {
                    id: "radio_1",
                    label: "Slot 1",
                    value: "9:00 AM - 01:00 AM",
                  },
                  {
                    id: "radio_2",
                    label: "Slot 2",
                    value: "01:00 PM - 05:00 PM",
                  },
                ].map(({ id, label, value }) => (
                  <div key={id} className="relative">
                    <input
                      className="peer hidden"
                      id={id}
                      type="radio"
                      name="sessionType"
                      value={value}
                      checked={formData.sessionType === value}
                      onChange={handleChange}
                    />
                    {formErrors.sessionType && (
                    <p className="text-red-500 bg-red-50 py-1 pl-2 rounded border border-red-200 text-sm mt-1 flex items-center gap-1">
                      <BiError className="text-lg" />
                      {formErrors.sessionType}
                    </p>
                  )}
                    <span className="absolute right-4 top-1/2 block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-black"></span>
                    <label
                      htmlFor={id}
                      className="block h-full cursor-pointer rounded-lg p-4 border border-gray-200 drop-shadow-2xl peer-checked:bg-black peer-checked:text-white"
                    >
                      <span className="font-medium">{label}</span>
                      <span className="block text-xs uppercase">{value}</span>
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && <Ticket formData={formData} />}

{step < 2 && (
  <div className="flex justify-between pt-4">
    {step > 0 ? (
      <div className="flex items-center justify-center">
        <div className="relative group">
          <button
            onClick={handleBack}
            type="button"
            className="text-white bg-black hover:bg-black hover:scale-105 duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            Back
          </button>
        </div>
      </div>
    ) : (
      <div />
    )}

    <div className="flex items-center justify-center">
      <div className="relative group">
        <button
          onClick={step === 1 ? handleConfirmBooking : handleNext}
          type="button"
          className="text-white bg-black hover:bg-black hover:scale-105 duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          {step === 1 ? "Confirm Booking" : "Next"}
        </button>
      </div>
    </div>
  </div>
)}


  

        </form>
        {showDialog && (
<TicketBookingDialog
  onClose={() => setShowDialog(false)}
  ticketData={{
    ticketNo: ticketNo,
    ...formData,
  }}
/>
        )}
      </div>

    </>
  );
};

export default TicketBookingForm;
