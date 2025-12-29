"use client";

import React from "react";
import { motion } from "framer-motion";

interface TryoutReviewContentProps
{
    questions: any[];
    answers: Record<number, string>;
}

/**
 * Komponen untuk menampilkan daftar soal, jawaban pengguna, dan kunci jawaban.
 */
export default function TryoutReviewContent( {
    questions,
    answers,
}: TryoutReviewContentProps )
{
    if ( !questions?.length )
    {
        return (
            <p className="text-center text-gray-500 mt-20">
                Tidak ada soal yang ditemukan.
            </p>
        );
    }

    return (
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
                                    <div
                                        key={ opt }
                                        className={ `border rounded-lg px-4 py-2 ${ bg }` }
                                    >
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
    );
}
