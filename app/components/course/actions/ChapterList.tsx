"use client";

import React from "react";
import DeleteChapter from "./DeleteChapter";

interface Chapter
{
    title: string;
    grade: string;
    subject: string;
}

interface ChapterListProps
{
    chapters: Chapter[];
    editIndex: number | null;
    editValue: string;
    onEditClick: ( index: number ) => void;
    onEditChange: ( value: string ) => void;
    onSaveEdit: ( index: number ) => void;
    onCancelEdit: () => void;
    onDelete: ( index: number ) => void;
    onSelect: ( chapterTitle: string ) => void;
    selectedChapter: string | null;
}

export default function ChapterList( {
    chapters,
    editIndex,
    editValue,
    onEditClick,
    onEditChange,
    onSaveEdit,
    onCancelEdit,
    onDelete,
    onSelect,
    selectedChapter,
}: ChapterListProps )
{
    const totalRows = Math.max( chapters.length, 10 );
    const rows = Array.from( { length: totalRows }, ( _, i ) => chapters[i] || null );

    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-[800px] w-full table-fixed border-collapse border border-black">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-black px-3 py-2 text-center w-12">
                            No
                        </th>
                        <th className="border border-black px-3 py-2 w-32">
                            Class
                        </th>
                        <th className="border border-black px-3 py-2 w-40">
                            Subject
                        </th>
                        <th className="border border-black px-3 py-2 w-[300px]">
                            Chapter
                        </th>
                        <th className="border border-black px-3 py-2 text-center w-40">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    { rows.map( ( chapter, index ) =>
                    {
                        const isEditing = editIndex === index;
                        const isSelected =
                            chapter && selectedChapter === chapter.title;

                        return (
                            <tr
                                key={ index }
                                className={ `even:bg-gray-50 ${ isSelected ? "bg-blue-50" : ""
                                    }` }
                            >
                                <td className="border border-black px-3 py-2 text-center">
                                    { index + 1 }
                                </td>

                                <td className="border border-black px-3 py-2 text-sm truncate">
                                    { chapter?.grade || "" }
                                </td>

                                <td className="border border-black px-3 py-2 text-sm truncate">
                                    { chapter?.subject || "" }
                                </td>

                                <td
                                    className={ `border border-black px-3 py-2 text-sm ${ chapter
                                        ? "cursor-pointer hover:bg-gray-100"
                                        : "text-gray-400"
                                        }` }
                                    onClick={ () =>
                                    {
                                        if ( !chapter || isEditing ) return;
                                        onSelect( chapter.title );
                                    } }
                                >
                                    { isEditing ? (
                                        <input
                                            value={ editValue }
                                            onChange={ ( e ) =>
                                                onEditChange( e.target.value )
                                            }
                                            onKeyDown={ ( e ) =>
                                            {
                                                if ( e.key === "Enter" )
                                                    onSaveEdit( index );
                                                if ( e.key === "Escape" )
                                                    onCancelEdit();
                                            } }
                                            autoFocus
                                            className="
                                                w-full
                                                bg-transparent
                                                outline-none
                                                border-none
                                                p-0
                                                text-sm
                                            "
                                        />
                                    ) : (
                                        <span className="block truncate">
                                            { chapter?.title || "" }
                                        </span>
                                    ) }
                                </td>

                                <td className="border border-black px-3 py-2 text-center">
                                    { chapter &&
                                        ( isEditing ? (
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={ onCancelEdit }
                                                    className="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    onClick={ () =>
                                                        onSaveEdit( index )
                                                    }
                                                    className="bg-green-200 px-3 py-1 rounded-full text-sm hover:bg-green-300"
                                                >
                                                    Simpan
                                                </button>

                                            </div>
                                        ) : (
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={ ( e ) =>
                                                    {
                                                        e.stopPropagation();
                                                        onEditClick( index );
                                                    } }
                                                    className="bg-yellow-200 px-3 py-1 rounded-full text-sm hover:bg-yellow-300"
                                                >
                                                    Edit
                                                </button>
                                                <DeleteChapter
                                                    itemName={ chapter.title }
                                                    onDelete={ () =>
                                                        onDelete( index )
                                                    }
                                                />
                                            </div>
                                        ) ) }
                                </td>
                            </tr>
                        );
                    } ) }
                </tbody>
            </table>
        </div>
    );
}
