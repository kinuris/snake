import { lightRed } from "../components/App"
import { gameOverHook, SnakeBound } from "../types"
import { Color } from "../util/Color"

export enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

export class Snake {

    private bounds: SnakeBound = { x: 16, y: 16 }
    private intersected = false
    private mustReset = false
    private shouldGrow = false
    private directionSuggestion = Direction.Left
    private joints: Joint[] = []
    private previousHeadDirection: Direction
    private gameOverHook: gameOverHook
    private head: Segment
    private body: Segment[]

    constructor() {
        this.initHeadBody()
    }

    draw(c: CanvasRenderingContext2D, startingX: number, startingY: number, multiplier: number) {
        this.head.draw(c, startingX, startingY, multiplier)
        this.body.forEach(seg => seg.draw(c, startingX, startingY, multiplier))
    }

    update() {
        this.checkReset()
        if(this.intersected) {
            this.head.setColor(lightRed)
            this.body.forEach(seg => seg.setColor(lightRed))
            return
        }

        this.ensureGrowth()
        this.updateHeadBody() 
    }

    private ensureGrowth() {
        if(this.shouldGrow) {
            const { x, y } = this.body[this.body.length - 1].getPosition()
            const direction = this.body[this.body.length - 1].getDirection()

            let xSpawn: number, ySpawn: number
            if(direction === Direction.Left) {
                xSpawn = x + 1
                ySpawn = y
            } else if(direction === Direction.Right) {
                xSpawn = x - 1
                ySpawn = y
            } else if(direction === Direction.Up) {
                ySpawn = y + 1
                xSpawn = x
            } else if(direction === Direction.Down) {
                ySpawn = y - 1
                xSpawn = x
            }

            this.body.push(new Segment(xSpawn, ySpawn, direction))
            this.shouldGrow = false
        }
    }

    private checkReset() {
        if(this.mustReset) {
            this.intersected = false
            this.mustReset = false
            this.shouldGrow = false
            this.directionSuggestion = Direction.Left
            this.joints = []
            this.initHeadBody()
        }
    }
    
    private initHeadBody() {
        this.head = new Segment(Math.round(this.bounds.x/2) - 1, Math.round(this.bounds.y/2), Direction.Left)
        this.body = [new Segment(Math.round(this.bounds.x/2), Math.round(this.bounds.y/2), Direction.Left), new Segment(Math.round(this.bounds.x/2) + 1, Math.round(this.bounds.y/2), Direction.Left)]
    }

    private updateHeadBody() {
        this.head.setDirection(this.directionSuggestion)
        this.head.move()
        
        if(this.head.getDirection() !== this.previousHeadDirection)
            this.joints.push(new Joint(this.head.getDirection()))

        this.previousHeadDirection = this.head.getDirection()

        let { x: xHead, y: yHead } = this.head.getPosition()
        
        this.body.forEach((seg, index) => {
            seg.move()

            this.joints.forEach(joint => {
                if(joint.getAge() === index) {
                    seg.setDirection(joint.getDirection())
                }
            })

            // Check Intersections
            let { x, y } = seg.getPosition()

            if(x - xHead === 0 && y - yHead === 0) {
                this.intersected = true

                if(this.gameOverHook)
                    this.gameOverHook(true)
            }
        })

        if(xHead < 0 || xHead >= this.bounds.x || yHead < 0 || yHead >= this.bounds.y){
            this.intersected = true
            
            if(this.gameOverHook)
                this.gameOverHook(true)
        }

        // Update Joints
        this.joints = this.joints.filter(joint => {
            joint.update()
            return joint.getAge() < this.body.length
        })
    }

    grow() {
        this.shouldGrow = true
    }

    reset() {
        if(this.gameOverHook)
            this.gameOverHook(false)
        this.mustReset = true
    }

    setHeadDirection(direction: Direction) {

        if(direction === this.head.getDirection())
            return
        else if(this.head.getDirection() === Direction.Up && direction === Direction.Down)
            return
        else if(this.head.getDirection() === Direction.Down && direction === Direction.Up)
            return
        else if(this.head.getDirection() === Direction.Left && direction === Direction.Right)
            return
        else if(this.head.getDirection() === Direction.Right && direction === Direction.Left)
            return
        
        this.directionSuggestion = direction
    }

    setBounds(x: number, y: number) {
        this.bounds = { x, y }
        this.initHeadBody()

        return this
    }

    setGameOverHook(hook: gameOverHook) {
        this.gameOverHook = hook

        return this
    }

    getHeadPosition() {
        return this.head.getPosition()
    }

    isGameOver() {
        return this.intersected
    }
}

class Joint {
    private age = 0
    private direction: Direction

    constructor(direction: Direction) {
        this.direction = direction
    }

    update() {
        this.age++
    }

    getAge() {
        return this.age
    }

    getDirection() {
        return this.direction
    }
}

class Segment {
    private direction: Direction
    private positionX: number
    private positionY: number
    private color = Color.WHITE

    constructor(x: number, y: number, direction: Direction) {
        this.positionX = x
        this.positionY = y
        this.direction = direction
    }

    draw(context: CanvasRenderingContext2D, startingX: number, startingY: number, multiplier: number) {
        context.beginPath()
        context.fillStyle = this.color.toString()
        context.fillRect(startingX + (this.positionX * multiplier), startingY + (this.positionY * multiplier), multiplier, multiplier)
    }

    move() {
        switch(this.direction) {
            case Direction.Up:
                this.positionY--
                break

            case Direction.Down:
                this.positionY++
                break

            case Direction.Left:
                this.positionX--
                break

            case Direction.Right:
                this.positionX++
                break
        }
    }

    setColor(color: Color) {
        this.color = color

        return this
    }

    setDirection(direction: Direction) {
        this.direction = direction

        return this
    }

    getDirection() {
        return this.direction
    }

    getPosition() {
        return { x: this.positionX, y: this.positionY }
    }
}