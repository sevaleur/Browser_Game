export default class ControlsProxy 
{
    constructor(animations)
    {
        this._animations = animations
    }

    get animations()
    {
        return this._animations
    }
}