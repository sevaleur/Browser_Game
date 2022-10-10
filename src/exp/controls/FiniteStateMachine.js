import Exp from "../Exp";
import Controls from './Controls.js'

export default class FiniteStateMachine
{
    constructor()
    {
        this.states = {}
        this.current_state = null 

        this.exp = new Exp()
        this.time = this.exp.time
        this.controls = new Controls()
        this.input = this.controls.input
    }

    addState(name, type) 
    {
        this.states[name] = type
    }

    setState(name)
    {
        const prev_state = this.current_state

        if(prev_state)
        {
            if(prev_state.Name === name)
            {
                return 
            }
            prev_state.Exit()
        }

        const state = new this.states[name](this)
        this.current_state = state 
        state.Enter(prev_state)
    }

    update()
    {
        if(this.current_state)
        {
            this.current_state.update(this.time.delta / 1000, this.input)
        }
    }
}