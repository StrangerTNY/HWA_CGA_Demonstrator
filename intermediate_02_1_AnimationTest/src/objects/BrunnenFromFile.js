import * as THREE from 'three';
import {GLTFLoader} from 'gltfloader';

export default class BrunnenFromFile extends THREE.Group {

  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.loadingDone = false;
    this.waterTexture = null;
    this.animationMixer = null;
    this.animations = new Map();
    this.state = {
      eimerDown: false,
      hasWater: true
    };
    this.load(this);
  }

  load(thisBrunnen){
    this.gltfLoader.load('../../models/Brunnen4.gltf', function (gltf){

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
          const waterMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
          thisBrunnen.waterTexture = new THREE.TextureLoader().load('src/images/water.png');
          waterMaterial.map = thisBrunnen.waterTexture;

          const waterBrunnenGeometry = new THREE.CircleGeometry(0.9,32);
          thisBrunnen.waterBrunnen = new THREE.Mesh(waterBrunnenGeometry, waterMaterial);
          thisBrunnen.waterBrunnen.position.set(0,1,0);
          thisBrunnen.waterBrunnen.rotation.set(THREE.MathUtils.degToRad(-90),0,0);
          child.add(thisBrunnen.waterBrunnen);
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
        if (child.name === 'Water' ) {
          //console.log(child.name);
          const waterMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
          thisBrunnen.waterTexture = new THREE.TextureLoader().load('src/images/water.png');
          waterMaterial.map = thisBrunnen.waterTexture;

          const waterBrunnenGeometry = new THREE.CircleGeometry(0.3,32);
          thisBrunnen.waterBrunnen = new THREE.Mesh(waterBrunnenGeometry, waterMaterial);
          thisBrunnen.waterBrunnen.position.set(0,0.03,0);
          thisBrunnen.waterBrunnen.rotation.set(THREE.MathUtils.degToRad(-90),0,0);
          child.add(thisBrunnen.waterBrunnen);
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
      thisBrunnen.animationMixer.addEventListener('finished', thisBrunnen.updateFunctionalState.bind(thisBrunnen));

    });

  }
  updateFunctionalState() {


  }
  addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      //window.physics.addBox(this, 100, 90, 170, 70, 0, 76, 0);
      window.physics.addCylinder(this,100,50,50,172,6,0,76,0,0,THREE.MathUtils.degToRad(90));
    }
  }
}
