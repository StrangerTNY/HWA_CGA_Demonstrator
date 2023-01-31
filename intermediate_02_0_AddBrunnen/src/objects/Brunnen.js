import * as THREE from 'three';
import CSG from 'csg';
import * as TWEEN from 'tween';

import {Animation, AnimationType, AnimationAxis} from '../animation/Animation.js';

export default class Brunnen extends THREE.Group {

  constructor() {
    super();

    this.animations = [];
    this.addParts();
  }

  addParts() {

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xe7e7e7,
      flatShading: false,
      roughness: 0.0,
      metalness: 0.3
    });

    // Brunnen Becken
    // -------------
    const brunnenMaterial = new THREE.MeshLambertMaterial({color: 0x561e0b});
    const brunnenGeometry = new THREE.CylinderGeometry(30, 30, 43, 8);
    const brunnen = new THREE.Mesh(brunnenGeometry, brunnenMaterial);
    brunnen.rotation.set(0, THREE.MathUtils.degToRad(45), 0);
    brunnen.castShadow = true;
    //this.add(brunnen);b

    const cavityGeometry = new THREE.CylinderGeometry(30, 30, 50, 8);
    cavityGeometry.scale(0.9, 1, 0.9);
    cavityGeometry.translate(0, 10, 0);
    const cavity = new THREE.Mesh(cavityGeometry, brunnenMaterial);

    const brunnenCSG = CSG.fromMesh(brunnen);
    const cavityCSG = CSG.fromMesh(cavity);
    const hollowBrunnen = CSG.toMesh(brunnenCSG.subtract(cavityCSG), brunnen.matrix, brunnen.material);
    hollowBrunnen.castShadow = true;
    hollowBrunnen.rotation.set(0, THREE.MathUtils.degToRad(23), 0);
    this.add(hollowBrunnen);

    // Brunnen Rand
    // -------------
    const randGeometry = new THREE.CylinderGeometry(35, 35, 4, 8);
    randGeometry.translate(0, 23, 0);
    const rand = new THREE.Mesh(randGeometry, brunnenMaterial);
    const randCSG = CSG.fromMesh(rand);
    const hollowRand = CSG.toMesh(randCSG.subtract(cavityCSG), rand.matrix, rand.material);
    hollowRand.castShadow = true;
    hollowBrunnen.add(hollowRand);

    //Brunnen Dach
    //----------------------------------
    const dachGeruestGeometry = new THREE.BoxGeometry(70, 5, 70);
    dachGeruestGeometry.translate(0, 103, 0);
    const dachGeruest = new THREE.Mesh(dachGeruestGeometry, brunnenMaterial);
    //dachGeruest.rotation.set(0,THREE.MathUtils.degToRad(23),0);
    //this.add(dachGeruest);

    const dachGeruestCavityGeometry = new THREE.BoxGeometry(70, 5, 70);
    dachGeruestCavityGeometry.scale(0.8, 1, 0.8);
    dachGeruestCavityGeometry.translate(0, 103, 0);
    const dachGeruestCavity = new THREE.Mesh(dachGeruestCavityGeometry, brunnenMaterial);

    const dachGeruestCSG = CSG.fromMesh(dachGeruest);
    const dachGeruestCavityCSG = CSG.fromMesh(dachGeruestCavity);
    const hollowDachGeruest = CSG.toMesh(dachGeruestCSG.subtract(dachGeruestCavityCSG), dachGeruest.matrix, dachGeruest.material);
    //hollowDachGeruest.rotation.set(0,THREE.MathUtils.degToRad(23),0);
    hollowDachGeruest.castShadow = true;
    this.add(hollowDachGeruest);

    const dachGeometry = new THREE.ConeGeometry(55, 30, 4, 1);
    dachGeometry.translate(0, 120, 0);
    const dach = new THREE.Mesh(dachGeometry, brunnenMaterial);
    dach.rotation.set(0, THREE.MathUtils.degToRad(45), 0);
    this.add(dach);

    const dachCavityGeometry = new THREE.ConeGeometry(55, 30, 4, 1);
    dachCavityGeometry.scale(0.8, 1, 0.8);
    dachCavityGeometry.translate(0, 118, 0);
    const dachCavity = new THREE.Mesh(dachCavityGeometry, brunnenMaterial);

    const dachCSG = CSG.fromMesh(dach);
    const dachCavityCSG = CSG.fromMesh(dachCavity);
    const hollowDach = CSG.toMesh(dachCSG.subtract(dachCavityCSG), dach.matrix, dach.material);
    //hollowDach.rotation.set(0,THREE.MathUtils.degToRad(-23),0);
    hollowDach.castShadow = true;
    //this.add(hollowDach);


    //Brunnen Gerüst
    //----------------------
    const geruestGeometry = new THREE.BoxGeometry(2, 100, 7);
    geruestGeometry.translate(0, 53, 0);
    const geruest1 = new THREE.Mesh(geruestGeometry, brunnenMaterial);
    geruest1.position.set(-33, 0, 0);
    //geruest1.rotation.set(0, THREE.MathUtils.degToRad(23), 0);
    hollowDachGeruest.add(geruest1);

    const geruest2 = geruest1.clone();
    geruest2.position.set(33, 0, 0);
    //geruest2.rotation.set(0, THREE.MathUtils.degToRad(23), 0);
    hollowDachGeruest.add(geruest2);

    const geruestAddonGeometry = new THREE.BoxGeometry(2, 18, 7);
    geruestAddonGeometry.translate(0, 70, 0);
    const geruestAddon1 = new THREE.Mesh(geruestAddonGeometry, brunnenMaterial);
    geruestAddon1.position.set(-2, 0, 0);
    //geruestAddon1.rotation.set(0, THREE.MathUtils.degToRad(23),0);
    geruest1.add(geruestAddon1);

    const geruestAddon2 = geruestAddon1.clone();
    geruestAddon2.position.set(2, 0, 0);
    //geruestAddon2.rotation.set(0,THREE.MathUtils.degToRad(23),0);
    geruest2.add(geruestAddon2);


    //Brunnen Rolle
    //---------------------------------------------------

    const rolleMaterial = new THREE.MeshLambertMaterial({color: 0x1e1500});
    const rolleGeometry = new THREE.CylinderGeometry(7, 7, 57);
    //rolleGeometry.translate(0,0,-75);
    const rolle = new THREE.Mesh(rolleGeometry, rolleMaterial);
    rolle.rotation.set(0, 0, THREE.MathUtils.degToRad(90));
    rolle.position.set(0, 75, 0);
    this.add(rolle);

    //Griff
    //------------------------------------------------------
    const stabMaterial = new THREE.MeshLambertMaterial({color: 0x684222});
    const stabGeometry = new THREE.CylinderGeometry(1, 1, 90, 8);
    const hebelGeometry = new THREE.BoxGeometry(4, 2, 30);
    const griffGeometry = new THREE.CylinderGeometry(1, 1, 10);

    const stab = new THREE.Mesh(stabGeometry, stabMaterial).add(new THREE.Mesh(hebelGeometry, rolleMaterial)).add(new THREE.Mesh(griffGeometry, stabMaterial));
    //stab.rotation.set(THREE.MathUtils.degToRad(90),0,THREE.MathUtils.degToRad(67));
    stab.position.set(0, 75, 0);
    stab.rotation.set(0, 0, THREE.MathUtils.degToRad(90));
    stab.children[0].position.set(-3, 43, 8);
    stab.children[0].rotation.set(0, THREE.MathUtils.degToRad(-20), 0);
    stab.children[1].position.set(-7.5,48,20);
    stab.name = 'griff';
    stab.children[0].name = 'griff';
    stab.children[1].name = 'griff';
    this.add(stab);

    //Griff Animation
    //---------------------------------------------
    const griffAnimation = new Animation(stab, AnimationType.ROTATION, AnimationAxis.X);
    griffAnimation.setAmount(THREE.MathUtils.degToRad(360));
    griffAnimation.setSpeed(THREE.MathUtils.degToRad(180));
    griffAnimation.onComplete((this.updateFunctionalState.bind((this))));
    stab.linearAnimation = griffAnimation;
    this.animations.push(griffAnimation);



    //Seil
    //--------------------------------------------------
    const seilMaterial = new THREE.MeshLambertMaterial({color: 0x594b37});
    const seilGeometry = new THREE.TorusGeometry(7.5, 1.2, 16, 16);
    //seilGeometry.translate(0, 75, 0);
    const seil = new THREE.Mesh(seilGeometry, seilMaterial);
    seil.rotation.set(THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(0),0 );
    stab.add(seil);

    const seil2 = seil.clone();
    seil2.position.set(0, -12, .5);
    stab.add(seil2);

    const seil3 = seil.clone();
    seil3.position.set(0.4, -10, 0);
    stab.add(seil3);

    const seil4 = seil.clone();
    seil4.position.set(0, -8, .5);
    stab.add(seil4);

    const seil5 = seil.clone();
    seil5.position.set(0, -5.5, 0);
    stab.add(seil5);

    const seil6 = seil.clone();
    seil6.position.set(0, -3.2, 0);
    stab.add(seil6);

    const seil7 = seil.clone();
    seil7.position.set(0, -1, .5);
    stab.add(seil7);

    const seil8 = seil.clone();
    seil8.position.set(0, 2, -.5);
    stab.add(seil8);

    const seil9 = seil.clone();
    seil9.position.set(0,4, 0);
    stab.add(seil9);

    const seil10 = seil.clone();
    seil10.position.set(0, 6, -.5);
    stab.add(seil10);

    const seil11 = seil.clone();
    seil11.position.set(0, 8, 0);
    stab.add(seil11);

    const seil12 = seil.clone();
    seil12.position.set(.3, 10, 0);
    stab.add(seil12);

    const eimerSeilGeometry = new THREE.CylinderGeometry(1.2, 1.2, 37);
    const eimerSeil = new THREE.Mesh(eimerSeilGeometry, seilMaterial);
    eimerSeil.position.set(0, 65, 0);
    this.add(eimerSeil);

    //Eimer
    //---------------------------------------

    const eimerGeometry = new THREE.CylinderGeometry(10, 10, 15);
    const eimer = new THREE.Mesh(eimerGeometry, brunnenMaterial);
    eimer.position.set(0, 35, 0);
    //this.add(eimer);

    const eimerCavityGeometry = new THREE.CylinderGeometry(10, 10, 14);
    eimerCavityGeometry.translate(0, 1, 0);
    eimerCavityGeometry.scale(0.8, 1, 0.8);
    const eimerCavity = new THREE.Mesh(eimerCavityGeometry, brunnenMaterial);

    const eimerCSG = CSG.fromMesh(eimer);
    const eimerCavityCSG = CSG.fromMesh(eimerCavity);
    const hollowEimer = CSG.toMesh(eimerCSG.subtract(eimerCavityCSG), eimer.matrix, eimer.material);
    hollowEimer.castShadow = true;
    hollowEimer.position.set(0, 35, 0);

    this.add(hollowEimer);

    const eimerGriffProfile = new THREE.Shape().absellipse(0, 0, 0.2, 0.2,
        0, THREE.MathUtils.degToRad(360));
    const eimerGriffSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9, 0, 0),
      new THREE.Vector3(-7, 2, 0),
      new THREE.Vector3(-1, 5, 0),
      new THREE.Vector3(1, 5, 0),
      new THREE.Vector3(7, 2, 0),
      new THREE.Vector3(9, 0, 0)
    ]);
    eimerGriffSpline.curveType = 'catmullrom';
    eimerGriffSpline.tension = 0.0;
    const extrudeSettings = {
      steps: 200,
      curveSegments: 100,
      extrudePath: eimerGriffSpline
    };
    const eimerGriffGeometry = new THREE.ExtrudeGeometry(eimerGriffProfile, extrudeSettings);
    const eimerGriff = new THREE.Mesh(eimerGriffGeometry, metalMaterial);
    eimerGriff.position.set(0, 7, 0);
    eimerGriff.castShadow = true;
    eimerGriff.name = 'eimerGriff';
    hollowEimer.add(eimerGriff);

    //Eimer Animation
    //-------------------------------------------------------
    const eimerAnimation = new Animation(eimer, AnimationType.TRANSLATION, AnimationAxis.Y);
    eimerAnimation.setAmount(-30);
    eimerAnimation.setSpeed(10);
    eimerAnimation.onComplete(this.updateFunctionalState.bind(this));
    hollowEimer.linearAnimation = eimerAnimation;
    this.animations.push(eimerAnimation);

  }

  updateFunctionalState() {
    //const griffRotation = THREE.MathUtils.radToDeg(this.children[5].rotation.x) === 360;
  }

}
