"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Tryout, useTryouts } from "../../hooks/tryout/useTryouts";
import TryoutModal from "./TryoutModal";
import TryoutViewer from "./TryoutViewer";
import TryoutCard from "./TryoutCard";
import PreviewTryout from "./PreviewTryout";

/* ============================
   INTERFACE: TryoutResult
=============================== */
interface TryoutResult
{
    tryoutId: string;
    tryoutName: string;
    score: number;
    total: number;
    answers: Record<number, string>;
    date: string;
    questions: any[];
}

/* ============================
   COMPONENT: TryoutSection
=============================== */
export default function TryoutSection()
{
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [activeTryout, setActiveTryout] = useState<Tryout | null>( null );
    const [isPreviewing, setIsPreviewing] = useState( false );
    const [isStarted, setIsStarted] = useState( false );
    const [history, setHistory] = useState<TryoutResult[]>( [] );
    const [activeResult, setActiveResult] = useState<TryoutResult | null>( null );

    const { tryouts, addTryout, removeTryout } = useTryouts();

    /* === Klik kartu tryout → buka preview === */
    const handleOpenTryout = ( t: Tryout ) =>
    {
        setActiveTryout( t );
        setIsPreviewing( true );
    };

    /* === Start ujian === */
    const handleStartTryout = () =>
    {
        setIsPreviewing( false );
        setIsStarted( true );
    };

    /* === Exit ujian === */
    const handleExitTryout = (
        result?: { score: number; total: number; answers: Record<number, string> }
    ) =>
    {
        if ( result && activeTryout )
        {
            const newHistory: TryoutResult = {
                tryoutId: activeTryout.id,
                tryoutName: activeTryout.name,
                score: result.score,
                total: result.total,
                answers: result.answers,
                date: new Date().toLocaleString(),
                questions: activeTryout.questions || [],
            };
            setHistory( ( prev ) => [...prev, newHistory] );
        }

        setIsStarted( false );
        setActiveTryout( null );
    };

    /* === Review hasil dari riwayat === */
    const handleReviewResult = ( res: TryoutResult ) =>
    {
        setActiveResult( res );
        setIsPreviewing( false );
        setIsStarted( false );
    };

    /* === Keluar dari review === */
    const handleExitReview = () =>
    {
        setActiveResult( null );
    };

    /* === Review Mode === */
    if ( activeResult )
    {
        return (
            <TryoutViewer
                tryout={ {
                    id: activeResult.tryoutId,
                    name: activeResult.tryoutName,
                    duration: 0,
                    questions: activeResult.questions,
                    subject: "",       // default kosong
                    level: "",         // default kosong
                    questionCount: activeResult.questions.length,
                } }
                onExit={ handleExitReview }
                initialAnswers={ activeResult.answers }
                isReview={ true }
                date={ activeResult.date } // <-- penting
            />
        );
    }

    /* === Sedang ujian === */
    if ( isStarted && activeTryout )
    {
        return (
            <TryoutViewer
                tryout={ activeTryout }
                onExit={ handleExitTryout }
                date={ new Date().toLocaleString() } // waktu mulai ujian
            />
        );
    }


    /* === Sedang ujian === */
    if ( isStarted && activeTryout )
    {
        return (
            <TryoutViewer
                tryout={ activeTryout }
                onExit={ handleExitTryout }
                date={ new Date().toLocaleString() } // waktu mulai ujian
            />
        );
    }


    /* === Preview Tryout (sebelum mulai) === */
    if ( isPreviewing && activeTryout )
    {
        const thisHistory = history.filter(
            ( h ) => h.tryoutId === activeTryout.id
        );

        return (
            <PreviewTryout
                tryout={ activeTryout }
                onStart={ handleStartTryout }
                onCancel={ () =>
                {
                    setIsPreviewing( false );
                    setActiveTryout( null );
                } }
                history={ thisHistory }
                onReview={ handleReviewResult }
            />
        );
    }

    /* === Sedang ujian === */
    if ( isStarted && activeTryout )
    {
        return <TryoutViewer tryout={ activeTryout } onExit={ handleExitTryout } />;
    }

    /* === Daftar Tryout === */
    return (
        <div className="relative w-full flex-1 bg-white flex flex-col overflow-hidden">
            <div
                className={ `flex-1 p-6 sm:p-10 ${ tryouts.length === 0
                        ? "flex justify-center items-center"
                        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    }` }
            >
                { tryouts.length > 0 ? (
                    tryouts.map( ( t ) => (
                        <motion.div key={ t.id } whileHover={ { scale: 1.02 } }>
                            <TryoutCard
                                tryout={ t }
                                onOpen={ () => handleOpenTryout( t ) }
                                onDelete={ () => removeTryout( t.id ) }
                            />
                        </motion.div>
                    ) )
                ) : (
                    <p className="text-gray-500 text-center">No tryouts yet.</p>
                ) }
            </div>

            {/* Floating Add Button */ }
            <button
                onClick={ () => setIsModalOpen( true ) }
                className="fixed bottom-[88px] right-6 sm:bottom-[100px] sm:right-10 bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition-all"
                title="Add Tryout"
            >
                <Plus size={ 28 } />
            </button>

            {/* Modal */ }
            <TryoutModal
                isOpen={ isModalOpen }
                setIsOpen={ setIsModalOpen }
                onSubmit={ ( newTryout: Tryout ) => addTryout( newTryout ) }
            />
        </div>
    );
}
