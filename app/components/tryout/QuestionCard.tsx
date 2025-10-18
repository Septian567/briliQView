"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

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
    if ( !question ) return null;

    const options = ["A", "B", "C", "D"];

    // Mapping shortcut keys ke jawaban
    const shortcutMap: Record<string, string> = {
        t: "A",
        y: "B",
        u: "C",
        i: "D",
    };

    useEffect( () =>
    {
        const handleKeyDown = ( e: KeyboardEvent ) =>
        {
            const key = e.key.toLowerCase();
            if ( shortcutMap[key] )
            {
                onSelect( shortcutMap[key] );
            }
        };

        window.addEventListener( "keydown", handleKeyDown );

        return () =>
        {
            window.removeEventListener( "keydown", handleKeyDown );
        };
    }, [onSelect] );

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
                            {/* Bulat radio button */ }
                            <button
                                onClick={ () => onSelect( opt ) }
                                className={ `w-6 h-6 flex-shrink-0 rounded-full border-2 border-gray-400 flex items-center justify-center transition ${ isSelected ? "bg-yellow-400 border-yellow-500" : "bg-white"
                                    }` }
                                aria-label={ `Pilih jawaban ${ opt }` }
                            >
                                { isSelected && <div className="w-3 h-3 rounded-full bg-black" /> }
                            </button>

                            {/* Keterangan jawaban */ }
                            <span className="text-gray-800">{ question[`Option ${ opt }`] }</span>
                        </div>
                    );
                } ) }
            </div>
        </motion.div>
    );
}
