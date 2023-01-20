import * as THREE from 'three';

export default class Ground extends THREE.Group {

  constructor() {
    super();

    const groundGeometry = new THREE.BoxGeometry(500,50,350);
    const groundMaterial = new THREE.MeshStandardMaterial({color: 0x80B03F, wireframe: false, roughness: 0.7});

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.receiveShadow = true;
    this.add(ground);

  }



}