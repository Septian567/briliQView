"use client";

import React from "react";

const levels = [
    "kelas 7",
    "kelas 8",
    "kelas 9",
    "kelas 10",
    "kelas 11",
    "kelas 12",
];

interface StudentLevelProps
{
    onSelect: ( level: string ) => void;
}

export default function StudentLevel({onSelect}: StudentLevelProps)
{
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full max-w-md">
            { levels.map( ( level ) => (
                <button
                    key={ level }
                    onClick={() => onSelect(level)}
                    className="border border-gray-600 rounded-sm px-6 py-4 tex-center text-lg font-medium text-gray-900 bg-white">
                    { level }
                </button>
            ) ) }
        </div>
    );
}