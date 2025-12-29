"use client";

import { motion, AnimatePresence } from "framer-motion";
import TryOutSection from "../tryout/section/TryOutSection";
import Course from "../course/course";

import HeaderMenu from "./HeaderMenu";
import HomeText from "./HomeText";
import HomeImage from "./HomeImage";
import HomeButtons from "./HomeButtons";
import HomeCategoryCard from "./HomeCategoryCard";
import CenteredText from "./CenteredText"
import ThreeCardSection from "./ThreeCardSection";
import CardMenu from "./CardMenu";
import UnlockBanner from "./UnlockBanner";
import PricingComparison from "./PricingComparison";
import PricingCards from "./PricingCards";

type SectionType = "home" | "tryout" | "course";

interface LandingPageProps
{
    activeSection: SectionType;
    mobileMenuOpen: boolean;
}

const fadeSlide = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.6 },
};

export default function LandingPage( {
    activeSection,
    mobileMenuOpen,
}: LandingPageProps )
{
    if ( activeSection === "course" )
    {
        return <Course />;
    }

    return (
        <main className="flex-1 flex flex-col bg-white text-gray-900 overflow-hidden">
            { !mobileMenuOpen && (
                <AnimatePresence mode="wait">
                    { activeSection === "home" && (
                        <motion.section
                            key="home"
                            { ...fadeSlide }
                            className="flex-grow"
                        >
                            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-12">
                                <HeaderMenu />

                                {/* Hero Section */ }
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex flex-col items-start gap-6">
                                        <HomeText />
                                        <HomeButtons />
                                    </div>

                                    <HomeImage />
                                </div>
                                <HomeCategoryCard />
                                <CenteredText
                                    title="Materi Teks & Latihan Soal"
                                    paragraph={`Materi dijelaskan dengan cara yang bikin kamu benar-benar paham, bukan cuma sekadar menghafal.\nDitambah ribuan latihan soal, termasuk soal-soal dari tahun-tahun sebelumnya, supaya kamu siap menghadapi ujian!`}
                                />
                                <ThreeCardSection />
                                <CenteredText
                                    title="Belajar dari dasar? UTBK? TKA? disini aja!"
                                />
                                <CardMenu />
                                <UnlockBanner />
                                <CenteredText
                                    title="Beda Free vs Premium? Nih, biar gak bingung"
                                />
                                <PricingComparison />
                                <CenteredText
                                    title="Upgrade cara belajar kamu"
                                    paragraph={ `Materi teks, Video konsep, latihan adaptif, Try Out rutin, semua ada di Briliq Premium. Mulai sekarang!` }
                                />
                                <PricingCards/>
                            </div>
                        </motion.section>
                    ) }

                    { activeSection === "tryout" && (
                        <TryOutSection key="tryout" />
                    ) }
                </AnimatePresence>
            ) }
        </main>
    );
}
