"use client";

import React from "react";
import Card from "../frame/Card";
import NoContentMessage from "../frame/NoContentMessage";
import { X } from "lucide-react";
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
}

export default function CourseList( { courses, onDelete }: CourseListProps )
{
    const router = useRouter();

    const CourseCard = ( {
        course,
        onDelete,
    }: {
        course: CourseItem;
        onDelete: ( id: number ) => void;
    } ) => (
        <Card
            onClick={ () => router.push( `/course/${ course.id }` ) }
            className="cursor-pointer hover:shadow-lg transition-all"
            actionButton={
                <button
                    onClick={ ( e ) =>
                    {
                        e.stopPropagation();
                        onDelete( course.id );
                    } }
                    className="text-black hover:text-gray-700"
                    title="Hapus Course"
                >
                    <X className="w-5 h-5" />
                </button>
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
            <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600 text-sm italic">
                    Course ID: { course.id }
                </p>
            </div>
        </Card>
    );

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
                <CourseCard key={ course.id } course={ course } onDelete={ onDelete } />
            ) ) }
        </div>
    );
}
