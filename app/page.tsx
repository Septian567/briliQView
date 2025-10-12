"use client";

import React, { useState } from "react";
import { Menu, X, House, Brain } from "lucide-react";

export default function Home()
{
  const [activeMenu, setActiveMenu] = useState<"home" | "tryout">( "home" );
  const [mobileMenuOpen, setMobileMenuOpen] = useState( false );

  const handleMobileMenuClick = ( menu: "home" | "tryout" ) =>
  {
    setActiveMenu( menu );
    setMobileMenuOpen( false );
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header */ }
      <header className="w-full flex justify-between items-center h-16 sm:h-20 px-6 sm:px-12 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2 h-full">
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

        {/* Desktop menu */ }
        <nav className="hidden md:flex items-center gap-6 mr-[150px]">
          <button
            onClick={ () => setActiveMenu( "home" ) }
            className={ `text-sm font-medium pb-1 inline-block ${ activeMenu === "home"
                ? "border-b-2 border-black text-black"
                : "text-gray-700"
              }` }
          >
            Home
          </button>
          <button
            onClick={ () => setActiveMenu( "tryout" ) }
            className={ `text-sm font-medium pb-1 inline-block ${ activeMenu === "tryout"
                ? "border-b-2 border-black text-black"
                : "text-gray-700"
              }` }
          >
            TryOut
          </button>
        </nav>

        {/* Desktop Buttons */ }
        <div className="hidden md:flex gap-4">
          <a
            href="/login"
            className="text-sm font-medium text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
          >
            Login
          </a>
          <a
            href="/signup"
            className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded transition-colors"
          >
            SignUp
          </a>
        </div>
      </header>

      {/* Mobile Menu */ }
      { mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="flex flex-col divide-y divide-gray-200">
            <button
              onClick={ () => handleMobileMenuClick( "home" ) }
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <House size={ 20 } />
                <span className="text-gray-900">Home</span>
              </div>
              <span className="text-gray-400">{ ">" }</span>
            </button>
            <button
              onClick={ () => handleMobileMenuClick( "tryout" ) }
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Brain size={ 20 } />
                <span className="text-gray-900">Try Out</span>
              </div>
              <span className="text-gray-400">{ ">" }</span>
            </button>
          </div>

          <div className="flex gap-4 px-6 py-4">
            <a
              href="/login"
              className="flex-1 text-center text-black bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-medium transition-colors"
            >
              Masuk
            </a>
            <a
              href="/signup"
              className="flex-1 text-center text-yellow-400 border border-yellow-400 hover:bg-yellow-50 px-4 py-2 rounded font-medium transition-colors"
            >
              Daftar
            </a>
          </div>
        </div>
      ) }

      {/* Main Content */ }
      <main className="flex-1 p-6 sm:px-20 sm:py-8 flex items-center justify-center bg-white text-gray-900">
        { !mobileMenuOpen && (
          <>
            { activeMenu === "home" ? (
              <h1 className="text-2xl font-semibold text-gray-900">
                ini halaman utama
              </h1>
            ) : (
              <h1 className="text-2xl font-semibold text-gray-900">
                ini halaman TryOut
              </h1>
            ) }
          </>
        ) }
      </main>

      {/* Footer */ }
      <footer className="w-full flex justify-between items-center p-6 sm:px-20 sm:py-8 border-t border-gray-200 bg-white relative min-h-[80px]">
        <div className="text-lg font-bold text-gray-900 self-center">BrilIQ</div>
        <div className="flex flex-col items-end justify-end h-full">
          <span className="text-sm text-gray-600">&copy; BrilIQ, 2025</span>
        </div>
      </footer>
    </div>
  );
}
