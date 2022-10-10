import * as THREE from 'three'
import Exp from '../Exp.js'

export default class Renderer
{
    constructor()
    {
        this.exp = new Exp()
        this.sizes = this.exp.sizes
        this.camera = this.exp.camera
        this.scene = this.exp.scene
        this.canvas = this.exp.canvas

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixel_ratio)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixel_ratio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}