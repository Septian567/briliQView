"use client";

import { useState, useRef, useEffect } from "react";

// Custom hook dropdown
const useDropdown = () =>
{
    const [activeMenu, setActiveMenu] = useState<string | null>( null );
    const timeoutRef = useRef<NodeJS.Timeout | null>( null );

    useEffect( () =>
    {
        return () =>
        {
            if ( timeoutRef.current ) clearTimeout( timeoutRef.current );
        };
    }, [] );

    const openMenu = ( menu: string ) =>
    {
        if ( timeoutRef.current ) clearTimeout( timeoutRef.current );
        setActiveMenu( menu );
    };

    const closeMenu = () =>
    {
        timeoutRef.current = setTimeout( () =>
        {
            setActiveMenu( null );
        }, 300 );
    };

    const cancelClose = () =>
    {
        if ( timeoutRef.current ) clearTimeout( timeoutRef.current );
    };

    return { activeMenu, openMenu, closeMenu, cancelClose };
};

export default function HeaderMenu()
{
    const { activeMenu, openMenu, closeMenu, cancelClose } = useDropdown();

    const menuClass =
        "relative pb-1 whitespace-nowrap transition-colors duration-200 " +
        "hover:text-gray-900 after:absolute after:left-0 after:bottom-0 " +
        "after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all " +
        "after:duration-300 hover:after:w-full";

    const dropdownClass =
        "absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-max " +
        "bg-white border rounded-lg shadow-lg z-50 whitespace-nowrap";

    const itemClass =
        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 " +
        "text-left w-full whitespace-nowrap";

    const menus = [
        { key: "SMP", label: "SMP", items: ["Kelas 7", "Kelas 8", "Kelas 9"] },
        { key: "SMA", label: "SMA", items: ["Kelas 10", "Kelas 11", "Kelas 12"] },
        { key: "UTBK", label: "UTBK", items: ["Kelas 7", "Kelas 8", "Kelas 9"] },
        { key: "TKA-SMP", label: "TKA-SMP", items: ["Matematika", "IPA"] },
        { key: "TKA-SMA", label: "TKA-SMA", items: ["Saintek", "Soshum"] },
        { key: "UM", label: "Ujian Mandiri", items: ["SIMAK UI", "UM UGM", "Mandiri Lainnya"] },
    ];

    return (
        <nav
            className="
                w-full
                overflow-x-auto
                md:overflow-visible
                scrollbar-hide
            "
        >
            <div
                className="
                    flex
                    gap-6 md:gap-8
                    px-2
                    md:justify-center
                    w-max md:w-full
                    text-sm sm:text-base font-medium
                    text-gray-700
                "
            >
                { menus.map( ( menu ) => (
                    <div
                        key={ menu.key }
                        className="relative"
                        onMouseEnter={ () => openMenu( menu.key ) }
                        onMouseLeave={ closeMenu }
                    >
                        <button className={ menuClass }>
                            { menu.label }
                        </button>

                        { activeMenu === menu.key && (
                            <div
                                className={ dropdownClass }
                                onMouseEnter={ cancelClose }
                                onMouseLeave={ closeMenu }
                            >
                                { menu.items.map( ( item ) => (
                                    <button
                                        key={ item }
                                        className={ itemClass }
                                        onClick={ () => console.log( `Memilih: ${ item }` ) }
                                    >
                                        { item }
                                    </button>
                                ) ) }
                            </div>
                        ) }
                    </div>
                ) ) }
            </div>
        </nav>
    );
}
