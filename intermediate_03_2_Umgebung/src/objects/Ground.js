import * as THREE from 'three';

export default class Ground extends THREE.Group {

  constructor() {
    super();

    // Block
    /*const groundGeometry = new THREE.BoxGeometry(500,50,350);*/

    // Plane
    const groundGeometry = new THREE.PlaneGeometry(500,350);
    const groundMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 1.3});

    // einfarbig
    // const groundMaterial = new THREE.MeshStandardMaterial({color: 0x80B03F, wireframe: false, roughness: 0.7});

    const loader = new THREE.TextureLoader();
    const map = loader.load('src/images/grassTextures/Grass_04.png');
    const bmap = loader.load('src/images/grassTextures/grassTextureBump.jpg');
    const dmap = loader.load('src/images/grassTextures/grassTextureDP.jpg');
    const nmap = loader.load('src/images/grassTextures/Grass_04_Nrm.png');

    map.repeat.set(4,4);
    nmap.repeat.set(4,4);
    map.wrapS = THREE.RepeatWrapping;
    nmap.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    nmap.wrapT = THREE.RepeatWrapping;
    groundMaterial.map = map;
    groundMaterial.normalMap = nmap;
    groundMaterial.normalScale.set(50,50);

    // wenn würfel geometrie
   /* const groundMaterial = [
      new THREE.MeshStandardMaterial({color: 0x80B03F, wireframe: false, roughness: 0.7}), //right side
      new THREE.MeshStandardMaterial({color: 0x80B03F, wireframe: false, roughness: 0.7}), //left side
      //new THREE.MeshBasicMaterial({ map: loader.load('src/images/grassTexture.jpeg')}), //top side
      //new THREE.MeshPhongMaterial({ bumpMap: bmap, bumpScale: 1.3, displacementMap: dmap, displacementScale: 5, map:map}),
      new THREE.MeshPhongMaterial({ bumpMap: bmap, bumpScale: 2, normalMap:nmap, displacementScale: 15, map:map}),
      new THREE.MeshStandardMaterial({color: 0x80B03F, wireframe: false, roughness: 0.7}), //bottom side
      new THREE.MeshStandardMaterial({color: 0x80B03F, wireframe: false, roughness: 0.7}), //front side
      new THREE.MeshStandardMaterial({color: 0x80B03F, wireframe: false, roughness: 0.7}), //back side
    ];*/


    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    ground.receiveShadow = true;
    this.add(ground);

  }



}