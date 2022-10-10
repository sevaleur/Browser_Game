import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter.js"

export default class Resources extends EventEmitter
{
    constructor(_sources)
    {
        super()

        this.sources = _sources 
        this.items = {}
        this.to_load = this.sources.length 
        this.loaded = 0 

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltf_loader = new GLTFLoader()
    }

    startLoading()
    {
        for(const source of this.sources)
        {
            switch(source.type)
            {
                case 'gltf':
                    this.loaders.gltf_loader.load(
                        source.path, 
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break 
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file 

        this.loaded++ 

        if(this.loaded === this.to_load)
        {
            this.trigger('ready')
        }
    }
}