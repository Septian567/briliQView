"use client";

import React from "react";

interface PreviewTryoutHeaderProps
{
    title: string;
    onCancel: () => void;
}

export default function PreviewTryoutHeader( { title, onCancel }: PreviewTryoutHeaderProps )
{
    return (
        <header className="flex justify-between items-center px-6 sm:px-10 py-4 border-b bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-900 truncate">{ title }</h1>
            <button
                onClick={ onCancel }
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
                Kembali
            </button>
        </header>
    );
}
