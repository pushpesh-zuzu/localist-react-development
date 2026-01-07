import React from "react";

function QuickTurnaround({
    className = "",
    bgColor = "#00AFE3",
    strokeColor = "white",
    fillColor = "white",
    width = "76",
    height = "76",
    strokeWidth = "3"
}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 76 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="75.4286" height="75.4286" rx="37.7143" fill={bgColor} />
            <g clipPath="url(#clip-quick-turnaround)">
                <path d="M26.4454 50.608L21.7861 55.2673M54.401 50.608L59.0602 55.2673M33.4343 37.795L38.0936 42.4543L48.5769 31.971M27.2448 23.4518C30.7399 19.9567 35.4803 17.9932 40.4232 17.9932C45.366 17.9932 50.1064 19.9567 53.6016 23.4518C57.0967 26.947 59.0602 31.6874 59.0602 36.6302C59.0602 41.5731 57.0967 46.3135 53.6016 49.8086C50.1064 53.3037 45.366 55.2673 40.4232 55.2673C35.4803 55.2673 30.7399 53.3037 27.2448 49.8086" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.8845 29.8357H24.766" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
                <path d="M9.5 36.6318H21.3815" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
                <path d="M12.1555 44.4539H24.037" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            </g>
            <defs>
                <clipPath id="clip-quick-turnaround">
                    <rect width="47" height="47" fill="white" transform="translate(14.5547 14.2656)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default QuickTurnaround;