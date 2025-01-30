"use client";
import {
  Cancel,
  EOYAssets,
  Hamburger,
  Help,
  MemberRequest,
  Members,
  Overview,
  Setting,
  SMS,
  SMSCounter,
  Staff,
  TransactionHistory,
  Uploaded,
} from "../../../../assets/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import WithdrawableDividend from "../withdrawableDividend/page";

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
  {
    label: "Staff & permissions",
    link: "/dashboard/staff",
    icon: <Staff />,
    id: "staff",
  },
  {
    label: "Transaction History",
    link: "/dashboard/transaction",
    icon: <TransactionHistory />,
    id: "transaction",
  },
  {
    label: "Eoyasset",
    link: "/dashboard/eoyasset",
    icon: <EOYAssets />,
    id: "eoyasset",
  },
  {
    label: "Member Request",
    link: "/dashboard/memberRequest",
    icon: <MemberRequest />,
    id: "memberRequest",
  },
  {
    label: "Sms Counter",
    link: "/dashboard/smsCounter",
    icon: <SMSCounter />,
    id: "smsCounter",
  },
  {
    label: "Withdrawable Dividend",
    link: "/dashboard/withdrawableDividend",
    icon: <TransactionHistory />,
    id: "withdrawableDividend",
  },
  {
    label: "Settings",
    link: "/dashboard/setting",
    icon: <Setting />,
    id: "settings",
  },
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
        className={`md:flex flex-col scroll-smooth w-[260px] items-center justify-between border-r md:w-[200px] md:px-6 lg:w-[280px] p-6 z-50 bg-white fixed top-0 left-0 transition-transform duration-300 ${
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

          <section className="flex flex-col gap-4 scroll-smooth scrollable-container  overflow-y-auto h-screen ">
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
                } mb-2 flex font-normal transition ease-in-out duration-150 gap-2 text-lg`}
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
