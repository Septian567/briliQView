import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Tryout } from "./useTryouts";

interface UseTryoutModalProps
{
    editData?: Tryout | null;
    onSubmit: ( tryout: Tryout ) => void;
    closeModal: () => void;
}

export function useTryoutModal( { editData, onSubmit, closeModal }: UseTryoutModalProps )
{
    const [formData, setFormData] = useState( {
        name: "",
        subject: "",
        level: "",
        duration: "",
        questionCount: "",
        file: null as File | null,
        questions: [] as any[],
    } );

    // Prefill form saat edit mode
    useEffect( () =>
    {
        if ( editData )
        {
            setFormData( {
                name: editData.name,
                subject: editData.subject,
                level: editData.level,
                duration: editData.duration?.toString() || "",
                questionCount: editData.questionCount.toString(),
                file: null,
                questions: editData.questions || [],
            } );
        } else
        {
            // reset form
            setFormData( {
                name: "",
                subject: "",
                level: "",
                duration: "",
                questionCount: "",
                file: null,
                questions: [],
            } );
        }
    }, [editData] );

    // Upload dan parsing file CSV
    const handleFileUpload = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        const file = e.target.files?.[0];
        if ( !file ) return;

        setFormData( ( prev ) => ( { ...prev, file } ) );

        Papa.parse( file, {
            header: true,
            complete: ( results: any ) =>
            {
                const rows = results.data.filter( ( row: any ) => row.Question || row.question );
                setFormData( ( prev ) => ( {
                    ...prev,
                    questionCount: rows.length.toString(),
                    questions: rows,
                } ) );
            },
            error: ( err: any ) =>
            {
                console.error( "CSV parsing error:", err );
            },
        } as any );
    };

    // Submit data (Add / Edit)
    const handleSubmit = ( e: React.FormEvent ) =>
    {
        e.preventDefault();
        if ( !formData.name || !formData.subject || !formData.level || !formData.duration ) return;

        const newTryout: Tryout = {
            id: editData ? editData.id : Date.now().toString(),
            name: formData.name,
            subject: formData.subject,
            level: formData.level,
            duration: parseInt( formData.duration ),
            questionCount: parseInt( formData.questionCount ) || 0,
            questions: formData.questions || editData?.questions || [],
        };

        onSubmit( newTryout );
        resetForm();
        closeModal();
    };

    const resetForm = () =>
    {
        setFormData( {
            name: "",
            subject: "",
            level: "",
            duration: "",
            questionCount: "",
            file: null,
            questions: [],
        } );
    };

    return {
        formData,
        setFormData,
        handleFileUpload,
        handleSubmit,
    };
}
