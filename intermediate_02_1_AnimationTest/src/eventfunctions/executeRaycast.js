import * as THREE from 'three';
window.raycaster = new THREE.Raycaster();

export function executeRaycast(event) {

  const mousePosition = new THREE.Vector2();
  mousePosition.x = 2 * (event.clientX / window.innerWidth) - 1;
  mousePosition.y = -2 * (event.clientY / window.innerHeight) + 1;

  window.raycaster.setFromCamera(mousePosition, window.camera);
  let intersects = window.raycaster.intersectObject(window.scene, true);

  if (intersects.length > 0) {
    let firstHit = intersects[0].object;

    if(firstHit.name === 'griff') {
      if (firstHit.children.length > 0) {
        firstHit.linearAnimation.toggleEndPosition();
        firstHit.parent.children[3].linearAnimation.toggleEndPosition();
      } else {
        firstHit.parent.linearAnimation.toggleEndPosition();
        firstHit.parent.parent.children[3].linearAnimation.toggleEndPosition();

      }
    }else if(firstHit.name === 'Mechanik_2' || firstHit.name === 'Mechanik_3'){

      firstHit.parentBrunnen.state.eimerDown = !firstHit.parentBrunnen.state.eimerDown;

      if(firstHit.parentBrunnen.state.eimerDown){
        firstHit.parentBrunnen.animations.get('EimerUp').stop();
        firstHit.parentBrunnen.animations.get('MechanikUp').stop();
        firstHit.parentBrunnen.animations.get('RopeUp').stop();
        firstHit.parentBrunnen.animations.get('WaterAction').stop();
        firstHit.parentBrunnen.animations.get('EimerDown').play();
        firstHit.parentBrunnen.animations.get('RopeDown').play();
        firstHit.parentBrunnen.animations.get('MechnikDown').play();

      }else{
        firstHit.parentBrunnen.animations.get('EimerDown').stop();
        firstHit.parentBrunnen.animations.get('MechnikDown').stop();
        firstHit.parentBrunnen.animations.get('RopeDown').stop();
        firstHit.parentBrunnen.animations.get('EimerUp').play();
        firstHit.parentBrunnen.animations.get('RopeUp').play();
        firstHit.parentBrunnen.animations.get('WaterAction').play();
        firstHit.parentBrunnen.animations.get('MechanikUp').play();


      }

    }
  }
  /*if (firstHit.name === 'powerKnob' || firstHit.name === 'volumeKnob') {
    if (firstHit.children.length > 0) {
      firstHit.linearAnimation.toggleEndPosition();
    } else {
      firstHit.parent.linearAnimation.toggleEndPosition();
    }
  } else if (firstHit.name === 'antenna') {
    firstHit.up = !firstHit.up;
    if (firstHit.up) {
      firstHit.tweenAnimationDown.stop();
      firstHit.tweenAnimationUp.start();
    } else {
      firstHit.tweenAnimationUp.stop();
      firstHit.tweenAnimationDown.start();
    }
  } else if (firstHit.name === 'powerKnobGLTF') {
    firstHit.parentTelevision.state.powerOn = !firstHit.parentTelevision.state.powerOn;
    if (firstHit.parentTelevision.state.powerOn) {
      firstHit.parentTelevision.animations.get('powerKnob_off').stop();
      firstHit.parentTelevision.animations.get('powerKnob_on').play();
    } else {
      firstHit.parentTelevision.animations.get('powerKnob_on').stop();
      firstHit.parentTelevision.animations.get('powerKnob_off').play();
    }
  } else if (firstHit.name === 'volumeKnobGLTF') {
    firstHit.parentTelevision.state.volumeHigh = !firstHit.parentTelevision.state.volumeHigh;
    if (firstHit.parentTelevision.state.volumeHigh) {
      firstHit.parentTelevision.animations.get('volumeKnob_low').stop();
      firstHit.parentTelevision.animations.get('volumeKnob_high').play();
    } else {
      firstHit.parentTelevision.animations.get('volumeKnob_high').stop();
      firstHit.parentTelevision.animations.get('volumeKnob_low').play();
    }
  } else if (firstHit.name === 'antennaGLTF') {
    firstHit.parentTelevision.state.antennaUp = !firstHit.parentTelevision.state.antennaUp;
    if (firstHit.parentTelevision.state.antennaUp) {
      firstHit.parentTelevision.animations.get('antenna_down').stop();
      firstHit.parentTelevision.animations.get('antenna_up').play();
    } else {
      firstHit.parentTelevision.animations.get('antenna_up').stop();
      firstHit.parentTelevision.animations.get('antenna_down').play();
    }
  }*/
}
