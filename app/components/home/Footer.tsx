"use client";

import React from "react";

export default function Footer()
{
    return (
        <footer className="w-full flex justify-between items-center p-6 sm:px-20 sm:py-8 border-t border-gray-200 bg-white relative min-h-[80px]">
            <div className="text-lg font-bold text-gray-900 self-center">BrilIQ</div>
            <div className="flex flex-col items-end justify-end h-full">
                <span className="text-sm text-gray-600">&copy; BrilIQ, 2025</span>
            </div>
        </footer>
    );
}
