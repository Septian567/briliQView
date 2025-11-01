"use client";

import React, { ReactNode } from "react";

interface CardProps
{
    children: ReactNode;        // Konten utama di dalam kartu
    onClick?: () => void;       // Klik utama kartu
    actionButton?: ReactNode;   // Tombol aksi di pojok kanan atas (opsional)
    className?: string;         // Tambahan class
}

/* ============================
   COMPONENT: Card (Reusable, Tinggi Default)
=============================== */
export default function Card( {
    children,
    onClick,
    actionButton,
    className = "",
}: CardProps )
{
    return (
        <div
            className={ `border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer relative flex flex-col justify-between min-h-[10rem] bg-white ${ className }` }
            onClick={ onClick }
        >
            { children }

            { actionButton && (
                <div className="absolute top-2 right-2">
                    { actionButton }
                </div>
            ) }
        </div>
    );
}
