import * as THREE from 'three'
import State from './State.js'

export default class WalkState extends State 
{
    constructor(parent)
    {
        super(parent)
    }

    get Name() 
    {
        return 'walk'
    }

    Enter(prev_state)
    {
        const cur_action = this.parent.proxy._animations.walk
        if(prev_state)
        {
            const prev_action = this.parent.proxy._animations[prev_state.Name]

            cur_action.enabled = true 

            if(prev_state.Name === 'run')
            {
                const ratio = cur_action.getClip().duration / prev_action.getClip().duration 
                cur_action.time = prev_action.time * ratio 
            }
            else 
            {
                cur_action.time = 0.0 
                cur_action.setEffectiveTimeScale(1.0)
                cur_action.setEffectiveWeight(1.0)
            }

            cur_action.crossFadeFrom(prev_action, 0.5, true)
            cur_action.play()
        }
        else 
        {
            cur_action.play()
        }
    }

    Exit()
    {

    }

    update(time_elapsed, input)
    {
        if(input.keys.forward)
        {
            if(input.keys.shift)
            {
                this.parent.setState('run')
            }
            return
        }

        this.parent.setState('idle')
    }
}