"use client";

import React from "react";
import { Tryout } from "../../../hooks/tryout/useTryouts";
import TryoutReview from "../review/TryoutReview";
import TryoutSidebar from "./TryoutSidebar";
import QuestionCard from "./QuestionCard";
import TryoutHeader from "./TryoutHeader";
import { useTryoutExam } from "../../../hooks/tryout/useTryoutExam";

interface TryoutExamProps
{
    tryout: Tryout;
    onExit: ( result?: { score: number; total: number; answers: Record<number, string> } ) => void;
    initialAnswers?: Record<number, string>;
    isReview?: boolean;
    date?: string;
}

export default function TryoutExam( {
    tryout,
    onExit,
    initialAnswers = {},
    isReview = false,
    date,
}: TryoutExamProps )
{
    const {
        currentIndex,
        setCurrentIndex,
        answers,
        timeLeft,
        isFinished,
        setIsFinished,
        showSidebar,
        setShowSidebar,
        questions,
        total,
        currentQuestion,
        score,
        allAnswered,
        handleSelect,
        next,
        prev,
    } = useTryoutExam( tryout, isReview );

    // Jika tryout selesai atau mode review
    if ( isFinished )
    {
        return (
            <TryoutReview
                tryout={ tryout }
                answers={ answers }
                score={ score }
                onExit={ () =>
                    onExit( isReview ? undefined : { score, total: questions.length, answers } )
                }
                isReview={ isReview }
                date={ date || new Date().toISOString() }
            />
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col h-screen overflow-hidden">
            <TryoutHeader title={ tryout.name } timeLeft={ timeLeft } />

            <div className="flex flex-1 overflow-hidden">
                <TryoutSidebar
                    questions={ questions }
                    answers={ answers }
                    currentIndex={ currentIndex }
                    setCurrentIndex={ setCurrentIndex }
                    showSidebar={ showSidebar }
                    setShowSidebar={ setShowSidebar }
                />

                <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-4 max-w-3xl mx-auto w-full relative">
                    <button
                        className="sm:hidden mb-4 p-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition"
                        onClick={ () => setShowSidebar( !showSidebar ) }
                        aria-label="Toggle Daftar Soal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={ 2 } viewBox="0 0 24 24">
                            <path d="M3 6h18M3 12h18M3 18h18" />
                        </svg>
                    </button>

                    { currentQuestion ? (
                        <QuestionCard
                            question={ currentQuestion }
                            selectedAnswer={ answers[currentIndex] }
                            onSelect={ handleSelect }
                        />
                    ) : (
                        <p className="text-gray-500 text-center mt-20">No questions found.</p>
                    ) }

                    <div className="flex justify-between items-center mt-2 pb-10">
                        <button
                            onClick={ prev }
                            disabled={ currentIndex === 0 }
                            className={ `px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition ${ currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                                }` }
                        >
                            Previous
                        </button>

                        { currentIndex === total - 1 ? (
                            <button
                                onClick={ () => setIsFinished( true ) }
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
                                onClick={ next }
                                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium"
                            >
                                Next
                            </button>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    );
}
