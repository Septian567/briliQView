"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Tryout, useTryouts } from "../../hooks/tryout/useTryouts";
import TryoutModal from "./TryoutModal";

export default function TryoutSection()
{
    const [isModalOpen, setIsModalOpen] = useState( false );
    const { tryouts, addTryout, removeTryout } = useTryouts();

    return (
        <div
            className={ `relative w-full min-h-[calc(100vh-200px)] bg-white p-6 sm:p-10 flex flex-col ${ tryouts.length === 0 ? "justify-center items-center" : ""
                }` }
        >
            {/* Tryout List */ }
            { tryouts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    { tryouts.map( ( t ) => (
                        <motion.div
                            key={ t.id }
                            className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer relative"
                            whileHover={ { scale: 1.02 } }
                        >
                            <h3 className="text-lg font-semibold text-gray-900">{ t.name }</h3>
                            <p className="text-gray-600">Subject: { t.subject }</p>
                            <p className="text-gray-600">Level: { t.level }</p>
                            <p className="text-gray-600">Questions: { t.questionCount }</p>

                            {/* Delete Button */ }
                            <button
                                onClick={ () => removeTryout( t.id ) }
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                                title="Delete Tryout"
                            >
                                ×
                            </button>
                        </motion.div>
                    ) ) }
                </div>
            ) : (
                <p className="text-gray-500 text-center mb-20">No tryouts yet.</p>
            ) }

            {/* Floating Add Button */ }
            <button
                onClick={ () => setIsModalOpen( true ) }
                className="fixed bottom-20 right-6 sm:bottom-24 sm:right-10 bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition-all"
                title="Add Tryout"
            >
                <Plus size={ 28 } />
            </button>

            {/* Modal Component */ }
            <TryoutModal
                isOpen={ isModalOpen }
                setIsOpen={ setIsModalOpen }
                onSubmit={ ( newTryout: Tryout ) => addTryout( newTryout ) }
            />
        </div>
    );
}
