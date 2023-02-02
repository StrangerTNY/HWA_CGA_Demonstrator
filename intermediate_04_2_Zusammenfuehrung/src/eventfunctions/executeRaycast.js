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
    //console.log(firstHit.name);

    if (firstHit.name === 'griff' && firstHit.parent.parent.children[3].children[0].children[1].state === false) {
      firstHit.parent.linearAnimation.toggleEndPosition();
      firstHit.parent.parent.children[3].linearAnimation.toggleEndPosition();

      if (!firstHit.parent.parent.children[3].children[0].eimerDown) {
        firstHit.parent.parent.children[3].children[0].eimerDown = !firstHit.parent.parent.children[3].children[0].eimerDown;
      } else {
        firstHit.parent.parent.children[3].children[0].children[1].state = true;
        firstHit.parent.parent.children[3].children[0].eimerDown = false;
      }
    } else if (firstHit.name === 'eimer') {
      if (firstHit.children.length > 0) {
        if (firstHit.children[1].state) {
          firstHit.tweenMoveEimer.start();
          setTimeout(() => {
            firstHit.tweenTiltEimerDown.start();
          }, 2000);
          setTimeout(() => {
            firstHit.tweenTiltEimerUp.start();
          }, 3000);
          setTimeout(() => {
            firstHit.tweenMoveEimerBack.start();
          }, 4000);
          firstHit.children[1].state = false;
        }
      } else {
        if (firstHit.parent.children[1].state) {
          firstHit.parent.tweenMoveEimer.start();
          setTimeout(() => {
            firstHit.parent.tweenTiltEimerDown.start();
          }, 2000);
          setTimeout(() => {
            firstHit.parent.tweenTiltEimerUp.start();
          }, 3000);
          setTimeout(() => {
            firstHit.parent.tweenMoveEimerBack.start();
          }, 4000);
          firstHit.parent.children[1].state = false;
        }

      }
    } else if ((firstHit.name === 'Mechanik_2' || firstHit.name === 'Mechanik_3') && !firstHit.parentBrunnen.state.hasWater ) {
      firstHit.parentBrunnen.state.eimerDown = !firstHit.parentBrunnen.state.eimerDown;
      if (firstHit.parentBrunnen.state.eimerDown) {
        firstHit.parentBrunnen.animations.get('EmtpyWater').stop();
        firstHit.parentBrunnen.animations.get('EmptyEimeBack').stop();
        firstHit.parentBrunnen.animations.get('EimerUp').stop();
        firstHit.parentBrunnen.animations.get('MechanikUp').stop();
        firstHit.parentBrunnen.animations.get('RopeUp').stop();
        firstHit.parentBrunnen.animations.get('WaterAction').stop();
        firstHit.parentBrunnen.animations.get('EmptyEimer').stop();


        firstHit.parentBrunnen.animations.get('EimerDown').play();
        firstHit.parentBrunnen.animations.get('RopeDown').play();
        firstHit.parentBrunnen.animations.get('MechnikDown').play();
      } else {
        firstHit.parentBrunnen.animations.get('EmtpyWater').stop();
        firstHit.parentBrunnen.animations.get('EimerDown').stop();
        firstHit.parentBrunnen.animations.get('MechnikDown').stop();
        firstHit.parentBrunnen.animations.get('RopeDown').stop();
        firstHit.parentBrunnen.animations.get('EmptyEimer').stop();
        firstHit.parentBrunnen.animations.get('EmptyEimeBack').stop();


        firstHit.parentBrunnen.animations.get('EimerUp').play();
        firstHit.parentBrunnen.animations.get('RopeUp').play();
        firstHit.parentBrunnen.animations.get('WaterAction').play();
        firstHit.parentBrunnen.animations.get('MechanikUp').play();
        firstHit.parentBrunnen.state.hasWater = !firstHit.parentBrunnen.state.hasWater;
      }
    }else if(firstHit.name === 'Eimer_2'){

      if(firstHit.parentBrunnen.state.hasWater){
        firstHit.parentBrunnen.animations.get('EimerDown').stop();
        firstHit.parentBrunnen.animations.get('RopeDown').stop();
        firstHit.parentBrunnen.animations.get('MechnikDown').stop();
        firstHit.parentBrunnen.animations.get('EimerUp').stop();
        firstHit.parentBrunnen.animations.get('RopeUp').stop();
        firstHit.parentBrunnen.animations.get('WaterAction').stop();
        firstHit.parentBrunnen.animations.get('MechanikUp').stop();
        firstHit.parentBrunnen.animations.get('EmptyEimeBack').stop();

        firstHit.parentBrunnen.animations.get('EmptyEimer').play();
        firstHit.parentBrunnen.animations.get('EmtpyWater').play();

        setTimeout(() =>{
          firstHit.parentBrunnen.animations.get('WaterAction').stop();
          firstHit.parentBrunnen.animations.get('EmtpyWater').stop();
          firstHit.parentBrunnen.animations.get('EmptyEimer').stop();

          firstHit.parentBrunnen.animations.get('EmptyEimeBack').play();
        },6000);
        firstHit.parentBrunnen.state.hasWater = !firstHit.parentBrunnen.state.hasWater;
      }
    }
  }

}
