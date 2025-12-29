"use client";

import { useState } from "react";

import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import LandingPage from "./components/landingPage";
import { usePersistentSection } from "./hooks/landingPage/usePersistentSection";

export default function HomeClient()
{
    const [mobileMenuOpen, setMobileMenuOpen] = useState( false );
    const [activeSection, setActiveSection] =
        usePersistentSection( "home" );

    return (
        <div className="font-sans min-h-screen flex flex-col bg-white text-gray-900">
            <Header
                mobileMenuOpen={ mobileMenuOpen }
                setMobileMenuOpen={ setMobileMenuOpen }
                activeSection={ activeSection }
                setActiveSection={ setActiveSection }
            />

            <div className="flex-1 bg-white">
                <LandingPage
                    activeSection={ activeSection }
                    mobileMenuOpen={ mobileMenuOpen }
                />
            </div>

            <Footer />
        </div>
    );
}
