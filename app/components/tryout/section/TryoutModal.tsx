import React, { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";
import { Tryout } from "../../../hooks/tryout/useTryouts";
import { useTryoutModal } from "../../../hooks/tryout/useTryoutModal";

interface TryoutModalProps
{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onSubmit: ( tryout: Tryout ) => void;
    editData?: Tryout | null;
}

export default function TryoutModal( {
    isOpen,
    setIsOpen,
    onSubmit,
    editData,
}: TryoutModalProps )
{
    const { formData, setFormData, handleFileUpload, handleSubmit } = useTryoutModal( {
        editData,
        onSubmit,
        closeModal: () => setIsOpen( false ),
    } );

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
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            { editData ? "Edit Tryout" : "Add Tryout" }
                        </h2>

                        <form onSubmit={ handleSubmit } className="space-y-4">
                            {/* Name */ }
                            <div>
                                <label className="block text-gray-800 font-medium mb-1">Name</label>
                                <input
                                    name="name"
                                    value={ formData.name }
                                    onChange={ ( e ) =>
                                        setFormData( ( prev ) => ( { ...prev, name: e.target.value } ) )
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            {/* Subject */ }
                            <div>
                                <label className="block text-gray-800 font-medium mb-1">Subject</label>
                                <input
                                    name="subject"
                                    value={ formData.subject }
                                    onChange={ ( e ) =>
                                        setFormData( ( prev ) => ( { ...prev, subject: e.target.value } ) )
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            {/* Level */ }
                            <div>
                                <label className="block text-gray-800 font-medium mb-1">Level</label>
                                <select
                                    name="level"
                                    value={ formData.level }
                                    onChange={ ( e ) =>
                                        setFormData( ( prev ) => ( { ...prev, level: e.target.value } ) )
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="">Select Level</option>
                                    <option value="Elementary">Elementary</option>
                                    <option value="Middle">Middle</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            {/* Duration */ }
                            <div>
                                <label className="block text-gray-800 font-medium mb-1">
                                    Duration (minutes)
                                </label>
                                <input
                                    name="duration"
                                    type="number"
                                    min="1"
                                    value={ formData.duration }
                                    onChange={ ( e ) =>
                                        setFormData( ( prev ) => ( { ...prev, duration: e.target.value } ) )
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400"
                                    placeholder="e.g. 60"
                                />
                            </div>

                            {/* Question Count */ }
                            <div>
                                <label className="block text-gray-800 font-medium mb-1">
                                    Question Count
                                </label>
                                <input
                                    name="questionCount"
                                    type="number"
                                    value={ formData.questionCount }
                                    readOnly
                                    className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
                                />
                            </div>

                            {/* Upload CSV */ }
                            <div>
                                <label className="block text-gray-800 font-medium mb-1">
                                    Upload Questions (CSV)
                                </label>
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
                                    onChange={ handleFileUpload }
                                    className="hidden"
                                />
                            </div>

                            {/* Buttons */ }
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
                                    { editData ? "Save Changes" : "Upload" }
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            ) }
        </AnimatePresence>
    );
}
