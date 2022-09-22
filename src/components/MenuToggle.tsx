import React, { useState } from 'react'
import { css, jsx } from '@emotion/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { MenuBody } from './MenuBody'
import { MenuToggleProps } from '../types'

/**@jsx jsx */

export function MenuToggle({ gameOver, paused }: MenuToggleProps) {

    return (
        <motion.div 
            css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                place-items: center;
                padding-top: 20px;
                @media screen and (max-height: 300px) {
                    padding-top: 10px;
                }
            `}
        >
            <AnimatePresence>
                {(gameOver || paused) && <MenuBody />}
            </AnimatePresence>
        </motion.div>
    )
}