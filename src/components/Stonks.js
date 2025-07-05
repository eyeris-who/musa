import * as React from "react";
const SvgStonks = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m4 16.937 6-7.5 5 4 5.5-6.5"
    />
    <circle cx={10} cy={8.937} r={2} fill="#000" />
    <path fill="#000" d="M16.813 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
    <circle cx={4} cy={16.937} r={2} fill="#000" />
    <path fill="#000" d="M22.5 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
  </svg>
);
export default SvgStonks;
