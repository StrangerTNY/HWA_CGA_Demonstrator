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
    this.gltfLoader.load('../../models/Brunnen_2.gltf', function (gltf){

      gltf.scene.traverse(function (child){
        if(child.isMesh){
          child.parentBrunnen = thisBrunnen;
          console.log(child.name);
        }
        if (child.name === 'Eimer' || child.name === 'Cylinder011' || child.name === 'Cylinder011_1') {
          console.log(child.name);
          child.castShadow = true;

        }
        if (child.name === 'Dach') {
          console.log(child.name);
        }
        if (child.name === 'Water') {
          console.log(child.name);
        }
        if (child.name === 'Mechanik') {
          console.log(child.name);
        }
        if (child.name === 'Rope') {
          console.log(child.name);
        }
        if (child.name === 'Geruest') {
          console.log(child.name);
        }
        if(child.name === 'Geruest' || child.name === 'Rope' || child.name === 'Mechanik' || child.name === 'Dach' || child.name === 'Eimer'){
          child.castShadow = true;
        }

      });
      thisBrunnen.animationMixer = new THREE.AnimationMixer(gltf.scene);
      for(let i = 0; i < gltf.animations.length; i++){
        let action = thisBrunnen.animationMixer.clipAction(gltf.animations[i]);
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce);
        thisBrunnen.animations.set(gltf.animations[i].name, action);

        console.log(gltf.animations[i].name);
      }
      gltf.scene.scale.set(30*gltf.scene.scale.x, 30*gltf.scene.scale.y, 30* gltf.scene.scale.z);

      thisBrunnen.add(gltf.scene);
      thisBrunnen.loadingDone = true;
      //thisBrunnen.animationMixer.addEventListener('finished', thisBrunnen.updateFunctionalState.bind(thisBrunnen));

    });

  }

  /*addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      window.physics.addCylinder(this, 100, 30,30,35,8,0,10);
    }
  }*/
}
