"use client";

import React, { useState, useEffect, useRef } from "react";
import DeleteSubChapter from "./DeleteSubChapter";
import EditSubChapter from "./EditSubChapter";
import katex from "katex";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";

interface SubChapterListProps
{
    chapterName: string;
    subChapters: Record<string, { title: string; content: string }[]>;
    onEditSubChapter: (
        chapterName: string,
        index: number,
        newTitle: string,
        newContent: string
    ) => void;
    onDeleteSubChapter: ( chapterName: string, index: number ) => void;
}

export default function SubChapterList( {
    chapterName,
    subChapters,
    onEditSubChapter,
    onDeleteSubChapter,
}: SubChapterListProps )
{
    const list = subChapters[chapterName] || [];

    const [editIndex, setEditIndex] = useState<number | null>( null );
    const [selectedIndex, setSelectedIndex] = useState<number | null>( null );

    const detailRef = useRef<HTMLDivElement | null>( null );

    // expose katex ke window
    useEffect( () =>
    {
        if ( typeof window !== "undefined" )
        {
            ( window as any ).katex = katex;
        }
    }, [] );

    // render KaTeX di detail view
    useEffect( () =>
    {
        if ( selectedIndex === null || !detailRef.current ) return;

        renderMathInElement( detailRef.current, {
            delimiters: [
                { left: "\\(", right: "\\)", display: false },
                { left: "\\[", right: "\\]", display: true },
            ],
            throwOnError: false,
        } );
    }, [selectedIndex, list] );

    // 🔒 MASUK MODE EDIT → KUNCI NAVIGASI
    const handleEdit = ( index: number ) =>
    {
        setSelectedIndex( null ); // tutup detail jika terbuka
        setEditIndex( index );
    };

    const handleSave = (
        index: number,
        newTitle: string,
        newContent: string
    ) =>
    {
        if ( newTitle.trim() === "" ) return;
        onEditSubChapter( chapterName, index, newTitle, newContent );
        setEditIndex( null );
    };

    const handleCancel = () =>
    {
        setEditIndex( null );
    };

    // 🔒 Cegah pindah sub chapter saat edit aktif
    const handleSelect = ( index: number ) =>
    {
        if ( editIndex !== null ) return;
        setSelectedIndex( prev => ( prev === index ? null : index ) );
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Daftar Sub Chapter dari{ " " }
                <span className="text-blue-600">{ chapterName }</span>
            </h3>

            {/* 🔹 DETAIL VIEW (DILARANG SAAT EDIT) */ }
            { selectedIndex !== null && editIndex === null ? (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-2xl font-bold text-gray-800">
                            { list[selectedIndex].title }
                        </h4>
                        <button
                            disabled={ editIndex !== null }
                            onClick={ () => setSelectedIndex( null ) }
                            className={ `text-sm px-3 py-1 rounded-full transition
                                ${ editIndex !== null
                                    ? "text-gray-400 border border-gray-300 cursor-not-allowed"
                                    : "text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white"
                                }` }
                        >
                            Kembali ke daftar
                        </button>
                    </div>

                    <div
                        ref={ detailRef }
                        className="text-gray-700 leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={ {
                            __html:
                                list[selectedIndex].content ||
                                "<p>Tidak ada konten.</p>",
                        } }
                    />
                </div>
            ) : list.length === 0 ? (
                <p className="text-gray-500">Belum ada sub chapter.</p>
            ) : (
                /* 🔹 LIST VIEW */
                <ul className="space-y-3">
                    { list.map( ( sub, i ) => (
                        <li
                            key={ i }
                            className={ `flex justify-between items-center bg-white rounded-xl shadow-sm p-4 transition
                                ${ editIndex !== null
                                    ? "cursor-not-allowed opacity-70"
                                    : "cursor-pointer hover:shadow-md"
                                }` }
                            onClick={ () => handleSelect( i ) }
                        >
                            { editIndex === i ? (
                                <EditSubChapter
                                    index={ i }
                                    initialTitle={ sub.title }
                                    initialContent={ sub.content }
                                    onSave={ handleSave }
                                    onCancel={ handleCancel }
                                />
                            ) : (
                                <>
                                    <h4 className="font-medium text-gray-800">
                                        { sub.title }
                                    </h4>
                                    <div
                                        className="flex space-x-2"
                                        onClick={ e => e.stopPropagation() }
                                    >
                                        <button
                                            disabled={ editIndex !== null }
                                            onClick={ () => handleEdit( i ) }
                                            className={ `px-3 py-1 rounded-full text-sm font-medium transition
                                                ${ editIndex !== null
                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    : "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
                                                }` }
                                        >
                                            Edit
                                        </button>
                                        <DeleteSubChapter
                                            itemName={ sub.title }
                                            onDelete={ () =>
                                                onDeleteSubChapter(
                                                    chapterName,
                                                    i
                                                )
                                            }
                                        />
                                    </div>
                                </>
                            ) }
                        </li>
                    ) ) }
                </ul>
            ) }
        </div>
    );
}
