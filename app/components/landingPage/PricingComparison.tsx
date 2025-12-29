"use client";

import { Check, X } from "lucide-react";

export default function PricingComparison()
{
    const rows = [
        { label: "Materi Briliq Learning", free: "check", premium: "check" },
        { label: "Video materi (UTBK, TKA, Sekolah)", free: "limited", premium: "check" },
        { label: "Latihan soal (UTBK, TKA, Sekolah)", free: "limited", premium: "check" },
        { label: "Briliqcore", free: "limited", premium: "check" },
        { label: "Kunci jawaban & pembahasan soal", free: "x", premium: "check" },
        { label: "Try Out TKA & UTBK tiap bulan", free: "x", premium: "check" },
    ];

    const renderIcon = ( value: string ) =>
    {
        if ( value === "check" )
            return <Check className="h-5 w-5 text-green-500" />;
        if ( value === "x" )
            return <X className="h-5 w-5 text-red-500" />;
        return <span className="text-sm text-gray-500">Limited</span>;
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            {/* ================= DESKTOP / TABLET ================= */ }
            <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-base">
                    <thead>
                        <tr className="bg-gray-50 text-left text-lg">
                            <th className="px-4 py-3 font-semibold">Benefits</th>
                            <th className="px-4 py-3 font-semibold text-center">Free</th>
                            <th className="px-4 py-3 font-semibold text-center bg-yellow-50">
                                Premium
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        { rows.map( ( row, i ) => (
                            <tr key={ i } className="border-t">
                                <td className="px-4 py-3 font-medium">
                                    { row.label }
                                </td>
                                <td className="px-4 py-3 text-center">
                                    { renderIcon( row.free ) }
                                </td>
                                <td className="px-4 py-3 text-center bg-yellow-50">
                                    { renderIcon( row.premium ) }
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE ================= */ }
            <div className="md:hidden space-y-4">
                { rows.map( ( row, i ) => (
                    <div
                        key={ i }
                        className="border rounded-xl p-4 bg-white shadow-sm"
                    >
                        <p className="font-semibold text-gray-900 mb-3">
                            { row.label }
                        </p>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Free</span>
                            { renderIcon( row.free ) }
                        </div>

                        <div className="flex items-center justify-between text-sm mt-2">
                            <span className="text-gray-900 font-medium">
                                Premium
                            </span>
                            { renderIcon( row.premium ) }
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}
