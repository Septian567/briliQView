"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AddButton from "../frame/AddButton";
import Frame from "../frame/Frame";
import CourseList, { CourseItem } from "./CourseList";
import CourseModal from "./CourseModal";
import DeleteConfirmModal from "../frame/DeleteConfirmModal";

const STORAGE_KEY = "courses";

export default function Course()
{
    const [courses, setCourses] = useState<CourseItem[]>( [] );
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [editingCourseId, setEditingCourseId] = useState<number | null>( null );
    const [newCourse, setNewCourse] = useState( { title: "", description: "" } );
    const [isLoaded, setIsLoaded] = useState( false );

    const [deleteTarget, setDeleteTarget] = useState<CourseItem | null>( null );
    const [confirmInput, setConfirmInput] = useState( "" );

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
            setIsLoaded( true );
        }
    }, [] );

    /* =============================
       SIMPAN KE LOCALSTORAGE
    ============================= */
    useEffect( () =>
    {
        if ( !isLoaded ) return;
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
       TAMBAH / EDIT COURSE
    ============================= */
    const handleSaveCourse = () =>
    {
        if ( !newCourse.title.trim() ) return;

        if ( editingCourseId )
        {
            // ✏️ Edit
            setCourses( ( prev ) =>
                prev.map( ( c ) =>
                    c.id === editingCourseId
                        ? { ...c, title: newCourse.title.trim(), description: newCourse.description.trim() }
                        : c
                )
            );
            setEditingCourseId( null );
        } else
        {
            // ➕ Tambah
            const newItem: CourseItem = {
                id: Date.now(),
                title: newCourse.title.trim(),
                description: newCourse.description.trim(),
            };
            setCourses( ( prev ) => [...prev, newItem] );
        }

        setNewCourse( { title: "", description: "" } );
        setIsModalOpen( false );
    };

    /* =============================
       HAPUS COURSE (PAKAI MODAL)
    ============================= */
    const handleDeleteCourse = ( id: number ) =>
    {
        const target = courses.find( ( c ) => c.id === id );
        if ( !target ) return;
        setDeleteTarget( target );
        setConfirmInput( "" );
    };

    const confirmDelete = () =>
    {
        if ( !deleteTarget ) return;
        setCourses( ( prev ) => prev.filter( ( c ) => c.id !== deleteTarget.id ) );
        setDeleteTarget( null );
        setConfirmInput( "" );
    };

    /* =============================
       EDIT COURSE
    ============================= */
    const handleEditCourse = ( course: CourseItem ) =>
    {
        setEditingCourseId( course.id );
        setNewCourse( { title: course.title, description: course.description } );
        setIsModalOpen( true );
    };

    /* =============================
       RENDER
    ============================= */
    return (
        <Frame
            floatingButton={
                <AddButton
                    onClick={ () =>
                    {
                        setEditingCourseId( null );
                        setNewCourse( { title: "", description: "" } );
                        setIsModalOpen( true );
                    } }
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
                <CourseList
                    courses={ courses }
                    onDelete={ handleDeleteCourse }
                    onEdit={ handleEditCourse }
                />
            </div>

            {/* Modal tambah/edit */ }
            <CourseModal
                isOpen={ isModalOpen }
                onClose={ () => setIsModalOpen( false ) }
                onSave={ handleSaveCourse }
                newCourse={ newCourse }
                setNewCourse={ setNewCourse }
            />

            {/* Modal konfirmasi hapus */ }
            <DeleteConfirmModal
                open={ !!deleteTarget }
                itemName={ deleteTarget?.title || "" }
                itemType="course"
                confirmInput={ confirmInput }
                setConfirmInput={ setConfirmInput }
                onClose={ () => setDeleteTarget( null ) }
                onConfirm={ confirmDelete }
            />
        </Frame>
    );
}
