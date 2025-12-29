"use client";

import React, { useRef, useEffect, useState } from "react";
import { Settings, ArrowLeft } from "lucide-react";

interface ChapterHeaderProps
{
    selectedChapter: string | null;
    showHeader: boolean;
    setShowHeader: ( show: boolean ) => void;
    onBackToMain: () => void;
}

export default function ChapterHeader( {
    selectedChapter,
    showHeader,
    setShowHeader,
    onBackToMain,
}: ChapterHeaderProps )
{
    const [settingsOpen, setSettingsOpen] = useState( false );
    const settingsRef = useRef<HTMLDivElement>( null );

    useEffect( () =>
    {
        const handleClickOutside = ( event: MouseEvent ) =>
        {
            if ( settingsRef.current && !settingsRef.current.contains( event.target as Node ) )
            {
                setSettingsOpen( false );
            }
        };
        document.addEventListener( "mousedown", handleClickOutside );
        return () => document.removeEventListener( "mousedown", handleClickOutside );
    }, [] );

    return (
        <div className="flex items-center justify-between relative w-full">
            {/* Left Side (Title) */ }
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate">
                { selectedChapter || "Main" }
            </h2>

            {/* Right Side (Back + Settings) */ }
            <div
                className="flex items-center gap-2 sm:gap-3 relative"
                ref={ settingsRef }
            >
                { selectedChapter && (
                    <>
                        {/* Mobile: icon only */ }
                        <button
                            onClick={ onBackToMain }
                            className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                            title="Kembali ke Main"
                        >
                            <ArrowLeft size={ 20 } className="text-blue-600" />
                        </button>

                        {/* Desktop: text button */ }
                        <button
                            onClick={ onBackToMain }
                            className="hidden sm:inline-flex text-sm text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition items-center justify-center"
                        >
                            Kembali ke Main
                        </button>
                    </>
                ) }

                {/* Settings Icon */ }
                <button
                    onClick={ () => setSettingsOpen( ( prev ) => !prev ) }
                    className="p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                    title="Pengaturan"
                >
                    <Settings size={ 22 } className="text-gray-700" />
                </button>

                {/* Settings Dropdown */ }
                { settingsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md z-20">
                        <button
                            onClick={ () =>
                            {
                                setShowHeader( !showHeader );
                                setSettingsOpen( false );
                            } }
                            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition rounded-lg"
                        >
                            { showHeader ? "Sembunyikan Header" : "Tampilkan Header" }
                        </button>
                    </div>
                ) }
            </div>
        </div>
    );
}
