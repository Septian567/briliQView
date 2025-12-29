"use client";

import React, { useState, useEffect, useRef } from "react";
import katex from "katex";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";

interface UploadedFile
{
    file: File;
    previewUrl: string;
}

interface AddSubChapterListProps
{
    chapterName: string;
    onAddSubChapter: (
        chapterName: string,
        title: string,
        content: string
    ) => void;
}

export default function AddSubChapterList( {
    chapterName,
    onAddSubChapter,
}: AddSubChapterListProps )
{
    const [title, setTitle] = useState( "" );
    const [files, setFiles] = useState<UploadedFile[]>( [] );
    const [htmlContent, setHtmlContent] = useState( "" );

    const previewRef = useRef<HTMLDivElement | null>( null );

    // expose katex ke window
    useEffect( () =>
    {
        if ( typeof window !== "undefined" )
        {
            ( window as any ).katex = katex;
        }
    }, [] );

    const handleFileChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        if ( !e.target.files ) return;

        const newFiles: UploadedFile[] = Array.from( e.target.files ).map(
            ( file ) => ( {
                file,
                previewUrl: URL.createObjectURL( file ),
            } )
        );

        setFiles( ( prev ) => [...prev, ...newFiles] );
    };

    const insertFileHtml = ( file: UploadedFile ) =>
    {
        let snippet = "";

        if ( file.file.type.startsWith( "image" ) )
        {
            snippet = `<img src="${ file.previewUrl }" alt="${ file.file.name }" />`;
        } else if ( file.file.type.startsWith( "video" ) )
        {
            snippet = `<video src="${ file.previewUrl }" controls></video>`;
        }

        setHtmlContent( ( prev ) => prev + "\n" + snippet );
    };

    // render preview + KaTeX
    useEffect( () =>
    {
        if ( !previewRef.current ) return;

        previewRef.current.innerHTML = htmlContent;

        renderMathInElement( previewRef.current, {
            delimiters: [
                { left: "\\(", right: "\\)", display: false },
                { left: "\\[", right: "\\]", display: true },
            ],
            throwOnError: false,
        } );
    }, [htmlContent] );

    // 🔹 SUBMIT
    const handleSubmit = () =>
    {
        if ( title.trim() === "" ) return;

        onAddSubChapter( chapterName, title, htmlContent );

        // reset form
        setTitle( "" );
        setHtmlContent( "" );
        setFiles( [] );
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl space-y-6">
            {/* Judul */ }
            <input
                type="text"
                value={ title }
                onChange={ ( e ) => setTitle( e.target.value ) }
                placeholder="Judul Sub Chapter"
                className="w-full border border-gray-400 rounded-md px-3 py-2"
            />

            {/* Upload file */ }
            <div className="space-y-2">
                <label className="block text-sm font-medium">
                    File (gambar / video)
                </label>
                <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={ handleFileChange }
                    className="w-full border border-gray-400 rounded-md px-3 py-2"
                />
            </div>

            {/* File list */ }
            { files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        File ter-upload (klik untuk insert)
                    </p>
                    <ul className="list-disc ml-5 text-sm space-y-3">
                        { files.map( ( item, index ) => (
                            <li key={ index }>
                                <div
                                    className="cursor-pointer text-blue-600 hover:underline"
                                    onClick={ () => insertFileHtml( item ) }
                                >
                                    { item.file.name }
                                </div>
                                <div className="text-xs text-gray-600 break-all">
                                    { item.previewUrl }
                                </div>
                            </li>
                        ) ) }
                    </ul>
                </div>
            ) }

            {/* HTML Editor */ }
            <div className="space-y-2">
                <label className="block text-sm font-medium">
                    HTML Content
                </label>
                <textarea
                    rows={ 10 }
                    value={ htmlContent }
                    onChange={ ( e ) => setHtmlContent( e.target.value ) }
                    className="w-full border border-gray-400 rounded-md p-3 font-mono"
                    placeholder={ `<p>Rumus: \\(a^2 + b^2 = c^2\\)</p>` }
                />
            </div>

            {/* Preview */ }
            { htmlContent && (
                <div className="border rounded-md p-4">
                    <p className="text-sm font-medium mb-2">Preview</p>
                    <div ref={ previewRef } className="prose max-w-none" />
                </div>
            ) }

            {/* Submit */ }
            <div className="flex justify-end">
                <button
                    onClick={ handleSubmit }
                    className="border border-gray-600 px-6 py-2 rounded-md hover:bg-gray-100"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
