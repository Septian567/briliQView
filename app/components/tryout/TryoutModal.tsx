"use client";

import React, { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";
import { Tryout } from "../../hooks/tryout/useTryouts";

interface TryoutModalProps
{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: ( tryout: Tryout ) => void;
}

export default function TryoutModal( { isOpen, setIsOpen, onSubmit }: TryoutModalProps )
{
    const [formData, setFormData] = React.useState( {
        name: "",
        subject: "",
        level: "",
        questionCount: "",
        file: null as File | null,
    } );

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) =>
    {
        const { name, value, files } = e.target as any;
        setFormData( ( prev ) => ( {
            ...prev,
            [name]: files ? files[0] : value,
        } ) );
    };

    const handleUpload = ( e: React.FormEvent ) =>
    {
        e.preventDefault();
        if ( !formData.name || !formData.subject || !formData.level || !formData.questionCount ) return;

        const newTryout: Tryout = {
            id: Date.now(),
            name: formData.name,
            subject: formData.subject,
            level: formData.level,
            questionCount: parseInt( formData.questionCount ),
        };

        onSubmit( newTryout );
        setFormData( { name: "", subject: "", level: "", questionCount: "", file: null } );
        setIsOpen( false );
    };

    return (
        <AnimatePresence>
            { isOpen && (
                <motion.div
                    className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-50"
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    exit={ { opacity: 0 } }
                    onClick={ () => setIsOpen( false ) }
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md"
                        initial={ { scale: 0.9, opacity: 0 } }
                        animate={ { scale: 1, opacity: 1 } }
                        exit={ { scale: 0.9, opacity: 0 } }
                        onClick={ ( e ) => e.stopPropagation() }
                    >
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Tryout</h2>

                        <form onSubmit={ handleUpload } className="space-y-4">
                            <div>
                                <label className="block text-gray-800 font-medium mb-1">Name</label>
                                <input
                                    name="name"
                                    value={ formData.name }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 font-medium mb-1">Subject</label>
                                <input
                                    name="subject"
                                    value={ formData.subject }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 font-medium mb-1">Level</label>
                                <select
                                    name="level"
                                    value={ formData.level }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="">Select Level</option>
                                    <option value="Elementary">Elementary</option>
                                    <option value="Middle">Middle</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-800 font-medium mb-1">Question Count</label>
                                <input
                                    name="questionCount"
                                    type="number"
                                    value={ formData.questionCount }
                                    onChange={ handleChange }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-800 font-medium mb-1">Upload Questions (CSV)</label>
                                <label
                                    htmlFor="file"
                                    className="flex items-center justify-between border border-gray-300 rounded-lg p-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <span className="flex items-center gap-2 text-gray-700">
                                        <Upload size={ 18 } />
                                        { formData.file ? formData.file.name : "Select CSV file..." }
                                    </span>
                                    <span className="bg-yellow-400 text-black px-3 py-1 rounded font-medium hover:bg-yellow-500 transition">
                                        Browse
                                    </span>
                                </label>
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept=".csv"
                                    onChange={ handleChange }
                                    className="hidden"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={ () => setIsOpen( false ) }
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium transition"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            ) }
        </AnimatePresence>
    );
}
