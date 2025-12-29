import { useEffect } from "react";

interface ShortcutOptions
{
    enabled?: boolean;
    onPrev?: () => void;
    onNext?: () => void;
    onSelect?: ( option: string ) => void;
    onFinish?: () => void;
    total?: number;
    currentIndex?: number;
    allAnswered?: boolean;
}

/**
 * Hook untuk menangani keyboard shortcut saat tryout
 * 
 * Keymap:
 * - 7 → Sebelumnya
 * - 8 → Selanjutnya
 * - T → A, U → B, I → C, O → D
 * - Enter → Selesai (jika semua soal terjawab)
 */
export function useShortcut( {
    enabled = true,
    onPrev,
    onNext,
    onSelect,
    onFinish,
    total = 0,
    currentIndex = 0,
    allAnswered = false,
}: ShortcutOptions )
{
    useEffect( () =>
    {
        if ( !enabled ) return;

        const handleKeyDown = ( e: KeyboardEvent ) =>
        {
            if ( !enabled ) return;

            if ( e.key === "7" ) onPrev?.();
            else if ( e.key === "8" ) onNext?.();

            const shortcutMap: Record<string, string> = { T: "A", U: "B", I: "C", O: "D" };
            const upperKey = e.key.toUpperCase();

            if ( shortcutMap[upperKey] )
            {
                onSelect?.( shortcutMap[upperKey] );
            }

            if ( e.key === "Enter" && currentIndex === total - 1 && allAnswered )
            {
                onFinish?.();
            }
        };

        window.addEventListener( "keydown", handleKeyDown );
        return () => window.removeEventListener( "keydown", handleKeyDown );
    }, [enabled, currentIndex, total, allAnswered, onPrev, onNext, onSelect, onFinish] );
}
