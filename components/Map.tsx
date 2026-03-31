import React from 'react';

export const Map: React.FC = () => {
    return (
        <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            aria-label="Map showing SkyVision HQ location"
        >
            {/* Background */}
            <rect width="400" height="300" fill="transparent" />

            {/* Map features - stylized roads with a subtle grid-like pattern */}
            <g stroke="#a0a0a0" strokeWidth="1" strokeOpacity="0.1" fill="none">
                {/* Horizontal lines */}
                <path d="M 0 50 H 400" />
                <path d="M 0 100 H 400" />
                <path d="M 0 150 H 400" />
                <path d="M 0 200 H 400" />
                <path d="M 0 250 H 400" />
                {/* Vertical lines */}
                <path d="M 50 0 V 300" />
                <path d="M 100 0 V 300" />
                <path d="M 150 0 V 300" />
                <path d="M 200 0 V 300" />
                <path d="M 250 0 V 300" />
                <path d="M 300 0 V 300" />
                <path d="M 350 0 V 300" />
            </g>
            
            {/* Main Roads */}
             <g stroke="#a0a0a0" strokeWidth="2" strokeOpacity="0.3" fill="none">
                <path d="M 0 150 Q 100 120, 200 150 T 400 150" />
                <path d="M 300 0 V 300" />
            </g>
            
            {/* Marker for HQ */}
            <g transform="translate(200, 150)">
                <circle cx="0" cy="0" r="10" fill="#00BFFF" fillOpacity="0.3">
                    <animate
                        attributeName="r"
                        values="10;25;10"
                        dur="2.5s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="fill-opacity"
                        values="0.4;0;0.4"
                        dur="2.5s"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle cx="0" cy="0" r="7" fill="#00BFFF" stroke="#f5f5f5" strokeWidth="1.5" />
            </g>
        </svg>
    );
};
