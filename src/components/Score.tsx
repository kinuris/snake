import React from 'react'
import { css, jsx } from '@emotion/react'
import { motion } from 'framer-motion'
import { ScoreProps } from '../types'

/**@jsx jsx */

export function Score({ score }: ScoreProps) {
    return (
        <motion.p>
            {score}
        </motion.p>
    )
}