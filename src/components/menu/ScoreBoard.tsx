import React from 'react'
import { jsx, css } from '@emotion/react'
import { motion } from 'framer-motion'

/**@jsx jsx */

export function ScoreBoard() {
    return (
        <motion.section 
            css={css`
                width: 50%;
                height: 100%;
                padding: 10px;
            `}
            id="score-board">
            <motion.p>
                Score Board:
            </motion.p>
        </motion.section>
    )
}