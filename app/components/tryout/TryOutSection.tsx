"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Tryout, useTryouts } from "../../hooks/tryout/useTryouts";
import TryoutModal from "./TryoutModal";
import TryoutViewer from "./TryoutViewer";
import TryoutCard from "./TryoutCard"; // 👈 komponen baru

/* ============================
   MAIN COMPONENT: TryoutSection
=============================== */
export default function TryoutSection()
{
    const [isModalOpen, setIsModalOpen] = useState( false );
    const [activeTryout, setActiveTryout] = useState<Tryout | null>( null );
    const { tryouts, addTryout, removeTryout } = useTryouts();

    return (
        <div className="relative w-full flex-1 bg-white flex flex-col overflow-hidden">
            {/* Jika sedang membuka tryout → tampilkan full-screen viewer */ }
            { activeTryout ? (
                <TryoutViewer
                    tryout={ activeTryout }
                    onExit={ () => setActiveTryout( null ) }
                />
            ) : (
                <>
                    {/* Tryout List */ }
                    <div
                        className={ `flex-1 p-6 sm:p-10 ${ tryouts.length === 0
                                ? "flex justify-center items-center"
                                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            }` }
                    >
                        { tryouts.length > 0 ? (
                            tryouts.map( ( t ) => (
                                <motion.div
                                    key={ t.id }
                                    whileHover={ { scale: 1.02 } }
                                >
                                    <TryoutCard
                                        tryout={ t }
                                        onOpen={ () => setActiveTryout( t ) }
                                        onDelete={ () => removeTryout( t.id ) }
                                    />
                                </motion.div>
                            ) )
                        ) : (
                            <p className="text-gray-500 text-center">No tryouts yet.</p>
                        ) }
                    </div>

                    {/* Floating Add Button */ }
                    <button
                        onClick={ () => setIsModalOpen( true ) }
                        className="fixed bottom-[88px] right-6 sm:bottom-[100px] sm:right-10 bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg rounded-full w-14 h-14 flex items-center justify-center transition-all"
                        title="Add Tryout"
                    >
                        <Plus size={ 28 } />
                    </button>

                    {/* Modal */ }
                    <TryoutModal
                        isOpen={ isModalOpen }
                        setIsOpen={ setIsModalOpen }
                        onSubmit={ ( newTryout: Tryout ) => addTryout( newTryout ) }
                    />
                </>
            ) }
        </div>
    );
}
