import { Color, ColorHSL } from "../util/Color"

export class PixelatedBG {
    private pixelSideLength = 24
    private length = 1080
    private width = 1920
    private colorPalette: ColorHSL[]
    private positionX = 0
    private positionY = 0
    private additional = 0
    private colors: ColorHSL[]

    constructor(color: Color, variations: number, randomizeSaturation = true, randomizeHue = true, randomizeLightness = true) {
        this.colorPalette = []
        for(let i = 0; i < variations; i++) {
            let hslColor = color.toHSL()

            if(randomizeSaturation)
                hslColor.randSat()
            if(randomizeHue)
                hslColor.randHue()
            if(randomizeLightness)
                hslColor.randLightness()

            this.colorPalette.push(hslColor)
        }
    }

    randSat() {
        this.colors.forEach(color => color.randSat())

        return this
    }

    randHue() {
        this.colors.forEach(color => color.randHue())
    
        return this
    }

    randLightness() {
        this.colors.forEach(color => color.randLightness())
    
        return this
    }

    setAdditional(count: number) {
        if(count > 120)
            throw new Error("Count must be less than 120")

        this.additional = count
    }

    setPixelSideLength(length: number) {
        this.pixelSideLength = length
        
        return this
    }

    setPosition(posX: number, posY: number) {
        this.positionX = posX
        this.positionY = posY

        return this
    }

    setDimensions(width: number, length: number) {
        this.length = length
        this.width = width
        this.colors = []

        for(let i = 0; i < (this.length * this.width)/(this.pixelSideLength * this.pixelSideLength) + 120; i++) {
            this.colors.push(this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)])
        }

        return this
    }

    draw(c: CanvasRenderingContext2D) {
        this.drawBackground(c)
    }
    
    private drawBackground(c: CanvasRenderingContext2D) {
        let row = 0
        let count = 0
        
        for(let i = 0; i < (this.length * this.width)/(this.pixelSideLength * this.pixelSideLength) + this.additional; i++) {
            
            c.beginPath()
            c.fillStyle = this.colors[i].toString()
            c.fillRect(this.positionX + (this.pixelSideLength * count), this.positionY + (this.pixelSideLength * row), this.pixelSideLength, this.pixelSideLength)

            if(count * this.pixelSideLength < this.width - this.pixelSideLength) {
                count++
            } else {
                row++
                count = 0
            }
        }
    }
}