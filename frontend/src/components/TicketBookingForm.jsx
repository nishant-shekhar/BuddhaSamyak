import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Minus,
  Plus,
  User,
  Phone,
  Mail,
  Users,
  Baby,
  Clock,
  Building,
  Camera,
  Wifi,
  Car,
  Sun,
  Sunset,
  Star,
  Bus as BusIcon,
  GraduationCap,
  BookOpen,
  Building2,
} from "lucide-react";
import { BiError, BiInfoCircle } from "react-icons/bi";
import { FaTicket } from "react-icons/fa6";

import Navbar from "./Navbar";
import Footer from "./Footer";
import DateSelector from "./DateSelector";
import CountrySelector from "./CountrySelector";
import Ticket from "./Ticket";
import TicketBookingDialog from "./TicketBookingDialog";

import db from "./firebase";
import {
  ref,
  push,
  set,
  runTransaction,
  serverTimestamp,
} from "firebase/database";

const MAX_INDIVIDUAL_COUNT = 10;           // adults/children per ticket
const MAX_STUDENT_GROUP_SIZE = 250;        // students only
const MAX_TOURIST_GROUP_SIZE = 60;         // tourist bus default cap (adjust as needed)
const steps = ["Personal Info", "Booking Details", "Confirm"];

const TicketBookingForm = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [ticketNo, setTicketNo] = useState(null);

  const [formData, setFormData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("formData") || "{}");
      return {
        fullName: "",
        phone: "",
        country: "",
        email: "",

        ticketType: "individual",           // "individual" | "group"
        groupCategory: "student",           // "student" | "tourist"  (applies when ticketType === "group")
        groupSize: 1,
        leaderName: "",                     // required if groupCategory === "tourist"
        instituteName: "",                  // required if groupCategory === "student"

        adults: 0,
        children: 0,

        date: "",
        sessionType: "",
        ...saved,
      };
    } catch {
      return {
        fullName: "",
        phone: "",
        country: "",
        email: "",
        ticketType: "individual",
        groupCategory: "student",
        groupSize: 1,
        leaderName: "",
        instituteName: "",
        adults: 0,
        children: 0,
        date: "",
        sessionType: "",
      };
    }
  });

  // Persist (safe fields only)
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Helpers
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const isForeignNational = () => {
    const c = (formData.country || "").trim().toLowerCase();
    return !(c === "india" || c === "in" || c === "bharat" || c === "भारत");
  };

  const countryKey = useMemo(() => {
    const raw = (formData.country || "").trim();
    if (!raw) return "Unknown";
    return raw.replace(/[.#$[\]/]/g, "_"); // RTDB safe key
  }, [formData.country]);

  // Monday closed
  const isDateClosed = (d) => d.getDay() === 1; // Monday
  const selectedDateObj = formData.date ? new Date(formData.date) : null;
  const isSelectedMonday = selectedDateObj && selectedDateObj.getDay() === 1;

  // Validation
  const validateStep = () => {
    const errors = {};

    if (step === 0) {
      if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
      if (!formData.country || !String(formData.country).trim()) {
        errors.country = "Country is required.";
      }
      const emailOk = /\S+@\S+\.\S+/.test(formData.email || "");
      if (!emailOk) errors.email = "Enter a valid email address.";

      if (formData.ticketType === "group") {
        const size = parseInt(formData.groupSize) || 0;

        if (formData.groupCategory === "student") {
          if (size < 1 || size > MAX_STUDENT_GROUP_SIZE) {
            errors.groupSize = `Student group size must be between 1 and ${MAX_STUDENT_GROUP_SIZE}.`;
          }
          if (!formData.instituteName.trim()) {
            errors.instituteName = "Institute name is required for student groups.";
          }
        } else {
          // tourist
          if (size < 1 || size > MAX_TOURIST_GROUP_SIZE) {
            errors.groupSize = `Tourist group size must be between 1 and ${MAX_TOURIST_GROUP_SIZE}.`;
          }
          if (!formData.leaderName.trim()) {
            errors.leaderName = "Team leader name is required for tourist groups.";
          }
        }
      } else {
        // individual
        const a = parseInt(formData.adults) || 0;
        const c = parseInt(formData.children) || 0;

        if (a < 0 || a > MAX_INDIVIDUAL_COUNT) {
          errors.adults = `Adults must be 0–${MAX_INDIVIDUAL_COUNT}.`;
        }
        if (c < 0 || c > MAX_INDIVIDUAL_COUNT) {
          errors.children = `Children must be 0–${MAX_INDIVIDUAL_COUNT}.`;
        }
        if (a + c < 1) {
          errors.visitors = "Please select at least one visitor.";
        }
      }
    }

    if (step === 1) {
      if (!formData.date) errors.date = "Date is required.";
      if (isSelectedMonday) errors.date = "Museum is closed on Mondays. Please select another day.";
      if (!formData.sessionType) errors.sessionType = "Select a session slot.";
      if (isSelectedMonday && formData.sessionType) {
        errors.sessionType = "No sessions available on Mondays (closed).";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (booked) return;
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (booked) return;
    if (step > 0) setStep((s) => s - 1);
  };

  const handleChange = (eOrType, op) => {
    if (booked) return;

    if (typeof eOrType === "string") {
      // +/- counters
      setFormData((prev) => {
        let next = Number(prev[eOrType]) || 0;
        next = op === "inc" ? next + 1 : next - 1;

        if (eOrType === "adults" || eOrType === "children") {
          next = clamp(next, 0, MAX_INDIVIDUAL_COUNT);
        }
        if (eOrType === "groupSize") {
          const max =
            prev.groupCategory === "student"
              ? MAX_STUDENT_GROUP_SIZE
              : MAX_TOURIST_GROUP_SIZE;
          next = clamp(next, 1, max);
        }
        return { ...prev, [eOrType]: next };
      });
    } else {
      const { name, value, type, checked } = eOrType.target;

      if (name === "ticketType") {
        if (value === "group") {
          setFormData((prev) => ({
            ...prev,
            ticketType: "group",
            groupCategory: "student", // default to student
            groupSize: clamp(prev.groupSize || 1, 1, MAX_STUDENT_GROUP_SIZE),
            leaderName: "",
            instituteName: "",
            adults: 0,
            children: 0,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            ticketType: "individual",
          }));
        }
        return;
      }

      if (name === "groupCategory") {
        const max =
          value === "student" ? MAX_STUDENT_GROUP_SIZE : MAX_TOURIST_GROUP_SIZE;
        setFormData((prev) => ({
          ...prev,
          groupCategory: value,
          groupSize: clamp(prev.groupSize || 1, 1, max),
          // clear the opposite field
          leaderName: value === "student" ? "" : prev.leaderName,
          instituteName: value === "student" ? prev.instituteName : "",
        }));
        return;
      }

      if (name === "adults" || name === "children") {
        const num = clamp(Number(value || 0), 0, MAX_INDIVIDUAL_COUNT);
        setFormData((prev) => ({ ...prev, [name]: num }));
        return;
      }

      if (name === "groupSize") {
        const max =
          formData.groupCategory === "student"
            ? MAX_STUDENT_GROUP_SIZE
            : MAX_TOURIST_GROUP_SIZE;
        const num = clamp(Number(value || 0), 1, max);
        setFormData((prev) => ({ ...prev, groupSize: num }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Atomic booking
 // put near your constants
const TICKET_OFFSET = 280200;

const handleConfirmBooking = async () => {
  if (booked || isSubmitting) return;
  if (!validateStep()) return;

  setIsSubmitting(true);
  try {
    // 1) Atomic ticket counter
    const totalRef = ref(db, "BuddhaSamyak/GlobalParameter/Counters/TotalTickets");
    const txRes = await runTransaction(totalRef, (current) => (current || 0) + 1);

    if (!txRes.committed) {
      throw new Error("Ticket counter transaction not committed");
    }

    const rawCounter = txRes?.snapshot?.val() || 0;           // 1, 2, 3, ...
    const displayTicketNo = TICKET_OFFSET + rawCounter;        // 280201, 280202, ...

    setTicketNo(displayTicketNo);

    // 2) Create ticket entry
    const ticketsRef = ref(db, "BuddhaSamyak/Tickets");
    const newTicketRef = push(ticketsRef);
    const ticketId = newTicketRef.key;

    const payload = {
      id: ticketId,
      ticketNo: displayTicketNo,     // ✅ store the offset number
      rawCounter,                    // (optional) useful for analytics

      type: formData.ticketType,                 // "individual" | "group"
      groupCategory:
        formData.ticketType === "group" ? formData.groupCategory : null, // "student" | "tourist" | null
      isStudentGroup:
        formData.ticketType === "group" ? formData.groupCategory === "student" : false,

      groupSize:
        formData.ticketType === "group" ? Number(formData.groupSize) : null,

      leaderName:
        formData.ticketType === "group" && formData.groupCategory === "tourist"
          ? formData.leaderName
          : null,

      instituteName:
        formData.ticketType === "group" && formData.groupCategory === "student"
          ? formData.instituteName
          : null,

      visitors:
        formData.ticketType === "individual"
          ? {
              adults: Number(formData.adults) || 0,
              children: Number(formData.children) || 0,
            }
          : null,

      // Contact
      fullName: formData.fullName,
      phone: formData.phone || null,
      email: formData.email,
      country: formData.country,

      // Visit
      date: formData.date,
      sessionType: formData.sessionType,

      // QR minimal (compact → better scannability)
      qrData: {
        id: ticketId,
        ticketNo: displayTicketNo,   // ✅ same offset number in QR
        date: formData.date,
        sessionType: formData.sessionType,
      },

      status: "CONFIRMED",
      createdAt: serverTimestamp(),
    };

    await set(newTicketRef, payload);
    setFormData(prev => ({
  ...prev,
  qrData: {
    id: ticketId,
    ticketNo: displayTicketNo,
    date: prev.date,
    sessionType: prev.sessionType,
  },
}));

    // 3) Country counter
    const countryRef = ref(
      db,
      `BuddhaSamyak/GlobalParameter/Counters/Country/${countryKey}`
    );
    await runTransaction(countryRef, (current) => (current || 0) + 1);

    // 4) Lock UI and show dialog
    setBooked(true);
    setStep(2);
    setShowDialog(true);
  } catch (err) {
    console.error("Ticket booking failed:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-black mb-2"
            >
              Book Your Museum Visit
            </motion.h1>
            <p className="text-gray-600 text-lg">
              Experience art & culture at Buddha Samyak.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-black">Opening Hours</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuesday – Sunday</span>
                    <span className="font-medium text-black">10:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Monday</span>
                    <span className="font-medium text-gray-500">Closed</span>
                  </div>
                </div>
              </motion.div>

              {/* Prices */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FaTicket />
                  </div>
                  <h3 className="font-semibold text-black">Ticket Prices</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-semibold">
                        FREE ENTRY
                      </span>
                    </div>
                    <p className="text-green-700 text-xs mt-1">
                      All tickets are currently free!
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Regular Pricing (Currently Free):
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Adults (13+ years)</span>
                    <span className="font-medium text-green-600 ">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Children (5–12 years)</span>
                    <span className="font-medium text-green-600 ">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Foreign Nationals</span>
                    <span className="font-medium text-green-600 ">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Student Groups*</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    *Up to {MAX_STUDENT_GROUP_SIZE} students per group. Present a
                    school/institute letter on arrival; students must be in
                    institute uniform.
                  </p>
                </div>
              </motion.div>

              {/* Facilities */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-100 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <BiInfoCircle className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-black">Facilities</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
  <div className="flex items-center gap-2 text-gray-600">
    <Sun className="w-3 h-3" />
    <span>Meditation Center</span>
  </div>
  <div className="flex items-center gap-2 text-gray-600">
    <BookOpen className="w-3 h-3" />
    <span>Library</span>
  </div>
  <div className="flex items-center gap-2 text-gray-600">
    <Building2 className="w-3 h-3" />
    <span>Restroom</span>
  </div>
  <div className="flex items-center gap-2 text-gray-600">
    <Car className="w-3 h-3" />
    <span>Parking</span>
  </div>
</div>

              </motion.div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
              >
                {/* Stepper */}
                <div className="bg-gradient-to-r from-gray-100 to-white px-8 py-6 border-b-2 border-gray-200">
                  <div className="relative">
                    <div className="flex justify-between items-center">
                      {steps.map((label, i) => (
                        <div key={i} className="flex flex-col items-center flex-1">
                          <div className="relative">
                            <div
                              className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-300 border-2 ${
                                step >= i
                                  ? "bg-black text-white border-black"
                                  : "bg-white text-gray-500 border-gray-300"
                              }`}
                            >
                              {i + 1}
                            </div>
                          </div>
                          <span
                            className={`text-sm mt-3 font-medium ${
                              step >= i ? "text-black" : "text-gray-400"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-6 left-[8%] w-[84%] h-0.5 bg-gray-200 -z-10">
                      <motion.div
                        className="h-0.5 bg-black"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(step / (steps.length - 1)) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Step 1: Personal Info */}
                    {step === 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`space-y-6 ${
                          booked ? "pointer-events-none opacity-70" : ""
                        }`}
                      >
                        {/* Full Name */}
                        <div>
                          <label className="block text-sm font-semibold text-black mb-2">
                            <User className="inline mr-2 w-4 h-4 text-gray-600" />
                            Full Name
                          </label>
                          <input
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400"
                            placeholder="Enter full name"
                          />
                          {formErrors.fullName && (
                            <p className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-200 text-sm mt-2 flex items-center gap-2">
                              <BiError className="text-base flex-shrink-0" />{" "}
                              {formErrors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Phone (optional) */}
                        <div>
                          <label className="block text-sm font-semibold text-black mb-2">
                            <Phone className="inline mr-2 w-4 h-4 text-gray-600" />
                            Phone Number (Optional)
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              handleChange({
                                target: { name: "phone", value },
                              });
                            }}
                            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400"
                            placeholder="Enter 10-digit mobile number"
                            maxLength={10}
                          />
                        </div>

                        {/* Country + Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <CountrySelector
                            value={formData.country}
                            onChange={(country) =>
                              setFormData((prev) => ({ ...prev, country }))
                            }
                            error={formErrors.country}
                          />
                          <div>
                            <label className="block text-sm font-semibold text-black mb-2">
                              <Mail className="inline mr-2 w-4 h-4 text-gray-600" />
                              Email Address (Required)
                            </label>
                            <input
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400"
                              placeholder="example@mail.com"
                            />
                            {formErrors.email && (
                              <p className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-200 text-sm mt-2 flex items-center gap-2">
                                <BiError className="text-base flex-shrink-0" />{" "}
                                {formErrors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Ticket Type */}
                        <fieldset className="bg-gray-50 rounded-xl p-6 border border-gray-300">
                          <legend className="text-lg font-semibold text-black mb-4">
                            Ticket Type
                          </legend>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                              <input
                                className="peer sr-only"
                                id="individual"
                                type="radio"
                                name="ticketType"
                                value="individual"
                                checked={formData.ticketType === "individual"}
                                onChange={handleChange}
                                disabled={booked}
                              />
                              <label
                                htmlFor="individual"
                                className="flex items-center justify-between w-full p-4 bg-white border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-black peer-checked:bg-gray-50 transition-all duration-200"
                              >
                                <div className="flex items-center gap-3">
                                  <Users className="w-5 h-5 text-gray-600" />
                                  <div>
                                    <span className="block font-semibold text-black">
                                      Individual Tickets
                                    </span>
                                    <span className="block text-sm text-gray-600">
                                      For individual visitors
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>

                            <div className="relative">
                              <input
                                className="peer sr-only"
                                id="group"
                                type="radio"
                                name="ticketType"
                                value="group"
                                checked={formData.ticketType === "group"}
                                onChange={handleChange}
                                disabled={booked}
                              />
                              <label
                                htmlFor="group"
                                className="flex items-center justify-between w-full p-4 bg-white border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 peer-checked:border-black peer-checked:bg-gray-50 transition-all duration-200"
                              >
                                <div className="flex items-center gap-3">
                                  <Users className="w-5 h-5 text-gray-600" />
                                  <div>
                                    <span className="block font-semibold text-black">
                                      Group Ticket
                                    </span>
                                    <span className="block text-sm text-gray-600">
                                      Tourist bus / Student group
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </fieldset>

                        {/* Individual counters */}
                        {formData.ticketType === "individual" && (
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-300">
                            <h3 className="text-lg font-semibold text-black mb-4">
                              Number of Visitors
                            </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Adults */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-3">
      <Users className="inline mr-2 w-4 h-4 text-gray-600" />
      {isForeignNational()
        ? "Adults (Foreign Nationals)"
        : "Adults (13+ years)"}{" "}
      <span className="text-gray-500">(max {MAX_INDIVIDUAL_COUNT})</span>
    </label>

    <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden  ">
      <button
        type="button"
        aria-label="Decrease adults"
        onClick={() => handleChange("adults", "dec")}
        className="w-12 h-12 flex items-center justify-center rounded-l-lg bg-gray-800 hover:bg-black text-white"
        disabled={booked}
      >
        <Minus size={16} />
      </button>

      <div className="flex-1 px-4  text-center font-bold text-xl">
        {formData.adults}
      </div>

      <button
        type="button"
        aria-label="Increase adults"
        onClick={() => handleChange("adults", "inc")}
        className="w-12 h-12 flex items-center justify-center rounded-r-lg bg-gray-800 hover:bg-black text-white"
        disabled={booked}
      >
        <Plus size={16} />
      </button>
    </div>

    {formErrors.adults && (
      <p className="text-red-600 text-sm mt-2">{formErrors.adults}</p>
    )}
  </div>

  {/* Children */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-3">
      <Baby className="inline mr-2 w-4 h-4 text-gray-600" />
      {isForeignNational()
        ? "Children (Foreign Nationals)"
        : "Children (5–12 years)"}{" "}
      <span className="text-gray-500">(max {MAX_INDIVIDUAL_COUNT})</span>
    </label>

    <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden ">
      <button
        type="button"
        aria-label="Decrease children"
        onClick={() => handleChange("children", "dec")}
        className="w-12 h-12 flex items-center justify-center rounded-l-lg bg-gray-800 hover:bg-black text-white"
        disabled={booked}
      >
        <Minus size={16} />
      </button>

      <div className="flex-1 px-4  text-center font-bold text-xl">
        {formData.children}
      </div>

      <button
        type="button"
        aria-label="Increase children"
        onClick={() => handleChange("children", "inc")}
        className="w-12 h-12 flex items-center justify-center rounded-r-lg bg-gray-800 hover:bg-black text-white"
        disabled={booked}
      >
        <Plus size={16} />
      </button>
    </div>

    {formErrors.children && (
      <p className="text-red-600 text-sm mt-2">{formErrors.children}</p>
    )}
  </div>
</div>


                            {isForeignNational() && (
                              <p className="text-xs text-blue-600 mt-1">
                                Foreign National rate applies (currently FREE)
                              </p>
                            )}
                            {formErrors.visitors && (
                              <p className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-200 text-sm mt-2 flex items-center gap-2">
                                <BiError className="text-base flex-shrink-0" />{" "}
                                {formErrors.visitors}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Group (tourist OR student) */}
                        {formData.ticketType === "group" && (
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-300 space-y-6">
                            <h3 className="text-lg font-semibold text-black">
                              Group Details
                            </h3>

                            {/* Group Category */}
                         <div>
  <label className="block text-sm font-semibold text-gray-700 mb-3">
    Select Group Type
  </label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {/* Tourist Bus Group */}
    <label className="cursor-pointer">
      <input
        type="radio"
        name="groupCategory"
        value="tourist"
        checked={formData.groupCategory === "tourist"}
        onChange={handleChange}
        className="sr-only peer"
        disabled={booked}
      />
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-white transition-colors duration-200 hover:bg-gray-50
                      border-gray-300 peer-checked:border-gray-800">
        <BusIcon className="w-5 h-5 text-gray-700" />
        <span className="font-medium">Tourist Bus Group</span>
      </div>
    </label>

    {/* Student Group */}
    <label className="cursor-pointer">
      <input
        type="radio"
        name="groupCategory"
        value="student"
        checked={formData.groupCategory === "student"}
        onChange={handleChange}
        className="sr-only peer"
        disabled={booked}
      />
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-white transition-colors duration-200 hover:bg-gray-50
                      border-gray-300 peer-checked:border-gray-800">
        <GraduationCap className="w-5 h-5 text-gray-700" />
        <span className="font-medium">Student Group</span>
      </div>
    </label>
  </div>
</div>



                            {/* Group Size */}
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Users className="inline mr-2 w-4 h-4 text-gray-600" />
                                Group Size{" "}
                                {formData.groupCategory === "student"
                                  ? `(1–${MAX_STUDENT_GROUP_SIZE})`
                                  : `(1–${MAX_TOURIST_GROUP_SIZE})`}
                              </label>
                              <input
                                name="groupSize"
                                type="number"
                                min={1}
                                max={
                                  formData.groupCategory === "student"
                                    ? MAX_STUDENT_GROUP_SIZE
                                    : MAX_TOURIST_GROUP_SIZE
                                }
                                value={formData.groupSize}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400"
                                placeholder="Enter group size"
                                disabled={booked}
                              />
                              {formErrors.groupSize && (
                                <p className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-200 text-sm mt-2 flex items-center gap-2">
                                  <BiError className="text-base flex-shrink-0" />{" "}
                                  {formErrors.groupSize}
                                </p>
                              )}
                            </div>

                            {/* Tourist: Leader Name */}
                            {formData.groupCategory === "tourist" && (
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                  Team Leader Name
                                </label>
                                <input
                                  name="leaderName"
                                  type="text"
                                  value={formData.leaderName}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400"
                                  placeholder="Enter leader's full name"
                                  disabled={booked}
                                />
                                {formErrors.leaderName && (
                                  <p className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-200 text-sm mt-2 flex items-center gap-2">
                                    <BiError className="text-base flex-shrink-0" />{" "}
                                    {formErrors.leaderName}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Student: Institute Name */}
                            {formData.groupCategory === "student" && (
                              <>
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-2 text-sm text-yellow-900">
                                  Student group booking available up to{" "}
                                  {MAX_STUDENT_GROUP_SIZE}. Present an official
                                  letter from the institute on arrival; students
                                  must be in uniform. (No upload required.)
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Institute Name
                                  </label>
                                  <input
                                    name="instituteName"
                                    type="text"
                                    value={formData.instituteName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-0 focus:border-black transition-all duration-200 text-black placeholder-gray-400"
                                    placeholder="Enter institute name"
                                    disabled={booked}
                                  />
                                  {formErrors.instituteName && (
                                    <p className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-200 text-sm mt-2 flex items-center gap-2">
                                      <BiError className="text-base flex-shrink-0" />{" "}
                                      {formErrors.instituteName}
                                    </p>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Step 2: Booking Details */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`space-y-6 ${
                          booked ? "pointer-events-none opacity-70" : ""
                        }`}
                      >
                        {/* Date selection */}
                        <div>
                          <DateSelector
                            value={formData.date}
                            isDateDisabled={isDateClosed}
                            onChange={(date) =>
                              setFormData((prev) => ({
                                ...prev,
                                date,
                                sessionType: "",
                              }))
                            }
                          />
                          {formErrors.date && (
                            <p className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-200 text-sm mt-2 flex items-center gap-2">
                              <BiError className="text-base flex-shrink-0" />{" "}
                              {formErrors.date}
                            </p>
                          )}
                          {isSelectedMonday && (
                            <div className="mt-2 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-md p-2">
                              Museum is closed on Mondays. Please pick another
                              date.
                            </div>
                          )}
                        </div>

                        {/* Slots */}
                        <div>
                          <h3 className="text-lg font-semibold text-black mb-4">
                            Choose Visit Time
                          </h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {[
                              {
                                id: "radio_1",
                                label: "Morning Slot",
                                value: "10:00 AM - 01:00 PM",
                                icon: Sun,
                              },
                              {
                                id: "radio_2",
                                label: "Afternoon Slot",
                                value: "01:00 PM - 05:00 PM",
                                icon: Sunset,
                              },
                            ].map(({ id, label, value, icon: Icon }) => {
                              const disabled =
                                isSelectedMonday || !formData.date;
                              const checked =
                                formData.sessionType === value;
                              return (
                                <div key={id} className="relative">
                                  <input
                                    className="peer sr-only"
                                    id={id}
                                    type="radio"
                                    name="sessionType"
                                    value={value}
                                    checked={checked}
                                    onChange={handleChange}
                                    disabled={disabled}
                                  />
                                  <label
                                    htmlFor={id}
                                    className={`flex items-center justify-between w-full p-5 rounded-xl cursor-pointer transition-all duration-200 border ${
                                      disabled
                                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-white border-gray-300 hover:bg-gray-50 peer-checked:border-black peer-checked:bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Icon
                                        className={`w-6 h-6 ${
                                          disabled
                                            ? "text-gray-400"
                                            : "text-orange-500"
                                        }`}
                                      />
                                      <div>
                                        <span className="block font-semibold text-black">
                                          {label}
                                        </span>
                                        <span className="block text-sm text-gray-600">
                                          {value}
                                        </span>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          {formErrors.sessionType && (
                            <p className="text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-gray-200 text-sm mt-2 flex items-center gap-2">
                              <BiError className="text-base flex-shrink-0" />{" "}
                              {formErrors.sessionType}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 2 && (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
    <Ticket formData={{ ...formData, ticketNo }} />
  </motion.div>
)}

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                      {step > 0 && !booked ? (
                        <button
                          onClick={handleBack}
                          type="button"
                          className="flex items-center gap-2 px-6 py-3 text-black bg-white border border-gray-300 hover:bg-black hover:text-white rounded-xl font-medium transition-all duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 2 ? (
                        step === 1 ? (
                          <button
                            onClick={handleConfirmBooking}
                            type="button"
                            disabled={isSubmitting}
                            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                              isSubmitting
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-black hover:bg-gray-800 text-white"
                            }`}
                          >
                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                          </button>
                        ) : (
                          <button
                            onClick={handleNext}
                            type="button"
                            className="flex items-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-all duration-200"
                          >
                            Next
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        )
                      ) : (
                        <div />
                      )}
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar (Sticky Summary) */}
            <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="font-semibold text-black mb-4">
                  Booking Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visitor Type:</span>
                    <span
                      className={`font-medium ${
                        isForeignNational() ? "text-blue-600" : "text-black"
                      }`}
                    >
                      {isForeignNational() ? "Foreign National" : "Domestic"}
                    </span>
                  </div>

                  {formData.ticketType === "group" ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ticket Type:</span>
                        <span className="font-medium text-black">
                          {formData.groupCategory === "tourist"
                            ? "Tourist Group"
                            : "Student Group"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group Size:</span>
                        <span className="font-medium text-black">
                          {formData.groupSize} people
                        </span>
                      </div>
                      {formData.groupCategory === "tourist" && formData.leaderName && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Team Leader:</span>
                          <span className="font-medium text-black">
                            {formData.leaderName}
                          </span>
                        </div>
                      )}
                      {formData.groupCategory === "student" && formData.instituteName && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Institute:</span>
                          <span className="font-medium text-black">
                            {formData.instituteName}
                          </span>
                        </div>
                      )}
                      {formData.groupCategory === "student" && (
                        <div className="text-xs text-gray-600 pt-1">
                          Present institute letter on arrival; students must be in
                          uniform.
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Adults:</span>
                        <span className="font-medium text-black">
                          {formData.adults}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Children:</span>
                        <span className="font-medium text-black">
                          {formData.children}
                        </span>
                      </div>
                      {isForeignNational() && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate Applied:</span>
                          <span className="font-medium text-blue-600">
                            Foreign National
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Price:</span>
                      <span className="font-bold text-green-600 text-lg">
                        FREE
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {showDialog && (
          <TicketBookingDialog
            onClose={() => setShowDialog(false)}
            ticketData={{ ticketNo, ...formData }}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default TicketBookingForm;
