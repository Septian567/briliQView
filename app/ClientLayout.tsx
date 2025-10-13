"use client";

import React, { useState } from "react";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";

export default function ClientLayout( { children }: { children: React.ReactNode } )
{
    const [mobileMenuOpen, setMobileMenuOpen] = useState( false );
    const [activeSection, setActiveSection] = useState<"home" | "tryout">( "home" );

    return (
        <div className="font-sans min-h-screen flex flex-col bg-white text-gray-900">
            <Header
                mobileMenuOpen={ mobileMenuOpen }
                setMobileMenuOpen={ setMobileMenuOpen }
                activeSection={ activeSection }
                setActiveSection={ setActiveSection }
            />

            { !mobileMenuOpen && (
                <main className="flex-1 bg-white text-gray-900">{ children }</main>
            ) }

            <Footer />
        </div>
    );
}
