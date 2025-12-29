"use client";

import React, { useState } from "react";
import { Tryout } from "../../../hooks/tryout/useTryouts";
import TryoutReviewSidebar from "./TryoutReviewSidebar";
import TryoutReviewContent from "./TryoutReviewContent";

interface TryoutReviewProps
{
    tryout: Tryout;
    answers: Record<number, string>;
    onExit: () => void;
    score: number;
    date: string;
    isReview?: boolean;
}

export default function TryoutReview( {
    tryout,
    answers,
    onExit,
    score,
    date,
    isReview = false,
}: TryoutReviewProps )
{
    const [showResult, setShowResult] = useState( true );
    const questions = tryout.questions || [];
    const total = questions.length;

    const formattedDate = new Date( date )
        .toLocaleString( "id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        } )
        .replace( ",", ", pukul" );

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row h-screen overflow-hidden text-black">
            {/* Sidebar hasil */ }
            <TryoutReviewSidebar
                tryout={ tryout }
                total={ total }
                score={ score }
                formattedDate={ formattedDate }
                showResult={ showResult }
                setShowResult={ setShowResult }
                onExit={ onExit }
            />

            {/* ✅ Konten soal dipisahkan ke komponen baru */ }
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-black">
                <TryoutReviewContent questions={ questions } answers={ answers } />
                <div className="h-24 md:h-0" />
            </div>
        </div>
    );
}
