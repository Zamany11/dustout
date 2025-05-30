'use client';
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// This is the original BookingForm component that will be shown on desktop
const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceAddress: "",
    cityState: "",
    postCode: "",
    landmark: "",
    serviceTypes: [] as string[],
    serviceFrequency: "",
    bedrooms: "",
    bathrooms: "",
    preferredDate: "",
    preferredTime: "",
    urgent: "",
    specialNotes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        serviceTypes: checked
          ? [...prev.serviceTypes, value]
          : prev.serviceTypes.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Transform form data to match backend expectations
      const backendData = {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.serviceAddress,
        city_state: formData.cityState,
        postcode: formData.postCode,
        landmark: formData.landmark,
        service_type: formData.serviceTypes.join(", "),
        frequency: formData.serviceFrequency,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        preferred_date: formData.preferredDate,
        time_slot: formData.preferredTime,
        urgent: formData.urgent,
        notes: formData.specialNotes,
      };

      const response = await fetch(
        "https://app.dustout.co.uk/api/booking.php",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(backendData),
        }
      );

      if (response.ok) {
        await response.json();
        setSubmitMessage(
          "Booking submitted successfully! We will contact you soon."
        );
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          serviceAddress: "",
          cityState: "",
          postCode: "",
          landmark: "",
          serviceTypes: [],
          serviceFrequency: "",
          bedrooms: "",
          bathrooms: "",
          preferredDate: "",
          preferredTime: "",
          urgent: "",
          specialNotes: "",
        });
        setCurrentStep(1);
      } else {
        throw new Error("Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setSubmitMessage("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(2);
  const prevStep = () => setCurrentStep(1);

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <section
      id="booking"
      className="w-full py-20 relative overflow-hidden bg-sky-50 hidden md:block"
    >
      {/* Background bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/bubble.png"
          alt="Bubble"
          width={200}
          height={200}
          className="absolute top-20 left-10 opacity-20"
        />
        <Image
          src="/images/bubble.png"
          alt="Bubble"
          width={100}
          height={100}
          className="absolute top-40 right-20 opacity-15"
        />
        <Image
          src="/images/bubble.png"
          alt="Bubble"
          width={150}
          height={150}
          className="absolute bottom-20 left-1/4 opacity-25"
        />
        <Image
          src="/images/bubble.png"
          alt="Bubble"
          width={80}
          height={80}
          className="absolute bottom-40 right-1/3 opacity-20"
        />
      </div>

      {/* Dark blue background at the bottom */}
      <div
        className="absolute hidden md:block bottom-0 left-0 right-0 h-80 bg-[#1A2D47]"
        aria-hidden="true"
      ></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-blue-500 rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Section - Text and Image (hidden on mobile) */}
            <div className="hidden md:flex md:w-5/12 bg-blue-500 p-12 relative flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-white mb-8 text-center"
              >
                <h2 className="text-6xl font-bold font-majer mb-2">Get in</h2>
                <h2 className="text-7xl font-bold">TOUCH</h2>
                <div className="flex justify-center mt-6 space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      currentStep === 1 ? "bg-white" : "bg-blue-300"
                    }`}
                  ></div>
                  <div
                    className={`w-4 h-4 rounded-full ${
                      currentStep === 2 ? "bg-white" : "bg-blue-300"
                    }`}
                  ></div>
                </div>
              </motion.div>

              <div className="relative mt-auto flex transform -translate-y-[40%]">
                <div className="relative transform translate-y-[18%] translate-x-[5%]">
                  <Image
                    src="/images/leftImage.png"
                    alt="Cleaning Staff 1"
                    width={200}
                    height={300}
                    className="object-contain scale-150 scale-x-[-1.5]"
                  />
                </div>
                <div className="relative z-10 -ml-10 mt-6 transform -translate-x-[30%]">
                  <Image
                    src="/images/rightImage.png"
                    alt="Cleaning Staff 2"
                    width={220}
                    height={300}
                    className="object-contain scale-150"
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full md:w-7/12 bg-blue-500 p-6 md:p-10">
              <form onSubmit={handleSubmit} className="min-h-[600px]">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-white font-majer text-sm mb-1"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full p-3 rounded-md focus:outline-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-white font-majer text-sm mb-1"
                          >
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-white font-majer text-sm mb-1"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="serviceAddress"
                          className="block text-white font-majer text-sm mb-1"
                        >
                          Service Address *
                        </label>
                        <input
                          type="text"
                          id="serviceAddress"
                          name="serviceAddress"
                          value={formData.serviceAddress}
                          onChange={handleChange}
                          className="w-full p-3 rounded-md focus:outline-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="cityState"
                            className="block text-white font-majer text-sm mb-1"
                          >
                            City/State
                          </label>
                          <input
                            type="text"
                            id="cityState"
                            name="cityState"
                            value={formData.cityState}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="postCode"
                            className="block text-white font-majer text-sm mb-1"
                          >
                            Post Code
                          </label>
                          <input
                            type="text"
                            id="postCode"
                            name="postCode"
                            value={formData.postCode}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="landmark"
                          className="block text-white font-majer text-sm mb-1"
                        >
                          Landmark or Special Directions
                        </label>
                        <input
                          type="text"
                          id="landmark"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="w-full p-3 rounded-md focus:outline-none"
                        />
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="w-full bg-blue-800 hover:bg-blue-900 text-white font-majer text-xl font-normal py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
                        >
                          Next
                          <svg
                            className="w-5 h-5 ml-2"
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
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-white font-majer text-sm mb-2">
                          Type of Service *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Home Cleaning",
                            "Office Cleaning",
                            "Deep Cleaning",
                            "Post-Construction",
                            "Move-In/Move-Out",
                            "Carpet/Upholstery Cleaning",
                          ].map((service) => (
                            <label
                              key={service}
                              className="flex items-center text-white text-sm"
                            >
                              <input
                                type="checkbox"
                                name="serviceTypes"
                                value={service}
                                onChange={handleChange}
                                className="mr-2 accent-blue-300"
                              />
                              {service}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-majer text-sm mb-2">
                          Service Frequency *
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {["One-time", "Weekly", "Bi-weekly", "Monthly"].map(
                            (frequency) => (
                              <label
                                key={frequency}
                                className="flex items-center text-white text-sm"
                              >
                                <input
                                  type="radio"
                                  name="serviceFrequency"
                                  value={frequency}
                                  onChange={handleChange}
                                  className="mr-2 accent-blue-300"
                                  required
                                />
                                {frequency}
                              </label>
                            )
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="bedrooms"
                            className="block text-white font-majer text-sm mb-1"
                          >
                            No. of Bedrooms
                          </label>
                          <input
                            type="number"
                            id="bedrooms"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="bathrooms"
                            className="block text-white font-majer text-sm mb-1"
                          >
                            No. of Bathrooms
                          </label>
                          <input
                            type="number"
                            id="bathrooms"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="preferredDate"
                            className="block text-white font-majer text-sm mb-1"
                          >
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md focus:outline-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="preferredTime"
                            className="block text-white font-majer text-sm mb-1"
                          >
                            Preferred Time Slot
                          </label>
                          <select
                            id="preferredTime"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md focus:outline-none"
                          >
                            <option value="">Select time slot</option>
                            <option value="8:00 AM – 10:00 AM">
                              8:00 AM – 10:00 AM
                            </option>
                            <option value="10:00 AM – 12:00 PM">
                              10:00 AM – 12:00 PM
                            </option>
                            <option value="12:00 PM – 2:00 PM">
                              12:00 PM – 2:00 PM
                            </option>
                            <option value="2:00 PM – 4:00 PM">
                              2:00 PM – 4:00 PM
                            </option>
                            <option value="4:00 PM – 6:00 PM">
                              4:00 PM – 6:00 PM
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-majer text-sm mb-2">
                          Is this an urgent request?
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center text-white">
                            <input
                              type="radio"
                              name="urgent"
                              value="Yes"
                              onChange={handleChange}
                              className="mr-2 accent-blue-300"
                            />
                            Yes
                          </label>
                          <label className="flex items-center text-white">
                            <input
                              type="radio"
                              name="urgent"
                              value="No"
                              onChange={handleChange}
                              className="mr-2 accent-blue-300"
                            />
                            No
                          </label>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="specialNotes"
                          className="block text-white font-majer text-sm mb-1"
                        >
                          Anything we should know before arriving?
                        </label>
                        <textarea
                          id="specialNotes"
                          name="specialNotes"
                          value={formData.specialNotes}
                          onChange={handleChange}
                          rows={3}
                          className="w-full p-3 rounded-md focus:outline-none resize-none"
                        ></textarea>
                      </div>

                      {submitMessage && (
                        <div
                          className={`p-3 rounded-md text-center font-medium ${
                            submitMessage.includes("successfully")
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {submitMessage}
                        </div>
                      )}

                      <div className="pt-4 space-y-3">
                        <button
                          type="button"
                          onClick={prevStep}
                          disabled={isSubmitting}
                          className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-majer text-xl font-normal py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
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
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-blue-800 hover:bg-blue-900 disabled:bg-blue-600 disabled:cursor-not-allowed text-white font-majer text-xl font-normal py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            "Book Us"
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
