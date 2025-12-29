"use client";

import React from "react";
import { formatTimeExam } from "../../../utils/tryout/formatTimeExam";

interface TryoutHeaderProps
{
    title: string;
    timeLeft: number;
}

export default function TryoutHeader( { title, timeLeft }: TryoutHeaderProps )
{
    return (
        <div className="flex justify-between items-center px-6 sm:px-10 py-4 border-b flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 truncate">{ title }</h1>
            <div
                className={ `px-4 py-2 rounded-lg font-semibold text-lg ${ timeLeft <= 60
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-yellow-400 text-black"
                    }` }
            >
                ⏱ { formatTimeExam( timeLeft ) }
            </div>
        </div>
    );
}
