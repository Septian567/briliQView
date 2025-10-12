"use client";

import React from "react";
import Link from "next/link";

export default function LoginPage()
{
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                {/* Judul */ }
                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    Masuk ke Akun Anda
                </h1>

                {/* Form Login */ }
                <form className="flex flex-col gap-4">
                    {/* Email */ }
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="nama@email.com"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    {/* Password */ }
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    {/* Tombol Login */ }
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-colors mt-4"
                    >
                        Login
                    </button>
                </form>

                {/* Link Register */ }
                <p className="text-sm text-center text-gray-600 mt-6">
                    Belum punya akun?{ " " }
                    <Link
                        href="/signup"
                        className="text-yellow-500 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
