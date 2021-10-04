import React from "react"

export type SnakeBound = {
    x: number,
    y: number
}

export type pauseHook = React.Dispatch<React.SetStateAction<boolean>>
export type gameOverHook = React.Dispatch<React.SetStateAction<boolean>>
export type scoreHook = React.Dispatch<React.SetStateAction<number>>

export type CanvasWrapperProps = {
    partitionCount: number,
    updatesPerSecond: number,
    pauseHook: pauseHook,
    gameOverHook: gameOverHook,
    scoreHook: scoreHook
}

export type MenuToggleProps = {
    gameOver: boolean,
    paused: boolean
}

export type ScoreProps = {
    score: number
}