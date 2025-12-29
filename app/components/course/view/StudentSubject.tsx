"use client";

import React from "react";

const subjects = [
    "Matematika",
    "IPA",
    "Bahasa Indonesia",
    "Bahasa Inggris",
];

export default function StudentSubject()
{
    return (
        <div className= "flex gap-4 w-full flex-wrap" >
        {
            subjects.map( ( subject ) => (
                <div
                    key= { subject }
                    className = "border border-gray-600 px-6 py-3 text-center text-base font-medium text-gray-900 bg-white rounded-sm"
                >
                { subject }
                </div>
            ))
        }
        </div>
    );
}
