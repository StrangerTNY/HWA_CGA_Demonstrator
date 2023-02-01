import * as THREE from 'three';

export default class Ground extends THREE.Group {

  constructor() {
    super();

    // Block
    const groundGeometry = new THREE.BoxGeometry(500,50,350);

    // Plane
    //const groundGeometry = new THREE.PlaneGeometry(500,350);
    //const groundMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 1.3});

    // einfarbig
    // const groundMaterial = new THREE.MeshStandardMaterial({color: 0x80B03F, wireframe: false, roughness: 0.7});

    const loader = new THREE.TextureLoader();
    const grassMap = loader.load('src/images/grassTextures/Grass_04.png');
    const bmap = loader.load('src/images/grassTextures/grassTextureBump.jpg');
    const dmap = loader.load('src/images/grassTextures/grassTextureDP.jpg');
    const grassNormalMap = loader.load('src/images/grassTextures/Grass_04_Nrm.png');

    const dirtMap = loader.load('src/images/Dirt_01.png');
    const dirtNormalMap = loader.load('src/images/Dirt_01_Nrm.png');

    const mapArray = [grassMap,grassNormalMap,dirtMap,dirtNormalMap];

    for (let map in mapArray) {
      if(map === '2' || map === '3'){
        mapArray[map].repeat.set(5,1);
      }else{
        mapArray[map].repeat.set(4,3);

      }
      mapArray[map].wrapS = THREE.RepeatWrapping;
      mapArray[map].wrapT = THREE.RepeatWrapping;
    }

    /*map.repeat.set(4,4);
    nmap.repeat.set(4,4);
    map.wrapS = THREE.RepeatWrapping;
    nmap.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    nmap.wrapT = THREE.RepeatWrapping;

    dirtMap.repeat.set(2,4);
    dirtMap.wrapS = THREE.RepeatWrapping;
    dirtMap.wrapT = THREE.RepeatWrapping;
    dirtNormalMap.repeat.set(2,4);
    dirtNormalMap.wrapS = THREE.RepeatWrapping;
    dirtNormalMap.wrapT = THREE.RepeatWrapping;*/


    // wenn würfel geometrie
    const groundMaterial = [
      new THREE.MeshStandardMaterial({color: 0xFFCFC8, wireframe: false, roughness: 0.7}), //right side
      new THREE.MeshStandardMaterial({color: 0xFFCFC8, wireframe: false, roughness: 0.7}), //left side
      //new THREE.MeshBasicMaterial({ map: loader.load('src/images/grassTexture.jpeg')}), //top side
      //new THREE.MeshPhongMaterial({ bumpMap: bmap, bumpScale: 1.3, displacementMap: dmap, displacementScale: 5, map:map}),
      new THREE.MeshStandardMaterial({color: 0xFFFFFF, wireframe: false, roughness: 0.7}),
      new THREE.MeshStandardMaterial({color: 0xFFCFC8, wireframe: false, roughness: 0.7}), //bottom side
      new THREE.MeshStandardMaterial({color: 0xFFCFC8, wireframe: false, roughness: 0.7}), //front side
      new THREE.MeshStandardMaterial({color: 0xFFCFC8, wireframe: false, roughness: 0.7}), //back side
    ];

    //const groundMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 1.3});

    // nur Oberseite von Ground wird texturiert
    groundMaterial[2].map = grassMap;
    groundMaterial[2].normalMap = grassNormalMap;
    groundMaterial[2].normalScale.set(50,50);
    // Seite texturiert
    for (let i in groundMaterial) {
      if(i !== '2'){
        groundMaterial[i].map = dirtMap;
        groundMaterial[i].normalMap = dirtNormalMap;
        groundMaterial[i].normalScale.set(50,50);
      }
    }

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);

    // wenn plane
    // ground.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    ground.receiveShadow = true;
    this.add(ground);

  }



}