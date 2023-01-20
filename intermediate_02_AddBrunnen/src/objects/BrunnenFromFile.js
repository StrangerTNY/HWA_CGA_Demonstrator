import * as THREE from 'three';
import {GLTFLoader} from 'gltfloader';

export default class BrunnenFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.animationMixer = null;
    this.animations = new Map();
    this.load(this);
  }

  load(thisBrunnen){
    this.gltfLoader.load('src/models/Brunnen_2.gltf', function (gltf){

      gltf.scene.traverse(function (child){
        if(child.isMesh){
          console.log(child.name);
        }
      });

      gltf.scene.scale.set(30*gltf.scene.scale.x, 30*gltf.scene.scale.y, 30* gltf.scene.scale.z);

      thisBrunnen.add(gltf.scene);
      thisBrunnen.loadingDone = true;
    });

  }

  addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      window.physics.addCylinder(this, 100, 30,30,35,8,0,10);
    }
  }
}
