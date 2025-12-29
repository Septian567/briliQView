"use client";

import Image from "next/image";

export default function CardMenu()
{
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Card 1 */ }
                <div className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    p-5
                    sm:p-6
                    flex
                    flex-col
                    gap-4
                    hover:shadow-lg
                    transition
                ">
                    <h3 className="font-semibold text-gray-900 text-xl sm:text-2xl">
                        Try Out UTBK
                    </h3>

                    <p className="text-gray-600 text-base leading-relaxed">
                        Latihan try out dengan sistem penilaian mirip UTBK asli,
                        lengkap dengan pembahasan detail.
                    </p>

                    <div className="relative w-full h-32 sm:h-40">
                        <Image
                            src="/tryout.PNG"
                            alt="Try Out UTBK"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Card 2 */ }
                <div className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    p-5
                    sm:p-6
                    flex
                    flex-col
                    gap-4
                    hover:shadow-lg
                    transition
                ">
                    <h3 className="font-semibold text-gray-900 text-xl sm:text-2xl">
                        Materi & Latihan
                    </h3>

                    <p className="text-gray-600 text-base leading-relaxed">
                        Materi disusun dari dasar sampai lanjut, dilengkapi
                        ribuan latihan soal untuk memperkuat pemahaman.
                    </p>

                    <div className="relative w-full h-32 sm:h-40">
                        <Image
                            src="/graph.PNG"
                            alt="Materi & Latihan"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
