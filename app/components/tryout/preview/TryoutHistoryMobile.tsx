"use client";

import React from "react";
import { formatDate } from "../../../utils/tryout/formatDate";

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

interface TryoutHistoryMobileProps
{
    history: TryoutResult[];
    onReview?: ( result: TryoutResult ) => void;
}

export default function TryoutHistoryMobile( { history, onReview }: TryoutHistoryMobileProps )
{
    if ( history.length === 0 ) return null;

    return (
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
    );
}
