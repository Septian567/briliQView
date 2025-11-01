"use client";

import { useParams, useRouter } from "next/navigation";

export default function CourseDetail()
{
    const { id } = useParams();
    const router = useRouter();

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <button
                onClick={ () => router.back() }
                className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm">
                ← Kembali
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Detail Course #{ id }
            </h1>

            <div className="bg-white shadow-md rounded-xl p-6">
                <p className="text-gray-700 mb-2">
                    Ini adalah halaman detil untuk course dengan ID: <b>{ id }</b>
                </p>
                <p className="text-gray-600">
                    kamu bisa menambahkan informasi lengkap tentang course ini disini seperti materi, instruktur, atau jadwal.

                </p>
            </div>


        </div>
    )
}