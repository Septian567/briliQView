"use client";

const plans = [
    {
        title: "1 Bulan",
        price: "Rp 175.000",
        oldPrice: "Rp 200.000",
        save: "Hemat 13%",
        perDay: "Rp 5.645 / hari",
    },
    {
        title: "3 Bulan",
        price: "Rp 225.000",
        oldPrice: "Rp 300.000",
        save: "Hemat 25%",
        perDay: "Rp 2.419 / hari",
    },
    {
        title: "6 Bulan",
        price: "Rp 335.000",
        oldPrice: "Rp 450.000",
        save: "Hemat 26%",
        perDay: "Rp 1.801 / hari",
    },
    {
        title: "9 Bulan",
        price: "Rp 425.000",
        oldPrice: "Rp 550.000",
        save: "Hemat 23%",
        perDay: "Rp 1.523 / hari",
    },
    {
        title: "12 Bulan",
        price: "Rp 450.000",
        oldPrice: "Rp 600.000",
        save: "Hemat 25%",
        perDay: "Rp 1.210 / hari",
        best: true,
    },
];

export default function PricingCards()
{
    return (
        <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-5
            gap-4
            sm:gap-6
        ">
            { plans.map( ( plan ) => (
                <div
                    key={ plan.title }
                    className={ `
                        relative
                        rounded-2xl
                        border
                        bg-white
                        p-5
                        sm:p-6
                        flex
                        flex-col
                        gap-4
                        shadow-sm
                        transition
                        hover:shadow-md
                        ${ plan.best ? "border-blue-500" : "border-gray-200" }
                    `}
                >
                    {/* BEST BADGE */ }
                    { plan.best && (
                        <span className="
                            absolute
                            -top-3
                            right-4
                            bg-blue-500
                            text-xs
                            font-semibold
                            px-3
                            py-1
                            rounded-full
                            text-white
                        ">
                            ⭐ BEST VALUE
                        </span>
                    ) }

                    {/* TITLE */ }
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                        { plan.title }
                    </h3>

                    {/* PRICE BOX */ }
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">
                            { plan.price }
                        </span>

                        <span className="text-sm line-through text-gray-400">
                            { plan.oldPrice }
                        </span>

                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full w-fit">
                            { plan.save }
                        </span>

                        <span className="text-sm text-gray-500">
                            { plan.perDay }
                        </span>
                    </div>

                    {/* BUTTON */ }
                    <button
                        className={ `
                            mt-auto
                            rounded-xl
                            py-2.5
                            text-sm
                            sm:text-base
                            font-medium
                            transition
                            ${ plan.best
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "border border-blue-500 text-blue-500 hover:bg-blue-50"
                            }
                        `}
                    >
                        Pilih Paket
                    </button>
                </div>
            ) ) }
        </div>
    );
}
