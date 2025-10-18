"use client";

import React from "react";

interface QuestionNavigationProps
{
    currentIndex: number;
    total: number;
    allAnswered: boolean;
    onPrev: () => void;
    onNext: () => void;
    onFinish: () => void;
}

export default function QuestionNavigation( {
    currentIndex,
    total,
    allAnswered,
    onPrev,
    onNext,
    onFinish,
}: QuestionNavigationProps )
{
    return (
        <div className="flex justify-between items-center mt-2 pb-10">
            <button
                onClick={ onPrev }
                disabled={ currentIndex === 0 }
                className={ `px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition ${ currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }` }
            >
                Previous
            </button>

            { currentIndex === total - 1 ? (
                <button
                    onClick={ onFinish }
                    disabled={ !allAnswered }
                    className={ `px-6 py-2 rounded-lg font-medium transition ${ allAnswered
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }` }
                >
                    Finish
                </button>
            ) : (
                <button
                    onClick={ onNext }
                    className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium"
                >
                    Next
                </button>
            ) }
        </div>
    );
}
