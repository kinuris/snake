import React, { useContext } from 'react'
import { jsx, css } from '@emotion/react'
import { motion } from 'framer-motion'
import { background, lightRed, scoreContext } from '../App'
import { scoreVariants } from './ScoreBoard'

/**@jsx jsx */

export function CurrentScore() {

    const { score, setScore } = useContext(scoreContext)

    return (
        <motion.div
            variants={scoreVariants}
            css={css`
                display: flex;
                margin: 10px 0 20px 0;
                place-items: center;
            `}
        >
            <motion.p
                css={css`
                    display: inline;
                    padding: 5px 5px;
                    text-align: center;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    border: 1px solid ${lightRed.toString()};
                    background-color: ${background.toString()};
                `}
            >My</motion.p>
            <motion.div css={css`
                 width: 100%;
                 margin-left: 9px;
                 padding: 5px 8px;
                 border: 1px solid ${lightRed.toString()};
                 border-radius: 5px;

                p {
                    text-align: center;
                }
            `}>
                <motion.p>Current Score:</motion.p>
                <motion.p css={css`
                    font-size: 50px;
                `}>{score}</motion.p>
            </motion.div>
        </motion.div>
    )
}