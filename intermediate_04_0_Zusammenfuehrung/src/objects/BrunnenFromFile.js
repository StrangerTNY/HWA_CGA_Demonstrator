import * as THREE from 'three';
import {GLTFLoader} from 'gltfloader';

export default class BrunnenFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.animationMixer = null;
    this.animations = new Map();
    this.state = {
      eimerDown: false
    };
    this.load(this);
  }

  load(thisBrunnen){
    this.gltfLoader.load('../../models/Brunnen.gltf', function (gltf){

      gltf.scene.traverse(function (child){
        if(child.isMesh){
          child.parentBrunnen = thisBrunnen;
          //console.log(child.name);
        }
        if (child.name === 'Brunnen_1' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Brunnen_2' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Brunnen_3' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Eimer_1' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Eimer_2' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Gerüst' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Gerüst_1' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Dach_1' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Dach_2' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Mechanik_1' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Mechanik_2' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Mechanik_3' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Mechanik_4' ) {
          //console.log(child.name);
          child.castShadow = true;
        }
        if (child.name === 'Rope' ) {
          //console.log(child.name);
          child.castShadow = true;
        }


      });
      thisBrunnen.animationMixer = new THREE.AnimationMixer(gltf.scene);
      for(let i = 0; i < gltf.animations.length; i++){
        let action = thisBrunnen.animationMixer.clipAction(gltf.animations[i]);
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce);
        thisBrunnen.animations.set(gltf.animations[i].name, action);

        //console.log(gltf.animations[i].name);
      }
      gltf.scene.scale.set(30*gltf.scene.scale.x, 30*gltf.scene.scale.y, 30* gltf.scene.scale.z);

      thisBrunnen.add(gltf.scene);
      thisBrunnen.loadingDone = true;
      thisBrunnen.animationMixer.addEventListener('finished', thisBrunnen.updateFunctionalState.bind(thisBrunnen));

    });

  }
  updateFunctionalState() {


  }
  /*addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      window.physics.addCylinder(this, 100, 30,30,35,8,0,10);
    }
  }*/
}
