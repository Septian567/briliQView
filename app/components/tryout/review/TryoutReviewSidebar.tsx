"use client";

import React from "react";
import { ArrowLeft, Folder, FolderMinus } from "lucide-react";
import { Tryout } from "../../../hooks/tryout/useTryouts";

interface TryoutReviewSidebarProps
{
    tryout: Tryout;
    total: number;
    score: number;
    formattedDate: string;
    showResult: boolean;
    setShowResult: ( v: boolean ) => void;
    onExit: () => void;
}

export default function TryoutReviewSidebar( {
    tryout,
    total,
    score,
    formattedDate,
    showResult,
    setShowResult,
    onExit,
}: TryoutReviewSidebarProps )
{
    const passed = score / total >= 0.75;

    return (
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 p-6 flex flex-col relative">
            {/* Header dan tombol mobile */ }
            <div className="flex items-center mb-4 gap-2">
                {/* Tombol Kembali mobile */ }
                <button
                    onClick={ onExit }
                    title="Kembali"
                    className="p-1 text-black hover:text-gray-700 md:hidden"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold flex-1">Hasil Tryout</h2>
                <div className="flex gap-2 md:hidden">
                    <button
                        onClick={ () => setShowResult( !showResult ) }
                        title={ showResult ? "Sembunyikan Hasil" : "Tampilkan Hasil" }
                        className="p-1 text-black hover:text-gray-700"
                    >
                        { showResult ? (
                            <FolderMinus className="w-5 h-5" />
                        ) : (
                            <Folder className="w-5 h-5" />
                        ) }
                    </button>
                </div>
            </div>

            {/* Tombol desktop */ }
            <button
                onClick={ () => setShowResult( !showResult ) }
                className="mb-4 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-medium hidden md:block"
            >
                { showResult ? "Sembunyikan Hasil" : "Tampilkan Hasil" }
            </button>

            {/* Isi hasil */ }
            { showResult && (
                <div className="mb-4 text-black">
                    <p className="mb-2">
                        <span className="font-medium">Tanggal Ujian:</span> { formattedDate }
                    </p>

                    <div className="flex justify-around my-6">
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-medium">Total Soal</p>
                            <p className="text-5xl font-bold">{ total }</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-medium">Score</p>
                            <p className="text-5xl font-bold">{ score }</p>
                        </div>
                    </div>

                    { passed ? (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center text-lg font-semibold">
                            Selamat! Anda Lulus Ujian!
                        </div>
                    ) : (
                        <div className="text-sm mt-2">
                            Skor Anda belum memenuhi batas minimum yang ditentukan pada ujian ini.
                            <br />
                            Mohon untuk mempelajari kembali modul-modul terkait: { tryout.name }.
                        </div>
                    ) }
                </div>
            ) }

            {/* Tombol Kembali desktop */ }
            <button
                onClick={ onExit }
                className="mt-auto px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium hidden md:block"
            >
                Kembali
            </button>
        </div>
    );
}
