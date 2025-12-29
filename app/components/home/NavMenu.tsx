"use client";

import React from "react";

type Section = "home" | "tryout" | "course";

interface NavMenuProps
{
    activeSection: Section;
    setActiveSection: ( section: Section ) => void;
}

export default function NavMenu( { activeSection, setActiveSection }: NavMenuProps )
{
    return (
        <nav className="hidden md:flex items-center gap-6 mr-[150px]">
            <button
                onClick={ () => setActiveSection( "home" ) }
                className={ `text-m font-medium pb-1 inline-block transition-colors ${ activeSection === "home"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-700 hover:text-black"
                    }` }
            >
                Home
            </button>

            <button
                onClick={ () => setActiveSection( "course" ) }
                className={ `text-m font-medium pb-1 inline-block transition-colors ${ activeSection === "course"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-700 hover:text-black"
                    }` }
            >
                Course
            </button>

            <button
                onClick={ () => setActiveSection( "tryout" ) }
                className={ `text-m font-medium pb-1 inline-block transition-colors ${ activeSection === "tryout"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-700 hover:text-black"
                    }` }
            >
                TryOut
            </button>

           
        </nav>
    );
}
