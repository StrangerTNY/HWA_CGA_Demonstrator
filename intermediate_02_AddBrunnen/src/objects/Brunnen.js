import * as THREE from 'three';
import CSG from 'csg';

export default class Brunnen extends THREE.Group {

  constructor() {
    super();

    this.addParts();
  }

  addParts() {

    // Brunnen Becken
    // -------------
    const brunnenMaterial = new THREE.MeshLambertMaterial({color: 0xb5874e});
    const brunnenGeometry = new THREE.CylinderGeometry( 30, 30, 40, 8 );
    const brunnen = new THREE.Mesh(brunnenGeometry, brunnenMaterial);
    brunnen.castShadow = true;
    //this.add(brunnen);b

    const cavityGeometry = new THREE.CylinderGeometry( 30, 30, 50, 8 );
    cavityGeometry.scale(0.9,1,0.9);
    cavityGeometry.translate(0,10,0);
    const cavity = new THREE.Mesh(cavityGeometry, brunnenMaterial);

    const brunnenCSG = CSG.fromMesh(brunnen);
    const cavityCSG = CSG.fromMesh(cavity);
    const hollowBrunnen = CSG.toMesh(brunnenCSG.subtract(cavityCSG), brunnen.matrix, brunnen.material);
    hollowBrunnen.castShadow = true;
    this.add(hollowBrunnen);

    // Brunnen Rand
    // -------------
    const randGeometry = new THREE.CylinderGeometry(35,35,4,8);
    randGeometry.translate(0,20,0);
    const rand = new THREE.Mesh(randGeometry, brunnenMaterial);
    const randCSG = CSG.fromMesh(rand);
    const hollowRand = CSG.toMesh(randCSG.subtract(cavityCSG), rand.matrix, rand.material);
    hollowRand.castShadow = true;
    this.add(hollowRand);


    //Brunnen Gerüst
    //----------------------
    const geruestGeometry = new THREE.BoxGeometry(2,90,4);
    geruestGeometry.translate(0,50,0);
    const geruest1 = new THREE.Mesh(geruestGeometry, brunnenMaterial);
    geruest1.position.set(-30,0,12.5);
    geruest1.rotation.set(0, THREE.MathUtils.degToRad(23), 0);
    this.add(geruest1);

    const geruest2 = geruest1.clone();
    geruest2.position.set(30,0,-12.5);
    geruest2.rotation.set(0, THREE.MathUtils.degToRad(23), 0);
    this.add(geruest2);

    const geruestAddonGeometry = new THREE.BoxGeometry(2,10,4);
    geruestAddonGeometry.translate(0,65,0);
    const geruestAddon1 = new THREE.Mesh(geruestAddonGeometry, brunnenMaterial);
    geruestAddon1.position.set(-31.5,0,13.2);
    geruestAddon1.rotation.set(0, THREE.MathUtils.degToRad(23),0);
    this.add(geruestAddon1);

    const geruestAddon2 = geruestAddon1.clone();
    geruestAddon2.position.set(31.7,0,-13.5);
    geruestAddon2.rotation.set(0,THREE.MathUtils.degToRad(23),0);
    this.add(geruestAddon2);

    //Brunnen Dach
    //----------------------------------
    const dachGeruestGeometry = new THREE.BoxGeometry(70,5,70);
    dachGeruestGeometry.translate(0,97.5,0);
    const dachGeruest = new THREE.Mesh(dachGeruestGeometry, brunnenMaterial);
    dachGeruest.rotation.set(0,THREE.MathUtils.degToRad(23),0);
    //this.add(dachGeruest);

    const dachCavityGeometry = new THREE.BoxGeometry(70,5,70)
    dachCavityGeometry.scale(0.8,1,0.8);
    dachCavityGeometry.translate(0,97.5,0);
    const dachCavity = new THREE.Mesh(dachCavityGeometry, brunnenMaterial);

    const dachCSG = CSG.fromMesh(dachGeruest);
    const dachCavityCSG = CSG.fromMesh(dachCavity);
    const hollowDach = CSG.toMesh(dachCSG.subtract(dachCavityCSG), dachGeruest.matrix, dachGeruest.material);
    hollowDach.rotation.set(0,THREE.MathUtils.degToRad(23),0);
    hollowBrunnen.castShadow = true;
    this.add(hollowDach);
  }



}
