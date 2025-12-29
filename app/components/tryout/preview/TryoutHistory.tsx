"use client";

import React from "react";
import { formatDate } from "../../../utils/tryout/formatDate";
import TryoutHistoryMobile from "./TryoutHistoryMobile"; // 👈 import baru

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

interface TryoutHistoryProps
{
    history: TryoutResult[];
    onReview?: ( result: TryoutResult ) => void;
}

export default function TryoutHistory( { history, onReview }: TryoutHistoryProps )
{
    if ( history.length === 0 ) return null;

    return (
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
            <TryoutHistoryMobile history={ history } onReview={ onReview } />
        </div>
    );
}
