import * as THREE from 'three';
import * as TWEEN from 'tween';
import CSG from 'csg';
import {Animation, AnimationType, AnimationAxis} from '../animation/Animation.js';
import {CircleGeometry} from "three";

export default class Brunnen extends THREE.Group {

  constructor() {
    super();

    this.animations = [];
    this.waterSound = null;
    this.addParts();
  }

  addParts() {

    const loader = new THREE.TextureLoader();

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x121212,
      flatShading: false,
      roughness: 0.3,
      metalness: 0.4
    });

    //Materials
    //------------------------
    const brunnenMaterial = new THREE.MeshLambertMaterial({color: 0x561e0b});
    brunnenMaterial.side = THREE.DoubleSide;

    const beckenMaterial = new THREE.MeshLambertMaterial({color: 0x915D45});
    beckenMaterial.side = THREE.DoubleSide;

    const dachMaterial = new THREE.MeshLambertMaterial({color: 0x915D45});

    const eimerMaterial = new THREE.MeshLambertMaterial({color: 0x915D45});

    const stabMaterial = new THREE.MeshLambertMaterial({color: 0x684222});

    const rolleMaterial = new THREE.MeshLambertMaterial({color: 0x7F5500});

    const seilMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});


    // Brunnen Becken
    // -------------
    const brunnenGeometry = new THREE.CylinderGeometry(30, 30, 43, 8);

    const beckenMap = loader.load('src/images/brunnen/base_u_eimer.jpg');
    beckenMap.repeat.set(1,1);
    beckenMap.wrapS = THREE.RepeatWrapping;
    beckenMap.wrapT = THREE.RepeatWrapping;
    beckenMaterial.map = beckenMap;

    const brunnen = new THREE.Mesh(brunnenGeometry, beckenMaterial);
    brunnen.rotation.set(0, THREE.MathUtils.degToRad(45), 0);
    brunnen.castShadow = true;

    const cavityGeometry = new THREE.CylinderGeometry(30, 30, 50, 8);
    cavityGeometry.scale(0.9, 1, 0.9);
    cavityGeometry.translate(0, 10, 0);
    const cavity = new THREE.Mesh(cavityGeometry, beckenMaterial);

    const brunnenCSG = CSG.fromMesh(brunnen);
    const cavityCSG = CSG.fromMesh(cavity);
    const hollowBrunnen = CSG.toMesh(brunnenCSG.subtract(cavityCSG), brunnen.matrix, brunnen.material);
    hollowBrunnen.castShadow = true;
    hollowBrunnen.rotation.set(0, THREE.MathUtils.degToRad(23), 0);
    this.add(hollowBrunnen);

    // Becken Rand
    // -------------
    const randGeometry = new THREE.CylinderGeometry(35, 35, 4, 8);
    randGeometry.translate(0, 23, 0);
    const rand = new THREE.Mesh(randGeometry, dachMaterial);
    const randCSG = CSG.fromMesh(rand);
    const hollowRand = CSG.toMesh(randCSG.subtract(cavityCSG), rand.matrix, rand.material);
    hollowRand.castShadow = true;
    hollowBrunnen.add(hollowRand);



    //Brunnen Dach
    //----------------------------------

    const dachMap = loader.load('src/images/brunnen/brunnen_dach.jpg');
    dachMap.repeat.set(2,2);
    dachMap.wrapS = THREE.RepeatWrapping;
    dachMap.wrapT = THREE.RepeatWrapping;
    dachMaterial.map = dachMap;
    dachMaterial.side = THREE.DoubleSide;

    const dachGeometry = new THREE.ConeGeometry(55, 36, 4, 1,true);
    const dach = new THREE.Mesh(dachGeometry, dachMaterial);
    dach.position.set(0,123,0);
    dach.rotation.set(0, THREE.MathUtils.degToRad(45), 0);
    dach.castShadow = true;
    this.add(dach);

    //Brunnen Gerüst
    //----------------------
    const dachGeruestGeometry = new THREE.BoxGeometry(70, 5, 70);
    dachGeruestGeometry.translate(0, 103, 0);
    const dachGeruest = new THREE.Mesh(dachGeruestGeometry, dachMaterial);

    const dachGeruestCavityGeometry = new THREE.BoxGeometry(70, 5, 70);
    dachGeruestCavityGeometry.scale(0.8, 1, 0.8);
    dachGeruestCavityGeometry.translate(0, 103, 0);
    const dachGeruestCavity = new THREE.Mesh(dachGeruestCavityGeometry, dachMaterial);

    const dachGeruestCSG = CSG.fromMesh(dachGeruest);
    const dachGeruestCavityCSG = CSG.fromMesh(dachGeruestCavity);
    const hollowDachGeruest = CSG.toMesh(dachGeruestCSG.subtract(dachGeruestCavityCSG), dachGeruest.matrix, dachGeruest.material);
    hollowDachGeruest.castShadow = true;
    this.add(hollowDachGeruest);

    const geruestGeometry = new THREE.BoxGeometry(2, 100, 7);
    geruestGeometry.translate(0, 53, 0);
    const geruest1 = new THREE.Mesh(geruestGeometry, dachMaterial);
    geruest1.position.set(-33, 0, 0);
    geruest1.castShadow = true;
    hollowDachGeruest.add(geruest1);

    const geruest2 = geruest1.clone();
    geruest2.position.set(33, 0, 0);
    geruest2.castShadow = true;
    hollowDachGeruest.add(geruest2);

    const geruestAddonGeometry = new THREE.BoxGeometry(2, 18, 7);
    geruestAddonGeometry.translate(0, 70, 0);
    const geruestAddon1 = new THREE.Mesh(geruestAddonGeometry, dachMaterial);
    geruestAddon1.position.set(-2, 0, 0);
    geruestAddon1.castShadow = true;
    geruest1.add(geruestAddon1);

    const geruestAddon2 = geruestAddon1.clone();
    geruestAddon2.position.set(2, 0, 0);
    geruestAddon2.castShadow = true;
    geruest2.add(geruestAddon2);

    //Dach Metalspitze
    //---------------------------------
    const spitzenBaseGeometry = new THREE.TorusGeometry(4,.6,32,32);
    const spitzenBase = new THREE.Mesh(spitzenBaseGeometry, metalMaterial);
    spitzenBase.position.set(0,16,0);
    spitzenBase.rotation.set(THREE.MathUtils.degToRad(90),0,0);
    dach.add(spitzenBase);

    const spitze1Geometry = new THREE.CylinderGeometry(3.9,3.9,1.5,32);
    const spitze1 = new THREE.Mesh(spitze1Geometry, metalMaterial);
    spitze1.rotation.set(THREE.MathUtils.degToRad(90),0,0);
    spitze1.position.set(0,0,-1);
    spitzenBase.add(spitze1);

    const points = [];
    for ( let i = 0; i < 10; i ++ ) {
      points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 2 +2.2 , ( i - 5 ) * 0.7) );
    }
    const spitze2Geometry = new THREE.LatheGeometry( points );
    const spitze2 = new THREE.Mesh( spitze2Geometry, metalMaterial );
    spitze2.rotation.set(THREE.MathUtils.degToRad(90),0,0);
    spitze2.position.set(0,0,-4.5);
    spitzenBase.add(spitze2);

    const spitze3Geometry = new THREE.CircleGeometry(1,32);
    const spitze3 = new THREE.Mesh(spitze3Geometry, metalMaterial);
    metalMaterial.side = THREE.DoubleSide;
    spitze3.rotation.set(0,0,THREE.MathUtils.degToRad(90));
    spitze3.position.set(0,0,-8);
    spitzenBase.add(spitze3);

    const spitze4Geometry = new THREE.ConeGeometry(0.7,3,32);
    const spitze4 = new THREE.Mesh(spitze4Geometry,metalMaterial);
    spitze4.position.set(0,0,-9);
    spitze4.rotation.set(THREE.MathUtils.degToRad(-90),0,THREE.MathUtils.degToRad(0));
    spitzenBase.add(spitze4);


    //Eimer Seil
    //---------------------------------
    const eimerSeilGeometry = new THREE.CylinderGeometry(1.2, 1.2, 40);
    const eimerSeil = new THREE.Mesh(eimerSeilGeometry, seilMaterial);
    eimerSeil.position.set(0, 64, 0);
    eimerSeil.castShadow =true;
    this.add(eimerSeil);

    //Eimer
    //---------------------------------------

    const eimerMap = loader.load('src/images/brunnen/base_u_eimer.jpg');
    eimerMap.repeat.set(1,1);
    eimerMap.wrapS = THREE.RepeatWrapping;
    eimerMap.wrapT = THREE.RepeatWrapping;
    eimerMaterial.map = eimerMap;

    const eimerGeometry = new THREE.CylinderGeometry(10, 10, 15);
    const eimer = new THREE.Mesh(eimerGeometry, eimerMaterial);
    eimer.position.set(0, 35, 0);

    const eimerCavityGeometry = new THREE.CylinderGeometry(10, 10, 14);
    eimerCavityGeometry.translate(0, 1, 0);
    eimerCavityGeometry.scale(0.8, 1, 0.8);
    const eimerCavity = new THREE.Mesh(eimerCavityGeometry, eimerMaterial);

    const eimerCSG = CSG.fromMesh(eimer);
    const eimerCavityCSG = CSG.fromMesh(eimerCavity);
    const hollowEimer = CSG.toMesh(eimerCSG.subtract(eimerCavityCSG), eimer.matrix, eimer.material);
    hollowEimer.castShadow = true;
    hollowEimer.position.set(0, -33.5, 0);

    eimerSeil.add(hollowEimer);

    const eimerGriffProfile = new THREE.Shape().absellipse(0, 0, 0.2, 0.2,
        0, THREE.MathUtils.degToRad(360));
    const eimerGriffSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9, 0, 0),
      new THREE.Vector3(-7, 1, 0),
      new THREE.Vector3(-3, 7, 0),
      new THREE.Vector3(3, 7, 0),
      new THREE.Vector3(7, 1, 0),
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
    hollowEimer.state = {
      eimerDown: false,
    };
    hollowEimer.add(eimerGriff);

    hollowEimer.name = 'eimer';
    hollowEimer.children[0].name = 'eimer';


    //Eimer Animation
    //-------------------------------------------------------
    const eimerAnimation = new Animation(eimerSeil, AnimationType.TRANSLATION, AnimationAxis.Y);
    eimerAnimation.setAmount(-18);
    eimerAnimation.setSpeed(9);
    eimerAnimation.onComplete(this.updateFunctionalState.bind(this));
    eimerSeil.linearAnimation = eimerAnimation;
    this.animations.push(eimerAnimation);

    hollowEimer.tweenMoveEimer = new TWEEN.Tween(hollowEimer.position).to(new THREE.Vector3(
        hollowEimer.position.x,
        hollowEimer.position.y + 10,
        hollowEimer.position.z + 50),
        2000).easing(TWEEN.Easing.Quartic.InOut).onComplete(this.updateFunctionalState.bind(this));
    hollowEimer.tweenMoveEimerBack = new TWEEN.Tween(hollowEimer.position).to(new THREE.Vector3(
            hollowEimer.position.x,
            hollowEimer.position.y,
            hollowEimer.position.z),
        2000).easing(TWEEN.Easing.Quartic.InOut).onComplete(this.updateFunctionalState.bind(this));
    hollowEimer.tweenTiltEimerDown = new TWEEN.Tween(hollowEimer.rotation).to(new THREE.Vector3(
            hollowEimer.rotation.x + THREE.MathUtils.degToRad(120),
            hollowEimer.rotation.y,
            hollowEimer.rotation.z),
        2000).easing(TWEEN.Easing.Exponential.Out).onComplete(this.updateFunctionalState.bind(this));
    hollowEimer.tweenTiltEimerUp = new TWEEN.Tween(hollowEimer.rotation).to(new THREE.Vector3(
            hollowEimer.rotation.x ,
            hollowEimer.rotation.y,
            hollowEimer.rotation.z),
        2000).easing(TWEEN.Easing.Exponential.Out).onComplete(this.updateFunctionalState.bind(this));

    //Griff
    //------------------------------------------------------
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
    //stab.name = 'griff';
    stab.children[0].name = 'griff';
    stab.children[1].name = 'griff';
    stab.castShadow = true;
    this.add(stab);

    //Griff Animation
    //---------------------------------------------
    const griffAnimation = new Animation(stab, AnimationType.ROTATION, AnimationAxis.X);
    griffAnimation.setAmount(THREE.MathUtils.degToRad(360));
    griffAnimation.setSpeed(THREE.MathUtils.degToRad(180));
    griffAnimation.onComplete((this.updateFunctionalState.bind((this))));
    stab.linearAnimation = griffAnimation;
    this.animations.push(griffAnimation);



    //Brunnen Rolle
    //---------------------------------------------------
    const rolleGeometry = new THREE.CylinderGeometry(7, 7, 57);

    const rolleMap = loader.load('src/images/brunnen/rolle.jpg');
    rolleMap.repeat.set(5,1);
    rolleMap.wrapS = THREE.RepeatWrapping;
    rolleMap.wrapT = THREE.RepeatWrapping;

    rolleMaterial.map = rolleMap;
    const rolle = new THREE.Mesh(rolleGeometry, rolleMaterial);
    rolle.castShadow = true;
    stab.add(rolle);

    //Wasser
    //--------------------------------
    const waterEimerGeometry = new CircleGeometry(10);
    const waterMaterial = new THREE.MeshPhongMaterial({
      color: 0x2478c1,
      flatShading: true,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });

    const waterEimer = new THREE.Mesh(waterEimerGeometry, waterMaterial);
    waterEimer.rotation.set(THREE.MathUtils.degToRad(-90),0,0);
    waterEimer.position.set(0,7,0);
    waterEimer.visible = false;
    waterEimer.state = false;

    // document.waterSound = document.createElement('water');
    // document.waterSound.src = 'src/sounds/water splash.mp4'
    // this.waterSound = new THREE.VideoTexture(document.waterSound);
    // //waterMaterial.map = this.waterSound;
    hollowEimer.add(waterEimer);

    const waterBrunnenGeometry = new CircleGeometry(27.5);
    const waterBrunnen = new THREE.Mesh(waterBrunnenGeometry, waterMaterial);
    waterBrunnen.rotation.set(THREE.MathUtils.degToRad(-90),0,0);
    waterBrunnen.position.set(0,21,0);

    this.add(waterBrunnen);

    //Seil
    //--------------------------------------------------
    const seilGeometry = new THREE.TorusGeometry(8, 1.5, 16, 16);

    const seilMap = loader.load('src/images/brunnen/rope.jpg');
    seilMap.repeat.set(5,1);
    seilMap.wrapS = THREE.RepeatWrapping;
    seilMap.wrapT = THREE.RepeatWrapping;

    seilMaterial.map = seilMap;

    const seil = new THREE.Mesh(seilGeometry, seilMaterial);
    seil.rotation.set(THREE.MathUtils.degToRad(90), THREE.MathUtils.degToRad(0),0 );
    seil.castShadow =true;
    stab.add(seil);

    const seil2 = seil.clone();
    seil2.position.set(0, -12, 0.5);
    seil2.castShadow =true;
    stab.add(seil2);

    const seil3 = seil.clone();
    seil3.position.set(0.4, -10, 0);
    seil3.castShadow =true;
    stab.add(seil3);

    const seil4 = seil.clone();
    seil4.position.set(0, -8, .5);
    seil4.castShadow =true;
    stab.add(seil4);

    const seil5 = seil.clone();
    seil5.position.set(0, -5.5, 0);
    seil5.castShadow =true;
    stab.add(seil5);

    const seil6 = seil.clone();
    seil6.position.set(0, -3.2, 0);
    seil6.castShadow =true;
    stab.add(seil6);

    const seil7 = seil.clone();
    seil7.position.set(0, -1, .5);
    seil7.castShadow =true;
    stab.add(seil7);

    const seil8 = seil.clone();
    seil8.position.set(0, 2, -.5);
    seil8.castShadow =true;
    stab.add(seil8);

    const seil9 = seil.clone();
    seil9.position.set(0,4, 0);
    seil9.castShadow =true;
    stab.add(seil9);

    const seil10 = seil.clone();
    seil10.position.set(0, 6, -.5);
    seil10.castShadow =true;
    stab.add(seil10);

    const seil11 = seil.clone();
    seil11.position.set(0, 8, 0);
    seil11.castShadow =true;
    stab.add(seil11);

    const seil12 = seil.clone();
    seil12.position.set(.3, 10, 0);
    seil12.castShadow =true;
    stab.add(seil12);



    }

  updateFunctionalState() {
    const griffRotation = THREE.MathUtils.radToDeg(this.children[4].rotation.x) === 360;
    const eimerTilt = THREE.MathUtils.radToDeg(this.children[3].children[0].rotation.x) > 116;


    if(griffRotation){
      this.children[3].children[0].children[1].visible = true;
    }
    if(eimerTilt){
      this.children[3].children[0].children[1].visible = false;

    }
  }

  addPhysics() {
    if (this.loadingDone === false) {
      window.setTimeout(this.addPhysics.bind(this), 100);
    } else {
      //window.physics.addBox(this, 100, 90, 170, 80, 0, 65, 0);
      window.physics.addCylinder(this,100,50,50,170,6,0,64.2,0,0,THREE.MathUtils.degToRad(90));
    }
  }

}
