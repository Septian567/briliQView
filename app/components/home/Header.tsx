"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Menu, X, House, Brain, ChevronRight } from "lucide-react";
import NavMenu from "./NavMenu";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

interface HeaderProps
{
    mobileMenuOpen: boolean;
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeSection: "home" | "tryout" | "course";
    setActiveSection: React.Dispatch<React.SetStateAction<"home" | "tryout" | "course" | null>>;

}

export default function Header( {
    mobileMenuOpen,
    setMobileMenuOpen,
    activeSection,
    setActiveSection,
}: HeaderProps )
{
    const router = useRouter();

    return (
        <header className="w-full flex flex-col bg-white border-b border-gray-200 sticky top-0 z-10">
            {/* Top bar */ }
            <div className="flex justify-between items-center h-16 sm:h-20 px-6 sm:px-12">
                {/* Logo */ }
                <div
                    className="flex items-center gap-2 h-full cursor-pointer"
                    onClick={ () => router.push( "/" ) }
                >
                    <img
                        src="/a.PNG"
                        alt="BrilIQ logo"
                        className="h-full max-h-full w-auto object-contain"
                    />
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
                <NavMenu activeSection={ activeSection } setActiveSection={ setActiveSection } />

                {/* Desktop Buttons */ }
                <div className="hidden md:flex gap-4">
                    <LoginButton />
                    <SignupButton />
                </div>
            </div>

            {/* Mobile Menu */ }
            { mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="flex flex-col divide-y divide-gray-200">
                        {/* Home */ }
                        <button
                            onClick={ () =>
                            {
                                setActiveSection( "home" );
                                setMobileMenuOpen( false );
                            } }
                            className={ `flex items-center justify-between px-6 py-4 transition-colors ${ activeSection === "home"
                                    ? "bg-gray-100 font-semibold"
                                    : "hover:bg-gray-50"
                                }` }
                        >
                            <div className="flex items-center gap-3">
                                <House
                                    size={ 20 }
                                    className={
                                        activeSection === "home" ? "text-black" : "text-gray-600"
                                    }
                                />
                                <span className="text-gray-900">Home</span>
                            </div>
                            <ChevronRight
                                size={ 20 }
                                className={
                                    activeSection === "home" ? "text-gray-800" : "text-gray-400"
                                }
                            />
                        </button>

                        {/* TryOut */ }
                        <button
                            onClick={ () =>
                            {
                                setActiveSection( "tryout" );
                                setMobileMenuOpen( false );
                            } }
                            className={ `flex items-center justify-between px-6 py-4 transition-colors ${ activeSection === "tryout"
                                    ? "bg-gray-100 font-semibold"
                                    : "hover:bg-gray-50"
                                }` }
                        >
                            <div className="flex items-center gap-3">
                                <Brain
                                    size={ 20 }
                                    className={
                                        activeSection === "tryout" ? "text-black" : "text-gray-600"
                                    }
                                />
                                <span className="text-gray-900">Try Out</span>
                            </div>
                            <ChevronRight
                                size={ 20 }
                                className={
                                    activeSection === "tryout"
                                        ? "text-gray-800"
                                        : "text-gray-400"
                                }
                            />
                        </button>
                    </div>

                    {/* Mobile Buttons */ }
                    <div className="flex gap-4 px-6 py-4 border-t border-gray-100">
                        <LoginButton
                            variant="mobile"
                            onClick={ () => setMobileMenuOpen( false ) }
                        />
                        <SignupButton
                            variant="mobile"
                            onClick={ () => setMobileMenuOpen( false ) }
                        />
                    </div>
                </div>
            ) }
        </header>
    );
}
