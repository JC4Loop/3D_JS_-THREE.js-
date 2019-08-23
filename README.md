# 3D_JS_Logbook

Multiple web pages making use of THREE.JS to experiment with 3D graphics programming.

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

![screenshot](/screenshots/wm2dshapes.png)

###### Triangular prism and ball
This is meant to be a 3D version of the 2d shapes above, with the ball travelling through the three dimensions.
This needs work for the collision detection (attempting to complete this without use of the physics engine)

![screenshot](/screenshots/wmTriBlock.png)

### CreationGround.html

Consists of numerous 3D geometries, 3D octagon, shapes making up playground, and an imported model from blender.

![screenshot](/screenshots/cgFull.png)

![screenshot](/screenshots/cg3dOct.png)

![screenshot](/screenshots/cgBlenderCar.png)

![screenshot](/screenshots/cgPlayground.png)

![screenshot](/screenshots/cgBenches.png)