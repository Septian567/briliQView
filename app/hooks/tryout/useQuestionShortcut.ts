import { useEffect } from "react";

/**
 * Hook untuk menangani shortcut jawaban di kartu soal
 * Keymap:
 * - T → A
 * - Y → B
 * - U → C
 * - I → D
 */
export function useQuestionShortcut( onSelect: ( option: string ) => void, enabled: boolean = true )
{
    useEffect( () =>
    {
        if ( !enabled ) return;

        const shortcutMap: Record<string, string> = {
            t: "A",
            y: "B",
            u: "C",
            i: "D",
        };

        const handleKeyDown = ( e: KeyboardEvent ) =>
        {
            const key = e.key.toLowerCase();
            if ( shortcutMap[key] )
            {
                onSelect( shortcutMap[key] );
            }
        };

        window.addEventListener( "keydown", handleKeyDown );
        return () =>
        {
            window.removeEventListener( "keydown", handleKeyDown );
        };
    }, [onSelect, enabled] );
}
