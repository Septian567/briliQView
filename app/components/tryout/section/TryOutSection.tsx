"use client";

import React from "react";
import { motion } from "framer-motion";
import TryoutModal from "./TryoutModal";
import TryoutExam from "../exam/TryoutExam";
import TryoutCard from "./TryoutCard";
import PreviewTryout from "../preview/PreviewTryout";
import Frame from "../../frame/Frame";
import AddButton from "../../frame/AddButton";
import NoContentMessage from "../../frame/NoContentMessage";
import { useTryoutSection } from "../../../hooks/tryout/useTryoutSection";

export default function TryoutSection()
{
    const {
        tryouts,
        isModalOpen,
        setIsModalOpen,
        editMode,
        editTryout,
        activeTryout,
        isPreviewing,
        isStarted,
        history,
        activeResult,
        handleOpenTryout,
        handleStartTryout,
        handleExitTryout,
        handleReviewResult,
        handleExitReview,
        handleExitPreview,
        handleEditTryout,
        handleSaveTryout,
        removeTryout,
    } = useTryoutSection();

    if ( activeResult )
    {
        return (
            <TryoutExam
                tryout={ {
                    id: activeResult.tryoutId,
                    name: activeResult.tryoutName,
                    duration: 0,
                    questions: activeResult.questions,
                    subject: "",
                    level: "",
                    questionCount: activeResult.questions.length,
                } }
                onExit={ handleExitReview }
                initialAnswers={ activeResult.answers }
                isReview={ true }
                date={ activeResult.date }
            />
        );
    }

    if ( isStarted && activeTryout )
    {
        return (
            <TryoutExam
                tryout={ activeTryout }
                onExit={ handleExitTryout }
                date={ new Date().toISOString() }
            />
        );
    }

    if ( isPreviewing && activeTryout )
    {
        const thisHistory = history.filter( ( h ) => h.tryoutId === activeTryout.id );

        return (
            <PreviewTryout
                tryout={ activeTryout }
                onStart={ handleStartTryout }
                onCancel={ handleExitPreview }
                history={ thisHistory }
                onReview={ handleReviewResult }
            />

        );
    }

    return (
        <Frame
            floatingButton={
                <AddButton onClick={ () => setIsModalOpen( true ) } title="Add Tryout" />
            }
        >
            <div
                className={ `flex-1 ${ tryouts.length === 0
                        ? "flex justify-center items-center"
                        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    }` }
            >
                { tryouts.length > 0 ? (
                    tryouts.map( ( t ) => (
                        <motion.div key={ t.id } whileHover={ { scale: 1.02 } }>
                            <TryoutCard
                                tryout={ t }
                                onOpen={ () => handleOpenTryout( t ) }
                                onEdit={ () => handleEditTryout( t ) }
                                onDelete={ () => removeTryout( t.id ) }
                            />
                        </motion.div>
                    ) )
                ) : (
                    <NoContentMessage message="No tryouts yet." />
                ) }
            </div>

            <TryoutModal
                isOpen={ isModalOpen }
                setIsOpen={ setIsModalOpen }
                onSubmit={ handleSaveTryout }
                editData={ editMode ? editTryout : null }
            />
        </Frame>
    );
}
