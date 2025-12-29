"use client";

import React, { useState } from "react";

interface AddChapterProps
{
    onAdd: ( data: {
        title: string;
        grade: string;
        subject: string;
    } ) => void;
}

export default function AddChapter( { onAdd }: AddChapterProps )
{
    const [title, setTitle] = useState( "" );
    const [grade, setGrade] = useState( "" );
    const [subject, setSubject] = useState( "" );

    const handleSubmit = ( e: React.FormEvent ) =>
    {
        e.preventDefault();

        if ( !title || !grade || !subject )
        {
            alert( "All fields are required!" );
            return;
        }

        onAdd( {
            title,
            grade,
            subject,
        } );

        setTitle( "" );
        setGrade( "" );
        setSubject( "" );
    };

    return (
        <form onSubmit={ handleSubmit } className="space-y-6">
            {/* Chapter Title */ }
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Chapter Title
                </label>
                <input
                    type="text"
                    value={ title }
                    onChange={ ( e ) => setTitle( e.target.value ) }
                    placeholder="Enter chapter title..."
                    className="w-full border-b-2 border-gray-300 px-4 py-2 pl-0 focus:outline-none"
                />
            </div>

            {/* Grade */ }
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Grade
                </label>
                <select
                    value={ grade }
                    onChange={ ( e ) => setGrade( e.target.value ) }
                    className="w-full border-b-2 border-gray-300 px-4 py-2 pl-0 focus:outline-none bg-transparent"
                >
                    <option value="">Select Grade</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                </select>
            </div>

            {/* Subject */ }
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Subject
                </label>
                <select
                    value={ subject }
                    onChange={ ( e ) => setSubject( e.target.value ) }
                    className="w-full border-b-2 border-gray-300 px-4 py-2 pl-0 focus:outline-none bg-transparent"
                >
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Indonesian Language">Indonesian Language</option>
                    <option value="English">English</option>
                </select>
            </div>

            {/* Submit */ }
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Save
            </button>
        </form>
    );
}
