import Exp from '../Exp.js'
import Env from './Env.js'
import Ground from './Ground.js'

export default class World
{
    constructor()
    {
        this.exp = new Exp()
        this.resources = this.exp.resources
        this.env = new Env()

        this.resources.on('ready', () =>
        {
            this.ground = new Ground()
        })
    }
}