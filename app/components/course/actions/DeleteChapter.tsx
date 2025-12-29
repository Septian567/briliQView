"use client";

import React, { useState } from "react";
import DeleteConfirmModal from "../../frame/DeleteConfirmModal";

interface DeleteChapterProps
{
    itemName: string;
    onDelete: () => void;
    disabled?: boolean;
}

export default function DeleteChapter( { itemName, onDelete, disabled }: DeleteChapterProps )
{
    const [open, setOpen] = useState( false );
    const [confirmInput, setConfirmInput] = useState( "" );

    const handleConfirm = () =>
    {
        onDelete();
        setConfirmInput( "" );
        setOpen( false );
    };

    return (
        <>
            <button
                onClick={ () => setOpen( true ) }
                disabled={ disabled }
                className={ `px-3 py-1 rounded-full text-sm font-medium transition ${ disabled
                        ? "bg-yellow-100 text-gray-400 cursor-default"
                        : "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
                    }` }
            >
                Hapus
            </button>

            <DeleteConfirmModal
                open={ open }
                itemName={ itemName }
                itemType="chapter"
                confirmInput={ confirmInput }
                setConfirmInput={ setConfirmInput }
                onClose={ () =>
                {
                    setOpen( false );
                    setConfirmInput( "" );
                } }
                onConfirm={ handleConfirm }
            />
        </>
    );
}
