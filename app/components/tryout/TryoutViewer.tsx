"use client";

import React, { useEffect, useState } from "react";
import { Tryout } from "../../hooks/tryout/useTryouts";
import TryoutReview from "./TryoutReview";
import TryoutSidebar from "./TryoutSidebar";
import QuestionCard from "./QuestionCard";
import TryoutHeader from "./TryoutHeader";

interface TryoutViewerProps
{
    tryout: Tryout;
    onExit: ( result?: { score: number; total: number; answers: Record<number, string> } ) => void;
    initialAnswers?: Record<number, string>;
    isReview?: boolean;
    date?: string; // tanggal ujian
}

export default function TryoutViewer( {
    tryout,
    onExit,
    initialAnswers = {},
    isReview = false,
    date,
}: TryoutViewerProps )
{
    const [currentIndex, setCurrentIndex] = useState( 0 );
    const [answers, setAnswers] = useState<Record<number, string>>( initialAnswers );
    const [timeLeft, setTimeLeft] = useState( ( tryout.duration || 0 ) * 60 );
    const [isFinished, setIsFinished] = useState( isReview );
    const [showSidebar, setShowSidebar] = useState( false );

    const questions = tryout.questions || [];
    const total = questions.length;
    const currentQuestion = questions[currentIndex];

    const score = Object.entries( answers ).filter(
        ( [i, ans] ) => questions[parseInt( i )]?.["Correct Answer"]?.trim().toUpperCase() === ans
    ).length;

    const handleSelect = ( option: string ) =>
    {
        if ( isReview || isFinished ) return;
        setAnswers( ( prev ) => ( { ...prev, [currentIndex]: option } ) );
    };

    const isSelected = ( opt: string ) => answers[currentIndex] === opt;
    const next = () => currentIndex < total - 1 && setCurrentIndex( currentIndex + 1 );
    const prev = () => currentIndex > 0 && setCurrentIndex( currentIndex - 1 );
    const allAnswered = Object.keys( answers ).length === total;

    // Timer
    useEffect( () =>
    {
        if ( isReview || isFinished ) return;
        if ( timeLeft <= 0 )
        {
            alert( "⏰ Waktu habis! Tryout otomatis selesai." );
            setIsFinished( true );
            return;
        }
        const timer = setInterval( () => setTimeLeft( ( t ) => t - 1 ), 1000 );
        return () => clearInterval( timer );
    }, [timeLeft, isReview, isFinished] );

    // Keyboard shortcuts
    useEffect( () =>
    {
        const handleKeyDown = ( e: KeyboardEvent ) =>
        {
            if ( isFinished ) return;

            // Navigasi
            if ( e.key === "7" ) prev();
            else if ( e.key === "8" ) next();

            // Shortcut jawaban
            const shortcutMap: Record<string, string> = { T: "A", U: "B", I: "C", O: "D" };
            const upperKey = e.key.toUpperCase();
            if ( shortcutMap[upperKey] ) handleSelect( shortcutMap[upperKey] );

            // Finish
            if ( e.key === "Enter" && currentIndex === total - 1 && allAnswered )
            {
                setIsFinished( true );
            }
        };

        window.addEventListener( "keydown", handleKeyDown );
        return () => window.removeEventListener( "keydown", handleKeyDown );
    }, [currentIndex, isFinished, answers, allAnswered, total] );

    const formatTime = ( seconds: number ) =>
    {
        const m = Math.floor( seconds / 60 ).toString().padStart( 2, "0" );
        const s = ( seconds % 60 ).toString().padStart( 2, "0" );
        return `${ m }:${ s }`;
    };

    // Jika tryout selesai atau mode review
    if ( isFinished )
    {
        return (
            <TryoutReview
                tryout={ tryout }
                answers={ answers }
                score={ score }
                onExit={ () =>
                    onExit(
                        isReview ? undefined : { score, total: questions.length, answers }
                    )
                }
                isReview={ isReview }
                date={ date || new Date().toISOString() }
            />
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col h-screen overflow-hidden">
            {/* Header */ }
            <TryoutHeader title={ tryout.name } timeLeft={ timeLeft } />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */ }
                <TryoutSidebar
                    questions={ questions }
                    answers={ answers }
                    currentIndex={ currentIndex }
                    setCurrentIndex={ setCurrentIndex }
                    showSidebar={ showSidebar }
                    setShowSidebar={ setShowSidebar }
                />

                {/* Main Question Area */ }
                <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-4 max-w-3xl mx-auto w-full relative">
                    {/* Hamburger toggle sidebar hanya di mobile */ }
                    <button
                        className="sm:hidden mb-4 p-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition"
                        onClick={ () => setShowSidebar( !showSidebar ) }
                        aria-label="Toggle Daftar Soal"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={ 2 }
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
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

                    {/* Navigasi Previous / Next / Finish */ }
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
