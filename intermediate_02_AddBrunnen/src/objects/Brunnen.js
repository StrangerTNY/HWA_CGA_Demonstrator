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
    const brunnenMaterial = new THREE.MeshLambertMaterial({color: 0x561e0b});
    const brunnenGeometry = new THREE.CylinderGeometry( 30, 30, 43, 8 );
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
    randGeometry.translate(0,23,0);
    const rand = new THREE.Mesh(randGeometry, brunnenMaterial);
    const randCSG = CSG.fromMesh(rand);
    const hollowRand = CSG.toMesh(randCSG.subtract(cavityCSG), rand.matrix, rand.material);
    hollowRand.castShadow = true;
    this.add(hollowRand);


    //Brunnen Gerüst
    //----------------------
    const geruestGeometry = new THREE.BoxGeometry(2,100,7);
    geruestGeometry.translate(0,53,0);
    const geruest1 = new THREE.Mesh(geruestGeometry, brunnenMaterial);
    geruest1.position.set(-30,0,12.5);
    geruest1.rotation.set(0, THREE.MathUtils.degToRad(23), 0);
    this.add(geruest1);

    const geruest2 = geruest1.clone();
    geruest2.position.set(30,0,-12.5);
    geruest2.rotation.set(0, THREE.MathUtils.degToRad(23), 0);
    this.add(geruest2);

    const geruestAddonGeometry = new THREE.BoxGeometry(2,18,7);
    geruestAddonGeometry.translate(0,70,0);
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
    dachGeruestGeometry.translate(0,103,0);
    const dachGeruest = new THREE.Mesh(dachGeruestGeometry, brunnenMaterial);
    dachGeruest.rotation.set(0,THREE.MathUtils.degToRad(23),0);
    //this.add(dachGeruest);

    const dachGeruestCavityGeometry = new THREE.BoxGeometry(70,5,70);
    dachGeruestCavityGeometry.scale(0.8,1,0.8);
    dachGeruestCavityGeometry.translate(0,103,0);
    const dachGeruestCavity = new THREE.Mesh(dachGeruestCavityGeometry, brunnenMaterial);

    const dachGeruestCSG = CSG.fromMesh(dachGeruest);
    const dachGeruestCavityCSG = CSG.fromMesh(dachGeruestCavity);
    const hollowDachGeruest = CSG.toMesh(dachGeruestCSG.subtract(dachGeruestCavityCSG), dachGeruest.matrix, dachGeruest.material);
    hollowDachGeruest.rotation.set(0,THREE.MathUtils.degToRad(23),0);
    hollowDachGeruest.castShadow = true;
    this.add(hollowDachGeruest);


    const dachGeometry = new THREE.ConeGeometry(55, 30, 4 , 1);
    dachGeometry.translate(0,120,0);
    const dach = new THREE.Mesh(dachGeometry, brunnenMaterial);
    dach.rotation.set(0,THREE.MathUtils.degToRad(-23),0);
    this.add(dach);

    const dachCavityGeometry = new THREE.ConeGeometry(55,30,4,1);
    dachCavityGeometry.scale(0.8,1,0.8);
    dachCavityGeometry.translate(0,118,0);
    const dachCavity = new THREE.Mesh(dachCavityGeometry, brunnenMaterial);

    const dachCSG = CSG.fromMesh(dach);
    const dachCavityCSG = CSG.fromMesh(dachCavity);
    const hollowDach = CSG.toMesh(dachCSG.subtract(dachCavityCSG), dach.matrix, dach.material);
    hollowDach.rotation.set(0,THREE.MathUtils.degToRad(-23),0);
    hollowDach.castShadow = true;
    //this.add(hollowDach);

    //Brunnen Mechanik
    //---------------------------------------------------

    const stabMaterial = new THREE.MeshLambertMaterial({color: 0x684222});
    const stabGeometry = new THREE.CylinderGeometry(1,1,90);
    stabGeometry.translate(0,0,-75);
    const stab = new THREE.Mesh(stabGeometry,stabMaterial);
    stab.rotation.set(THREE.MathUtils.degToRad(90),THREE.MathUtils.degToRad(0),THREE.MathUtils.degToRad(68));
    this.add(stab);

    const rolleMaterial = new THREE.MeshLambertMaterial({color: 0x1e1500});
    const rolleGeometry = new THREE.CylinderGeometry(7,7,57);
    rolleGeometry.translate(0,0,-75);
    const rolle = new THREE.Mesh(rolleGeometry, rolleMaterial);
    rolle.rotation.set(THREE.MathUtils.degToRad(90),0,THREE.MathUtils.degToRad(68));
    this.add(rolle);

    const griff1Geometry = new THREE.BoxGeometry(1,25,4);
    //griff1Geometry.translate(0,68,0);
    const griff1 = new THREE.Mesh(griff1Geometry, rolleMaterial);
    // nur X Achse bei Umdrehen anpassen sonst sieht der Griff wonky aus
    griff1.rotation.set(THREE.MathUtils.degToRad(-23), THREE.MathUtils.degToRad(23),THREE.MathUtils.degToRad(7));
    griff1.position.set(-40,68,19);
    this.add(griff1);

    const griff2Geometry = new THREE.CylinderGeometry(1,1,10);
    const griff2 = new THREE.Mesh(griff2Geometry, stabMaterial);
    griff2.rotation.set(THREE.MathUtils.degToRad(90),THREE.MathUtils.degToRad(0),THREE.MathUtils.degToRad(68));
    griff2.position.set(-43,60,24);
    this.add(griff2);


    //Seil
    //--------------------------------------------------
    const seilMaterial = new THREE.MeshLambertMaterial({color: 0x594b37});
    const seilGeometry = new THREE.TorusGeometry(7.5, 1.2, 16,16);
    seilGeometry.translate(0,75,0);
    const seil = new THREE.Mesh(seilGeometry, seilMaterial);
    seil.rotation.set(0,THREE.MathUtils.degToRad(-64),0);
    this.add(seil);

    const seil2 = seil.clone();
    seil2.position.set(-12,0,4);
    this.add(seil2);

    const seil3 = seil.clone();
    seil3.position.set(-10,0.4,4);
    this.add(seil3);

    const seil4 = seil.clone();
    seil4.position.set(-8,0,3);
    this.add(seil4);

    const seil5 = seil.clone();
    seil5.position.set(-5.5,0,3);
    this.add(seil5);

    const seil6 = seil.clone();
    seil6.position.set(-3.2,0,2);
    this.add(seil6);

    const seil7 = seil.clone();
    seil7.position.set(-1,0,2);
    this.add(seil7);

    const seil8 = seil.clone();
    seil8.position.set(2,0,-1);
    this.add(seil8);

    const seil9 = seil.clone();
    seil9.position.set(4,0,-1);
    this.add(seil9);

    const seil10 = seil.clone();
    seil10.position.set(6,0,-1.5);
    this.add(seil10);

    const seil11 = seil.clone();
    seil11.position.set(8,0,-2);
    this.add(seil11);

    const seil12 = seil.clone();
    seil12.position.set(10,0.3,-3);
    this.add(seil12);

    const eimerSeilGeometry = new THREE.CylinderGeometry(1.2,1.2,37);
    const eimerSeil = new THREE.Mesh(eimerSeilGeometry, seilMaterial);
    eimerSeil.position.set(0,65,0);
    this.add(eimerSeil);

    //Eimer
    //---------------------------------------

    const eimerGeometry = new THREE.CylinderGeometry(10,10,15);
    const eimer = new THREE.Mesh(eimerGeometry, brunnenMaterial);
    eimer.position.set(0,35,0);
    //this.add(eimer);

    const eimerCavityGeometry = new THREE.CylinderGeometry(10,10,14);
    eimerCavityGeometry.translate(0,1,0);
    eimerCavityGeometry.scale(0.8,1,0.8);
    const eimerCavity = new THREE.Mesh(eimerCavityGeometry, brunnenMaterial);

    const eimerCSG = CSG.fromMesh(eimer);
    const eimerCavityCSG = CSG.fromMesh(eimerCavity);
    const hollowEimer = CSG.toMesh(eimerCSG.subtract(eimerCavityCSG), eimer.matrix, eimer.material);
    hollowEimer.castShadow = true;
    hollowEimer.position.set(0,35,0);

    this.add(hollowEimer);
  }



}
