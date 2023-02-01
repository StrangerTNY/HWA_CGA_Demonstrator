import * as THREE from 'three';

export default class Path extends THREE.Group {

  constructor() {
    super();

    const pathGeometry = new THREE.PlaneGeometry(100,150);
    const pathMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 5});

    const pathMap = new THREE.TextureLoader().load('src/images/Ground_03.png');
    const pathNormalMap = new THREE.TextureLoader().load('src/images/Ground_03_Nrm.png');

    pathMap.repeat.set(1,3);
    pathMap.wrapS = THREE.RepeatWrapping;
    pathMap.wrapT = THREE.RepeatWrapping;
    pathMaterial.map = pathMap;

    pathNormalMap.repeat.set(1,3);
    pathNormalMap.wrapS = THREE.RepeatWrapping;
    pathNormalMap.wrapT = THREE.RepeatWrapping;
    pathMaterial.normalMap = pathNormalMap;
    pathMaterial.normalScale.set(5,5);

    const path = new THREE.Mesh(pathGeometry,pathMaterial)
    path.rotation.set(THREE.MathUtils.degToRad(-90),0,0);
    path.receiveShadow = true;
    this.add(path);

  }


}