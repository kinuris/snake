import React from 'react'
import { jsx, css } from '@emotion/react'
import { motion } from 'framer-motion'
import { background, lightRed } from '../App'
import { ScoreProps } from '../../types'
import { scoreVariants } from './ScoreBoard'

/**@jsx jsx */

export function ScoreComponent({ name, score, place }: ScoreProps) {
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
                    display: flex;
                    justify-content: center;
                    place-items: center;
                    width: 2em;
                    min-width: 2em;
                    height: 2em;
                    min-height: 2em;
                    border-radius: 50%;
                    border: 1px solid ${lightRed.toString()};
                    background-color: ${background.toString()};
                `}
            >{place}</motion.p>
            <motion.div css={css`
                width: 100%;
                margin-left: 10px;
                padding: 5px 10px;
                border: 5px outset ${lightRed.setAlpha(0.5).toString()};
                border-radius: 5px;

                P {
                    font-size: 2em;

                    @media screen and (max-width: 1600px) {
                        font-size: 1.5em;
                    }

                    @media screen and (max-width: 1280px) {
                        font-size: 1em;
                    }
                }
            `}>
                <motion.p id="points">
                    score: {score} points!
                </motion.p>
                <motion.p id="username">
                    name: {name}
                </motion.p>
            </motion.div>
        </motion.div>
    )
}