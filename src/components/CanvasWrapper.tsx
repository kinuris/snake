import React, { memo, useEffect, useRef, useState } from 'react'
import { css, jsx } from '@emotion/react'
import { motion } from 'framer-motion'
import { background, darkBlue, foreground, lightBrown, lightRed } from './App'
import { Board } from '../snake/Board'
import { Direction } from '../snake/Snake'
import { CanvasWrapperProps } from '../types'
import { PixelatedBG } from '../snake/Background'

/**@jsx jsx */

export const CanvasWrapper = memo(({ partitionCount, updatesPerSecond, gameOverHook, pauseHook, scoreHook }: CanvasWrapperProps) => {
    let topContext: CanvasRenderingContext2D

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const board = Board.defaultBoard(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight)
    .setPartitionCount(partitionCount)
    .setScoreHook(scoreHook)

    const boardBG = new PixelatedBG(lightBrown.darker(), 5, false, false, true)
    .setPosition(board.getPosition().x, board.getPosition().y)
    .setPixelSideLength(board.getPartitionLength())
    .setDimensions(board.getSideLength(), board.getSideLength())

    board.setColor(background, boardBG)
    
    const snake = board.getSnake()
    .setBounds(partitionCount, partitionCount)
    .setGameOverHook(gameOverHook)
    .setColor(foreground)

    const pixelBG = new PixelatedBG(lightBrown, 20)

    let cleared = false
    const init = () => {
        resize()
        window.addEventListener('resize', () => {
            resize()    
        })

        window.addEventListener('keypress', e => {
            let direction: Direction
            switch(e.key) {
                case 'w':
                    direction = Direction.Up
                    break
                case 's':
                    direction = Direction.Down
                    break
                case 'a':
                    direction = Direction.Left
                    break
                case 'd':
                    direction = Direction.Right
            }

            if(direction && !board.isPaused())
                snake.setHeadDirection(direction)
            else if(e.key === ' ' && snake.isGameOver()) {
                cleared = false
                snake.reset()
                board.unpause()
                scoreHook(0)
            } else if(e.key === ' ' && board.isPaused()) {
                pauseHook(false)
                board.unpause()
            } else if(e.key === 'g' && !board.isPaused() && !snake.isGameOver()) {
                board.pause()
                pauseHook(true)
            }
        })
    }

    const resize = () => {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        board.resize(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight)
        pixelBG
        .setPixelSideLength(window.innerWidth/96)
        .setDimensions(window.innerWidth, window.innerHeight)
        .setAdditional(100)

        boardBG
        .setPosition(board.getPosition().x, board.getPosition().y)
        .setPixelSideLength(board.getPartitionLength())
        .setDimensions(board.getSideLength(), board.getSideLength())

        if(topContext)
            pixelBG.draw(topContext)
    }

    // Draw Here
    const draw = (c: CanvasRenderingContext2D) => {
        board.draw(c)
    }

    useEffect(() => {
        init()
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        topContext = context

        // Draw Static pixelBG
        pixelBG.draw(context)

        let start = Date.now()
        let millisecondsPerUpdate = 1000/updatesPerSecond

        function render() {
            let elapsed = Date.now()

            if(elapsed - start > millisecondsPerUpdate) {
                board.update()
                start = elapsed
            
                if(snake.isGameOver() && !cleared) {
                    pixelBG.draw(context)

                    cleared = true
                }
            
            }
            
            draw(context)
            requestAnimationFrame(render)
        }

        render()

    }, [draw])

    return (
        <motion.canvas 
            ref={canvasRef}
            css={css`
                position: absolute;
                left: 0;
                z-index: -10;
            `}
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: 1,
                transition: {
                    duration: 0.5
                }
            }}
        >
            HTML Canvas Not Supported
        </motion.canvas>
    )
})