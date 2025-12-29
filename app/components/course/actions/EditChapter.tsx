"use client";

import React, { useRef, useEffect } from "react";

interface EditChapterProps
{
    value: string;
    onChange: ( val: string ) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function EditChapter( {
    value,
    onChange,
    onSave,
    onCancel,
}: EditChapterProps )
{
    const inputRef = useRef<HTMLInputElement | null>( null );
    const containerRef = useRef<HTMLDivElement | null>( null );

    // Klik di luar area edit untuk batal
    useEffect( () =>
    {
        function handleClickOutside( event: MouseEvent )
        {
            const target = event.target as Node;
            if ( containerRef.current && !containerRef.current.contains( target ) )
            {
                onCancel();
            }
        }

        document.addEventListener( "mousedown", handleClickOutside );
        return () =>
        {
            document.removeEventListener( "mousedown", handleClickOutside );
        };
    }, [onCancel] );

    return (
        <div ref={ containerRef } className="flex items-center space-x-2 w-full">
            <input
                ref={ inputRef }
                type="text"
                value={ value }
                onChange={ ( e ) => onChange( e.target.value ) }
                autoFocus
                className="flex-1 px-2 py-1 bg-transparent border-none focus:outline-none text-gray-800"
            />
            <button
                onClick={ onSave }
                className="bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-yellow-300 transition"
            >
                Simpan
            </button>
            <button
                onClick={ onCancel }
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-300 transition"
            >
                Batal
            </button>
        </div>
    );
}
