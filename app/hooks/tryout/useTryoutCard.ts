import { useState, useEffect, useRef } from "react";
import { Tryout } from "./useTryouts";

interface UseTryoutCardProps
{
    tryout: Tryout;
    onEdit: () => void;
    onDelete: () => void;
}

export function useTryoutCard( { tryout, onEdit, onDelete }: UseTryoutCardProps )
{
    const [menuOpen, setMenuOpen] = useState( false );
    const [confirmOpen, setConfirmOpen] = useState( false );
    const [confirmInput, setConfirmInput] = useState( "" );
    const menuRef = useRef<HTMLDivElement | null>( null );

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

    useEffect( () =>
    {
        const handleClickOutside = ( event: MouseEvent ) =>
        {
            if ( menuRef.current && !menuRef.current.contains( event.target as Node ) )
            {
                setMenuOpen( false );
            }
        };

        if ( menuOpen )
        {
            document.addEventListener( "mousedown", handleClickOutside );
        }

        return () =>
        {
            document.removeEventListener( "mousedown", handleClickOutside );
        };
    }, [menuOpen] );

    return {
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
    };
}
