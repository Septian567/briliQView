import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tryout } from "../../hooks/tryout/useTryouts";
import Card from "../frame/Card";
import { MoreVertical } from "lucide-react";

interface TryoutCardProps
{
    tryout: Tryout;
    onOpen: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function TryoutCard( { tryout, onOpen, onEdit, onDelete }: TryoutCardProps )
{
    const [menuOpen, setMenuOpen] = useState( false );
    const [confirmOpen, setConfirmOpen] = useState( false );
    const [confirmInput, setConfirmInput] = useState( "" );

    const toggleMenu = ( e: React.MouseEvent ) =>
    {
        e.stopPropagation();
        setMenuOpen( ( prev ) => !prev );
    };

    const handleEdit = ( e: React.MouseEvent ) =>
    {
        e.stopPropagation();
        setMenuOpen( false );
        onEdit();
    };

    const handleDeleteClick = ( e: React.MouseEvent ) =>
    {
        e.stopPropagation();
        setMenuOpen( false );
        setConfirmOpen( true );
    };

    const handleConfirmDelete = () =>
    {
        if ( confirmInput === tryout.name )
        {
            onDelete();
            setConfirmOpen( false );
            setConfirmInput( "" );
        }
    };

    // Modal dengan overlay abu-abu transparan
    const modal = confirmOpen
        ? ReactDOM.createPortal(
            <div
                className="fixed inset-0 flex items-center justify-center bg-gray-500/30 z-[9999]"
                onClick={ () => setConfirmOpen( false ) }
            >
                <div
                    className="bg-white rounded-xl shadow-xl p-6 w-96 border border-gray-200"
                    onClick={ ( e ) => e.stopPropagation() }
                >
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        Konfirmasi Penghapusan
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Untuk menghapus tryout, ketik ulang{ " " }
                        <span className="font-medium">"{ tryout.name }"</span> di bawah ini:
                    </p>

                    <input
                        type="text"
                        value={ confirmInput }
                        onChange={ ( e ) => setConfirmInput( e.target.value ) }
                        placeholder={ `Ketik "${ tryout.name }"...` }
                        className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-red-500"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={ () => setConfirmOpen( false ) }
                            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
                        >
                            Batal
                        </button>
                        <button
                            onClick={ handleConfirmDelete }
                            disabled={ confirmInput !== tryout.name }
                            className={ `px-4 py-2 text-sm rounded-lg text-white ${ confirmInput === tryout.name
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-gray-400 cursor-not-allowed"
                                }` }
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        )
        : null;

    return (
        <>
            <Card
                onClick={ onOpen }
                actionButton={
                    <div className="relative">
                        <button
                            onClick={ toggleMenu }
                            className="text-black hover:text-gray-700 p-1 rounded"
                            title="More options"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        { menuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10"
                                onClick={ ( e ) => e.stopPropagation() }
                            >
                                <button
                                    onClick={ handleEdit }
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={ handleDeleteClick }
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </div>
                        ) }
                    </div>
                }
            >
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{ tryout.name }</h3>
                    <p className="text-gray-600 mt-1 text-sm truncate">Subject: { tryout.subject }</p>
                    <p className="text-gray-600 text-sm truncate">Level: { tryout.level }</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-600 text-sm">Questions: { tryout.questionCount }</p>
                </div>
            </Card>

            { modal }
        </>
    );
}
