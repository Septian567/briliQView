"use client";

import React from "react";
import { motion } from "framer-motion";

interface NoContentMessageProps
{
    message?: string;
}

export default function NoContentMessage( {
    message = "No content available.",
}: NoContentMessageProps )
{
    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-center py-10 text-gray-500">
            <motion.p
                initial={ { opacity: 0, y: 10 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.4 } }
                className="text-lg sm:text-xl"
            >
                { message }
            </motion.p>
        </div>
    );
}
