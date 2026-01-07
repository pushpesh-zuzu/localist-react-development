import React from "react";

function CompetitivePricing({
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
            <g clipPath="url(#clip-competitive-pricing)">
                <path d="M45.888 29.9324V24.0574L51.763 18.1824L53.7214 22.099L57.638 24.0574L51.763 29.9324H45.888ZM45.888 29.9324L38.0547 37.7656M57.6381 37.7657C57.6381 48.5813 48.8703 57.349 38.0548 57.349C27.2392 57.349 18.4714 48.5813 18.4714 37.7657C18.4714 26.9501 27.2392 18.1824 38.0548 18.1824M47.8464 37.7657C47.8464 43.1735 43.4626 47.5574 38.0548 47.5574C32.647 47.5574 28.2631 43.1735 28.2631 37.7657C28.2631 32.3579 32.647 27.974 38.0548 27.974" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="22.9442" cy="22.6566" r="8.39313" fill={bgColor} />
                <path d="M26.1032 26.339H20.7178C20.7178 26.339 22.4313 24.9884 22.4313 22.9119C22.4313 21.5276 21.4099 21.0326 21.3952 19.879C21.3962 17.5955 24.1451 17.7169 25.1006 18.6245M20.7178 22.9119H24.8792" stroke={strokeColor} strokeWidth="1.67437" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip-competitive-pricing">
                    <rect width="47" height="47" fill="white" transform="translate(14.5547 14.2656)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default CompetitivePricing;