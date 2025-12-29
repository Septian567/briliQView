"use client";

import React, { useState, useEffect, useRef } from "react";

export default function CourseActions()
{
    const [activeTab, setActiveTab] = useState<"tambah" | "daftar">( "tambah" );
    const [judul, setJudul] = useState( "" );
    const [chapters, setChapters] = useState<string[]>( [] );
    const [editIndex, setEditIndex] = useState<number | null>( null );
    const [editValue, setEditValue] = useState( "" );

    const editRef = useRef<HTMLInputElement | null>( null );
    const actionRef = useRef<HTMLDivElement | null>( null );

    // Deteksi klik di luar area input DAN tombol aksi
    useEffect( () =>
    {
        function handleClickOutside( event: MouseEvent )
        {
            const target = event.target as Node;
            if (
                editRef.current &&
                !editRef.current.contains( target ) &&
                actionRef.current &&
                !actionRef.current.contains( target )
            )
            {
                setEditIndex( null );
            }
        }

        if ( editIndex !== null )
        {
            document.addEventListener( "mousedown", handleClickOutside );
        }

        return () =>
        {
            document.removeEventListener( "mousedown", handleClickOutside );
        };
    }, [editIndex] );

    const handleAdd = ( e: React.FormEvent ) =>
    {
        e.preventDefault();
        if ( judul.trim() === "" )
        {
            alert( "Judul tidak boleh kosong!" );
            return;
        }
        setChapters( ( prev ) => [...prev, judul] );
        setJudul( "" );
        setActiveTab( "daftar" );
    };

    const handleEditClick = ( index: number ) =>
    {
        setEditIndex( index );
        setEditValue( chapters[index] );
    };

    const handleSaveEdit = ( index: number ) =>
    {
        if ( editValue.trim() === "" )
        {
            alert( "Judul tidak boleh kosong!" );
            return;
        }
        const updated = [...chapters];
        updated[index] = editValue;
        setChapters( updated );
        setEditIndex( null );
    };

    const handleDelete = ( index: number ) =>
    {
        if ( confirm( "Yakin ingin menghapus chapter ini?" ) )
        {
            setChapters( ( prev ) => prev.filter( ( _, i ) => i !== index ) );
        }
    };

    return (
        <section className="mt-2">
            {/* Title */ }
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Main</h2>
            </div>

            {/* Tabs */ }
            <div className="flex border-b border-gray-300 mt-3 mb-8 space-x-6">
                <button
                    onClick={ () => setActiveTab( "tambah" ) }
                    className={ `pb-2 text-l font-medium transition ${ activeTab === "tambah"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-800"
                        }` }
                >
                    Tambah
                </button>

                <button
                    onClick={ () => setActiveTab( "daftar" ) }
                    className={ `pb-2 text-l font-medium transition ${ activeTab === "daftar"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-800"
                        }` }
                >
                    Daftar
                </button>
            </div>

            {/* Content */ }
            <div className="bg-white rounded-xl p-8 shadow-sm">
                { activeTab === "tambah" && (
                    <form onSubmit={ handleAdd } className="space-y-4">
                        <div>
                            <label
                                htmlFor="judul"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Judul
                            </label>
                            <input
                                id="judul"
                                type="text"
                                value={ judul }
                                onChange={ ( e ) => setJudul( e.target.value ) }
                                placeholder="Masukkan judul chapter..."
                                className="w-full border-b-2 border-gray-300 px-4 py-2 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Simpan
                        </button>
                    </form>
                ) }

                { activeTab === "daftar" && (
                    <div>
                        { chapters.length === 0 ? (
                            <p className="text-gray-500">Belum ada chapter yang ditambahkan.</p>
                        ) : (
                            <ul className="space-y-3">
                                { chapters.map( ( item, index ) => (
                                    <li
                                        key={ index }
                                        className="flex items-center justify-between border-b border-gray-200 pb-2"
                                    >
                                        { editIndex === index ? (
                                            <input
                                                ref={ editRef }
                                                type="text"
                                                value={ editValue }
                                                onChange={ ( e ) => setEditValue( e.target.value ) }
                                                autoFocus
                                                className="flex-1 px-2 py-1 bg-transparent border-none focus:outline-none text-gray-800"
                                            />
                                        ) : (
                                            <span className="text-gray-800">{ item }</span>
                                        ) }

                                        <div ref={ actionRef } className="flex space-x-2">
                                            { editIndex === index ? (
                                                <button
                                                    onClick={ () => handleSaveEdit( index ) }
                                                    className="bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-yellow-300 transition"
                                                >
                                                    Simpan
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={ () => handleEditClick( index ) }
                                                    className="bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-yellow-300 transition"
                                                >
                                                    Edit
                                                </button>
                                            ) }

                                            <button
                                                onClick={ () => handleDelete( index ) }
                                                disabled={ editIndex === index }
                                                className={ `px-3 py-1 rounded-full text-sm font-medium transition ${ editIndex === index
                                                        ? "bg-yellow-100 text-gray-400 cursor-default"
                                                        : "bg-yellow-200 text-gray-800 hover:bg-yellow-300"
                                                    }` }
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </li>
                                ) ) }
                            </ul>
                        ) }
                    </div>
                ) }
            </div>
        </section>
    );
}
