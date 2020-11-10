console.log("hello")
AFRAME.registerComponent('popup', {
    schema: {
        parent: {type:"string"}
    },
    init: function () {
      // init is called when object is created
      console.log('looks good')
  
      // define a camera object so we don't have to query it every time
      const sceneEl = document.querySelector('a-scene');
      const camera = sceneEl.querySelector('#camera');
      const parentObject=sceneEl.querySelector(this.attrValue.parent)
      this.camera = camera
      this.parentObject= parentObject
    },
    update: function () {},
    tick: function () {
      // get position of self
      const objPos = this.parentObject.object3D.position
  
      // get position of camera object
      const cameraPos = this.camera.object3D.position
  
      // get distance to camera with those two positions using vector method
      const distanceToCamera = objPos.distanceTo(cameraPos)
      //console.log(distanceToCamera)
      // console.log(objPos, cameraPos)
      // if distance is less than three, change visible to false, otherwise set as true
      if (distanceToCamera < 3){
        this.el.object3D.visible = true;
      } else {
        this.el.object3D.visible = false;
      }
  
    },
  
    // behaviors that any object has
    remove: function () {},
    pause: function () {},
    play: function () {}
  });


  // Random number between min (inclusive) and max (exclusive)
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min; 
  }

  function addLeaf(sceneEl) {

  }

  AFRAME.registerComponent('start', {
    schema: {type: 'string'},
  
    // This gets called after a-scene is loaded
    init: function () {
      var stringToLog = this.data;
      console.log(stringToLog);

      // Get the scene element
      var sceneEl = document.querySelector('a-scene');

      //Create an entity, a not den leaf
      var notDenLeaf = document.createElement('a-entity');
      notDenLeaf.setAttribute('geometry', 'primitive: plane; width: 2; height: 2');
      notDenLeaf.setAttribute('material', "src:#leaf_3; side:double; transparent: true; normalMap:#leaf_3_normal_map; roughness:1")
      notDenLeaf.setAttribute('animation','property: object3D.rotation.x; to: 359.999; dur: 10000; easing: linear; loop: true');
      notDenLeaf.setAttribute('animation__RY', 'property: object3D.rotation.y; to: 359.999; dur: 6000; easing: linear; loop: true')
      //notDenLeaf.setAttribute('animation__RZ', 'property: object3D.rotation.z; to: 359.999 ; dur: 8000; easing: linear; loop: true')
   
      // // Create an element, not den text
      // var notDenText = document.createElement('a-entity');
      // notDenText.setAttribute('text', 'Notholithocarpus densiflorus; color:#FFD500; align:center')
      // notDenText.setAttribute('look-at', '#camera')
      // notDenText.setAttribute('scale', '2 2 2')
      // notDenText.setAttribute('position', '0 0 1')
      // notDenText.setAttribute('popup', 'parent:#notholithocarpus')

      // Create a element, not den leaf container and set attributes (animation, id, etc.)
      var notDenContainer = document.createElement('a-entity');
      notDenContainer.setAttribute('id', 'notholithocarpus2'+3)
      // notDenContainer.setAttribute('animation__MV','property: position; to: -3 -1 4; dir: normal; dur: 20000; loop: true')
      notDenContainer.setAttribute('position',{x: 3, y: 4, z: 1})

      //Add these to container once they look good in scene
      notDenContainer.appendChild(notDenLeaf)
      // notDenContainer.appendChild(notDenText)

      // TODO1:
      // create element leafText, and set attributes like above
      // create element leafContainer and set attributes like above (animation, id, etc.)
      // use appendChild to add leaf and leaf text to leafContainer
      // use appendChild to add leafContainer to sceneEl instead of the leaf (like below)

      sceneEl.appendChild(notDenContainer);

      // sceneEl.appendChild(notDenLeaf);
      // sceneEl.appendChild(notDenText);


      // TODO2: Make a basic for loop that prints random numbers to log -- once that is working, we can use those numbers to set random positions and duration for leaf animations
      //    randomNumber= getRandomNumber()
      //    console.log(randomNumber)
      //    for numbers in randomNumber {
      //  console.log(randomNumber)
      //}
      // TODO3: copy the above leaf adding code into the loop to make lots of leaves







    }
    });

  


//   This outermost entity is the container
//   <a-entity id="sequoia" animation__MV="property: position; to: -3 -1 4; dir: normal; dur: 20000; loop: true" position="3 4 1"> 
//     This entity is the leaf
//     <a-entity
//     geometry="primitive: plane; width: 2; height: 2"
    
//     material="src:#leaf 2; side:double; transparent: true; normalMap:#leaf 2 normal map; roughness:1"
//     animation__RX="property: object3D.rotation.x; to: 359.999; dur: 10000; easing: linear; loop: true"
//     animation__RY="property: object3D.rotation.y; to: 359.999; dur: 6000; easing: linear; loop: true"
//     animation__RZ="property: object3D.rotation.z; to: 359.999 ; dur: 8000; easing: linear; loop: true"  
//   >
//   </a-entity>
//
//   This entity is the text
//   <a-entity
//   text="value: Sequoia sempervirens; color: #FFD500; align: center"
//   look-at="#camera"
//   scale="2 2 2"
//   position= "0 0 1"
//   popup= "parent:#sequoia"
//   ></a-entity>
// </a-entity> <!-- end sequoia container-->



