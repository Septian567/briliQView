"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ItemProps
{
    icon: React.ReactNode;
    title: string;
    children?: React.ReactNode;
}

export default function Item( { icon, title, children }: ItemProps )
{
    const [open, setOpen] = useState( false );

    return (
        <div className="border-b last:border-b-0">
            {/* HEADER */ }
            <button
                onClick={ () => setOpen( !open ) }
                className="w-full flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition"
            >
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-blue-600 shrink-0">
                        { icon }
                    </div>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        { title }
                    </span>
                </div>

                <ChevronDown
                    size={ 18 }
                    className={ `text-gray-400 transition-transform ${ open ? "rotate-180" : "" }` }
                />
            </button>

            {/* DROPDOWN */ }
            { open && children && (
                <div className="pl-12 sm:pl-16 pr-3 sm:pr-4 pb-4 space-y-2 text-sm text-gray-700">
                    { children }
                </div>
            ) }
        </div>
    );
}
