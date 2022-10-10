import FiniteStateMachine from "./FiniteStateMachine";
import IdleState from "./states/IdleState";
import WalkState from "./states/WalkState";
import RunState from "./states/RunState";
import AttackState from './states/AttackState.js'
import WalkBackState from './states/WalkBackState.js'
import RunBackState from './states/RunBackState.js'

export default class CharacterFSM extends FiniteStateMachine
{
    constructor(proxy)
    {
        super()
        this.proxy = proxy 
        this.init()
    }

    init()
    {
        this.addState('idle', IdleState)
        this.addState('walk', WalkState)
        this.addState('walk_back', WalkBackState)
        this.addState('run', RunState)
        this.addState('run_back', RunBackState)
        this.addState('attack', AttackState)
    }
}