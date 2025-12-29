"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "chapters";
const SUBCHAPTER_KEY = "subChapters";

interface Chapter
{
    title: string;
    grade: string;
    subject: string;
}

interface SubChapter
{
    title: string;
    content: string;
}

export function useCourseActions()
{
    const [activeTab, setActiveTab] = useState<"tambah" | "daftar">( "tambah" );
    const [chapters, setChapters] = useState<Chapter[]>( [] );
    const [subChapters, setSubChapters] = useState<Record<string, SubChapter[]>>(
        {}
    );
    const [editIndex, setEditIndex] = useState<number | null>( null );
    const [editValue, setEditValue] = useState( "" );
    const [selectedChapter, setSelectedChapter] = useState<string | null>( null );
    const [initialized, setInitialized] = useState( false );

    // Load localStorage
    useEffect( () =>
    {
        try
        {
            const stored = localStorage.getItem( STORAGE_KEY );
            const storedSub = localStorage.getItem( SUBCHAPTER_KEY );
            if ( stored ) setChapters( JSON.parse( stored ) );
            if ( storedSub ) setSubChapters( JSON.parse( storedSub ) );
        } finally
        {
            setInitialized( true );
        }
    }, [] );

    // Save localStorage
    useEffect( () =>
    {
        if ( !initialized ) return;
        localStorage.setItem( STORAGE_KEY, JSON.stringify( chapters ) );
        localStorage.setItem( SUBCHAPTER_KEY, JSON.stringify( subChapters ) );
    }, [chapters, subChapters, initialized] );

    // ➕ Add Chapter
    const handleAddChapter = ( data: Chapter ) =>
    {
        if ( !data.title.trim() ) return;
        setChapters( ( prev ) => [...prev, data] );
        setActiveTab( "daftar" );
    };

    // ✏️ Edit Chapter
    const handleEditClick = ( index: number ) =>
    {
        setEditIndex( index );
        setEditValue( chapters[index].title );
    };

    const handleSaveEdit = ( index: number ) =>
    {
        if ( !editValue.trim() ) return;

        const oldTitle = chapters[index].title;

        const updated = [...chapters];
        updated[index] = {
            ...updated[index],
            title: editValue,
        };

        setChapters( updated );
        setEditIndex( null );

        if ( subChapters[oldTitle] )
        {
            const copy = { ...subChapters };
            copy[editValue] = copy[oldTitle];
            delete copy[oldTitle];
            setSubChapters( copy );
        }

        if ( selectedChapter === oldTitle )
        {
            setSelectedChapter( editValue );
        }
    };

    const handleCancelEdit = () =>
    {
        setEditIndex( null );
        setEditValue( "" );
    };

    // ❌ Delete Chapter
    const handleDelete = ( index: number ) =>
    {
        const deletedTitle = chapters[index].title;
        setChapters( ( prev ) => prev.filter( ( _, i ) => i !== index ) );

        const copy = { ...subChapters };
        delete copy[deletedTitle];
        setSubChapters( copy );

        if ( selectedChapter === deletedTitle )
        {
            setSelectedChapter( null );
        }
    };

    // 📘 Select Chapter
    const handleSelectChapter = ( title: string ) =>
    {
        setSelectedChapter( ( prev ) => ( prev === title ? null : title ) );
        setActiveTab( "daftar" );
    };

    // ➕ Add SubChapter
    const handleAddSubChapter = (
        chapterTitle: string,
        title: string,
        content: string
    ) =>
    {
        if ( !title.trim() ) return;
        setSubChapters( ( prev ) => ( {
            ...prev,
            [chapterTitle]: [...( prev[chapterTitle] || [] ), { title, content }],
        } ) );
        setActiveTab( "daftar" );
    };

    const handleEditSubChapter = (
        chapterTitle: string,
        index: number,
        title: string,
        content: string
    ) =>
    {
        setSubChapters( ( prev ) =>
        {
            const list = [...( prev[chapterTitle] || [] )];
            list[index] = { title, content };
            return { ...prev, [chapterTitle]: list };
        } );
    };

    const handleDeleteSubChapter = ( chapterTitle: string, index: number ) =>
    {
        setSubChapters( ( prev ) => ( {
            ...prev,
            [chapterTitle]: prev[chapterTitle].filter( ( _, i ) => i !== index ),
        } ) );
    };

    const handleBackToMain = () =>
    {
        setSelectedChapter( null );
        setActiveTab( "daftar" );
    };

    return {
        activeTab,
        setActiveTab,
        chapters,
        editIndex,
        editValue,
        setEditValue,
        selectedChapter,
        subChapters,
        addLabel: selectedChapter ? "Tambah Sub Chapter" : "Tambah Chapter",
        listLabel: selectedChapter ? "Daftar Isi" : "Daftar Chapter",
        handleAddChapter,
        handleEditClick,
        handleSaveEdit,
        handleCancelEdit,
        handleDelete,
        handleSelectChapter,
        handleAddSubChapter,
        handleEditSubChapter,
        handleDeleteSubChapter,
        handleBackToMain,
    };
}
