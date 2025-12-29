import React from "react";
import { Tryout } from "../../../hooks/tryout/useTryouts";
import Card from "../../frame/Card";
import { MoreVertical } from "lucide-react";
import { useTryoutCard } from "../../../hooks/tryout/useTryoutCard";
import DeleteConfirmModal from "../../frame/DeleteConfirmModal";

interface TryoutCardProps
{
    tryout: Tryout;
    onOpen: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function TryoutCard( {
    tryout,
    onOpen,
    onEdit,
    onDelete,
}: TryoutCardProps )
{
    const {
        menuRef,
        menuOpen,
        confirmOpen,
        confirmInput,
        setConfirmOpen,
        setConfirmInput,
        toggleMenu,
        handleEdit,
        handleDeleteClick,
        handleConfirmDelete,
    } = useTryoutCard( { tryout, onEdit, onDelete } );

    return (
        <>
            <Card
                onClick={ onOpen }
                actionButton={
                    <div className="relative" ref={ menuRef }>
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
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        { tryout.name }
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm truncate">
                        Subject: { tryout.subject }
                    </p>
                    <p className="text-gray-600 text-sm truncate">
                        Level: { tryout.level }
                    </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-600 text-sm">
                        Questions: { tryout.questionCount }
                    </p>
                </div>
            </Card>

            <DeleteConfirmModal
                open={ confirmOpen }
                itemName={ tryout.name }
                itemType="tryout"
                confirmInput={ confirmInput }
                setConfirmInput={ setConfirmInput }
                onClose={ () => setConfirmOpen( false ) }
                onConfirm={ handleConfirmDelete }
            />
        </>
    );
}
