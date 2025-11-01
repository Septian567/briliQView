"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import TryOutSection from "./components/tryout/TryOutSection";
import Course from "./components/course/course";

// Constants
const STORAGE_KEY = "activeSection";
const SECTIONS = ["home", "tryout", "course"] as const;
type SectionType = typeof SECTIONS[number];

// Utility Hook
function usePersistentSection( defaultValue: SectionType ): [SectionType, ( v: SectionType ) => void]
{
  const [section, setSection] = useState<SectionType>( defaultValue );

  useEffect( () =>
  {
    if ( typeof window === "undefined" ) return;
    const saved = localStorage.getItem( STORAGE_KEY ) as SectionType | null;
    setSection( SECTIONS.includes( saved as SectionType ) ? ( saved as SectionType ) : defaultValue );
  }, [defaultValue] );

  useEffect( () =>
  {
    if ( typeof window === "undefined" ) return;
    localStorage.setItem( STORAGE_KEY, section );
  }, [section] );

  return [section, setSection];
}

// Motion Variants
const fadeSlide = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.6 },
};

export default function Home()
{
  const [mobileMenuOpen, setMobileMenuOpen] = useState( false );
  const [activeSection, setActiveSection] = usePersistentSection( "home" );

  const renderMainContent = () =>
  {
    if ( activeSection === "course" ) return <Course />;

    return (
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:px-20 sm:py-8 bg-white text-gray-900 overflow-hidden">
        { !mobileMenuOpen && (
          <AnimatePresence mode="wait">
            { activeSection === "home" && (
              <motion.div
                key="home"
                { ...fadeSlide }
                className="flex flex-col md:flex-row items-center justify-between w-full gap-10 flex-grow"
              >
                <div className="md:w-1/2 text-left space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    Belajar Pintar<br />jadi<br />Brilian!
                  </h1>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    BrilIQ nggak cuma bikin kamu paham materi, tapi ngajarin
                    cara mikir yang tepat, menyelesaikan masalah dengan kreatif,
                    dan bikin kecerdasanmu kepake seumur hidup. Belajar jadi
                    fun, otak makin tajam, hidup makin brilian!
                  </p>
                </div>

                <div className="md:w-1/2 flex justify-center">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/view.png"
                      alt="Gambar siswa"
                      className="w-full max-w-md object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ) }

            { activeSection === "tryout" && <TryOutSection key="tryout" /> }
          </AnimatePresence>
        ) }
      </main>
    );
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white text-gray-900">
      <Header
        mobileMenuOpen={ mobileMenuOpen }
        setMobileMenuOpen={ setMobileMenuOpen }
        activeSection={ activeSection }
        setActiveSection={ setActiveSection }
      />
      <div className="flex-1 bg-white">{ renderMainContent() }</div>
      <Footer />
    </div>
  );
}
