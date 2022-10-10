import * as THREE from 'three'
import Sizes from './utils/Sizes.js'
import Time from './utils/Time.js'
import Debug from './utils/Debug.js'
import Resources from './utils/Resources.js'
import _sources from './data/sources.js'
import Camera from './setup/Camera.js'
import ThirdPersonCam from './setup/ThirdPersonCam.js'
import Renderer from './setup/Renderer.js'
import World from './world/World.js'
import Controls from './controls/Controls.js'

let instance = null 

export default class Exp 
{
    constructor(_canvas)
    {
        if(instance) return instance 

        instance = this 

        this.canvas = _canvas 
        this.sizes = new Sizes()
        this.time = new Time()
        this.debug = new Debug()
        this.resources = new Resources(_sources)
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.resources.on('ready', () =>
        {
            this.controls = new Controls()
            this.third_person = new ThirdPersonCam(this.controls)
        })

        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        this.time.on('update', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        if(this.controls) 
        {
            this.controls.update()
            this.third_person.update()
        }
        this.renderer.update()
    }
}