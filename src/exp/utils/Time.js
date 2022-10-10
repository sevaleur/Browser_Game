import EventEmitter from "./EventEmitter.js"

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        this.start = Date.now()
        this.current = this.start 
        this.elapsed = 0
        this.delta = 16 

        window.requestAnimationFrame(() => 
        {
            this.update()
        })
    }

    update()
    {
        const current_time = Date.now()
        this.delta = current_time - this.current
        this.current = current_time
        this.elapsed = this.start - this.current

        this.trigger('update')

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }
}