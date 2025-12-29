"use client";

import React from "react";
import { Tryout } from "../../../hooks/tryout/useTryouts";
import Footer from "../../home/Footer";
import PreviewTryoutHeader from "./PreviewTryoutHeader";
import TryoutHistory from "./TryoutHistory";

interface TryoutResult
{
    tryoutId: string;
    tryoutName: string;
    score: number;
    total: number;
    answers: Record<number, string>;
    date: string;
    questions: any[];
}

interface PreviewTryoutProps
{
    tryout: Tryout;
    onStart: () => void;
    onCancel: () => void;
    history?: TryoutResult[];
    onReview?: ( result: TryoutResult ) => void;
}

export default function PreviewTryout( {
    tryout,
    onStart,
    onCancel,
    history = [],
    onReview,
}: PreviewTryoutProps )
{
    const duration = tryout.duration || 0;
    const totalQuestions = tryout.questions?.length || 0;
    const passingScore = 0.75;

    return (
        <div className="fixed inset-0 z-40 bg-white flex flex-col h-screen">
            {/* Header */ }
            <PreviewTryoutHeader title={ tryout.name } onCancel={ onCancel } />

            {/* Main Content */ }
            <main className="flex-1 flex flex-col px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
                {/* Info Tryout */ }
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Spesifikasi Ujian</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Ujian ini memiliki <strong>{ totalQuestions }</strong> soal,
                        <br />
                        durasi <strong>{ duration }</strong> menit,
                        <br />
                        dan standar kelulusan <strong>{ passingScore * 100 }%</strong>.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={ onStart }
                            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-semibold text-lg transition"
                        >
                            Mulai Ujian
                        </button>
                    </div>
                </div>

                {/* Riwayat */ }
                <TryoutHistory history={ history } onReview={ onReview } />
            </main>

            {/* Footer */ }
            <Footer />
        </div>
    );
}
