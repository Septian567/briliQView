/**
 * Mengubah detik menjadi format waktu mm:ss
 * @param seconds Jumlah detik tersisa
 * @returns String waktu dalam format "MM:SS"
 */
export function formatTimeExam( seconds: number ): string
{
    const m = Math.floor( seconds / 60 ).toString().padStart( 2, "0" );
    const s = ( seconds % 60 ).toString().padStart( 2, "0" );
    return `${ m }:${ s }`;
}
