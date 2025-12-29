"use client";

import Item from "./CategoryItem";
import { leftCategories, rightCategories } from "./CategoryData";

export default function HomeCategoryCard()
{
    return (
        <div className="w-full bg-white rounded-2xl shadow-lg p-4 sm:p-6 mt-8 sm:mt-12">
            {/* GRID */ }
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* KIRI */ }
                <div>
                    { leftCategories.map( ( cat, index ) => (
                        <Item key={ index } icon={ cat.icon } title={ cat.title }>
                            { cat.items.map( ( item, i ) => (
                                <p key={ i }>{ item }</p>
                            ) ) }
                        </Item>
                    ) ) }
                </div>

                {/* KANAN */ }
                <div>
                    { rightCategories.map( ( cat, index ) => (
                        <Item key={ index } icon={ cat.icon } title={ cat.title }>
                            { cat.items.map( ( item, i ) => (
                                <p key={ i }>{ item }</p>
                            ) ) }
                        </Item>
                    ) ) }
                </div>
            </div>

            {/* FOOTER */ }
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="font-semibold text-gray-900 text-center sm:text-left">
                    Sikat, biar bisa akses semua konten & fitur!
                </p>

                <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                    Beli Paket
                </button>
            </div>
        </div>
    );
}
