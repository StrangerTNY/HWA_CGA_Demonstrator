import * as THREE from 'three';
import * as DATGUI from 'datgui';
import * as CONTROLS from 'controls';
import * as TWEEN from 'tween';
import Stats from 'stats';

// Own modules
import Physics from './physics/Physics.js';
import Brunnen from "./objects/Brunnen.js";
import Ground from "./objects/Ground.js";
import Tree from './objects/Tree.js';

// Event FUNKTIONEN!!!1!11!!!
import {updateAspectRatio} from './eventfunctions/updateAspectRatio.js';
import {executeRaycast} from './eventfunctions/executeRaycast.js';
import {keyDownAction, keyUpAction} from './eventfunctions/executeKeyAction.js';
import Path from "./objects/Path.js";
import BrunnenFromFile from "./objects/BrunnenFromFile.js";


function main() {

  window.scene = new THREE.Scene();
  window.scene.add(new THREE.AxesHelper(50));

  window.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  window.camera.position.set(-100, 300, 300);

  // Skybox
  var skybox = new THREE.CubeTextureLoader().load([
    'src/images/SkySkyBoxAnime/px.png',
    'src/images/SkySkyBoxAnime/nx.png',
    'src/images/SkySkyBoxAnime/py.png',
    'src/images/SkySkyBoxAnime/ny.png',
    'src/images/SkySkyBoxAnime/pz.png',
    'src/images/SkySkyBoxAnime/nz.png',
  ]);
  window.scene.background = skybox;

  window.renderer = new THREE.WebGLRenderer({antialias: true});
  window.renderer.setSize(window.innerWidth, window.innerHeight);
  window.renderer.setClearColor(0xBCF8FD);

  window.renderer.shadowMap.enabled = true;

  window.physics = new Physics();
  window.physics.setup(0, -200, 0, 1 / 240, true);

  window.audioListener = new THREE.AudioListener();
  window.camera.add(window.audioListener);

  document.getElementById('3d_content').appendChild(window.renderer.domElement);

  const brunnen = new Brunnen();
  brunnen.position.set(-50,20,0);
  window.scene.add(brunnen);

  /*const brunnenFromFile = new BrunnenFromFile();
  brunnenFromFile.position.set(50,10,0);
  brunnenFromFile.rotation.set(0, THREE.MathUtils.degToRad(-90), 0);
  //brunnenFromFile.addPhysics();
  window.scene.add(brunnenFromFile);*/

  const ground = new Ground();
  ground.position.set(0,-26,0);
  window.scene.add(ground);

  const tree = new Tree(1);
  tree.position.set(-200,75,-120);
  tree.addPhysics();
  window.scene.add(tree);

  const tree2 = new Tree(1.5);
  tree2.position.set(200,75,-50);
  //tree2.scale.set(1.5,1.5,1.5);
  tree2.addPhysics();
  window.scene.add(tree2);

  const path = new Path();
  path.position.set(0,0.1,100);
  window.scene.add(path);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.intensity = 0.8;
  window.scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(320, 240, 150);
  spotLight.intensity = 1;
  spotLight.target = ground;
  spotLight.angle = THREE.MathUtils.degToRad(30);
  spotLight.penumbra = 1.0;
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.set(2048, 2048);
  spotLight.shadow.camera.aspect = 1;
  spotLight.shadow.camera.near = 100;
  spotLight.shadow.camera.far = 500;
  spotLight.shadow.bias = -0.001;
  //window.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
  window.scene.add(spotLight);

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const gui = new DATGUI.GUI();
  gui.add(spotLight.position, 'x', 0, 500);
  gui.add(spotLight.position, 'y', 0, 500);
  gui.add(spotLight.position, 'z', 0, 500);

  const orbitControls = new CONTROLS.OrbitControls(window.camera, window.renderer.domElement);
  orbitControls.target = new THREE.Vector3(0, 0, 0);
  orbitControls.update();

  const clock = new THREE.Clock();

  function mainLoop() {

    //console.log(tree.position);

    stats.begin();

    const delta = clock.getDelta();

    brunnen.animations.forEach(function (animation){
      animation.update(delta);
    });

    TWEEN.update();

    /*if(brunnenFromFile.animationMixer !== null){
      brunnenFromFile.animationMixer.update(delta);
    }*/

    window.physics.update(delta);

    window.renderer.render(window.scene, window.camera);

    stats.end();
    requestAnimationFrame(mainLoop);
  }

  mainLoop();
}

//document.getElementById("startButton").addEventListener("click", function () {
  main();
  //document.getElementById("overlay").remove();
  window.onresize = updateAspectRatio;
  window.onclick = executeRaycast;
  window.onkeydown = keyDownAction;
  window.onkeyup = keyUpAction;
//});