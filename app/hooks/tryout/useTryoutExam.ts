import { useEffect, useState } from "react";
import { Tryout } from "./useTryouts";
import { useShortcut } from "./useShortcut";

export function useTryoutExam( tryout: Tryout, isReview: boolean = false )
{
    const [currentIndex, setCurrentIndex] = useState( 0 );
    const [answers, setAnswers] = useState<Record<number, string>>( {} );
    const [timeLeft, setTimeLeft] = useState( ( tryout.duration || 0 ) * 60 );
    const [isFinished, setIsFinished] = useState( isReview );
    const [showSidebar, setShowSidebar] = useState( false );

    const questions = tryout.questions || [];
    const total = questions.length;
    const currentQuestion = questions[currentIndex];

    const handleSelect = ( option: string ) =>
    {
        if ( isReview || isFinished ) return;
        setAnswers( ( prev ) => ( { ...prev, [currentIndex]: option } ) );
    };

    const next = () => currentIndex < total - 1 && setCurrentIndex( currentIndex + 1 );
    const prev = () => currentIndex > 0 && setCurrentIndex( currentIndex - 1 );
    const allAnswered = Object.keys( answers ).length === total;

    const score = Object.entries( answers ).filter(
        ( [i, ans] ) =>
            questions[parseInt( i )]?.["Correct Answer"]?.trim().toUpperCase() === ans
    ).length;

    // Timer
    useEffect( () =>
    {
        if ( isReview || isFinished ) return;
        if ( timeLeft <= 0 )
        {
            alert( "⏰ Waktu habis! Tryout otomatis selesai." );
            setIsFinished( true );
            return;
        }
        const timer = setInterval( () => setTimeLeft( ( t ) => t - 1 ), 1000 );
        return () => clearInterval( timer );
    }, [timeLeft, isReview, isFinished] );

    // ✅ Gunakan hook baru untuk keyboard shortcut
    useShortcut( {
        enabled: !isFinished,
        onPrev: prev,
        onNext: next,
        onSelect: handleSelect,
        onFinish: () => setIsFinished( true ),
        total,
        currentIndex,
        allAnswered,
    } );

    return {
        currentIndex,
        setCurrentIndex,
        answers,
        setAnswers,
        timeLeft,
        setTimeLeft,
        isFinished,
        setIsFinished,
        showSidebar,
        setShowSidebar,
        questions,
        total,
        currentQuestion,
        score,
        allAnswered,
        handleSelect,
        next,
        prev,
    };
}
