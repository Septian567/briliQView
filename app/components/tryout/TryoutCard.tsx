"use client";

import React from "react";
import { Tryout } from "../../hooks/tryout/useTryouts";
import { X } from "lucide-react"; // import ikon X

interface TryoutCardProps
{
    tryout: Tryout;
    onOpen: () => void;
    onDelete: () => void;
}

/* ============================
   COMPONENT: TryoutCard
=============================== */
export default function TryoutCard( { tryout, onOpen, onDelete }: TryoutCardProps )
{
    return (
        <div
            className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer relative bg-white"
            onClick={ onOpen }
        >
            <h3 className="text-lg font-semibold text-gray-900 truncate">{ tryout.name }</h3>
            <p className="text-gray-600">Subject: { tryout.subject }</p>
            <p className="text-gray-600">Level: { tryout.level }</p>
            <p className="text-gray-600">Questions: { tryout.questionCount }</p>

            <button
                onClick={ ( e ) =>
                {
                    e.stopPropagation();
                    onDelete();
                } }
                className="absolute top-2 right-2 text-black hover:text-gray-700" // ubah warna menjadi hitam
                title="Delete Tryout"
            >
                <X className="w-5 h-5" /> {/* Ikon X dari Lucide */ }
            </button>
        </div>
    );
}
