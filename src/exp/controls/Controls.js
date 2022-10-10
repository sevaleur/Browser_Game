import * as THREE from 'three'
import Exp from '../Exp.js'
import ControllerInput from './ControllerInput.js'
import CharacterFSM from './CharacterFSM.js'
import ControlsProxy from './ControlsProxy.js'

let instance = null 

export default class Controls 
{
    constructor()
    {

        if(instance) return instance 

        instance = this 

        this.exp = new Exp()
        this.resources = this.exp.resources
        this.camera = this.exp.camera
        this.scene = this.exp.scene
        this.time = this.exp.time

        this.init()
    }

    init()
    {
        this.decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0)
        this.acceleration = new THREE.Vector3(1, 0.25, 1.0)
        this.velocity = new THREE.Vector3(0, 0, 0)
        this._position = new THREE.Vector3()

        this.animation = {}
        this.animation.animations = {}
        this.input = new ControllerInput()
        this.state_machine = new CharacterFSM(new ControlsProxy(this.animation.animations))

        this.loadModel()
    }

    loadModel()
    {
        this.model = this.resources.items.viking.scene
        this.model.scale.set(0.2, 0.2, 0.2)

        this.scene.add(this.model)

        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.animations.idle = this.animation.mixer.clipAction(this.resources.items.viking.animations[6])
        this.animation.animations.walk = this.animation.mixer.clipAction(this.resources.items.viking.animations[11])
        this.animation.animations.run = this.animation.mixer.clipAction(this.resources.items.viking.animations[9])
        this.animation.animations.attack = this.animation.mixer.clipAction(this.resources.items.viking.animations[1])
        this.animation.animations.walk_back = this.animation.mixer.clipAction(this.resources.items.viking.animations[10])
        this.animation.animations.run_back = this.animation.mixer.clipAction(this.resources.items.viking.animations[8])
        this.animation.animations.level_up = this.animation.mixer.clipAction(this.resources.items.viking.animations[7])
        this.animation.animations.walk_left = this.animation.mixer.clipAction(this.resources.items.viking.animations[12])
        this.animation.animations.walk_right = this.animation.mixer.clipAction(this.resources.items.viking.animations[13])


        this.state_machine.setState('idle')
    }

    get Position()
    {
        return this._position
    }

    get Rotation()
    {
        if(!this.model)
        {
            return new THREE.Quaternion()
        }
        return this.model.quaternion
    }

    update()
    {
        this.delta_time = this.time.delta / 1000

        if(!this.state_machine.current_state)
        {
            return
        }

        this.state_machine.update(this.delta_time, this.input)

        const velocity = this.velocity
        const frame_decceleration = new THREE.Vector3(
            velocity.x * this.decceleration.x,
            velocity.y * this.decceleration.y,
            velocity.z * this.decceleration.z
        )

        frame_decceleration.multiplyScalar(this.delta_time)
        frame_decceleration.z = Math.sign(frame_decceleration.z) * Math.min(Math.abs(frame_decceleration.z), Math.abs(velocity.z))

        velocity.add(frame_decceleration)

        const control_object = this.model 
        const _Q = new THREE.Quaternion()
        const _A = new THREE.Vector3()
        const _R = control_object.quaternion.clone()

        const acc = this.acceleration.clone()
        if(this.input.keys.forward && this.input.keys.shift)
        {
            acc.multiplyScalar(2.0)
        }

        if(this.input.keys.backward && this.input.keys.shift)
        {
            acc.multiplyScalar(1.2)
        }

        if(this.state_machine.current_state.Name === 'attack')
        {
            acc.multiplyScalar(0.0)
        }

        if(this.input.keys.forward)
        {
            velocity.z += acc.z * this.delta_time
        }

        if(this.input.keys.backward)
        {
            velocity.z -= acc.z * this.delta_time
        }

        if(this.input.keys.left)
        {
            _A.set(0, 1, 0)
            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * this.delta_time * this.acceleration.y)
            _R.multiply(_Q)
        }

        if(this.input.keys.right)
        {
            _A.set(0, 1, 0)
            _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * this.delta_time * this.acceleration.y)
            _R.multiply(_Q)
        }

        control_object.quaternion.copy(_R)

        const old_pos = new THREE.Vector3()
        old_pos.copy(control_object.position)

        const forward = new THREE.Vector3(0, 0, 1)
        forward.applyQuaternion(control_object.quaternion)
        forward.normalize()

        const sideways = new THREE.Vector3(1, 0, 0)
        sideways.applyQuaternion(control_object.quaternion)
        sideways.normalize()

        sideways.multiplyScalar(velocity.x * this.delta_time)
        forward.multiplyScalar(velocity.z * this.delta_time)

        control_object.position.add(forward)
        control_object.position.add(sideways)

        this._position.copy(control_object.position)

        if(this.animation.mixer)
        {
            this.animation.mixer.update(this.delta_time)
        }
    }
}