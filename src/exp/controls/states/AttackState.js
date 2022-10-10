import * as THREE from 'three'
import State from './State.js'

export default class AttackState extends State 
{
    constructor(parent)
    {
        super(parent)

        this.finishedCallback = () => 
        {
            this.finished()
        }
    }

    get Name()
    {
        return 'attack'
    }

    Enter(prev_state)
    {
        const cur_action = this.parent.proxy._animations.attack  
        const mixer = cur_action.getMixer()
        mixer.addEventListener('finished', this.finishedCallback)

        if(prev_state)
        {
            const prev_action = this.parent.proxy._animations[prev_state.Name]

            cur_action.reset()
            cur_action.setLoop(THREE.LoopOnce, 1)
            cur_action.clampWhenFinished = true 
            cur_action.crossFadeFrom(prev_action, 0.2, true)
            cur_action.play()
        }
        else 
        {
            cur_action.play()
        }
    }

    finished()
    {
        this.cleanUp()
        this.parent.setState('idle')
    }

    cleanUp()
    {
        const action = this.parent.proxy._animations.attack 

        action.getMixer().removeEventListener('finished', this.cleanUpCallBack)
    }

    Exit()
    {
        this.cleanUp()
    }

    update()
    {
        
    }
}