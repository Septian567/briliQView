"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tryout } from "../../hooks/tryout/useTryouts";

interface TryoutViewerProps
{
    tryout: Tryout;
    onExit: () => void;
}

/* ============================
   COMPONENT: TryoutViewer
=============================== */
export default function TryoutViewer( { tryout, onExit }: TryoutViewerProps )
{
    const [currentIndex, setCurrentIndex] = useState( 0 );
    const [answers, setAnswers] = useState<Record<number, string>>( {} );

    const questions = tryout.questions || [];
    const currentQuestion = questions[currentIndex];
    const total = questions.length;

    const handleSelect = ( option: string ) =>
        setAnswers( ( prev ) => ( { ...prev, [currentIndex]: option } ) );

    const isSelected = ( opt: string ) => answers[currentIndex] === opt;
    const next = () => currentIndex < total - 1 && setCurrentIndex( currentIndex + 1 );
    const prev = () => currentIndex > 0 && setCurrentIndex( currentIndex - 1 );
    const isFinished = currentIndex === total - 1;

    // ✅ Tambahan: cek apakah semua soal sudah dijawab
    const allAnswered = Object.keys( answers ).length === total;

    const score = Object.entries( answers ).filter(
        ( [i, ans] ) =>
            questions[parseInt( i )]?.["Correct Answer"]?.trim().toUpperCase() === ans
    ).length;

    const finishTryout = () =>
    {
        if ( !allAnswered ) return; // jaga-jaga
        alert( `✅ Tryout selesai!\nSkor kamu: ${ score }/${ total }` );
        onExit();
    };

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col h-screen overflow-hidden">
            {/* Header */ }
            <div className="flex justify-between items-center px-6 sm:px-10 py-4 border-b flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                    { tryout.name }
                </h1>
                <button
                    onClick={ onExit }
                    className="text-gray-600 hover:text-gray-800 border border-gray-300 px-4 py-2 rounded-lg"
                >
                    Exit
                </button>
            </div>

            {/* Main Section with Sidebar */ }
            <div className="flex flex-1 overflow-hidden">
                {/* === Sidebar untuk navigasi soal === */ }
                <div className="w-40 sm:w-52 border-r border-gray-200 flex-shrink-0 overflow-y-auto p-4 bg-gray-50">
                    <h2 className="text-gray-700 font-semibold mb-3 text-sm sm:text-base text-center">
                        Daftar Soal
                    </h2>

                    {/* Grid 4 kolom */ }
                    <div className="grid grid-cols-4 gap-2">
                        { questions.map( ( _, idx ) =>
                        {
                            const answered = !!answers[idx];
                            const isActive = currentIndex === idx;
                            return (
                                <button
                                    key={ idx }
                                    onClick={ () => setCurrentIndex( idx ) }
                                    className={ `
                                        aspect-square rounded-md text-sm font-medium transition-all
                                        flex items-center justify-center border
                                        ${ isActive
                                            ? "bg-yellow-400 border-yellow-500 text-black font-bold"
                                            : answered
                                                ? "bg-green-100 border-green-300 text-green-800"
                                                : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
                                        }
                                    `}
                                    title={ `Soal ${ idx + 1 }` }
                                >
                                    { idx + 1 }
                                </button>
                            );
                        } ) }
                    </div>
                </div>

                {/* === Main Question Area === */ }
                <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-4 max-w-3xl mx-auto w-full">
                    { currentQuestion ? (
                        <motion.div
                            key={ currentIndex }
                            initial={ { opacity: 0, y: 10 } }
                            animate={ { opacity: 1, y: 0 } }
                            transition={ { duration: 0.3 } }
                        >
                            {/* Question Info */ }
                            <div className="mb-3 text-sm text-gray-500 flex justify-between">
                                <span>
                                    Question { currentIndex + 1 } / { total }
                                </span>
                            </div>

                            {/* Question Text */ }
                            <p className="text-lg font-medium text-gray-800 mb-4 leading-relaxed">
                                { currentQuestion.Question }
                            </p>

                            {/* Options */ }
                            <div className="grid gap-3 mb-6">
                                { ["A", "B", "C", "D"].map( ( opt ) => (
                                    <button
                                        key={ opt }
                                        onClick={ () => handleSelect( opt ) }
                                        className={ `w-full text-left px-4 py-3 border rounded-xl transition-all ${ isSelected( opt )
                                                ? "bg-yellow-400 border-yellow-500 text-black font-semibold"
                                                : "hover:bg-gray-100 border-gray-300 text-gray-800"
                                            }` }
                                    >
                                        <span className="font-bold mr-2">{ opt }.</span>{ " " }
                                        { currentQuestion[`Option ${ opt }`] }
                                    </button>
                                ) ) }
                            </div>

                            {/* Navigation */ }
                            <div className="flex justify-between items-center mt-2 pb-10">
                                <button
                                    onClick={ prev }
                                    disabled={ currentIndex === 0 }
                                    className={ `px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition ${ currentIndex === 0
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                        }` }
                                >
                                    Previous
                                </button>

                                { isFinished ? (
                                    <button
                                        onClick={ finishTryout }
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
                        </motion.div>
                    ) : (
                        <p className="text-gray-500 text-center mt-20">
                            No questions found.
                        </p>
                    ) }
                </div>
            </div>
        </div>
    );
}
