"use client";

import React, { useState } from "react";

interface EditSubChapterProps
{
    index: number;
    initialTitle: string;
    initialContent: string;
    onSave: ( index: number, newTitle: string, newContent: string ) => void;
    onCancel: () => void;
}

export default function EditSubChapter( {
    index,
    initialTitle,
    initialContent,
    onSave,
    onCancel,
}: EditSubChapterProps )
{
    const [title, setTitle] = useState( initialTitle );
    const [content, setContent] = useState( initialContent );

    return (
        <div className="flex-1">
            <input
                type="text"
                value={ title }
                onChange={ ( e ) => setTitle( e.target.value ) }
                placeholder="Judul Sub Chapter"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-2"
            />
            <textarea
                value={ content }
                onChange={ ( e ) => setContent( e.target.value ) }
                rows={ 3 }
                placeholder="Isi Sub Chapter"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
            />
            <div className="flex space-x-2">
                <button
                    onClick={ () => onSave( index, title, content ) }
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                >
                    Simpan
                </button>
                <button
                    onClick={ onCancel }
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                >
                    Batal
                </button>
            </div>
        </div>
    );
}
