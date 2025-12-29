"use client";

import React from "react";
import { motion } from "framer-motion";
import { useQuestionShortcut } from "../../../hooks/tryout/useQuestionShortcut";

interface QuestionCardProps
{
    question: any;
    selectedAnswer?: string;
    onSelect: ( option: string ) => void;
}

export default function QuestionCard( {
    question,
    selectedAnswer,
    onSelect,
}: QuestionCardProps )
{
    // ✅ Hook harus selalu dipanggil di atas, tidak boleh di dalam kondisi
    useQuestionShortcut( onSelect, Boolean( question ) );

    if ( !question ) return null; // ⬅️ Kondisi boleh di sini, setelah hook

    const options = ["A", "B", "C", "D"];

    return (
        <motion.div
            key={ question.id || question.Question }
            initial={ { opacity: 0, y: 10 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.3 } }
        >
            <p className="text-lg font-medium text-gray-800 mb-4 leading-relaxed">
                { question.Question }
            </p>

            <div className="grid gap-4 mb-6">
                { options.map( ( opt ) =>
                {
                    const isSelected = selectedAnswer === opt;

                    return (
                        <div key={ opt } className="flex items-start gap-2">
                            <button
                                onClick={ () => onSelect( opt ) }
                                className={ `w-6 h-6 flex-shrink-0 rounded-full border-2 border-gray-400 flex items-center justify-center transition ${ isSelected
                                        ? "bg-yellow-400 border-yellow-500"
                                        : "bg-white"
                                    }` }
                                aria-label={ `Pilih jawaban ${ opt }` }
                            >
                                { isSelected && <div className="w-3 h-3 rounded-full bg-black" /> }
                            </button>

                            <span className="text-gray-800">{ question[`Option ${ opt }`] }</span>
                        </div>
                    );
                } ) }
            </div>
        </motion.div>
    );
}
