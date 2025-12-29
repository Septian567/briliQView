import { NotebookText, Brain, School, GraduationCap, HelpCircle } from "lucide-react";

export const leftCategories = [
    {
        icon: <NotebookText size={ 28 } />,
        title: "Materi SMP",
        items: ["Matematika", "IPA", "Bahasa Indonesia", "Bahasa Inggris"],
    },
    {
        icon: <NotebookText size={ 28 } />,
        title: "Materi SMA",
        items: ["Matematika", "Fisika", "Kimia", "Biologi"],
    },
    {
        icon: <Brain size={ 28 } />,
        title: "TKA-SMP",
        items: ["Numerasi", "Literasi"],
    },
];

export const rightCategories = [
    {
        icon: <Brain size={ 28 } />,
        title: "TKA-SMA",
        items: ["Matematika", "Bahasa Indonesia", "Bahasa Inggris"],
    },
    {
        icon: <School size={ 28 } />,
        title: "Ujian Mandiri",
        items: ["Saintek", "Soshum"],
    },
    {
        icon: <GraduationCap size={ 28 } />,
        title: "UTBK",
        items: ["Penalaran Umum", "Literasi Bahasa Indonesia", "Literasi Bahasa Inggris", "Penalaran Matematika"],
    },
    {
        icon: <HelpCircle size={ 28 } />,
        title: "Request pecahkan soal",
        items: ["Kirim soal", "Pembahasan lengkap", "Diskusi dengan tutor"],
    },
];
