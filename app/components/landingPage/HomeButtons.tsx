"use client";

export default function HomeButtons()
{
    return (
        <div
            className="
                flex
                flex-row
                gap-3
                w-full
                sm:w-auto
            "
        >
            <button
                className="
                    px-4
                    sm:px-5
                    py-2
                    sm:py-2.5
                    rounded-md
                    bg-blue-600
                    text-white
                    text-sm
                    font-semibold
                    hover:bg-blue-700
                    transition
                    whitespace-nowrap
                "
            >
                Daftar Gratis
            </button>

            <button
                className="
                    px-4
                    sm:px-5
                    py-2
                    sm:py-2.5
                    rounded-md
                    border
                    border-blue-600
                    text-blue-600
                    text-sm
                    font-semibold
                    hover:bg-blue-50
                    transition
                    whitespace-nowrap
                "
            >
                Lihat Semua Materi
            </button>
        </div>
    );
}
