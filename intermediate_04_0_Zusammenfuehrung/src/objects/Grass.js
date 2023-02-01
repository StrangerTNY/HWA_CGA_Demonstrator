import * as THREE from 'three';

export default class Grass extends THREE.Group{

  constructor() {
    super();

    const cylinderWidthTop = 0.2 *20;
    const cylinderWidthBottom = 0.4 *20;
    const cylinderHeight = 8 *20;
    const cylinderSegmentSize = 16 *20;

/*
    const grassGeometry = new THREE.CylinderGeometry(0.4,0.4,8,16);
*/
    const grassGeometry = new THREE.CylinderGeometry(cylinderWidthTop,cylinderWidthBottom,cylinderHeight,cylinderSegmentSize);
    const grassTopGeometry = new THREE.CylinderGeometry(cylinderWidthTop/2,cylinderWidthTop,cylinderHeight/3,cylinderSegmentSize)
    const grassMaterial = new THREE.MeshPhongMaterial({color:0x478E33, wireframe: true});

    /*const grass = new THREE.Mesh(grassGeometry,grassMaterial);*/
    const grass = new THREE.InstancedMesh(grassGeometry,grassMaterial,1);


    const grassTop = new THREE.Mesh(grassTopGeometry,grassMaterial);
    grassTop.rotation.set(0, 0,THREE.MathUtils.degToRad(30));
    grassTop.position.set(-cylinderHeight/13,cylinderHeight-(cylinderHeight/2.7),0);


    const grassGroup = new THREE.Group();
    grassGroup.add(grass);
    grassGroup.add(grassTop);

    const grassPatch = [];
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        let gG = new grassGroup;
        gG.position.x = Math.random()*40 -20;
        gG.position.z = Math.random()*40 -20;
        grassPatch.push(gG)
      }
    }


    /*const grassPatch = new THREE.InstancedMesh(grassGroup.geometry, grassGroup.material, 100);*/

    grass.frustumCulled = false;

    // Versuch von Physik mit einer interagierbaren Spitze
    /*const constraint = new CANNON.LockConstraint(grass,grassTop);*/

    /*const connection = new CANNON.Spring(grass,grassTop,{
      localAnchorA: new CANNON.Vec3(-10,10,0),
      localAnchorB: new CANNON.Vec3(0,0,0),
      restLength: 0,
      stiffness: 50,
      damping: 1,
    })*/

    /*grass.castShadow = true;*/
    this.add(grassPatch);
  }

  /*addPhysics() {
    window.physics.addCylinder(this, 1, 3, 4, 80, 160)
  }*/
}