import * as THREE from 'three'
import Exp from '../Exp.js'

export default class Ground 
{
    constructor()
    {
        this.exp = new Exp()
        this.scene = this.exp.scene

        this.setGround()
    }

    setGround()
    {
        this.ground = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(4, 4, 10, 10),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        )
        this.ground.rotation.x = -Math.PI * 0.5
        this.scene.add(this.ground)
    }
}