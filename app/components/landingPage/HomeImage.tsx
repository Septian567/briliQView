export default function HomeImage()
{
    return (
        <div className="w-full md:w-2/2 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                    src="/view.png"
                    alt="Gambar siswa"
                    className="w-full max-w-md object-cover"
                />
            </div>
        </div>
    );
}
