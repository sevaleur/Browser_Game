import Exp from '../Exp.js'

export default class GameSettings
{
    constructor()
    {
        this.exp = new Exp()
        this.time = this.exp.time

        this.game = {
            game_run: true,
            time: this.time.elapsed,
            pause: false,
        }

        this.player = {
            health: 100,
            max_health: 100,
            strength: 10, 
            level: 1,
            xp: 0,
        }

        this.npc = {
            health: 50,
            max_health: 50,
            strength: 20
        }

        this.boss_one = {
            health: 350,
            max_health: 350,
            strength: 100,
        }

        this.boss_two = {
            health: 500,
            max_health: 500,
            strength: 200
        }
    }
}