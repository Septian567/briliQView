import React from "react";
import ReactDOM from "react-dom";

interface DeleteConfirmModalProps
{
    open: boolean;
    itemName: string;
    itemType?: string; // ✅ tambahkan ini untuk menentukan jenis (default: tryout)
    confirmInput: string;
    setConfirmInput: ( value: string ) => void;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmModal( {
    open,
    itemName,
    itemType = "tryout", // ✅ default value
    confirmInput,
    setConfirmInput,
    onClose,
    onConfirm,
}: DeleteConfirmModalProps )
{
    if ( !open ) return null;

    // ubah nama sesuai logika menu
    const label = itemType.toLowerCase();

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-500/30 z-[9999]"
            onClick={ onClose }
        >
            <div
                className="bg-white rounded-xl shadow-xl p-6 w-96 border border-gray-200"
                onClick={ ( e ) => e.stopPropagation() }
            >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Konfirmasi Penghapusan
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                    Untuk menghapus { label }, ketik ulang{ " " }
                    <span className="font-medium">"{ itemName }"</span> di bawah ini:
                </p>

                <input
                    type="text"
                    value={ confirmInput }
                    onChange={ ( e ) => setConfirmInput( e.target.value ) }
                    placeholder={ `Ketik "${ itemName }"...` }
                    className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-red-500"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={ onClose }
                        className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
                    >
                        Batal
                    </button>
                    <button
                        onClick={ onConfirm }
                        disabled={ confirmInput !== itemName }
                        className={ `px-4 py-2 text-sm rounded-lg text-white ${ confirmInput === itemName
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
    );
}
