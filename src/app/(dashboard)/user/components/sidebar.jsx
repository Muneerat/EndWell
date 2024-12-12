"use client";
import {
  Cancel,
  Hamburger,
  Help,
  MemberRequest,
  Overview,
  Setting,
  SMS,
  SMSCounter,
  Staff,
  Uploaded,
} from "../../../../assets/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const sideItemsTop = [
  {
    label: "Overview",
    link: "/user/overview",
    icon: <Overview />,
    id: "overview",
  },
  { label: "Profile", link: "/user/profile", icon: <Setting />, id: "profile" },

  {
    label: "Member Request",
    link: "/user/memberRequest",
    icon: <MemberRequest />,
    id: "memberRequest",
  },
  {
    label: "Sms Counter",
    link: "/user/smsCounter",
    icon: <SMSCounter />,
    id: "smsCounter",
  },
];

const sideItemsBottom = [
  { label: "Settings", link: "#", icon: <Setting />, id: "settings" },
  { label: "Help", link: "#", icon: <Help />, id: "logout" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[2];

  // State to track the active icon
  const [activeItem, setActiveItem] = useState(currentPath);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemClick = (id) => {
    setActiveItem(id);
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-2 left-0 z-50 p-2  rounded-md"
      >
        <div className="bg-[#D9D9D9] p-1 rounded-full flex md:hidden ">
          <Hamburger />
        </div>
      </button>
 
      <div
        className={`md:flex flex-col min-h-screen w-[260px] items-center justify-between border-r md:w-[200px] md:px-6 lg:w-[280px] p-6 z-50 bg-white fixed top-0 left-0 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
           <div className="flex flex-col w-full">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-primary md:text-3xl text-2xl font-extrabold">
              END<span className="text-secondary">WELL</span>
            </h1>
            <button onClick={toggleSidebar} className="sm:hidden">
              <Cancel />
            </button>
          </header>
          <section className="flex flex-col gap-4">
            {sideItemsTop.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                role="sidebar-link"
                onClick={() => handleItemClick(item.id)}
                className={`${
                  currentPath === item.id
                    ? "text-primary font-medium hover:text-primary"
                    : "text-gray-600 hover:text-primary"
                } mb-2 flex text-base font-normal gap-2`}
              >
                <span
                  className={`flex items-center transition-colors duration-200 ${
                    activeItem === item.id ? "text-primary" : "text-gray-600"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </section>
        </div>

        <div className="flex flex-col w-full mb-4">
          <section className="flex flex-col gap-4">
            {sideItemsBottom.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                role="sidebar-link"
                onClick={() => handleItemClick(item.id)}
                className={`${
                  currentPath === item.id
                    ? "text-primary font-medium hover:text-primary"
                    : "text-gray-600 hover:text-primary"
                } mb-2 flex text-base font-normal gap-2`}
              >
                <span
                  className={`flex items-center transition-colors duration-200 ${
                    activeItem === item.id ? "text-primary" : "text-gray-600"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
