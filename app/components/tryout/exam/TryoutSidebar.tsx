"use client";

import React from "react";

interface TryoutSidebarProps
{
    questions: any[];
    answers: Record<number, string>;
    currentIndex: number;
    setCurrentIndex: ( index: number ) => void;
    showSidebar: boolean;
    setShowSidebar: ( show: boolean ) => void;
}

export default function TryoutSidebar( {
    questions,
    answers,
    currentIndex,
    setCurrentIndex,
    showSidebar,
    setShowSidebar,
}: TryoutSidebarProps )
{
    return (
        <div
            className={ `sm:w-100 border-r border-gray-200 flex-shrink-0 overflow-y-auto p-4 bg-gray-50
        ${ showSidebar ? "absolute z-50 inset-0 w-full bg-gray-50 shadow-lg p-6" : "hidden sm:block" }` }
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-700 font-semibold text-center text-sm sm:text-base">
                    Daftar Soal
                </h2>
                <button
                    className="sm:hidden text-gray-700 font-bold text-3xl p-3 rounded-full hover:bg-gray-200 transition"
                    onClick={ () => setShowSidebar( false ) }
                >
                    ×
                </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
                { questions.map( ( _, idx ) =>
                {
                    const answered = !!answers[idx];
                    const isActive = currentIndex === idx;
                    return (
                        <button
                            key={ idx }
                            onClick={ () =>
                            {
                                setCurrentIndex( idx );
                                setShowSidebar( false );
                            } }
                            className={ `aspect-square min-w-[5px] rounded-md text-sm font-medium transition-all flex items-center justify-center border
                  ${ isActive
                                    ? "bg-yellow-400 border-yellow-500 text-black font-bold"
                                    : answered
                                        ? "bg-green-100 border-green-300 text-green-800"
                                        : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
                                }` }
                        >
                            { idx + 1 }
                        </button>
                    );
                } ) }
            </div>
        </div>
    );
}
