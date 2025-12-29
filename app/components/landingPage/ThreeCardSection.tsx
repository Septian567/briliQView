import React from "react";

export default function ThreeCardsSection()
{
    const cards = [
        {
            title: "Oh Gitu!",
            content:
                "Lo gak cuma dikasih rumus, tapi diajak mikir bareng, menalar konsep step by step, sampe dapet Oh gitu!",
        },
        {
            title: "Cepet Paham",
            content: "Cepet paham lah pokoknya",
        },
        {
            title: "Request Soal",
            content: "Kalau nemu soal susah bisa dibantu disini",
        },
    ];

    return (
        <div className="flex flex-col items-center mt-8 sm:mt-12 px-4">
            {/* Cards */ }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
                { cards.map( ( card, idx ) => (
                    <div
                        key={ idx }
                        className="
                            bg-gray-100
                            rounded-xl
                            shadow-md
                            p-5
                            flex
                            flex-col
                            text-left
                            min-h-[160px]
                        "
                    >
                        <h2 className="font-semibold mb-2 text-xl sm:text-2xl text-gray-900">
                            { card.title }
                        </h2>
                        <p className="text-gray-700 text-base leading-relaxed">
                            { card.content }
                        </p>
                    </div>
                ) ) }
            </div>
        </div>
    );
}
