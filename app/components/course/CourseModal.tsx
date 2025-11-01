"use client";

import React from "react";
import { X } from "lucide-react";

interface CourseModalProps
{
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    newCourse: { title: string; description: string };
    setNewCourse: ( course: { title: string; description: string } ) => void;
}

export default function CourseModal( {
    isOpen,
    onClose,
    onSave,
    newCourse,
    setNewCourse,
}: CourseModalProps )
{
    if ( !isOpen ) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
                {/* Tombol Tutup */ }
                <button
                    onClick={ onClose }
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <X size={ 20 } />
                </button>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Tambah Course
                </h2>

                <div className="flex flex-col gap-4">
                    {/* Input Judul */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={ newCourse.title }
                            onChange={ ( e ) =>
                                setNewCourse( { ...newCourse, title: e.target.value } )
                            }
                            placeholder="Masukkan judul course"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Input Deskripsi */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            value={ newCourse.description }
                            onChange={ ( e ) =>
                                setNewCourse( { ...newCourse, description: e.target.value } )
                            }
                            placeholder="Masukkan deskripsi course"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                        />
                    </div>

                    {/* Tombol Simpan */ }
                    <button
                        onClick={ onSave }
                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
