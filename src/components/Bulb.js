import * as React from "react";
const SvgBulb = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="2 2 20 20"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 16.584V19a2 2 0 1 0 4 0v-2.416M12 3v1m6.364 1.636-.707.707M5.636 5.636l.707.707M4 12H3m18 0h-1m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
    />
  </svg>
);
export default SvgBulb;
