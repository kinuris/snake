import React from 'react'
import { jsx, css } from '@emotion/react'
import { motion } from 'framer-motion'

/**@jsx jsx */

export function Themes() {
    return (
        <motion.section 
            css={css`
                width: 50%;
                height: 100%;
                padding: 10px;
            `}
            id="themes-board">
            <motion.p>
                Themes:
            </motion.p>
        </motion.section>
    )
}