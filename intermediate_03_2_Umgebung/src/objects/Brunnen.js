import * as THREE from 'three';
import * as TWEEN from 'tween';
import CSG from 'csg';

import {GridShader} from '../shaders/GridShader.js';

import {Animation, AnimationType, AnimationAxis} from '../animation/Animation.js';

export default class Brunnen extends THREE.Group {

  constructor() {
    super();

    this.animations = [];
    this.addParts();
  }

  addParts() {

    const brunnenGeometry = new THREE.CylinderGeometry(5, 5, 5, 8, 1);
    const brunnenMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    const brunnen = new THREE.Mesh(this.brunnenGeometry, this.brunnenMaterialn);
    brunnen.position.set(0, 0, 0);
    window.scene.add(brunnen);

  }
}