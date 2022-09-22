import React from 'react'
import { jsx, css } from '@emotion/react'
import { motion } from 'framer-motion'
import { ScoreComponent } from './ScoreComponent'
import { ScoreProps } from '../../types'
import { CurrentScore } from './CurrentScore'

/**@jsx jsx */

export const scoreVariants = {
    visible: {
        y: 0,
        opacity: 1
    },
    hidden: {
        y: 100,
        opacity: 0
    }
}

let sampleData: ScoreProps[] = [
    {
        name: 'chris',
        score: 972,
        place: 1
    },
    {
        name: 'thankyou',
        score: 821,
        place: 2
    },
    {
        name: 'chris',
        score: 972,
        place: 1
    },
    {
        name: 'thankyou',
        score: 821,
        place: 2
    },
    {
        name: 'chris',
        score: 972,
        place: 1
    },
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
    ,
    {
        name: 'thankyou',
        score: 821,
        place: 15
    }
]

export function ScoreBoard() {
    return (
        <motion.section
            css={css`
                width: 50%;
                height: 100%;
                padding: 10px;
            `}
            id="score-board">
            <motion.p variants={scoreVariants}>
                Score Board:
            </motion.p>
            <CurrentScore />
            {sampleData.map(({ name, score, place }, index) => {
                return (
                    <ScoreComponent key={name + index} score={score} name={name} place={place} />
                )
            })}
        </motion.section>
    )
}