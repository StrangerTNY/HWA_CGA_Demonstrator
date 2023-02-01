import * as THREE from 'three';

export default class Tree extends THREE.Group{

  constructor() {
    super();

    const loader = new THREE.TextureLoader();

    //Baumstamm
    const treeTrunkGeometry = new THREE.CylinderGeometry(9,12,150,16,16);
    const treeTrunkMaterial = new THREE.MeshStandardMaterial({color:0xF2D2A4, wireframe: false});

    const trunkMap = loader.load('src/images/bark-1024-colcor.png');
    trunkMap.repeat.set(2,8);
    trunkMap.wrapS = THREE.RepeatWrapping;
    trunkMap.wrapT = THREE.RepeatWrapping;
    treeTrunkMaterial.map = trunkMap;

    const treeTrunk = new THREE.Mesh(treeTrunkGeometry,treeTrunkMaterial);
    treeTrunk.castShadow = true;

    // Krone
    const treeTopGeometry = new THREE.SphereGeometry(50,16,16);
    const treeTopMaterial = new THREE.MeshStandardMaterial({color:0xFFFFFF, wireframe:false});

    const topMap = loader.load('src/images/Tree Top_COLOR_0.png');
    topMap.repeat.set(2,2);
    topMap.wrapS = THREE.RepeatWrapping;
    topMap.wrapT = THREE.RepeatWrapping;
    treeTopMaterial.map = topMap;

    const topNormalMap = loader.load('src/images/Tree Top_NRM_0.png');
    topNormalMap.repeat.set(2,2);
    topNormalMap.wrapS = THREE.RepeatWrapping;
    topNormalMap.wrapT = THREE.RepeatWrapping;
    treeTopMaterial.normalMap = topNormalMap;
    treeTopMaterial.normalScale.set(10,10);

    const treeTop = new THREE.Mesh(treeTopGeometry,treeTopMaterial);
    treeTop.position.set(0,50,0);
    treeTop.castShadow = true;

    /*const treeTop2 = new THREE.Mesh(treeTopGeometry,treeTopMaterial);
    treeTop2.position.set(40,50,0);
    treeTop2.scale.set(0.3,0.3,0.3);
    treeTop2.castShadow = true;*/

    this.add(treeTrunk,treeTop);
  }

  addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      window.physics.addCylinderSphereCompound(this,1000,9,12,150,16,
          0,5,0,50,0,50,0);
    }
  }

}