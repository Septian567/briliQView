"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Eye, Wrench, ChevronRight, ArrowLeft } from "lucide-react";

interface CourseHeaderProps
{
    activeMenu: "view" | "actions";
    setActiveMenu: ( menu: "view" | "actions" ) => void;
}

export default function CourseHeader( { activeMenu, setActiveMenu }: CourseHeaderProps )
{
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState( false );

    const handleBackToCourse = () =>
    {
        router.push( "/?tab=course" );
    };

    return (
        <header className="w-full flex flex-col bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="flex justify-between items-center h-16 sm:h-20 px-6 sm:px-12">
                {/* Left: Back Button + Title */ }
                <div className="flex items-center gap-3 h-full">
                    <button
                        onClick={ handleBackToCourse }
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        title="Kembali ke Course"
                    >
                        <ArrowLeft size={ 22 } className="text-gray-700" />
                    </button>

                    <div
                        className="flex items-center gap-2 cursor-pointer select-none"
                        onClick={ () => router.push( "/" ) }
                    >
                        <span className="text-xl sm:text-2xl font-semibold text-gray-800">
                            Course Setup
                        </span>
                    </div>
                </div>

                {/* Hamburger */ }
                <div className="md:hidden">
                    <button
                        onClick={ () => setMobileMenuOpen( !mobileMenuOpen ) }
                        className="text-gray-700"
                    >
                        { mobileMenuOpen ? <X size={ 24 } /> : <Menu size={ 24 } /> }
                    </button>
                </div>

                {/* Desktop Menu */ }
                <nav className="hidden md:flex gap-6 text-gray-700">
                    <button
                        onClick={ () => setActiveMenu( "view" ) }
                        className={ `flex items-center gap-2 font-medium transition-colors ${ activeMenu === "view"
                                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                                : "hover:text-blue-600"
                            }` }
                    >
                        <Eye size={ 18 } />
                        View
                    </button>
                    <button
                        onClick={ () => setActiveMenu( "actions" ) }
                        className={ `flex items-center gap-2 font-medium transition-colors ${ activeMenu === "actions"
                                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                                : "hover:text-blue-600"
                            }` }
                    >
                        <Wrench size={ 18 } />
                        Actions
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */ }
            { mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="flex flex-col divide-y divide-gray-200">
                        {/* View */ }
                        <button
                            onClick={ () =>
                            {
                                setActiveMenu( "view" );
                                setMobileMenuOpen( false );
                            } }
                            className={ `flex items-center justify-between px-6 py-4 transition-colors ${ activeMenu === "view"
                                    ? "bg-gray-100 font-semibold"
                                    : "hover:bg-gray-50"
                                }` }
                        >
                            <div className="flex items-center gap-3">
                                <Eye
                                    size={ 20 }
                                    className={
                                        activeMenu === "view" ? "text-black" : "text-gray-600"
                                    }
                                />
                                <span className="text-gray-900">View</span>
                            </div>
                            <ChevronRight
                                size={ 20 }
                                className={
                                    activeMenu === "view" ? "text-gray-800" : "text-gray-400"
                                }
                            />
                        </button>

                        {/* Actions */ }
                        <button
                            onClick={ () =>
                            {
                                setActiveMenu( "actions" );
                                setMobileMenuOpen( false );
                            } }
                            className={ `flex items-center justify-between px-6 py-4 transition-colors ${ activeMenu === "actions"
                                    ? "bg-gray-100 font-semibold"
                                    : "hover:bg-gray-50"
                                }` }
                        >
                            <div className="flex items-center gap-3">
                                <Wrench
                                    size={ 20 }
                                    className={
                                        activeMenu === "actions" ? "text-black" : "text-gray-600"
                                    }
                                />
                                <span className="text-gray-900">Actions</span>
                            </div>
                            <ChevronRight
                                size={ 20 }
                                className={
                                    activeMenu === "actions" ? "text-gray-800" : "text-gray-400"
                                }
                            />
                        </button>
                    </div>
                </div>
            ) }
        </header>
    );
}
