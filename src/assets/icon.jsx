// import React, { useState } from "react";

// export default function Overview() {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 18 18"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ fill: isHovered ? "#FF0000" : "#5B5B5B" }} // Change color on hover
//     >
//       <path d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z" />
//     </svg>
//   );
// }
import React from "react";

export  function Overview({ className }) {
  return (
    <svg
      className={`w-5 h-5 ${className}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SMS({ className }) {
  return (
    <svg
      className={`w-5 h-5 ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2003_39"
        styles="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2003_39)">
        <path
          d="M5 22.0005C4.45 22.0005 3.97917 21.8046 3.5875 21.413C3.19583 21.0213 3 20.5505 3 20.0005V15.4505L5.75 12.3255L7.175 13.7505L5.175 16.0005H18.825L16.875 13.8005L18.3 12.3755L21 15.4505V20.0005C21 20.5505 20.8042 21.0213 20.4125 21.413C20.0208 21.8046 19.55 22.0005 19 22.0005H5ZM5 20.0005H19V18.0005H5V20.0005ZM10.625 14.3755L7.1 10.8505C6.71667 10.4671 6.52917 9.99629 6.5375 9.43796C6.54583 8.87962 6.74167 8.40879 7.125 8.02546L12.025 3.12546C12.4083 2.74212 12.8833 2.54212 13.45 2.52546C14.0167 2.50879 14.4917 2.69212 14.875 3.07546L18.4 6.60046C18.7833 6.98379 18.9833 7.45046 19 8.00046C19.0167 8.55046 18.8333 9.01712 18.45 9.40046L13.45 14.4005C13.0667 14.7838 12.5958 14.9713 12.0375 14.963C11.4792 14.9546 11.0083 14.7588 10.625 14.3755ZM17 8.02546L13.475 4.50046L8.525 9.45046L12.05 12.9755L17 8.02546Z"
          fill="#282828"
        />
      </g>
    </svg>
  );
}
export function Uploaded({ className }) {
  return (
 
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`}>
    <mask id="mask0_2022_390" styles="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_2022_390)">
    <path d="M6.5 20C4.98333 20 3.6875 19.475 2.6125 18.425C1.5375 17.375 1 16.0917 1 14.575C1 13.275 1.39167 12.1167 2.175 11.1C2.95833 10.0833 3.98333 9.43333 5.25 9.15C5.66667 7.61667 6.5 6.375 7.75 5.425C9 4.475 10.4167 4 12 4C13.95 4 15.6042 4.67917 16.9625 6.0375C18.3208 7.39583 19 9.05 19 11C20.15 11.1333 21.1042 11.6292 21.8625 12.4875C22.6208 13.3458 23 14.35 23 15.5C23 16.75 22.5625 17.8125 21.6875 18.6875C20.8125 19.5625 19.75 20 18.5 20H13C12.45 20 11.9792 19.8042 11.5875 19.4125C11.1958 19.0208 11 18.55 11 18V12.85L9.4 14.4L8 13L12 9L16 13L14.6 14.4L13 12.85V18H18.5C19.2 18 19.7917 17.7583 20.275 17.275C20.7583 16.7917 21 16.2 21 15.5C21 14.8 20.7583 14.2083 20.275 13.725C19.7917 13.2417 19.2 13 18.5 13H17V11C17 9.61667 16.5125 8.4375 15.5375 7.4625C14.5625 6.4875 13.3833 6 12 6C10.6167 6 9.4375 6.4875 8.4625 7.4625C7.4875 8.4375 7 9.61667 7 11H6.5C5.53333 11 4.70833 11.3417 4.025 12.025C3.34167 12.7083 3 13.5333 3 14.5C3 15.4667 3.34167 16.2917 4.025 16.975C4.70833 17.6583 5.53333 18 6.5 18H9V20H6.5Z" fill="#1C1B1F"/>
    </g>
    </svg>
    
  );
}

export function Staff({ className }) {
  return (
    <svg  className={`w-5 h-5 ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2003_80" styles="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_2003_80)">
    <path d="M8 15H16V14.45C16 13.7 15.6333 13.1042 14.9 12.6625C14.1667 12.2208 13.2 12 12 12C10.8 12 9.83333 12.2208 9.1 12.6625C8.36667 13.1042 8 13.7 8 14.45V15ZM12 11C12.55 11 13.0208 10.8042 13.4125 10.4125C13.8042 10.0208 14 9.55 14 9C14 8.45 13.8042 7.97917 13.4125 7.5875C13.0208 7.19583 12.55 7 12 7C11.45 7 10.9792 7.19583 10.5875 7.5875C10.1958 7.97917 10 8.45 10 9C10 9.55 10.1958 10.0208 10.5875 10.4125C10.9792 10.8042 11.45 11 12 11ZM8 21V19H4C3.45 19 2.97917 18.8042 2.5875 18.4125C2.19583 18.0208 2 17.55 2 17V5C2 4.45 2.19583 3.97917 2.5875 3.5875C2.97917 3.19583 3.45 3 4 3H20C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V17C22 17.55 21.8042 18.0208 21.4125 18.4125C21.0208 18.8042 20.55 19 20 19H16V21H8ZM4 17H20V5H4V17Z" fill="#1C1B1F"/>
    </g>
    </svg>
    
  );
}

export function Setting({ className }) {
  return (
   
    <svg  className={`w-5 h-5 ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2003_85" styles="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_2003_85)">
    <path d="M11 17H13L13.3 15.5C13.5 15.4167 13.6875 15.3292 13.8625 15.2375C14.0375 15.1458 14.2167 15.0333 14.4 14.9L15.85 15.35L16.85 13.65L15.7 12.65C15.7333 12.4167 15.75 12.2 15.75 12C15.75 11.8 15.7333 11.5833 15.7 11.35L16.85 10.35L15.85 8.65L14.4 9.1C14.2167 8.96667 14.0375 8.85417 13.8625 8.7625C13.6875 8.67083 13.5 8.58333 13.3 8.5L13 7H11L10.7 8.5C10.5 8.58333 10.3125 8.67083 10.1375 8.7625C9.9625 8.85417 9.78333 8.96667 9.6 9.1L8.15 8.65L7.15 10.35L8.3 11.35C8.26667 11.5833 8.25 11.8 8.25 12C8.25 12.2 8.26667 12.4167 8.3 12.65L7.15 13.65L8.15 15.35L9.6 14.9C9.78333 15.0333 9.9625 15.1458 10.1375 15.2375C10.3125 15.3292 10.5 15.4167 10.7 15.5L11 17ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19Z" fill="#5B5B5B"/>
    </g>
    </svg>
    
  );
}

export function Help({ className }) {
  return (
    <svg className={`w-5 h-5 ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2003_90" styles="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_2003_90)">
    <path d="M11.95 18C12.3 18 12.5958 17.8792 12.8375 17.6375C13.0792 17.3958 13.2 17.1 13.2 16.75C13.2 16.4 13.0792 16.1042 12.8375 15.8625C12.5958 15.6208 12.3 15.5 11.95 15.5C11.6 15.5 11.3042 15.6208 11.0625 15.8625C10.8208 16.1042 10.7 16.4 10.7 16.75C10.7 17.1 10.8208 17.3958 11.0625 17.6375C11.3042 17.8792 11.6 18 11.95 18ZM11.05 14.15H12.9C12.9 13.6 12.9625 13.1667 13.0875 12.85C13.2125 12.5333 13.5667 12.1 14.15 11.55C14.5833 11.1167 14.925 10.7042 15.175 10.3125C15.425 9.92083 15.55 9.45 15.55 8.9C15.55 7.96667 15.2083 7.25 14.525 6.75C13.8417 6.25 13.0333 6 12.1 6C11.15 6 10.3792 6.25 9.7875 6.75C9.19583 7.25 8.78333 7.85 8.55 8.55L10.2 9.2C10.2833 8.9 10.4708 8.575 10.7625 8.225C11.0542 7.875 11.5 7.7 12.1 7.7C12.6333 7.7 13.0333 7.84583 13.3 8.1375C13.5667 8.42917 13.7 8.75 13.7 9.1C13.7 9.43333 13.6 9.74583 13.4 10.0375C13.2 10.3292 12.95 10.6 12.65 10.85C11.9167 11.5 11.4667 11.9917 11.3 12.325C11.1333 12.6583 11.05 13.2667 11.05 14.15ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#5B5B5B"/>
    </g>
    </svg>
    
  );
}

export function Upload1({ className }) {
  return (
    <svg className={`w-16 h-16 ${className}`} width="51" height="38" viewBox="0 0 51 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 38C9.23409 38 6.23011 36.7531 3.73807 34.2594C1.24602 31.7656 0 28.7177 0 25.1156C0 22.0281 0.907955 19.2771 2.72386 16.8625C4.53977 14.4479 6.91591 12.9042 9.85227 12.2312C10.8182 8.58958 12.75 5.64062 15.6477 3.38438C18.5455 1.12813 21.8295 0 25.5 0C30.0205 0 33.8551 1.61302 37.004 4.83906C40.1528 8.0651 41.7273 11.9937 41.7273 16.625C44.3932 16.9417 46.6051 18.1193 48.3631 20.1578C50.121 22.1964 51 24.5812 51 27.3125C51 30.2812 49.9858 32.8047 47.9574 34.8828C45.929 36.9609 43.4659 38 40.5682 38H27.8182C26.5432 38 25.4517 37.5349 24.5438 36.6047C23.6358 35.6745 23.1818 34.5563 23.1818 33.25V21.0188L19.4727 24.7L16.2273 21.375L25.5 11.875L34.7727 21.375L31.5273 24.7L27.8182 21.0188V33.25H40.5682C42.1909 33.25 43.5625 32.676 44.683 31.5281C45.8034 30.3802 46.3636 28.975 46.3636 27.3125C46.3636 25.65 45.8034 24.2448 44.683 23.0969C43.5625 21.949 42.1909 21.375 40.5682 21.375H37.0909V16.625C37.0909 13.3396 35.9608 10.5391 33.7006 8.22344C31.4403 5.90781 28.7068 4.75 25.5 4.75C22.2932 4.75 19.5597 5.90781 17.2994 8.22344C15.0392 10.5391 13.9091 13.3396 13.9091 16.625H12.75C10.5091 16.625 8.59659 17.4365 7.0125 19.0594C5.42841 20.6823 4.63636 22.6417 4.63636 24.9375C4.63636 27.2333 5.42841 29.1927 7.0125 30.8156C8.59659 32.4385 10.5091 33.25 12.75 33.25H18.5455V38H12.75Z" fill="#5B5B5B"/>
</svg>

    
  );
}
export function Back({ className }) {
  return (
    <svg className={`w-6 h-6 ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2017_200" styles="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
    <rect width="24" height="24" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_2017_200)">
    <path d="M19 19V15C19 14.1667 18.7083 13.4583 18.125 12.875C17.5417 12.2917 16.8333 12 16 12H6.825L10.425 15.6L9 17L3 11L9 5L10.425 6.4L6.825 10H16C17.3833 10 18.5625 10.4875 19.5375 11.4625C20.5125 12.4375 21 13.6167 21 15V19H19Z" fill="#1C1B1F"/>
    </g>
    </svg>
    
    
  );
}

export function Upload2({ className }) {
  return (
    <svg className={`w-6 h-6 ${className}`} width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 16.5C3.98333 16.5 2.6875 15.975 1.6125 14.925C0.5375 13.875 0 12.5917 0 11.075C0 9.775 0.391667 8.61667 1.175 7.6C1.95833 6.58333 2.98333 5.93333 4.25 5.65C4.66667 4.11667 5.5 2.875 6.75 1.925C8 0.975 9.41667 0.5 11 0.5C12.95 0.5 14.6042 1.17917 15.9625 2.5375C17.3208 3.89583 18 5.55 18 7.5C19.15 7.63333 20.1042 8.12917 20.8625 8.9875C21.6208 9.84583 22 10.85 22 12C22 13.25 21.5625 14.3125 20.6875 15.1875C19.8125 16.0625 18.75 16.5 17.5 16.5H12C11.45 16.5 10.9792 16.3042 10.5875 15.9125C10.1958 15.5208 10 15.05 10 14.5V9.35L8.4 10.9L7 9.5L11 5.5L15 9.5L13.6 10.9L12 9.35V14.5H17.5C18.2 14.5 18.7917 14.2583 19.275 13.775C19.7583 13.2917 20 12.7 20 12C20 11.3 19.7583 10.7083 19.275 10.225C18.7917 9.74167 18.2 9.5 17.5 9.5H16V7.5C16 6.11667 15.5125 4.9375 14.5375 3.9625C13.5625 2.9875 12.3833 2.5 11 2.5C9.61667 2.5 8.4375 2.9875 7.4625 3.9625C6.4875 4.9375 6 6.11667 6 7.5H5.5C4.53333 7.5 3.70833 7.84167 3.025 8.525C2.34167 9.20833 2 10.0333 2 11C2 11.9667 2.34167 12.7917 3.025 13.475C3.70833 14.1583 4.53333 14.5 5.5 14.5H8V16.5H5.5Z" fill="#000680"/>
</svg>

    
  );
}

export function Sms({ className }) {
  return (
<svg className={`w-6 h-6 ${className}`}  width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 9.5L2 4.5V14.5H11V16.5H2C1.45 16.5 0.979167 16.3042 0.5875 15.9125C0.195833 15.5208 0 15.05 0 14.5V2.5C0 1.95 0.195833 1.47917 0.5875 1.0875C0.979167 0.695833 1.45 0.5 2 0.5H18C18.55 0.5 19.0208 0.695833 19.4125 1.0875C19.8042 1.47917 20 1.95 20 2.5V9.5H18V4.5L10 9.5ZM10 7.5L18 2.5H2L10 7.5ZM17 19.5L15.6 18.1L17.175 16.5H13V14.5H17.175L15.575 12.9L17 11.5L21 15.5L17 19.5ZM2 4.5V15.5V9.5V9.575V2.5V4.5Z" fill="#000680"/>
</svg>
    
  );
}

export function UpArrow({ className }) {
  return (
<svg className={`w-6 h-6 ${className}`} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_2038_1217" styles="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
<rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_2038_1217)">
<path d="M11 20.5V8.325L5.4 13.925L4 12.5L12 4.5L20 12.5L18.6 13.925L13 8.325V20.5H11Z" fill="#000680"/>
</g>
</svg>

  );
}
export function Members({ className }) {
  return (
<svg className={`w-5 h-5 ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_2251_832)">
<path d="M11.9332 11.5331C13.7332 11.5331 15.1332 10.0664 15.1332 8.26641C15.1332 6.46641 13.6665 5.06641 11.8665 5.06641C10.0665 5.06641 8.6665 6.53307 8.6665 8.26641C8.6665 10.0664 10.1332 11.5331 11.9332 11.5331ZM11.8665 6.39974C11.9332 6.39974 11.9332 6.39974 11.8665 6.39974C12.9332 6.39974 13.7998 7.26641 13.7998 8.33307C13.7998 9.39974 12.9332 10.1997 11.8665 10.1997C10.7998 10.1997 9.99984 9.33307 9.99984 8.33307C9.99984 7.26641 10.8665 6.39974 11.8665 6.39974Z" fill="black"/>
<path d="M21.8 11.1336C20.5333 10.0003 18.8667 9.40026 17.1333 9.46693H16.6C16.4667 10.0003 16.2667 10.4669 16 10.8669C16.4 10.8003 16.7333 10.8003 17.1333 10.8003C18.4 10.7336 19.6667 11.1336 20.6667 11.8669V16.6669H22V11.3336L21.8 11.1336Z" fill="black"/>
<path d="M15.5998 5.19954C15.9332 4.39954 16.8665 3.99954 17.7332 4.33288C18.5332 4.66621 18.9332 5.59954 18.5998 6.46621C18.3332 7.06621 17.7332 7.46621 17.1332 7.46621C16.9998 7.46621 16.7998 7.46621 16.6665 7.39954C16.7332 7.73288 16.7332 8.06621 16.7332 8.33288V8.73288C16.8665 8.73288 16.9998 8.79954 17.1332 8.79954C18.7998 8.79954 20.1332 7.46621 20.1332 5.86621C20.1332 4.19954 18.7998 2.86621 17.1998 2.86621C16.1332 2.86621 15.1998 3.39954 14.6665 4.33288C14.9998 4.53288 15.3332 4.79954 15.5998 5.19954Z" fill="black"/>
<path d="M8 10.9333C7.73333 10.5333 7.53333 10.0667 7.4 9.53335H6.86667C5.13333 9.46668 3.46667 10.0667 2.2 11.1333L2 11.3333V16.6667H3.33333V11.8667C4.4 11.1333 5.6 10.7333 6.86667 10.8C7.26667 10.8 7.66667 10.8667 8 10.9333Z" fill="black"/>
<path d="M6.86668 8.73311C7.00001 8.73311 7.13334 8.73311 7.26668 8.66645V8.26645C7.26668 7.93311 7.26668 7.59978 7.33334 7.33311C7.20001 7.39978 7.00001 7.39978 6.86668 7.39978C6.00001 7.39978 5.26668 6.66645 5.26668 5.79978C5.26668 4.93311 6.00001 4.19978 6.86668 4.19978C7.53334 4.19978 8.13334 4.59978 8.40001 5.19978C8.66668 4.86645 9.06668 4.53311 9.40001 4.26645C8.53334 2.86645 6.73334 2.39978 5.33334 3.26645C3.93334 4.13311 3.46668 5.93311 4.33334 7.33311C4.86668 8.19978 5.80001 8.73311 6.86668 8.73311Z" fill="black"/>
<path d="M17.3998 15.1333L17.2665 14.9333C15.9332 13.4667 14.0665 12.6 12.0665 12.6667C10.0665 12.6 8.13317 13.4667 6.79984 14.9333L6.6665 15.1333V20.2C6.6665 20.8 7.13317 21.3333 7.79984 21.3333H16.3332C16.9332 21.3333 17.4665 20.8 17.4665 20.2V15.1333H17.3998ZM16.0665 20H7.99984V15.6C9.0665 14.5333 10.5332 14 12.0665 14C13.5332 13.9333 14.9998 14.5333 16.0665 15.6V20Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_2251_832">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>


  );
}
export function Smile({ className }) {
  return (
<svg className={`w-5 h-5 ${className}`} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_2251_807)">
<path d="M12 17C11.223 16.9988 10.4596 16.7965 9.78408 16.4127C9.10852 16.0289 8.54384 15.4768 8.145 14.81L6.8625 15.56C7.39645 16.4451 8.15 17.1772 9.0501 17.6854C9.95021 18.1936 10.9663 18.4606 12 18.4606C13.0337 18.4606 14.0498 18.1936 14.9499 17.6854C15.85 17.1772 16.6036 16.4451 17.1375 15.56L15.855 14.81C15.4562 15.4768 14.8915 16.0289 14.2159 16.4127C13.5404 16.7965 12.777 16.9988 12 17ZM22.5 3.5H19.5V0.5H18V3.5H15V5H18V8H19.5V5H22.5V3.5ZM8.625 8.75C8.25416 8.75 7.89165 8.85997 7.58331 9.06599C7.27496 9.27202 7.03464 9.56486 6.89273 9.90747C6.75081 10.2501 6.71368 10.6271 6.78603 10.9908C6.85838 11.3545 7.03695 11.6886 7.29918 11.9508C7.5614 12.213 7.89549 12.3916 8.25921 12.464C8.62292 12.5363 8.99992 12.4992 9.34253 12.3573C9.68514 12.2154 9.97798 11.975 10.184 11.6667C10.39 11.3584 10.5 10.9958 10.5 10.625C10.502 10.3782 10.4549 10.1335 10.3613 9.90511C10.2678 9.67672 10.1298 9.46923 9.95528 9.29472C9.78077 9.12021 9.57328 8.98217 9.34489 8.88865C9.1165 8.79513 8.87179 8.748 8.625 8.75ZM15.375 8.75C15.0042 8.75 14.6416 8.85997 14.3333 9.06599C14.025 9.27202 13.7846 9.56486 13.6427 9.90747C13.5008 10.2501 13.4637 10.6271 13.536 10.9908C13.6084 11.3545 13.787 11.6886 14.0492 11.9508C14.3114 12.213 14.6455 12.3916 15.0092 12.464C15.3729 12.5363 15.7499 12.4992 16.0925 12.3573C16.4351 12.2154 16.728 11.975 16.934 11.6667C17.14 11.3584 17.25 10.9958 17.25 10.625C17.252 10.3782 17.2049 10.1335 17.1113 9.90511C17.0178 9.67672 16.8798 9.46923 16.7053 9.29472C16.5308 9.12021 16.3233 8.98217 16.0949 8.88865C15.8665 8.79513 15.6218 8.748 15.375 8.75Z" fill="#000680"/>
<path d="M20.7077 10.25C20.8974 10.9851 20.9956 11.7408 21.0002 12.5C21.0002 14.28 20.4723 16.0201 19.4834 17.5001C18.4945 18.9802 17.0889 20.1337 15.4443 20.8149C13.7998 21.4961 11.9902 21.6743 10.2444 21.3271C8.49854 20.9798 6.89489 20.1226 5.63622 18.864C4.37754 17.6053 3.52038 16.0016 3.17311 14.2558C2.82584 12.51 3.00407 10.7004 3.68526 9.05585C4.36645 7.41131 5.52 6.00571 7.00005 5.01677C8.48009 4.02784 10.2201 3.5 12.0002 3.5V2C9.82666 1.99926 7.70648 2.67304 5.93214 3.92839C4.1578 5.18374 2.81676 6.95878 2.09404 9.00863C1.37132 11.0585 1.30254 13.2821 1.89719 15.3727C2.49183 17.4633 3.7206 19.3178 5.41396 20.6804C7.10732 22.043 9.1818 22.8466 11.3512 22.9801C13.5206 23.1137 15.678 22.5708 17.5258 21.4263C19.3735 20.2817 20.8205 18.5919 21.6672 16.5901C22.5139 14.5883 22.7184 12.373 22.2527 10.25H20.7077Z" fill="#000680"/>
</g>
<defs>
<clipPath id="clip0_2251_807">
<rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>


  );
}