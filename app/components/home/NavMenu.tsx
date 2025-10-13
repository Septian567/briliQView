"use client";

import React from "react";

interface NavMenuProps
{
    activeSection: "home" | "tryout";
    setActiveSection: React.Dispatch<React.SetStateAction<"home" | "tryout">>;
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
        </nav>
    );
}
