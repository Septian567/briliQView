"use client";

import React, { useState, useEffect, useRef } from "react";
import Card from "../frame/Card";
import NoContentMessage from "../frame/NoContentMessage";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

export interface CourseItem
{
    id: number;
    title: string;
    description: string;
}

interface CourseListProps
{
    courses: CourseItem[];
    onDelete: ( id: number ) => void;
    onEdit: ( course: CourseItem ) => void; // ✅ tambahan prop
}

export default function CourseList( { courses, onDelete, onEdit }: CourseListProps )
{
    const router = useRouter();

    const CourseCard = ( {
        course,
        onDelete,
        onEdit,
    }: {
        course: CourseItem;
        onDelete: ( id: number ) => void;
        onEdit: ( course: CourseItem ) => void;
    } ) =>
    {
        const [menuOpen, setMenuOpen] = useState( false );
        const menuRef = useRef<HTMLDivElement>( null );

        useEffect( () =>
        {
            const handleClickOutside = ( event: MouseEvent ) =>
            {
                if ( menuRef.current && !menuRef.current.contains( event.target as Node ) )
                {
                    setMenuOpen( false );
                }
            };
            document.addEventListener( "mousedown", handleClickOutside );
            return () => document.removeEventListener( "mousedown", handleClickOutside );
        }, [] );

        return (
            <Card
                onClick={ () => router.push( `/course/${ course.id }` ) }
                className="relative cursor-pointer hover:shadow-lg transition-all"
                actionButton={
                    <div className="relative" ref={ menuRef }>
                        <button
                            onClick={ ( e ) =>
                            {
                                e.stopPropagation();
                                setMenuOpen( ( prev ) => !prev );
                            } }
                            className="text-black hover:text-gray-700"
                            title="Opsi Course"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        { menuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                onClick={ ( e ) => e.stopPropagation() }
                            >
                                <button
                                    onClick={ () =>
                                    {
                                        onEdit( course ); // ✅ buka modal edit
                                        setMenuOpen( false );
                                    } }
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={ () =>
                                    {
                                        onDelete( course.id );
                                        setMenuOpen( false );
                                    } }
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Hapus
                                </button>
                            </div>
                        ) }
                    </div>
                }
            >
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        { course.title }
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm truncate">
                        { course.description || "Tidak ada deskripsi." }
                    </p>
                </div>
            </Card>
        );
    };

    if ( courses.length === 0 )
    {
        return <NoContentMessage message="Belum ada course." />;
    }

    return (
        <div
            className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-6 w-full
      "
        >
            { courses.map( ( course ) => (
                <CourseCard
                    key={ course.id }
                    course={ course }
                    onDelete={ onDelete }
                    onEdit={ onEdit }
                />
            ) ) }
        </div>
    );
}
