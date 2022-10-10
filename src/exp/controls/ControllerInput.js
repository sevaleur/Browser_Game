export default class ControllerInput 
{
    constructor()
    {
        this.init()
    }

    init()
    {
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false,
            click: false,
            tab: false
        }
        document.addEventListener('keydown', (e) => this.onKeyDown(e), false)
        document.addEventListener('mousedown', () => this.onMouseDown(), false)
        document.addEventListener('keyup', (e) => this.onKeyUp(e), false)
        document.addEventListener('mouseup', () => this.onMouseUp(), false)
    }

    onKeyDown(event)
    {
        switch(event.code)
        {
            case 'KeyW':
            case 'ArrowUp':
                this.keys.forward = true
                break
            case 'KeyA':
            case 'ArrowLeft':
                this.keys.left = true
                break
            case 'KeyS':
            case 'ArrowDown':
                this.keys.backward = true 
                break 
            case 'KeyD': 
            case 'ArrowRight':
                this.keys.right = true 
                break
            case 'Space':
                this.keys.space = true 
                break 
            case 'ShiftLeft':
            case 'ShiftRight':
                this.keys.shift = true
                break
            case 'Tab':
                this.keys.tab = true
                break
        }
    }

    onKeyUp(event)
    {
        switch(event.code)
        {
            case 'KeyW':
            case 'ArrowUp':
                this.keys.forward = false
                break
            case 'KeyA':
            case 'ArrowLeft':
                this.keys.left = false
                break
            case 'KeyS':
            case 'ArrowDown':
                this.keys.backward = false 
                break 
            case 'KeyD': 
            case 'ArrowRight':
                this.keys.right = false 
                break
            case 'Space':
                this.keys.space = false 
                break 
            case 'ShiftLeft':
            case 'ShiftRight':
                this.keys.shift = false
                break
            case 'Tab':
                this.keys.tab = false
                break
        }
    }

    onMouseDown()
    {
        this.keys.click = true
    }

    onMouseUp()
    {
        this.keys.click = false
    }
}