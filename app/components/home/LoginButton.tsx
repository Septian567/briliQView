"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps
{
    variant?: "desktop" | "mobile";
    onClick?: () => void;
}

export default function LoginButton( { variant = "desktop", onClick }: LoginButtonProps )
{
    const router = useRouter();

    const handleClick = () =>
    {
        router.push( "/login" );
        if ( onClick ) onClick();
    };

    if ( variant === "mobile" )
    {
        return (
            <button
                onClick={ handleClick }
                className="flex-1 text-center text-black bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-medium transition-colors"
            >
                Masuk
            </button>
        );
    }

    return (
        <button
            onClick={ handleClick }
            className="text-sm font-medium text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
        >
            Login
        </button>
    );
}
