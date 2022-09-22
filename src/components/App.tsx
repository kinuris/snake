import React, { createContext, useState } from 'react'
import { css, jsx } from '@emotion/react'
import { motion } from 'framer-motion'

import { CanvasWrapper } from './CanvasWrapper'
import { Color } from '../util/Color'
import { Score } from './Score'
import { MenuToggle } from './MenuToggle'

export const foreground = new Color(97, 74, 211, 1)
export const background = new Color(18, 27, 116, 1).mix(new Color(20, 20, 70, 1))
export const darkBlue = new Color(45, 36, 138, 1)
export const lightRed = new Color(228, 44, 100, 1)

// Other Colors
export const lightBrown = new Color(181, 101, 29, 1)

// Color Combinations
// All light brown with background strokes

export let scoreContext: React.Context<{
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}>

export function App() {
    const [partitionCount, setPartitionCount] = useState(16)
    const [updatesPerSecond, setUpdatesPerSecond] = useState(12)
    const [score, setScore] = useState(0)
    const [paused, setPaused] = useState(true)
    const [gameOver, setGameOver] = useState(false)

    const scoreThread = { score, setScore }
    scoreContext = createContext(scoreThread)

    return (
        <motion.div
            css={css`
                position: relative;
                overflow: hidden;
                height: 100vh;
            `}
        >    
            <CanvasWrapper partitionCount={partitionCount} pauseHook={setPaused} gameOverHook={setGameOver} scoreHook={setScore} updatesPerSecond={updatesPerSecond} />            
            {/* <scoreContext.Provider value={scoreThread}>
                <MenuToggle paused={paused} gameOver={gameOver} />
            </scoreContext.Provider> */}
        </motion.div>
    )
}