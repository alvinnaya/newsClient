import React from "react";

function Logo() {
    return (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 600 600"
    >
      <path
        fill="url(#_Linear1)"
        d="M395.909 547.795h-79.594v319.746h371.893V595.825h61.754V276.079H395.909v271.716z"
        transform="translate(-213.281 -174.771) scale(.98886) matrix(.54495 0 0 .35846 167.872 193.749)"
      ></path>
      <circle
        cx="624.687"
        cy="367.974"
        r="31.182"
        transform="translate(-213.281 -174.771) scale(.98886) translate(42.01 268.371)"
      ></circle>
      <text
        x="188.232"
        y="685.025"
        fontFamily="'Arial-BoldMT', 'Arial', sans-serif"
        fontSize="527.203"
        fontWeight="700"
        transform="translate(-213.281 -174.771) scale(.98886) translate(293.524 179.591) scale(.71229)"
      >
        F
      </text>
      <defs>
        <linearGradient
          id="_Linear1"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="matrix(408.623 349.805 -120.735 325.954 374.874 322.309)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FF9F00"></stop>
          <stop offset="1" stopColor="#FF005D"></stop>
        </linearGradient>
      </defs>
    </svg>
    );
}

export default Logo;