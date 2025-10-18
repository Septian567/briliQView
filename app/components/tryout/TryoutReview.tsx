"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tryout } from "../../hooks/tryout/useTryouts";
import { ArrowLeft, Folder, FolderMinus } from "lucide-react";

interface TryoutReviewProps
{
    tryout: Tryout;
    answers: Record<number, string>;
    onExit: () => void;
    score: number;
    date: string; // tanggal ujian
    isReview?: boolean;
}

export default function TryoutReview( {
    tryout,
    answers,
    onExit,
    score,
    date,
    isReview = false,
}: TryoutReviewProps )
{
    const [showResult, setShowResult] = useState( true );
    const questions = tryout.questions || [];
    const total = questions.length;

    const formattedDate = new Date( date ).toLocaleString( "id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    } ).replace( ",", ", pukul" );

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row h-screen overflow-hidden text-black">
            {/* Sidebar */ }
            <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 p-6 flex flex-col relative">
                {/* Judul dan ikon mobile */ }
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
                            { showResult ? <FolderMinus className="w-5 h-5" /> : <Folder className="w-5 h-5" /> }
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

                        { score / total >= 0.75 && (
                            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center text-lg font-semibold">
                                Selamat! Anda Lulus Ujian!
                            </div>
                        ) }

                        { score / total < 0.75 && (
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

            {/* Konten */ }
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-black">
                <div className="space-y-8">
                    { questions.map( ( q, idx ) =>
                    {
                        const userAnswer = answers[idx];
                        const correctAnswer = q["Correct Answer"]?.trim().toUpperCase();
                        const isCorrect = userAnswer === correctAnswer;

                        return (
                            <motion.div
                                key={ idx }
                                initial={ { opacity: 0, y: 10 } }
                                animate={ { opacity: 1, y: 0 } }
                                transition={ { duration: 0.3, delay: idx * 0.03 } }
                                className="border border-gray-200 rounded-xl p-5 shadow-sm"
                            >
                                <p className="font-medium text-black mb-3">
                                    { idx + 1 }. { q.Question }
                                </p>

                                <div className="grid gap-2">
                                    { ["A", "B", "C", "D"].map( ( opt ) =>
                                    {
                                        const key = `Option ${ opt }` as keyof typeof q;
                                        const text = q[key];
                                        const isUser = userAnswer === opt;

                                        const bg = isUser
                                            ? isCorrect
                                                ? "bg-green-100 border-green-500 text-black"
                                                : "bg-red-100 border-red-500 text-black"
                                            : "bg-white border-gray-200 text-black";

                                        return (
                                            <div key={ opt } className={ `border rounded-lg px-4 py-2 ${ bg }` }>
                                                <span className="font-bold mr-2">{ opt }.</span>
                                                { text }
                                            </div>
                                        );
                                    } ) }
                                </div>
                            </motion.div>
                        );
                    } ) }
                </div>

                <div className="h-24 md:h-0" />
            </div>
        </div>
    );
}
