import React, { memo, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import { motion } from 'framer-motion'
import { background, lightRed } from './App'
import { Board } from '../snake/Board'
import { Direction } from '../snake/Snake'
import { CanvasWrapperProps } from '../types'

/**@jsx jsx */

export const CanvasWrapper = memo(({ partitionCount, updatesPerSecond,gameOverHook, pauseHook, scoreHook }: CanvasWrapperProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const board = Board.defaultBoard(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight)
    .setColor(lightRed, background)
    .setPartitionCount(partitionCount)
    .setScoreHook(scoreHook)

    const snake = board.getSnake()
    .setBounds(partitionCount, partitionCount)
    .setGameOverHook(gameOverHook)

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
                snake.reset()
                board.unpause()
                scoreHook(0)
            }
            else if(e.key === ' ' && board.isPaused()) {
                pauseHook(false)
                board.unpause()
            }
            else if(e.key === 'g' && !board.isPaused() && !snake.isGameOver()) {
                board.pause()
                pauseHook(true)
            }
        })
    }

    const resize = () => {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
        board.resize(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight)
    }

    // Draw Here
    const draw = (c: CanvasRenderingContext2D) => {
        c.fillStyle = background.toString()
        c.fillRect(0, 0, window.innerWidth, window.innerHeight)

        board.draw(c)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        let start = Date.now()
        let millisecondsPerUpdate = 1000/updatesPerSecond

        function render() {
            let elapsed = Date.now()

            if(elapsed - start > millisecondsPerUpdate) {
                board.update()
                start = elapsed
            }

            draw(context)
            requestAnimationFrame(render)
        }

        init()
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