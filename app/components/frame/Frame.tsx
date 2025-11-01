"use client";

import React, { ReactNode } from "react";

interface FrameProps
{
    children: ReactNode;          // Konten utama di dalam frame
    title?: string;               // Judul halaman/menu
    actions?: ReactNode;          // Tombol tambahan di header
    floatingButton?: ReactNode;   // Tombol floating
}

export default function Frame( {
    children,
    title,
    actions,
    floatingButton,
}: FrameProps )
{
    return (
        <div className="relative w-full flex-1 bg-white flex flex-col overflow-hidden">
            {/* Header */ }
            { title && (
                <header className="flex justify-between items-center p-6 sm:p-10 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold">{ title }</h1>
                    { actions && <div>{ actions }</div> }
                </header>
            ) }

            {/* Konten utama */ }
            <main className="flex-1 flex flex-col justify-start overflow-auto p-6 sm:p-10">
                { children }
            </main>

            {/* Floating button */ }
            { floatingButton && <>{ floatingButton }</> }
        </div>
    );
}
