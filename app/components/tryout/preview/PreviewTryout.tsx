"use client";

import React from "react";
import { Tryout } from "../../hooks/tryout/useTryouts";
import Footer from "../home/Footer";
import PreviewTryoutHeader from "./PreviewTryoutHeader"; // 👈 import baru

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

    const formatDate = ( dateStr: string ) =>
    {
        const date = new Date( dateStr );
        return date
            .toLocaleString( "en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            } )
            .replace( ",", "" );
    };

    return (
        <div className="fixed inset-0 z-40 bg-white flex flex-col h-screen">
            {/* Header */ }
            <PreviewTryoutHeader title={ tryout.name } onCancel={ onCancel } />

            {/* Main Content */ }
            <main className="flex-1 flex flex-col px-6 sm:px-10 py-8 max-w-3xl mx-auto w-full">
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
                { history.length > 0 && (
                    <div className="flex-1 overflow-y-auto mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Riwayat</h2>

                        {/* Desktop Table */ }
                        <div className="hidden sm:block">
                            <div className="overflow-y-auto max-h-96 border border-gray-200 rounded-lg">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Tanggal</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Persentase</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Status</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { history.map( ( h, idx ) =>
                                        {
                                            const percent = Math.round( ( h.score / h.total ) * 100 );
                                            const passed = percent >= 75;
                                            return (
                                                <tr key={ idx } className="bg-white border-b last:border-b-0">
                                                    <td className="px-4 py-2 text-sm text-gray-700">{ formatDate( h.date ) }</td>
                                                    <td className="px-4 py-2 text-sm text-gray-700">{ percent }%</td>
                                                    <td className="px-4 py-2 text-sm">
                                                        <span
                                                            className={ `px-2 py-1 rounded-full text-white text-xs ${ passed ? "bg-green-500" : "bg-red-500"
                                                                }` }
                                                        >
                                                            { passed ? "Lulus" : "Tidak Lulus" }
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 text-sm">
                                                        { onReview && (
                                                            <button
                                                                onClick={ () => onReview( h ) }
                                                                className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-200 transition"
                                                            >
                                                                Lihat Detail
                                                            </button>
                                                        ) }
                                                    </td>
                                                </tr>
                                            );
                                        } ) }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Cards */ }
                        <div className="sm:hidden overflow-y-auto max-h-96 space-y-4">
                            { history.map( ( h, idx ) =>
                            {
                                const percent = Math.round( ( h.score / h.total ) * 100 );
                                const passed = percent >= 75;
                                return (
                                    <div key={ idx } className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-700 font-medium">Tanggal:</span>
                                            <span className="text-gray-900">{ formatDate( h.date ) }</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-700 font-medium">Persentase:</span>
                                            <span className="text-gray-900">{ percent }%</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-700 font-medium">Status:</span>
                                            <span
                                                className={ `px-2 py-1 rounded-full text-white text-xs ${ passed ? "bg-green-500" : "bg-red-500"
                                                    }` }
                                            >
                                                { passed ? "Lulus" : "Tidak Lulus" }
                                            </span>
                                        </div>
                                        { onReview && (
                                            <button
                                                onClick={ () => onReview( h ) }
                                                className="mt-2 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-200 transition"
                                            >
                                                Lihat Detail
                                            </button>
                                        ) }
                                    </div>
                                );
                            } ) }
                        </div>
                    </div>
                ) }
            </main>

            {/* Footer */ }
            <Footer />
        </div>
    );
}
