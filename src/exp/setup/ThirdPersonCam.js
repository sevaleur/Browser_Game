import * as THREE from 'three'
import Exp from '../Exp'

export default class ThirdPersonCam
{
    constructor(_target)
    {
        this.exp = new Exp()
        this.camera = this.exp.camera 
        this.time = this.exp.time

        this.target = _target

        this.current_pos = new THREE.Vector3()
        this.current_lookAt = new THREE.Vector3()
    }

    calcOffset()
    {
        const idealOffset = new THREE.Vector3(-.2, .5, -.4)
        idealOffset.applyQuaternion(this.target.Rotation)
        idealOffset.add(this.target.Position)
        return idealOffset
    }

    calcLookAt()
    {
        const idealLookAt = new THREE.Vector3(0, .2, .3)
        idealLookAt.applyQuaternion(this.target.Rotation)
        idealLookAt.add(this.target.Position)
        return idealLookAt
    }

    update()
    {
        const ideal_offset = this.calcOffset()
        const ideal_lookAt = this.calcLookAt()

        const t = 1.0 - Math.pow(0.001, this.time.delta / 1000)

        this.current_pos.lerp(ideal_offset, t)
        this.current_lookAt.lerp(ideal_lookAt, t)

        this.camera.instance.position.copy(this.current_pos)
        this.camera.instance.lookAt(this.current_lookAt) 
    }
}