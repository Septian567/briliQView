"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const STORAGE_KEY = "activeSection";
export const SECTIONS = ["home", "tryout", "course"] as const;
export type SectionType = ( typeof SECTIONS )[number];

export function usePersistentSection(
    defaultValue: SectionType
): [SectionType, ( v: SectionType ) => void]
{
    const searchParams = useSearchParams();
    const [section, setSection] = useState<SectionType>( defaultValue );

    // 🔹 Sinkronisasi dari query param / localStorage
    useEffect( () =>
    {
        const query = searchParams.get( "tab" ) as SectionType | null;

        if ( query && SECTIONS.includes( query ) )
        {
            setSection( query );
            localStorage.setItem( STORAGE_KEY, query );
        } else
        {
            const saved = localStorage.getItem( STORAGE_KEY ) as SectionType | null;
            setSection( saved && SECTIONS.includes( saved ) ? saved : defaultValue );
        }
    }, [searchParams, defaultValue] );

    // 🔹 Update URL saat section berubah
    useEffect( () =>
    {
        const params = new URLSearchParams( window.location.search );
        params.set( "tab", section );
        const newUrl = `${ window.location.pathname }?${ params.toString() }`;
        window.history.replaceState( {}, "", newUrl );
    }, [section] );

    return [section, setSection];
}
