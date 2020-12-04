
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
      // const distanceToCamera = objPos.distanceTo(cameraPos)
      //console.log(distanceToCamera)
      //console.log(objPos, cameraPos)

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

  //this function generates the leaves 
  function addLeaf(sceneEl, leafIndex, imageSrc, normalMap, speciesName) {
 //Create an entity, a new leaf
    var newLeaf = document.createElement('a-entity');
    newLeaf.setAttribute('geometry', {
      primitive: 'box',
      width: 2, 
      height: 2,
    })
      

    // setting the leaf image and corresponding normal map
    newLeaf.setAttribute('material', {
      src:imageSrc,
      side:"double",
      alphaTest:.9, 
      transparent: false,
      normalMap:normalMap,
      roughness:1,
    })

   // setting the x axis rotation of the leaf 
    newLeaf.setAttribute('animation',{
      property: "object3D.rotation.x", 
      to: 359.999, 
      dur: getRandomNumber(4000, 12000), 
      easing: "linear", 
      loop: true
    });
      
   // setting the y axis rotation of the leaf  
    newLeaf.setAttribute('animation__y',{
      property: "object3D.rotation.y", 
      to: 359.999, 
      dur: getRandomNumber(11000, 12000), // TODO change 10000 back to 40000
      easing: "linear", 
      loop: true
    });

  // setting the z axis rotation of the leaf 
    newLeaf.setAttribute('animation__z',{
      property: "object3D.rotation.z", 
      to: 359.999, 
      dur: getRandomNumber(4000, 12000),
      easing: "linear", 
      loop: true
    });

    //newLeaf.setAttribute('animation__RY', 'property: object3D.rotation.y; to: 359.999; dur: 600; easing: linear; loop: true')
    //newLeaf.setAttribute('animation__RZ', 'property: object3D.rotation.z; to: 359.999 ; dur: 8000; easing: linear; loop: true')


    // create an element, leafText for the species name
    var leafText = document.createElement('a-entity');
    leafText.setAttribute('text', 'value:'+ speciesName +'; color:#FFD500; align:center')
    leafText.setAttribute('look-at', '#camera')
    leafText.setAttribute('scale', '4 4 4')
    leafText.setAttribute('position', '0 0 1')
    leafText.setAttribute('visible', false)
    //notDenText.setAttribute('popup', 'parent:#notholithocarpus'+ leafIndex)


    // Create a element, leafContainer and set attributes (animation, id, etc.)
    var leafContainer = document.createElement('a-entity');
    leafContainer.setAttribute('id', 'notholithocarpus'+ leafIndex)
    // leafContainer.setAttribute('animation',{'property: position; to: -3 -1 4; dir: normal; dur: 20000; loop: true')
    var x_to= getRandomNumber(-20, 20)
    var y_to= -20
    var z_to= getRandomNumber(10, 20)
    leafContainer.setAttribute('animation',{
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

      // this is the event listener where the name is supposed to be made visable on touch but it isn't really working.
      newLeaf.addEventListener('mousedown', function() {
        leafText.setAttribute('visible', true);
        //leafNameDiv.innerText = speciesName; //TODO: create leafe name div in html and give it an ID. Use document.getElementById(..) to get it here

        //set timer so that name text disappears after a certain amount of time
        setTimeout(function(){ leafText.setAttribute('visible', false);  }, 1000);

        //if you look at the console log you can see that a leaf was touched, even if the name doesn't pop up
        console.log('down '+speciesName+leafIndex);
      });

      // notDenLeaf.addEventListener('mouseleave', function() {
      //   //notDenText.setAttribute('visible', false);
      //   console.log('up '+speciesName+leafIndex);
      // });

    // notDenContainer.setAttribute('position',{x: 3, y: 4, z: 1})

    leafContainer.setAttribute('position',{
      x: getRandomNumber(-40,40), 
      y: 10, 
      z: getRandomNumber(-40,20)
    })
    // todo restore y: to 30 to have leaves start higher up

    // use appendChild to add leaf and leaf text to the container
    leafContainer.appendChild(newLeaf)
    leafContainer.appendChild(leafText)

  

    // use appendChild to add leafContainer to sceneEl 
    sceneEl.appendChild(leafContainer);

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

  // I am going to create an array for the different leaf images and then generate a random number to select the index 
  // TODO var leafImages = ['#leaf_3', '#leaf_b' ...]
  // this is the for loop that generates the many leaves and adds them to the sceneEl    
  for (i=0; i<100; i++) {
    // TODO rindex = Math.floor(getRandomNumber(0,20))
    
    addLeaf(sceneEl, i, "#leaf_3", "#leaf_3_normal_map", "Notholithocarpus densiflorus");

    var leaf= [
      "#leaf_1", 
      "#leaf_2"

    ]

    var normalMap= [

    ]

    var leafName=[

    ]
    
    //addLeaf(sceneEl, i, leafImages[10], nmaps[10], speciesNames[10]) // but use rindex instead of 10
  }

    }
    });