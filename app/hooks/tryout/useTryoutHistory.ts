"use client";

import { useState, useEffect } from "react";

export interface TryoutHistory
{
    id: string;
    tryoutId: string;
    tryoutName: string;
    score: number;
    total: number;
    timestamp: string;
    answers: Record<number, string>;
    questions: any[];
}

export function useTryoutHistory()
{
    const [history, setHistory] = useState<TryoutHistory[]>( [] );

    useEffect( () =>
    {
        const saved = localStorage.getItem( "tryout_history" );
        if ( saved ) setHistory( JSON.parse( saved ) );
    }, [] );

    const saveHistory = ( entry: TryoutHistory ) =>
    {
        const updated = [...history, entry];
        setHistory( updated );
        localStorage.setItem( "tryout_history", JSON.stringify( updated ) );
    };

    const clearHistory = () =>
    {
        setHistory( [] );
        localStorage.removeItem( "tryout_history" );
    };

    return { history, saveHistory, clearHistory };
}
