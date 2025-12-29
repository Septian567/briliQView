"use client";

import React from "react";

interface CourseViewProps
{
    id: string | string[] | undefined;
}

export default function CourseView( { id }: CourseViewProps )
{
    return (
        <div className="bg-white shadow-sm rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Halaman View
            </h2>
            <p className="text-gray-700 mb-2">
                Ini adalah <b>halaman View</b> untuk course dengan ID: <b>{ id }</b>.
            </p>
            <p className="text-gray-600">
                Tampilkan detail course di sini, seperti deskripsi, instruktur, atau
                jadwal.
            </p>
        </div>
    );
}
