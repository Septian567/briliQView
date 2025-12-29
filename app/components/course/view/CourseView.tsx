"use client";

import React, { useState } from "react";
import StudentLevel from "./StudentLevel";
import StudentSubject from "./StudentSubject";

interface CourseViewProps
{
    id: string | string[] | undefined;
}

export default function CourseView( { id }: CourseViewProps )
{
    const [selectedLevel, setSelectedLevel] = useState<string | null>( null );

    return (
        <div className="bg-white shadow-sm rounded-xl p-8 space-y-6">
            {/* Student Level */ }
            <StudentLevel onSelect={ setSelectedLevel } />

            {/* Student Subject */ }
            { selectedLevel && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Mata Pelajaran { selectedLevel }
                    </h3>
                    <StudentSubject />
                </div>
            ) }
        </div>
    );
}
