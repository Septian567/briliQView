"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tryout, useTryouts } from "../../hooks/tryout/useTryouts";
import TryoutModal from "./TryoutModal";
import TryoutViewer from "./TryoutViewer";
import TryoutCard from "./TryoutCard";
import PreviewTryout from "./PreviewTryout";
import Frame from "../frame/Frame";
import AddButton from "../frame/AddButton";
import NoContentMessage from "../frame/NoContentMessage";

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

export default function TryoutSection()
{
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [editMode, setEditMode] = useState( false );
    const [editTryout, setEditTryout] = useState<Tryout | null>( null );
    const [activeTryout, setActiveTryout] = useState<Tryout | null>( null );
    const [isPreviewing, setIsPreviewing] = useState( false );
    const [isStarted, setIsStarted] = useState( false );
    const [history, setHistory] = useState<TryoutResult[]>( [] );
    const [activeResult, setActiveResult] = useState<TryoutResult | null>( null );

    const { tryouts, addTryout, removeTryout } = useTryouts();

    const handleOpenTryout = ( t: Tryout ) =>
    {
        setActiveTryout( t );
        setIsPreviewing( true );
    };

    const handleStartTryout = () =>
    {
        setIsPreviewing( false );
        setIsStarted( true );
    };

    const handleExitTryout = ( result?: {
        score: number;
        total: number;
        answers: Record<number, string>;
    } ) =>
    {
        if ( result && activeTryout )
        {
            const newHistory: TryoutResult = {
                tryoutId: activeTryout.id,
                tryoutName: activeTryout.name,
                score: result.score,
                total: result.total,
                answers: result.answers,
                date: new Date().toISOString(),
                questions: activeTryout.questions || [],
            };
            setHistory( ( prev ) => [...prev, newHistory] );
        }

        setIsStarted( false );
        setActiveTryout( null );
    };

    const handleReviewResult = ( res: TryoutResult ) =>
    {
        setActiveResult( res );
        setIsPreviewing( false );
        setIsStarted( false );
    };

    const handleExitReview = () =>
    {
        setActiveResult( null );
    };

    const handleEditTryout = ( t: Tryout ) =>
    {
        setEditTryout( t );
        setEditMode( true );
        setIsModalOpen( true );
    };

    const handleSaveTryout = ( updated: Tryout ) =>
    {
        if ( editMode && editTryout )
        {
            // replace existing tryout
            const updatedList = tryouts.map( ( tr ) =>
                tr.id === editTryout.id ? updated : tr
            );
            localStorage.setItem( "tryouts", JSON.stringify( updatedList ) );
            window.location.reload(); // refresh UI (atau bisa pakai state update langsung)
        } else
        {
            addTryout( updated );
        }
        setIsModalOpen( false );
        setEditMode( false );
        setEditTryout( null );
    };

    if ( activeResult )
    {
        return (
            <TryoutViewer
                tryout={ {
                    id: activeResult.tryoutId,
                    name: activeResult.tryoutName,
                    duration: 0,
                    questions: activeResult.questions,
                    subject: "",
                    level: "",
                    questionCount: activeResult.questions.length,
                } }
                onExit={ handleExitReview }
                initialAnswers={ activeResult.answers }
                isReview={ true }
                date={ activeResult.date }
            />
        );
    }

    if ( isStarted && activeTryout )
    {
        return (
            <TryoutViewer
                tryout={ activeTryout }
                onExit={ handleExitTryout }
                date={ new Date().toLocaleString() }
            />
        );
    }

    if ( isPreviewing && activeTryout )
    {
        const thisHistory = history.filter( ( h ) => h.tryoutId === activeTryout.id );

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

    return (
        <Frame
            floatingButton={
                <AddButton onClick={ () => setIsModalOpen( true ) } title="Add Tryout" />
            }
        >
            <div
                className={ `flex-1 ${ tryouts.length === 0
                        ? "flex justify-center items-center"
                        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    }` }
            >
                { tryouts.length > 0 ? (
                    tryouts.map( ( t ) => (
                        <motion.div key={ t.id } whileHover={ { scale: 1.02 } }>
                            <TryoutCard
                                tryout={ t }
                                onOpen={ () => handleOpenTryout( t ) }
                                onEdit={ () => handleEditTryout( t ) }
                                onDelete={ () => removeTryout( t.id ) }
                            />
                        </motion.div>
                    ) )
                ) : (
                    <NoContentMessage message="No tryouts yet." />
                ) }
            </div>

            <TryoutModal
                isOpen={ isModalOpen }
                setIsOpen={ setIsModalOpen }
                onSubmit={ handleSaveTryout }
                editData={ editMode ? editTryout : null }
            />
        </Frame>
    );
}
