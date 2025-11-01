"use client";

import React, { useState, useEffect} from "react";
import { Plus } from "lucide-react";
import AddButton from "../frame/AddButton";
import Frame from "../frame/Frame";
import CourseList, { CourseItem } from "./CourseList";
import CourseModal from "./CourseModal";

const STORAGE_KEY = "courses";

export default function Course()
{
    const [courses, setCourses] = useState<CourseItem[]>( [] );
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [newCourse, setNewCourse] = useState( { title: "", description: "" } );
    const [isLoaded, setIsLoaded] = useState( false );

    /* =============================
       LOAD DATA DARI LOCALSTORAGE
    ============================= */
    useEffect( () =>
    {
        if ( typeof window === "undefined" ) return;

        try
        {
            const raw = localStorage.getItem( STORAGE_KEY );
            if ( raw )
            {
                const parsed = JSON.parse( raw );
                if ( Array.isArray( parsed ) )
                {
                    setCourses( parsed );
                    console.log( "[Course] ✅ Loaded from localStorage:", parsed );
                }
            } else
            {
                console.log( "[Course] ℹ️ No existing data in localStorage" );
            }
        } catch ( err )
        {
            console.error( "[Course] ❌ Failed to parse localStorage:", err );
        } finally
        {
            setIsLoaded( true ); // ✅ tandai sudah selesai load
        }
    }, [] );

    /* =============================
       SIMPAN KE LOCALSTORAGE SETIAP PERUBAHAN
       — hanya setelah data pertama kali dimuat
    ============================= */
    useEffect( () =>
    {
        if ( !isLoaded ) return; // ✅ hindari overwrite saat awal
        try
        {
            localStorage.setItem( STORAGE_KEY, JSON.stringify( courses ) );
            console.log( "[Course] 💾 Saved to localStorage:", courses );
        } catch ( err )
        {
            console.error( "[Course] ❌ Failed to save:", err );
        }
    }, [courses, isLoaded] );

    /* =============================
       TAMBAH & HAPUS COURSE
    ============================= */
    const handleAddCourse = () =>
    {
        if ( !newCourse.title.trim() ) return;

        const newItem: CourseItem = {
            id: Date.now(),
            title: newCourse.title.trim(),
            description: newCourse.description.trim(),
        };

        setCourses( ( prev ) => [...prev, newItem] );
        setNewCourse( { title: "", description: "" } );
        setIsModalOpen( false );
    };

    const handleDeleteCourse = ( id: number ) =>
    {
        setCourses( ( prev ) => prev.filter( ( c ) => c.id !== id ) );
    };

    /* =============================
       RENDER
    ============================= */
    return (
        <Frame
            floatingButton={
                <AddButton
                    onClick={ () => setIsModalOpen( true ) }
                    title="Tambah Course"
                    icon={ <Plus size={ 24 } /> }
                />
            }
        >
            <div
                className="
          w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          flex flex-col items-start justify-start gap-8 mt-8 mb-10
        "
            >
                <CourseList courses={ courses } onDelete={ handleDeleteCourse } />
            </div>

            <CourseModal
                isOpen={ isModalOpen }
                onClose={ () => setIsModalOpen( false ) }
                onSave={ handleAddCourse }
                newCourse={ newCourse }
                setNewCourse={ setNewCourse }
            />
        </Frame>
    );
}
