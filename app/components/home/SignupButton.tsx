"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SignupButtonProps
{
    variant?: "desktop" | "mobile";
    onClick?: () => void;
}

export default function SignupButton( { variant = "desktop", onClick }: SignupButtonProps )
{
    const router = useRouter();

    const handleClick = () =>
    {
        router.push( "/signup" );
        if ( onClick ) onClick();
    };

    if ( variant === "mobile" )
    {
        return (
            <button
                onClick={ handleClick }
                className="flex-1 text-center text-yellow-400 border border-yellow-400 hover:bg-yellow-50 px-4 py-2 rounded font-medium transition-colors"
            >
                Daftar
            </button>
        );
    }

    return (
        <button
            onClick={ handleClick }
            className="text-m font-medium bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded transition-colors"
        >
            SignUp
        </button>
    );
}
