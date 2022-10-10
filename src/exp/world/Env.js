import * as THREE from 'three'
import Exp from '../Exp.js'

export default class Env 
{
    constructor()
    {
        this.exp = new Exp()
        this.scene = this.exp.scene 

        this.setLights()
    }

    setLights()
    {
        this.ambient = new THREE.AmbientLight(0xffffff, 1.5)
        this.scene.add(this.ambient)
    }
}