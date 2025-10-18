import { useState, useEffect } from "react";

export interface Question
{
    No: string;
    Question: string;
    "Option A": string;
    "Option B": string;
    "Option C": string;
    "Option D": string;
    "Correct Answer": string;
}

export interface Tryout
{
    id: string; // ✅ ubah dari number → string
    name: string;
    subject: string;
    level: string;
    questionCount: number;
    questions?: Question[];
    duration?: number;
}

export function useTryouts()
{
    const [tryouts, setTryouts] = useState<Tryout[]>( () =>
    {
        if ( typeof window === "undefined" ) return [];

        try
        {
            const saved = localStorage.getItem( "tryouts" );
            return saved ? JSON.parse( saved ) : [];
        } catch ( e )
        {
            console.error( "Failed to load tryouts:", e );
            return [];
        }
    } );

    // Save to localStorage whenever tryouts change
    useEffect( () =>
    {
        if ( typeof window === "undefined" ) return;
        localStorage.setItem( "tryouts", JSON.stringify( tryouts ) );
    }, [tryouts] );

    const addTryout = ( newTryout: Tryout ) =>
    {
        setTryouts( prev => [...prev, newTryout] );
    };

    const removeTryout = ( id: string ) =>
    {
        setTryouts( prev => prev.filter( t => t.id !== id ) );
    };

    return { tryouts, addTryout, removeTryout };
}
