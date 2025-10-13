"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";

export default function Home()
{
  const [mobileMenuOpen, setMobileMenuOpen] = useState( false );
  const [activeSection, setActiveSection] = useState<"home" | "tryout">( "home" );

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */ }
      <Header
        mobileMenuOpen={ mobileMenuOpen }
        setMobileMenuOpen={ setMobileMenuOpen }
        activeSection={ activeSection }
        setActiveSection={ setActiveSection }
      />

      {/* Main Content — flex-1 memastikan footer tetap di bawah */ }
      <main className="flex-1 flex items-center justify-center p-6 sm:px-20 sm:py-8 bg-white text-gray-900">
        {/* Tampilkan isi hanya saat menu mobile tertutup */ }
        { !mobileMenuOpen && (
          <AnimatePresence mode="wait">
            { activeSection === "home" && (
              <motion.div
                key="home"
                initial={ { opacity: 0, y: 30 } }
                animate={ { opacity: 1, y: 0 } }
                exit={ { opacity: 0, y: -30 } }
                transition={ { duration: 0.6 } }
                className="flex flex-col md:flex-row items-center justify-between w-full gap-10"
              >
                {/* Teks kiri */ }
                <div className="md:w-1/2 text-left space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    Belajar Pintar<br />jadi<br />Brilian!
                  </h1>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    BrilIQ nggak cuma bikin kamu paham materi, tapi ngajarin cara
                    mikir yang tepat, menyelesaikan masalah dengan kreatif, dan
                    bikin kecerdasanmu kepake seumur hidup. Belajar jadi fun,
                    otak makin tajam, hidup makin brilian!
                  </p>
                </div>

                {/* Gambar kanan */ }
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

            { activeSection === "tryout" && (
              <motion.div
                key="tryout"
                initial={ { opacity: 0, y: 30 } }
                animate={ { opacity: 1, y: 0 } }
                exit={ { opacity: 0, y: -30 } }
                transition={ { duration: 0.6 } }
                className="text-center"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Halaman TryOut
                </h1>
                <p className="text-gray-700 max-w-lg mx-auto leading-relaxed">
                  Ini adalah area TryOut kamu! Nantinya bisa diisi dengan daftar soal,
                  leaderboard, atau fitur simulasi ujian.
                </p>
              </motion.div>
            ) }
          </AnimatePresence>
        ) }
      </main>

      {/* Footer — akan selalu menempel di bawah */ }
      <Footer />
    </div>
  );
}
