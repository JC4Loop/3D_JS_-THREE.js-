# 3D_JS_Logbook

Multiple web pages making use of THREE.JS to experiment with 3D graphics programming.\
All THREE.js libraries that are used are included in the js/doob/ folder.

### WheelMovements.html
Consists of circular meshes moving while rotating whilst corresponding to the length of movement equal to the circumference.

![screenshot](/screenshots/wmFull.png)

###### Wheel inbetween blocks
The wheel object is surrounded by four blocks. Both the translucent blocks of the front and back are equal in length to the wheels circumference.\
When the wheel moves, it will eventually come in to contact with either the block on the left or right side. This will stop the movement and after a pause will continue moving in the opposite direction. Wheel will rotate exactly 360 degrees.

![screenshot](/screenshots/wmWheelR.png)
![screenshot](/screenshots/wmWheelL.png)

###### 2D geometrey (Triangle and circle, collision detection)
Two dimensional shapes are created and placed in the background of the area, all have only front faces.\
Circles will fall down the y axis and when in contact with the triangle, its movement will change, giving the animation of each circle rolling down the triangle.\
Code has been developed to handle movement if the wheel hits the top point of the triangle, and have it fall to the left or the right of that point.\

Movement of the second and third circles (the two front circles) across the triangle hypotenuse, are not consistenly the same, after so many frames the circle movement will drop down and then continue a diagonal movement. I believe this is because of a remainder value not being read when diagonal movement is calculated.

![screenshot](/screenshots/wm2dShapes.png)

###### Triangular prism and ball
This is meant to be a 3D version of the 2d shapes above, with the ball travelling through the three dimensions.
This needs work for the collision detection (attempting to complete this without use of the physics engine)

![screenshot](/screenshots/wmTriBlock.png)

### CreationGround.html

Consists of numerous 3D geometries, 3D octagon, shapes making up playground, and an imported model from blender.

![screenshot](/screenshots/cgFull.png)

###### 3dOctagon
An object consisting of 26 seperate mesh shapes to form a three dimensional shape similar to a two dimensional octagon.
There are three different types of geomentry; 6 standard cuboids, 12 custom cuboids designed to fit the standard non diaonal cuboids, and six custom three dimensional triangles.\
Object is made of seperate meshes to allow for animation of separating from other parts, independant movement of each mesh.\
This is done by pressing the *T* key.\
Boolean values are used for each mesh to know when to start moving.

![screenshot](/screenshots/cg3dOct.png)

###### Car object
An object consisting of an imported *.glb* file (exported from blender) and cylinders to make up the wheels.\
Duplicating the code in *WheelMovements.html* the wheels (cylinders) will rotate 360 degrees for every length moved that is equal to the wheels circumference.\
The *glb* file has been created in blender with an image of the blender logo used for the car bonnets material.

![screenshot](/screenshots/cgBlenderCar.png)

###### Playground
This is an object which consists of many other objects. Meshes from the *THREE.js* library have been used to create all geometry.\
Objects include representation of a swing, merry go round, benches and lampposts.\
Images for textures have been used.

The playground object is surrounded by four walls (not including the plane) that make up a skybox for the background; however a sixth face is not included in order for the camera to view the playground from outside the skybox.

![screenshot](/screenshots/cgPlayground.png)