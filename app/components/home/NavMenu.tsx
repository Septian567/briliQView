"use client";

import React from "react";

interface NavMenuProps
{
    activeSection: "home" | "tryout" | "course" | null;
    setActiveSection: React.Dispatch<React.SetStateAction<"home" | "tryout" | "course" | null>>;
}

export default function NavMenu( { activeSection, setActiveSection }: NavMenuProps )
{
    return (
        <nav className="hidden md:flex items-center gap-6 mr-[150px]">
            <button
                onClick={ () => setActiveSection( "home" ) }
                className={ `text-sm font-medium pb-1 inline-block transition-colors ${ activeSection === "home"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-700 hover:text-black"
                    }` }
            >
                Home
            </button>

            <button
                onClick={ () => setActiveSection( "tryout" ) }
                className={ `text-sm font-medium pb-1 inline-block transition-colors ${ activeSection === "tryout"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-700 hover:text-black"
                    }` }
            >
                TryOut
            </button>

            <button
                onClick={ () => setActiveSection( "course" ) }
                className={ `text-sm font-medium pb-1 inline-block transition-colors ${ activeSection === "course"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-700 hover:text-black"
                    }` }
            >
                Course
            </button>
        </nav>
    );
}
