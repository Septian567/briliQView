import { useState, useEffect } from "react";

export interface Tryout
{
    id: number;
    name: string;
    subject: string;
    level: string;
    questionCount: number;
}

export function useTryouts()
{
    const [tryouts, setTryouts] = useState<Tryout[]>( [] );

    // Load from localStorage on mount
    useEffect( () =>
    {
        if ( typeof window === "undefined" ) return; // safety for SSR
        const saved = localStorage.getItem( "tryouts" );
        if ( saved )
        {
            try
            {
                setTryouts( JSON.parse( saved ) );
            } catch ( e )
            {
                console.error( "Failed to parse tryouts from localStorage:", e );
            }
        }
    }, [] );

    // Save to localStorage whenever tryouts change
    useEffect( () =>
    {
        if ( typeof window === "undefined" ) return; // safety for SSR
        localStorage.setItem( "tryouts", JSON.stringify( tryouts ) );
    }, [tryouts] );

    const addTryout = ( newTryout: Tryout ) =>
    {
        setTryouts( ( prev ) => [...prev, newTryout] );
    };

    const removeTryout = ( id: number ) =>
    {
        setTryouts( ( prev ) => prev.filter( ( t ) => t.id !== id ) );
    };

    return { tryouts, addTryout, removeTryout };
}
