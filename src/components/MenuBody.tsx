import React, { useState } from 'react'
import { css, jsx } from '@emotion/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { background, lightBrown, lightRed } from './App'

import dropDown from './../res/DropDown.svg'
import { ScoreBoard } from './menu/ScoreBoard'
import { Themes } from './menu/Themes'
/**@jsx jsx */

const visibleBodyVariants = {
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.5,
            staggerChildren: 0.05
        }
    },
    hidden: {
        opacity: 0,
        scale: 0.3,
        y: -700,
        transition: {
            type: "spring",
            duration: 0.5,
            staggerChildren: 0.05
        }
    }
}

const visibleVariants = {
    visible: {
        rotateZ: 180 
        
    },
    hidden: {
        rotateZ: 0
    }
}

export function MenuBody() {

    const [visible, setVisible] = useState(false)

    return (
        <motion.div
            css={css`
                display: flex;
                flex-direction: column;
                place-items: center;
                font-family: Arial, 'Courier New';
                color: ${lightRed.toString()}
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.img
                css={css`
                    width: 2em;
                `}
                variants={visibleVariants}
                animate={visible ? "visible" : "hidden"}
                onClick={() => setVisible(vis => !vis)}
                src={dropDown}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            />
            <AnimatePresence>
                {visible && <motion.div
                    variants={visibleBodyVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    css={css`
                        background-color: ${background.setAlpha(0.85).toString()};
                        display: flex;
                        margin-top: 20px;
                        overflow-y: scroll;

                        @media screen and (max-height: 300px) {
                            margin-top: 10px;
                        }

                        padding: 10px;
                        width: 50vw;
                        height: 70vh;
                        @media screen and (max-height: 380px) {
                            height: 60vh;
                        }

                        border-radius: 10px;
                        border: 5px solid ${lightRed.toString()};
                    `}
                >
                    <ScoreBoard />
                    <Themes />
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    )
}