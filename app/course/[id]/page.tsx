"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import CourseHeader from "../../components/course/CourseHeader";
import CourseView from "../../components/course/view/CourseView";
import CourseActions from "../../components/course/actions/CourseActions";

export default function CourseDetail()
{
    const { id } = useParams();
    const [activeMenu, setActiveMenu] = useState<"view" | "actions">( "view" );
    const [showHeader, setShowHeader] = useState( true );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */ }
            { showHeader && (
                <CourseHeader activeMenu={ activeMenu } setActiveMenu={ setActiveMenu } />
            ) }

            {/* MAIN CONTENT */ }
            <main
                className="
                    flex-1 
                    w-full 
                    max-w-screen-xl 
                    mx-auto 
                    px-4 
                    sm:px-6 
                    md:px-8 
                    lg:px-12 
                    xl:px-16 
                    mt-6 
                    sm:mt-8 
                    mb-10
                "
            >
                { activeMenu === "view" && <CourseView id={ id } /> }
                { activeMenu === "actions" && (
                    <CourseActions
                        showHeader={ showHeader }
                        setShowHeader={ setShowHeader }
                    />
                ) }
            </main>
        </div>
    );
}
