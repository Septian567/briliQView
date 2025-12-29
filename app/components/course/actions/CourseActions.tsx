"use client";

import React from "react";
import AddChapter from "./AddChapter";
import ChapterList from "./ChapterList";
// import AddSubChapter from "./AddSubChapter";
import SubChapterList from "./SubChapterList";
import ChapterHeader from "./ChapterHeader";
import { useCourseActions } from "../../../hooks/course/actions/useCourseActions";
import AddSubChapterUILayout from "./AddSubChapterAlternative";

interface CourseActionsProps
{
    showHeader: boolean;
    setShowHeader: ( show: boolean ) => void;
}

export default function CourseActions( { showHeader, setShowHeader }: CourseActionsProps )
{
    const {
        activeTab,
        setActiveTab,
        chapters,
        editIndex,
        editValue,
        setEditValue,
        selectedChapter,
        subChapters,
        addLabel,
        listLabel,
        handleAddChapter,
        handleEditClick,
        handleSaveEdit,
        handleCancelEdit,
        handleDelete,
        handleSelectChapter,
        handleAddSubChapter,
        handleEditSubChapter,
        handleDeleteSubChapter,
        handleBackToMain,
    } = useCourseActions();

    return (
        <section className="mt-2 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Header */ }
            <ChapterHeader
                selectedChapter={ selectedChapter }
                showHeader={ showHeader }
                setShowHeader={ setShowHeader }
                onBackToMain={ handleBackToMain }
            />

            {/* Tabs */ }
            <div className="flex flex-wrap mt-4 mb-6 gap-4 sm:gap-6">
                <button
                    onClick={ () => setActiveTab( "tambah" ) }
                    className={ `pb-2 text-base sm:text-lg font-medium transition ${ activeTab === "tambah"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-800"
                        }` }
                >
                    { addLabel }
                </button>

                <button
                    onClick={ () => setActiveTab( "daftar" ) }
                    className={ `pb-2 text-base sm:text-lg font-medium transition ${ activeTab === "daftar"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-800"
                        }` }
                >
                    { listLabel }
                </button>
            </div>

            {/* Content */ }
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm overflow-x-auto">
                {/* CHAPTER MODE */ }
                { !selectedChapter && (
                    <>
                        { activeTab === "tambah" && <AddChapter onAdd={ handleAddChapter } /> }
                        { activeTab === "daftar" && (
                            <ChapterList
                                chapters={ chapters }
                                editIndex={ editIndex }
                                editValue={ editValue }
                                onEditClick={ handleEditClick }
                                onEditChange={ setEditValue }
                                onSaveEdit={ handleSaveEdit }
                                onCancelEdit={ handleCancelEdit }
                                onDelete={ handleDelete }
                                onSelect={ handleSelectChapter }
                                selectedChapter={ selectedChapter }
                            />

                        ) }
                    </>
                ) }

                {/* SUBCHAPTER MODE */ }
                { selectedChapter && (
                    <>
                        { activeTab === "tambah" && (
                            <AddSubChapterUILayout
                                chapterName={ selectedChapter }
                                onAddSubChapter={ handleAddSubChapter }
                            />
                        ) }
                        { activeTab === "daftar" && (
                            <SubChapterList
                                chapterName={ selectedChapter }
                                subChapters={ subChapters }
                                onEditSubChapter={ handleEditSubChapter }
                                onDeleteSubChapter={ handleDeleteSubChapter }
                            />
                        ) }
                    </>
                ) }
            </div>
        </section>
    );
}
