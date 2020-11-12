
console.log("hello")
AFRAME.registerComponent('popup', {
    schema: {
        parent: {type:"string"}
    },
    init: function () {
      // init is called when object is created
      console.log('popup: looks good')
  
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

      // if distance is less than three, change visible (leaf text) to false, otherwise set as true (show leaf text)
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

  //This is the way I want to add all the leaves (rather than in HTML) but I am getting an error with the animations. 

  function addLeaf(sceneEl, leafIndex) {
 //Create an entity, a notDen leaf
    var notDenLeaf = document.createElement('a-entity');
    notDenLeaf.setAttribute(
      'geometry', 
      'primitive: plane; width: 2; height: 2');

    // notDenLeaf.setAttribute('material', "src:#leaf_3; side:double; transparent: true; normalMap:#leaf_3_normal_map; roughness:1")
    notDenLeaf.setAttribute('material', 
      "src:#leaf_3; side:double; alphaTest: .9; transparent: false; normalMap:#leaf_3_normal_map; roughness:1")

    //notDenLeaf.setAttribute('animation',{property: "object3D.rotation.x", to: 359.999, dur: getRandomNumber(4000, 12000), easing: "linear", loop: true});
    
    notDenLeaf.setAttribute('animation',{
      property: "object3D.rotation.x", 
      to: 359.999, 
      dur: getRandomNumber(4000, 12000), 
      easing: "linear", 
      loop: true
    });
      
    notDenLeaf.setAttribute('animation__y',{
      property: "object3D.rotation.y", 
      to: 359.999, 
      dur: getRandomNumber(4000, 12000), 
      easing: "linear", 
      loop: true
    });

    notDenLeaf.setAttribute('animation__z',{
      property: "object3D.rotation.z", 
      to: 359.999, 
      dur: getRandomNumber(4000, 12000),
      easing: "linear", 
      loop: true
    });

    //notDenLeaf.setAttribute('animation__RY', 'property: object3D.rotation.y; to: 359.999; dur: 600; easing: linear; loop: true')
    //notDenLeaf.setAttribute('animation__RZ', 'property: object3D.rotation.z; to: 359.999 ; dur: 8000; easing: linear; loop: true')
    // Inspector: Uncaught TypeError: Cannot read property 'autoplay' of undefined --- when multiple animations

    // Create an element, notDen text
    var notDenText = document.createElement('a-entity');
    // Get: core:a-node:error Failure loading node:   TypeError: Cannot read property 'indexOf' of undefined
    notDenText.setAttribute('text', 'value:Notholithocarpus densiflorus; color:#FFD500; align:center')
    notDenText.setAttribute('look-at', '#camera')
    notDenText.setAttribute('scale', '2 2 2')
    notDenText.setAttribute('position', '0 0 1')
    notDenText.setAttribute('popup', 'parent:#notholithocarpus'+ leafIndex)


    // Create a element, not den leaf container and set attributes (animation, id, etc.)
    var notDenContainer = document.createElement('a-entity');
    notDenContainer.setAttribute('id', 'notholithocarpus'+ leafIndex)
    // notDenContainer.setAttribute('animation',{'property: position; to: -3 -1 4; dir: normal; dur: 20000; loop: true')
    var x_to= getRandomNumber(-20, 20)
    var y_to= -20
    var z_to= getRandomNumber(10, 20)
    notDenContainer.setAttribute('animation',{
      property: 'position',
      to: {
        x:x_to, 
        y:y_to, 
        z:z_to,
      },
      dir: 'normal', 
      dur: getRandomNumber(30000, 50000), 
      loop: true,
      })

    // notDenContainer.setAttribute('position',{x: 3, y: 4, z: 1})

    notDenContainer.setAttribute('position',{
      x: getRandomNumber(-40,40), 
      y: 30, 
      z: getRandomNumber(-40,20)
    })

    // use appendChild to add leaf and leaf text to the container
    notDenContainer.appendChild(notDenLeaf)
    notDenContainer.appendChild(notDenText)

  

    // use appendChild to add leafContainer to sceneEl 
    sceneEl.appendChild(notDenContainer);

    // sceneEl.appendChild(notDenLeaf);
    // sceneEl.appendChild(notDenText);
  }

  AFRAME.registerComponent('start', {
    schema: {type: 'string'},
  
    // This gets called after a-scene is loaded
    init: function () {
      var stringToLog = this.data;
      console.log(stringToLog);

      // Get the scene element
      var sceneEl = document.querySelector('a-scene');
      // sceneEl.renderer.sortObjects = true;
      var i;



  // this is the for loop that generates the many leaves and adds them to the sceneEl    
  for (i=0; i<1000; i++) {
   
    addLeaf(sceneEl, i);
  }

    }
    });