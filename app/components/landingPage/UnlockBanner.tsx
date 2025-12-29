"use client";

export default function UnlockBanner()
{
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
            <div className="
                bg-yellow-400
                rounded-2xl
                px-4
                sm:px-6
                py-4
                flex
                flex-col
                sm:flex-row
                items-center
                gap-4
            ">
                {/* Text */ }
                <h3 className="
                    text-base
                    sm:text-lg
                    md:text-xl
                    font-semibold
                    text-gray-900
                    text-center
                    flex-1
                ">
                    Unlock semua materi & fitur premium!
                </h3>

                {/* Button */ }
                <button className="
                    w-full
                    sm:w-auto
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-medium
                    px-6
                    py-2.5
                    rounded-xl
                    transition
                    whitespace-nowrap
                ">
                    Beli Paket
                </button>
            </div>
        </div>
    );
}
