"use client";

import React from "react";
import { Plus } from "lucide-react";

interface AddButtonProps
{
    onClick: () => void;
    title?: string;
    icon?: React.ReactNode;
    position?: "floating" | "inline"; // floating = default
    className?: string; // tambahan styling
}

export default function AddButton( {
    onClick,
    title = "Add",
    icon = <Plus size={ 28 } />,
    position = "floating",
    className = "",
}: AddButtonProps )
{
    const baseStyles =
        "bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg rounded-full flex items-center justify-center transition-all";

    const positionStyles =
        position === "floating"
            ? "fixed bottom-[88px] right-6 sm:bottom-[100px] sm:right-10 w-14 h-14" // ukuran tetap
            : "inline-flex w-auto h-auto px-4 py-2 rounded-2xl"; // inline / toolbar

    return (
        <button
            onClick={ onClick }
            title={ title }
            className={ `${ baseStyles } ${ positionStyles } ${ className }` }
        >
            { icon }
        </button>
    );
}
