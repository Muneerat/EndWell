"use client";
import {
  Cancel,
  Hamburger,
  Help,
  Members,
  Overview,
  Setting,
  SMS,
  Uploaded,
} from "../../../../assets/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const sideItemsTop = [
  {
    label: "Overview",
    link: "/dashboard/overview",
    icon: <Overview />,
    id: "overview",
  },
  { label: "SMS", link: "/dashboard/sms", icon: <SMS />, id: "sms" },
  {
    label: "Uploaded ledgers",
    link: "/dashboard/uploaded",
    icon: <Uploaded />,
    id: "uploaded",
  },
  {
    label: "Members",
    link: "/dashboard/members",
    icon: <Members />,
    id: "members",
  },
];

const sideItemsBottom = [
  { label: "Settings", link: "#", icon: <Setting />, id: "settings" },
  { label: "Help", link: "#", icon: <Help />, id: "logout" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[2];

  // State to track the active icon and sidebar visibility
  const [activeItem, setActiveItem] = useState(currentPath);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemClick = (id) => {
    setActiveItem(id);
    // Close the sidebar on mobile after clicking an item
  }
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false); 
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden fixed top-2 left-0 z-50 p-2  rounded-md"
      >
        <div className="bg-[#D9D9D9] p-2 rounded-full flex sm:hidden ">
        <Hamburger />
      </div>
      </button>

      <div
        className={`sm:flex flex-col min-h-screen w-[220px] items-center justify-between border-r md:w-[220px] md:px-6 lg:w-[280px] p-6 z-50 bg-white fixed top-0 left-0 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="flex flex-col w-full">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-primary text-2xl font-extrabold">
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
