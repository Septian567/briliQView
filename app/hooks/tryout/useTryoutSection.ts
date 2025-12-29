import { useState } from "react";
import { Tryout, useTryouts } from "./useTryouts";

export interface TryoutResult
{
    tryoutId: string;
    tryoutName: string;
    score: number;
    total: number;
    answers: Record<number, string>;
    date: string;
    questions: any[];
}

export function useTryoutSection()
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

    const handleExitPreview = () =>
    {
        setIsPreviewing( false );
        setActiveTryout( null );
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
            const updatedList = tryouts.map( ( tr ) =>
                tr.id === editTryout.id ? updated : tr
            );
            localStorage.setItem( "tryouts", JSON.stringify( updatedList ) );
            window.location.reload();
        } else
        {
            addTryout( updated );
        }
        setIsModalOpen( false );
        setEditMode( false );
        setEditTryout( null );
    };

    return {
        tryouts,
        isModalOpen,
        setIsModalOpen,
        editMode,
        editTryout,
        activeTryout,
        isPreviewing,
        isStarted,
        history,
        activeResult,
        handleOpenTryout,
        handleStartTryout,
        handleExitTryout,
        handleReviewResult,
        handleExitReview,
        handleEditTryout,
        handleSaveTryout,
        removeTryout,
        handleExitPreview
    };
}
