
  // Random number between min (inclusive) and max (exclusive)
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min; 
  }

  //this function generates the leaves 
  function addLeaf(sceneEl, leafIndex, imageSrc, normalMap, speciesName) {
 //Create an entity, a new leaf
    var newLeaf = document.createElement('a-entity');
    newLeaf.setAttribute('geometry', {
      primitive: 'plane',
      width: 3, 
      height: 3,
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
      dur: getRandomNumber(4000, 12000), // 
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


    // create an element, leafText for the species name
    var leafText = document.createElement('a-entity');
    leafText.setAttribute('text', 'value:'+ speciesName +'; color:#FFD500; align:center;font-family: "Inconsolata", monospace;')
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
      dur: getRandomNumber(20000, 80000), 
      loop: true,
      })
    // notDenContainer.setAttribute('position',{x: 3, y: 4, z: 1})

    leafContainer.setAttribute('position',{
      x: getRandomNumber(-40,40), 
      y: 19, 
      z: getRandomNumber(-40, 20)
    })
      // this is the event listener where the name is made visable when a leaf is tapped
      newLeaf.addEventListener('mousedown', function() {
        //overlay variable finds the element from the html, where the element is the text that has either the species name or the tap on leaf prompt
        var text_overlay= document.getElementById('text_overlay')
        text_overlay.innerText = speciesName;
        //This makes the leaf name visible over the leaf and it's hidden now
        // leafText.setAttribute('visible', true);

        //set timer so that name text disappears after a certain amount of time
        setTimeout(function(){text_overlay.innerText = "Identify a leaf by tapping on it.";}, 20000);


        //if you look at the console log you can see that a leaf was touched, even if the name doesn't pop up
        console.log('down '+speciesName+leafIndex);
      });

    // use appendChild to add leaf and leaf text to the container
    leafContainer.appendChild(newLeaf)
    leafContainer.appendChild(leafText)

  

    // use appendChild to add leafContainer to sceneEl 
    sceneEl.appendChild(leafContainer);

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

  // Array for the different leaf images and then generate a random number to select the index 
  var leafImages= [
    "#leaf_1", 
    "#leaf_2", 
    "#leaf_3",
    "#leaf_4",
    "#leaf_5", 
    "#leaf_6", 
    "#leaf_7",
    "#leaf_8",
    "#leaf_9", 
    "#leaf_10",
    "#leaf_11",
    "#leaf_12",
    "#leaf_13",
    "#leaf_14",
    "#leaf_15",
    "#leaf_16",
    "#leaf_17",
    "#leaf_18",
    "#leaf_19",
    "#leaf_20",
    "#leaf_21",
 
  ]

  var normalMap= [
    "#leaf_1_normal_map", 
    "#leaf_2_normal_map", 
    "#leaf_3_normal_map",
    "#leaf_4_normal_map",
    "#leaf_5_normal_map", 
    "#leaf_6_normal_map",
    "#leaf_7_normal_map",
    "#leaf_8_normal_map", 
    "#leaf_9_normal_map",
    "#leaf_10_normal_map",
    "#leaf_11_normal_map",
    "#leaf_12_normal_map",
    "#leaf_13_normal_map",
    "#leaf_14_normal_map",
    "#leaf_15_normal_map",
    "#leaf_16_normal_map",
    "#leaf_17_normal_map",
    "#leaf_18_normal_map",
    "#leaf_19_normal_map",
    "#leaf_20_normal_map",
    "#leaf_21_normal_map",

  ]

  var leafName=[
    "Sequoia sempervirens", 
    "Quercus kelloggii",
    "Notholithocarpus densiflorus",
    "Quercus kelloggii",
    "Notholithocarpus densiflorus",
    "Quercus douglasii",
    "Quercus douglasii",
    "Notholithocarpus densiflorus",
    "Umbellularia californica",    
    "Notholithocarpus densiflorus", 
    "Quercus douglasii",
    "Notholithocarpus densiflorus",
    "Umbellularia californica",
    "Quercus kelloggii",
    "Quercus douglasii",
    "Umbellularia californica",
    "Umbellularia californica",
    "unknown",
    "Umbellularia californica",
    "Quercus wislizeni",
    "Notholithocarpus densiflorus",
  ]

  // This is for debugging
  // for (i=0; i<leafImages.length; i++) {
      
  //     console.log("leaf index="+i + leafImages[i]+ normalMap[i]+ leafName[i])
  // }
   
  var numberOfLeaves=500
  
 // this is the for loop that generates the many leaves and adds them to the sceneEl    
  for (i=0; i<numberOfLeaves; i++) {
  rindex = Math.floor(getRandomNumber(0,21))
    
    addLeaf(sceneEl, i, leafImages[rindex], normalMap[rindex], leafName[rindex])

  }

    }
    });