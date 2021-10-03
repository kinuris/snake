import { foreground } from "../components/App"
import { scoreHook, SnakeBound } from "../types"
import { clamp } from "../util/clamp"
import { Color } from "../util/Color"
import { PixelatedBG } from "./Background"
import { Snake } from "./Snake"

export class Board {
    
    private positionX: number
    private positionY: number
    private sideLength: number
    private partitionLength: number
    private scoreHook: scoreHook
    private strokeColor = Color.WHITE
    private fruitColor = new Color(200, 20, 10, 1).mix(new Color(255, 60, 75, 1))
    private fruitCoords = { x: Math.floor(Math.random() * 16), y: Math.floor(Math.random() * 16) }
    private backgroundColor: Color | PixelatedBG = Color.BLACK.brighter()
    private partitions = 16
    private snake = new Snake(foreground)
    private paused = true

    static defaultBoard(xPos: number, yPos: number, width: number, height: number) {
        return new Board().calcSideLength(width, height).setPositionCenteredOn(xPos, yPos)
    }

    draw(c: CanvasRenderingContext2D) {
        this.drawBackground(c)
        this.drawPartitions(c)
        this.drawFruit(c)
        this.snake.draw(c, this.positionX, this.positionY, this.partitionLength)
    }

    private drawBackground(c: CanvasRenderingContext2D) {
        
        if(this.backgroundColor instanceof Color) {
            c.beginPath()
            c.fillStyle = this.backgroundColor.toString()
            c.fillRect(this.positionX, this.positionY, this.sideLength, this.sideLength)
        } else if(this.backgroundColor instanceof PixelatedBG) {
            this.backgroundColor.draw(c)
        } else {
            c.clearRect(this.positionX, this.positionY, this.sideLength, this.sideLength)
        }
    }

    private drawPartitions(c: CanvasRenderingContext2D) {
        let row = 0
        let count = 0

        for(let i = 0; i < this.partitions * this.partitions; i++) {
            c.beginPath()
            c.lineWidth = 3
            c.strokeStyle = this.strokeColor.toString()
            c.strokeRect(this.positionX + (this.partitionLength * count), this.positionY + (this.partitionLength * row), this.partitionLength, this.partitionLength)
        
            if(count < this.partitions - 1) {
                count++
            } else {
                count = 0
                row++
            }
        }
    }

    private drawFruit(c: CanvasRenderingContext2D) {
        if(!this.snake.isGameOver() && !this.paused) {
            c.beginPath()
            c.fillStyle = this.fruitColor.toString()
            c.arc(this.positionX + (this.fruitCoords.x * this.partitionLength) + this.partitionLength/2, this.positionY + (this.fruitCoords.y * this.partitionLength) + this.partitionLength/2, this.partitionLength/4, 0, Math.PI * 2, false)
            c.fill()
        }
    }

    getSnake() {
        return this.snake
    }

    update() {
        if(this.paused)
            return

        this.snake.update()
        this.updateFruit()
    }

    private updateFruit() {
        const { x, y } = this.snake.getHeadPosition()
        if(this.fruitCoords.x - x === 0 && this.fruitCoords.y - y === 0) {
            this.snake.grow()
            this.randomizeFruitLocation()

            if(this.scoreHook)
                this.scoreHook(score => score + 1)
        }
    }

    private randomizeFruitLocation() {
        this.fruitCoords = { x: Math.floor(Math.random() * this.partitions), y: Math.floor(Math.random() * this.partitions) }
    }

    resize(xPos: number, yPos: number, width: number, height: number) {
        this.calcSideLength(width, height)
        this.setPositionCenteredOn(xPos, yPos)
    }

    setPositionCenteredOn(xPos: number, yPos: number) {
        this.positionX = xPos - (this.sideLength/2)
        this.positionY = yPos - (this.sideLength/2)

        return this
    }

    calcSideLength(width: number, height: number) {
        this.sideLength = clamp(Math.min(width, height), 0, 1500)
        this.sideLength -= this.sideLength/8
        this.partitionLength = this.sideLength/this.partitions

        return this
    }

    setScoreHook(hook: scoreHook) {
        this.scoreHook = hook

        return this
    }

    isPaused() {
        return this.paused
    }

    unpause() {
        this.paused = false

        return this
    }

    pause() {
        this.paused = true

        return this
    }

    getSideLength() {
        return this.sideLength
    }

    getPosition() {
        return { x: this.positionX, y: this.positionY}
    }

    getPartitionLength() {
        return this.partitionLength
    }

    setPartitionCount(count: number) {
        this.partitions = count

        return this
    }

    setColor(stroke: Color, background: Color | PixelatedBG | null) {
        this.strokeColor = stroke
        this.backgroundColor = background

        return this
    }
}