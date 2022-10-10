import * as THREE from 'three'
import State from './State.js'

export default class IdleState extends State 
{
    constructor(parent)
    {
        super(parent)
    }

    get Name() 
    {
        return 'idle'
    }

    Enter(prev_state)
    {
        const idle_action = this.parent.proxy._animations.idle 
        if(prev_state)
        {
            const prev_action = this.parent.proxy._animations[prev_state.Name]
            idle_action.time = 0.0 
            idle_action.enabled = true 
            idle_action.setEffectiveTimeScale(1.0)
            idle_action.setEffectiveWeight(1.0)
            idle_action.crossFadeFrom(prev_action, 0.5, true)
            idle_action.play()
        }
        else 
        {
            idle_action.play()
        }
    }

    Exit()
    {

    }

    update(_, input)
    {
        if(input.keys.forward)
        {
            this.parent.setState('walk')
        }
        else if(input.keys.backward)
        {
            this.parent.setState('walk_back')
        }
        else if(input.keys.click)
        {
            this.parent.setState('attack')
        }
    }
}