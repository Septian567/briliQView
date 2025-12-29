"use client";

import { useState, useEffect, useRef } from "react";
import katex from "katex";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";

export interface UploadedFile
{
    file: File;
    previewUrl: string;
}

export function useAddSubChapter()
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

    const resetForm = () =>
    {
        setTitle( "" );
        setHtmlContent( "" );
        setFiles( [] );
    };

    return {
        title,
        setTitle,
        files,
        htmlContent,
        setHtmlContent,
        previewRef,
        handleFileChange,
        insertFileHtml,
        resetForm,
    };
}
