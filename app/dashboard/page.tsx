"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { services } from "@/components/data/ServicesData";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EditprofileIcon from "@/components/icons/EditProfileicon";
import BookUsIcon from "@/components/icons/BookUsIcon";
import SubscriptionIcon from "@/components/icons/SubscriptionIcon";
import LocationIcon from "@/components/icons/Locationicon";
import DateIcon from "@/components/icons/DateIcon";
import TimeRange from "@/components/icons/TimeRange";
import Image from "next/image";


const Dashboard = () => {
  const router = useRouter();

  const orderHistory = [
    {
      id: 1,
      service: "Landscaping",
      location: "Heathrow",
      date: "27.06.2025",
      time: "12:00-3:00pm",
      price: "$400",
    },
    {
      id: 2,
      service: "Landscaping",
      location: "Heathrow",
      date: "27.06.2025",
      time: "12:00-3:00pm",
      price: "$400",
    },
    {
      id: 3,
      service: "Landscaping",
      location: "Heathrow",
      date: "27.06.2025",
      time: "12:00-3:00pm",
      price: "$400",
    },
    {
      id: 4,
      service: "Landscaping",
      location: "Heathrow",
      date: "27.06.2025",
      time: "12:00-3:00pm",
      price: "$400",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 relative overflow-hidden">
      <Navbar />

      {/* Cloud Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cloudbg.jpg"
          alt="Cloud background"
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* bubble */}
      <Image
        src="/images/bubble.png"
        alt="Bubble"
        width={400}
        height={400}
        className="absolute -right-20 top-[20%] transform rotate-12 opacity-30"
      />

      {/* Main Content */}
      <main className="relative z-10 px-4 pt-32 md:pt-48 md:px-8 lg:pt-32 lg:px-24 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="relative mb-6">
          {/* Background Green Card */}
          <div className="absolute inset-0 bg-green-500 rounded-2xl transform -rotate-6 md:-rotate-2 translate-x-2 translate-y-2"></div>

          {/* Main Blue Card */}
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-4 translate-x-4"></div>
            <div className="absolute top-8 right-8 w-16 h-16 bg-white/3 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>

            <div className="relative z-10">
              {/* Location */}
              <div className="flex items-center mb-3">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">London</span>
              </div>

              {/* Welcome Text */}
              <h1 className="text-3xl font-normal mb-8 font-majer">
                Welcome, <span className="text-5xl">John!</span>
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push('/settings')}
                  className="bg-white/90 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center shadow-sm hover:bg-white transition-colors"
                >
                  <EditprofileIcon />
                  Edit Profile
                </button>

                <button 
                  onClick={() => {
                    const isMobile = window.innerWidth <= 768;

                    if (isMobile) {
                      router.push('/#MobileBookingForm');
                    } else {
                      router.push('/#booking');
                    }
                  }}
                  className="bg-white/90 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center shadow-sm hover:bg-white transition-colors"
                >
                  <BookUsIcon />
                  Book Us
                </button>

                <button className="bg-white/90 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center shadow-sm hover:bg-white transition-colors">
                  <SubscriptionIcon />
                  Subscription
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8 px-4">
          <div className="pt-10 md:pt-20">
            <h2 className="text-lg font-semibold text-[#12B368] font-majer text-center mb-4 md:text-xl">
              What services do you need today?
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-blue-500 border-2 border-dashed border-white rounded-2xl p-6 text-white text-center hover:bg-blue-600 transition-colors cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 flex items-center justify-center md:w-16 md:h-16">
                      <IconComponent />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium leading-tight md:text-base">
                    {service.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        <div className="">
          {/* Order History */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#538FDF] md:text-xl">
                Order History
              </h2>
              <button className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
                See All
              </button>
            </div>
            <div className="space-y-3">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-10 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <h3 className="font-medium font-majer text-[#538FDF]">
                          {order.service}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center">
                            <LocationIcon />
                            <span className="text-[#538FDF] font-majer">
                              {order.location}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <DateIcon />
                            <span className="text-[#538FDF] font-majer">
                              {order.date}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <TimeRange />
                            <span className="text-[#538FDF] font-majer">
                              {order.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold font-majer text-[#538FDF]">
                        {order.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
