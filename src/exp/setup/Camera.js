import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Exp from '../Exp.js'
import ThirdPersonCam from './ThirdPersonCam.js'

export default class Camera 
{
    constructor()
    {
        this.exp = new Exp()
        this.sizes = this.exp.sizes
        this.scene = this.exp.scene 
        this.canvas = this.exp.canvas
        
        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            70,
            this.sizes.width / this.sizes.height,
            0.1, 
            1000
        )
        this.instance.position.set(0, 1, 2)
        this.scene.add(this.instance)
    }

    setOrbit()
    {
        this.orbit = new OrbitControls(this.instance, this.canvas)
        this.orbit.enableDamping = true

    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height 
        this.instance.updateProjectionMatrix()
    }
}