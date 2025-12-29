interface CenteredTextProps
{
    title: string;
    paragraph?: string;
}

export default function CenteredText( { title, paragraph }: CenteredTextProps )
{
    return (
        <div className="text-center mt-8 sm:mt-12 px-4">
            <h2
                className="
                    font-bold
                    text-3xl
                    sm:text-4xl
                    md:text-5xl
                    lg:text-5xl
                    xl:text-5xl
                    leading-tight
                    mb-4
                    text-gray-900
                "
            >
                { title }
            </h2>

            { paragraph && (
                <p
                    className="
                        max-w-3xl
                        mx-auto
                        text-base
                        md:text-lg
                        text-gray-700
                        whitespace-pre-line
                        leading-relaxed
                    "
                >
                    { paragraph }
                </p>
            ) }
        </div>
    );
}
