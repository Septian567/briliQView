"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import katex from "katex";
import "katex/dist/katex.min.css";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic( () => import( "react-quill-new" ), { ssr: false } );

interface AddSubChapterProps
{
    chapterName: string;
    onAddSubChapter: ( chapterName: string, title: string, content: string ) => void;
}

export default function AddSubChapter( { chapterName, onAddSubChapter }: AddSubChapterProps )
{
    const [title, setTitle] = useState( "" );
    const [content, setContent] = useState( "" );

    useEffect( () =>
    {
        if ( typeof window !== "undefined" )
        {
            // ✅ Pastikan Quill bisa memanggil KaTeX
            ( window as any ).katex = katex;
        }
    }, [] );

    const handleSubmit = ( e: React.FormEvent ) =>
    {
        e.preventDefault();
        if ( !title.trim() ) return;
        onAddSubChapter( chapterName, title, content );
        setTitle( "" );
        setContent( "" );
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["code-block"],
            ["formula"], // aktifkan formula
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "link",
        "image",
        "video",
        "code-block",
        "formula",
    ];

    return (
        <form onSubmit={ handleSubmit } className="bg-white p-6 rounded-xl">
            <input
                type="text"
                value={ title }
                onChange={ ( e ) => setTitle( e.target.value ) }
                placeholder="Judul Sub Chapter"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
            />

            <ReactQuill
                theme="snow"
                value={ content }
                onChange={ setContent }
                modules={ modules }
                formats={ formats }
                placeholder="Tulis konten di sini (bisa gambar, rumus, video, dll.)"
                className="mb-4 min-h-[200px]"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Tambahkan
            </button>
        </form>
    );
}
