var THREE;

function initExternalThree(t){
    THREE = t;
}

function custom_Oct3d(){
			this.object = new THREE.Object3D();
			var bg65wMat = new THREE.MeshLambertMaterial({ color: 0x44ffff });
			var blue40wMat = new THREE.MeshLambertMaterial({ color: 0x0000cc });
			var sizep875 = 0.875;
			this.centreSquares = getCentreSquares();
			this.diagonalCubes = getDiagonalCubes();
			this.triangles = getOct3dTriangles();
			this.transformRequest = false;
			this.transformOut = true; //oct3d is in closed state, so first transform will be outwards
			position3dOctPieces(this.centreSquares,this.diagonalCubes,this.triangles, sizep875 / 2);
			for (var i = 0; i < 12; i++){
				this.object.add(this.diagonalCubes[i]);
                if (i < 8){
                	this.object.add(this.triangles[i]);
                	if (i < 6){
                		this.object.add(this.centreSquares[i]);
                	}
                }
            }
         	
         	this.addToScene = function(s){
         		s.add(this.object);
         	}
         	this.transform = function(){
         		if (this.transformRequest){
         			var finished;
         			
                    if (this.transformOut === true){
                        finished = transform3dOct(this.centreSquares, this.diagonalCubes, this.triangles,true);
                    } else {
                        finished = transform3dOct(this.centreSquares, this.diagonalCubes, this.triangles,false);
                    } 
                    if (finished === true){
                        this.transformRequest = false;
                        this.transformOut = !this.transformOut;
                    }
         		}
         	}

         	
			function getCentreSquares(){
				cSquares = [];
				var grey75wMat = new THREE.MeshLambertMaterial({ color: 0xbfbfbf });

                var sizep875 = 0.875;
                centreSquareGeo = new THREE.BoxGeometry( 2.5, 2.5, sizep875);
                for (var i = 0; i < 6; i++){
                    var cSquare = new THREE.Mesh(centreSquareGeo,grey75wMat);
                    cSquare.castShadow = true;
                    cSquares.push(cSquare);
                }
                return cSquares;
			}
			
			function getDiagonalCubes(){
				var dCubes = [];
				for (var i = 0; i < 12; i++){
					dCubes.push(createDiagonalCube(bg65wMat));
				}
				return dCubes;
				function createDiagonalCube(material){
					var coOrds = [-3,-2.125,-1.25,1.25,2.125,3];
					var points = [
                    	[coOrds[3],coOrds[3],coOrds[0]],
        	            [coOrds[3],coOrds[3],coOrds[1]],
        	            [coOrds[5],coOrds[3],coOrds[2]],
        	            [coOrds[4],coOrds[3],coOrds[2]], 
        	            [coOrds[3],coOrds[2],coOrds[0]],// outer 4
        	            [coOrds[3],coOrds[2],coOrds[1]], 
        	            [coOrds[5],coOrds[2],coOrds[2]], // outer 6
        	            [coOrds[4],coOrds[2],coOrds[2]]
        	        ];
        	        var faces = [
       		             [0,2,4],
       		             [6,4,2],
       		             [2,3,6],
       		             [7,6,3],
       	    		     [4,1,0],
           		         [1,4,5],
           		         [5,3,1],
           		         [3,5,7],
           		         [0,1,2],
           		         [3,2,1],
           		         [6,5,4],
           	        	 [5,6,7]
               	 	];
                	var customShape = createCustomShape(points,faces,material);
                    customShape.castShadow = true;
                	return customShape;
				}
			} // end getDiagonalCubes()
			function getOct3dTriangles(){
				var triangles = [];
				for (var i = 0; i < 8; i++){
					triangles.push(createTriangleFit(blue40wMat));
				}
				return triangles;

				function createTriangleFit(material){
					var geom = new THREE.Geometry();
					geom.vertices.push(
                    	new THREE.Vector3(1.25 ,3    ,-1.25),    // 0 outer
                   		new THREE.Vector3(1.25 ,2.125,-1.25),
                    	new THREE.Vector3(1.25 ,1.25 ,-3),      // 2 outer
                    	new THREE.Vector3(1.25 ,1.25 ,-2.125),
                    	new THREE.Vector3(3    ,1.25 ,-1.25),   // 4 outer
                    	new THREE.Vector3(2.125,1.25 ,-1.25)
                    );
                	geom.faces.push(       
                        new THREE.Face3(4,2,0), //outer face
                        new THREE.Face3(1,3,5), //inner face
                        
                        new THREE.Face3(1,2,3), 
                        new THREE.Face3(2,1,0),
                       
                        new THREE.Face3(0,1,4),
                        new THREE.Face3(5,4,1),
                        
                        new THREE.Face3(4,3,2),
                        new THREE.Face3(3,4,5)
                        );
                	geom.computeFaceNormals();
                
                	customShape = new THREE.Mesh( geom, material );
                    customShape.castShadow = true;
                    return customShape;      
            	}
			}	
		} // end customOct3d

        function createCustomShape(points,faces,material){
            var geom = new THREE.Geometry();
            for (var i = 0; i < points.length; i++){
                geom.vertices.push(new THREE.Vector3(points[i][0],points[i][1],points[i][2]));
            }
            for (var i = 0; i < faces.length; i++){
                geom.faces.push(new THREE.Face3(faces[i][0],faces[i][1],faces[i][2]));
            }
            geom.computeFaceNormals();
            customShape = new THREE.Mesh( geom, material );
            return customShape;
        }


function position3dOctPieces(oct3dCentreSquares,diagonalCubes,oct3dTriangles, sizepHalf){
    oct3dCentreSquares[0].position.set(0,0, -3 + (sizepHalf));
                oct3dCentreSquares[1].position.set(0,0, 3 -  (sizepHalf));
                oct3dCentreSquares[2].position.set(3 - (sizepHalf),0, 0);
                oct3dCentreSquares[2].rotation.y = 0.5 * Math.PI; //1
                oct3dCentreSquares[3].position.set(-3 + (sizepHalf),0, 0); //2
                oct3dCentreSquares[3].rotation.y = 0.5 * Math.PI; //2
                oct3dCentreSquares[4].rotation.x = 0.5 * Math.PI; //3
                oct3dCentreSquares[4].position.set(0,3 - (sizepHalf),0); //3
                oct3dCentreSquares[5].rotation.x = -0.5 * Math.PI; //4
                oct3dCentreSquares[5].position.set(0,-3 + (sizepHalf),0); //4
                diagonalCubes[1].rotation.y = -0.5 * Math.PI;
                diagonalCubes[2].rotation.y = 0.5 * Math.PI;
                diagonalCubes[3].rotation.y = Math.PI;
                diagonalCubes[4].rotation.z = 0.5 * Math.PI;
                diagonalCubes[5].rotation.z = 0.5 * Math.PI;
                diagonalCubes[5].rotation.y = 0.5 * Math.PI;
                diagonalCubes[6].rotation.z = 0.5 * Math.PI;
                diagonalCubes[6].rotation.y = -0.5 * Math.PI;
                diagonalCubes[7].rotation.z = 0.5 * Math.PI;
                diagonalCubes[7].rotation.y = Math.PI;
                diagonalCubes[8].rotation.z = -0.5 * Math.PI;
                diagonalCubes[9].rotation.z = -0.5 * Math.PI;
                diagonalCubes[9].rotation.y = 0.5 * Math.PI;
                diagonalCubes[10].rotation.z = -0.5 * Math.PI;
                diagonalCubes[10].rotation.y = -0.5 * Math.PI;
                diagonalCubes[11].rotation.z = -0.5 * Math.PI;
                diagonalCubes[11].rotation.y = Math.PI;
                
                oct3dTriangles[1].rotation.y = 0.5 * Math.PI;
          
                oct3dTriangles[2].rotation.y = -0.5 * Math.PI;
        
                oct3dTriangles[3].rotation.y = Math.PI;
           
                oct3dTriangles[4].rotation.z = Math.PI;
      
                oct3dTriangles[5].rotation.y = 0.5 * Math.PI;
                oct3dTriangles[5].rotation.z = Math.PI;
        
                oct3dTriangles[6].rotation.y = -0.5 * Math.PI;
                oct3dTriangles[6].rotation.z = Math.PI;
        
                oct3dTriangles[7].rotation.y = Math.PI;
                oct3dTriangles[7].rotation.z = Math.PI;
}


function transform3dOct(centreSquares, diagCubes, triangles, transformOut) {
    // 6 centreSquares + 12 diagCubes + 8 triangles;
    var boolsHalfWay = [];
    var boolsFinished = [];
    for (var i = 0; i < 26; i++) {
        boolsHalfWay[i] = false;
        boolsFinished[i] = false;
    }
    var minPos = -5;
    var maxPos = 5;
    var maxX = maxPos;
    var minX = minPos;
    var maxY = maxPos;
    var minY = minPos;
    var maxZ = maxPos;
    var minZ = minPos;
    var moveValue = 0.025;

    if (transformOut === true) {
        if (centreSquares[5].position.y >= minY - 3) {
            centreSquares[5].position.y -= moveValue;
        } else {
            boolsFinished[5] = true;
        }
    } else {
        if (centreSquares[5].position.y < -3 + (0.875 / 2)) {
            centreSquares[5].position.y += moveValue;
            if (centreSquares[5].position.y >= -4.75 + (0.875 / 2)) {
                boolsHalfWay[5] = true;
            }
        } else {
            boolsFinished[5] = true;
        }
    }

    if (transformOut === true) {
        if (centreSquares[4].position.y <= maxY + 3) {
            centreSquares[4].position.y += moveValue;
        } else {
            boolsFinished[4] = true;
        }
    } else {
        if (centreSquares[4].position.y >= 3 - (0.875 / 2)) {
            if (boolsHalfWay[5] === true || boolsFinished[5] === true) {
                centreSquares[4].position.y -= moveValue;
                if (centreSquares[4].position.y < 6) {
                    boolsHalfWay[4] = true;
                    //alert(centreSquares[4].position.y);
                }
            }
        } else {
            boolsFinished[4] = true;
        }
    }

    if (transformOut === true) {
        if (centreSquares[0].position.z >= minZ - 3) {
            centreSquares[0].position.z -= moveValue;
        } else {
            boolsFinished[0] = true;
        }
    } else {
        if (centreSquares[0].position.z <= -3 + (0.875 / 2)) {
            if (((boolsHalfWay[4] === true) || (boolsFinished[4] === true))) {
                centreSquares[0].position.z += moveValue;
            }
        } else {
            boolsFinished[0] = true;
        }
    }

    if (transformOut === true) {
        if (centreSquares[1].position.z <= maxZ + 3) {
            centreSquares[1].position.z += moveValue;
        } else {
            boolsFinished[1] = true;
        }
    } else {
        if (centreSquares[1].position.z >= 3 - (0.875 / 2)) {
            if ((boolsHalfWay[4] === true || boolsFinished[4] === true)) {
                centreSquares[1].position.z -= moveValue;
            }
        } else {
            boolsFinished[1] = true;
        }
    }

    if (transformOut === true) {
        if (centreSquares[2].position.x <= maxX + 3) {
            centreSquares[2].position.x += moveValue;
        } else {
            boolsFinished[2] = true;
        }
    } else {
        if (centreSquares[2].position.x >= 3 - (0.875 / 2)) {
            if (boolsHalfWay[4] === true || boolsFinished[4] === true) {
                centreSquares[2].position.x -= moveValue;
            }
        } else {
            boolsFinished[2] = true;
        }
    }

    if (transformOut === true) {
        if (centreSquares[3].position.x >= minX - 3) {
            centreSquares[3].position.x -= moveValue;
        } else {
            boolsFinished[3] = true;
        }
    } else {
        if (centreSquares[3].position.x <= -3 + (0.875 / 2)) {
            if (boolsHalfWay[4] === true || boolsFinished[4] === true) {
                centreSquares[3].position.x += moveValue;
            }
        } else {
            boolsFinished[3] = true;
        }
    }


    if (transformOut === true) {
        if (diagCubes[0].position.x <= maxX) {
            diagCubes[0].position.x += moveValue;
            diagCubes[0].position.z -= moveValue;
        } else {
            boolsFinished[6] = true;
        }
    } else {
        if (diagCubes[0].position.x > 0) {
            diagCubes[0].position.x -= moveValue;
        }
        if (diagCubes[0].position.z < 0) {
            diagCubes[0].position.z += moveValue;
        }
        if (diagCubes[0].position.x < 0 && diagCubes[0].position.z >= 0) {
            boolsFinished[6] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[1].position.x < maxX) {
            diagCubes[1].position.x += moveValue;
            diagCubes[1].position.z += moveValue;
        } else {
            boolsFinished[7] = true;
        }
    } else {
        if (diagCubes[1].position.x > 0) {
            diagCubes[1].position.x -= moveValue;
        }
        if (diagCubes[1].position.z > 0) {
            diagCubes[1].position.z -= moveValue;
        }
        if (diagCubes[1].position.x <= 0 && diagCubes[1].position.z <= 0) {
            boolsFinished[7] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[2].position.x >= minX) {
            diagCubes[2].position.x -= moveValue;
            diagCubes[2].position.z -= moveValue;
        } else {
            boolsFinished[8] = true;
        }
    } else {
        if (diagCubes[2].position.x < 0) {
            diagCubes[2].position.x += moveValue;
        }
        if (diagCubes[2].position.z < 0) {
            diagCubes[2].position.z += moveValue;
        }
        if (diagCubes[2].position.x >= 0 && diagCubes[2].position.z >= 0) {
            boolsFinished[8] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[3].position.x >= minX) {
            diagCubes[3].position.x -= moveValue;
            diagCubes[3].position.z += moveValue;
        } else {
            boolsFinished[9] = true;
        }
    } else {
        if (diagCubes[3].position.x < 0) {
            diagCubes[3].position.x += moveValue;
        }
        if (diagCubes[3].position.z > 0) {
            diagCubes[3].position.z -= moveValue;
        }
        if (diagCubes[3].position.x >= 0 && diagCubes[3].position.z <= 0) {
            boolsFinished[9] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[4].position.y <= maxY) {
            diagCubes[4].position.z -= moveValue;
            diagCubes[4].position.y += moveValue;
        } else {
            boolsFinished[10] = true;
        }
    } else {
        if (diagCubes[4].position.y > 0) {
            diagCubes[4].position.y -= moveValue;
        }
        if (diagCubes[4].position.z < 0) {
            diagCubes[4].position.z += moveValue;
        }
        if (diagCubes[4].position.y <= 0 && diagCubes[4].position.z >= 0) {
            boolsFinished[10] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[5].position.y <= maxY) {
            diagCubes[5].position.x -= moveValue;
            diagCubes[5].position.y += moveValue;
        } else {
            boolsFinished[11] = true;
        }
    } else {
        if (diagCubes[5].position.x < 0) {
            diagCubes[5].position.x += moveValue;
        }
        if (diagCubes[5].position.y > 0) {
            diagCubes[5].position.y -= moveValue;
        }
        if (diagCubes[5].position.x >= 0 && diagCubes[5].position.y <= 0) {
            boolsFinished[11] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[6].position.y <= maxY) {
            diagCubes[6].position.x += moveValue;
            diagCubes[6].position.y += moveValue;
        } else {
            boolsFinished[12] = true;
        }
    } else {
        if (diagCubes[6].position.x > 0) {
            diagCubes[6].position.x -= moveValue;
        }
        if (diagCubes[6].position.y > 0) {
            diagCubes[6].position.y -= moveValue;
        }
        if (diagCubes[6].position.x <= 0 && diagCubes[6].position.y <= 0) {
            boolsFinished[12] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[7].position.y <= maxY) {
            diagCubes[7].position.z += moveValue;
            diagCubes[7].position.y += moveValue;
        } else {
            boolsFinished[13] = true;
        }
    } else {
        if (diagCubes[7].position.y > 0) {
            diagCubes[7].position.y -= moveValue;
        }
        if (diagCubes[7].position.z > 0) {
            diagCubes[7].position.z -= moveValue;
        }
        if (diagCubes[7].position.y <= 0 && diagCubes[7].position.z <= 0) {
            boolsFinished[13] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[8].position.y >= minY) {
            diagCubes[8].position.z -= moveValue;
            diagCubes[8].position.y -= moveValue;
        } else {
            boolsFinished[14] = true;
        }
    } else {
        if (diagCubes[8].position.y < 0) {
            diagCubes[8].position.y += moveValue;
        }
        if (diagCubes[8].position.z < 0) {
            diagCubes[8].position.z += moveValue;
        }
        if (diagCubes[8].position.y >= 0 && diagCubes[8].position.z >= 0) {
            boolsFinished[14] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[9].position.y >= minY) {
            diagCubes[9].position.x -= moveValue;
            diagCubes[9].position.y -= moveValue;
        } else {
            boolsFinished[15] = true;
        }
    } else {
        if (diagCubes[9].position.x < 0) {
            diagCubes[9].position.x += moveValue;
        }
        if (diagCubes[9].position.y < 0) {
            diagCubes[9].position.y += moveValue;
        }
        if (diagCubes[9].position.x >= 0 && diagCubes[9].position.y >= 0) {
            boolsFinished[15] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[10].position.y >= minY) {
            diagCubes[10].position.x += moveValue;
            diagCubes[10].position.y -= moveValue;
        } else {
            boolsFinished[16] = true;
        }
    } else {
        if (diagCubes[10].position.x > 0) {
            diagCubes[10].position.x -= moveValue;
        }
        if (diagCubes[10].position.y < 0) {
            diagCubes[10].position.y += moveValue;
        }
        if (diagCubes[10].position.x <= 0 && diagCubes[10].position.y >= 0) {
            boolsFinished[16] = true;
        }
    }

    if (transformOut === true) {
        if (diagCubes[11].position.y >= minY) {
            diagCubes[11].position.z += moveValue;
            diagCubes[11].position.y -= moveValue;
        } else {
            boolsFinished[17] = true;
        }
    } else {
        if (diagCubes[11].position.y < 0) {
            diagCubes[11].position.y += moveValue;
        }
        if (diagCubes[11].position.z > 0) {
            diagCubes[11].position.z -= moveValue;
        }
        if (diagCubes[11].position.y >= 0 && diagCubes[11].position.z <= 0) {
            boolsFinished[17] = true;
        }
    }

    if (transformOut === true) {
        if (triangles[0].position.x <= maxX) {
            triangles[0].position.x += moveValue;
            triangles[0].position.y += moveValue;
            triangles[0].position.z -= moveValue;
        } else {
            boolsFinished[18] = true;
        }
    } else {
        if (triangles[0].position.x > 0) {
            triangles[0].position.x -= moveValue;
        }
        if (triangles[0].position.y > 0) {
            triangles[0].position.y -= moveValue;
        }
        if (triangles[0].position.z < 0) {
            triangles[0].position.z += moveValue;
        }
        if (triangles[0].position.x <= 0 && triangles[0].position.y <= 0 && triangles[0].position.z >= 0) {
            boolsFinished[18] = true;
        }
    }

    if (transformOut === true) {
        if (triangles[1].position.y <= maxY) {
            triangles[1].position.x -= moveValue;
            triangles[1].position.y += moveValue;
            triangles[1].position.z -= moveValue;
        } else {
            boolsFinished[19] = true;
        }
    } else {
        if (triangles[1].position.x < 0) {
            triangles[1].position.x += moveValue;
        }
        if (triangles[1].position.y > 0) {
            triangles[1].position.y -= moveValue;
        }
        if (triangles[1].position.z < 0) {
            triangles[1].position.z += moveValue;
        }
        if (triangles[1].position.x >= 0 && triangles[1].position.y <= 0 && triangles[1].position.z >= 0) {
            boolsFinished[19] = true;
        }
    }

    if (transformOut === true) {
        if (triangles[2].position.y <= maxY) {
            triangles[2].position.x += moveValue;
            triangles[2].position.y += moveValue;
            triangles[2].position.z += moveValue;
        } else {
            boolsFinished[20] = true;
        }
    } else {
        if (triangles[2].position.x > 0) {
            triangles[2].position.x -= moveValue;
        }
        if (triangles[2].position.y > 0) {
            triangles[2].position.y -= moveValue;
        }
        if (triangles[2].position.z > 0) {
            triangles[2].position.z -= moveValue;
        }
        if (triangles[2].position.x <= 0 && triangles[2].position.y <= 0 && triangles[2].position.z <= 0) {
            boolsFinished[20] = true;
        }
    }

    if (transformOut === true) {
        if (triangles[3].position.y <= maxY) {
            triangles[3].position.x -= moveValue;
            triangles[3].position.y += moveValue;
            triangles[3].position.z += moveValue;
        } else {
            boolsFinished[21] = true;
        }
    } else {
        if (triangles[3].position.x < 0) {
            triangles[3].position.x += moveValue;
        }
        if (triangles[3].position.y > 0) {
            triangles[3].position.y -= moveValue;
        }
        if (triangles[3].position.z > 0) {
            triangles[3].position.z -= moveValue;
        }
        if (triangles[3].position.x >= 0 && triangles[3].position.y <= 0 && triangles[3].position.z <= 0) {
            boolsFinished[21] = true;
        }
    }

    if (transformOut === true) {
        if (triangles[4].position.y >= minY) {
            triangles[4].position.x -= moveValue;
            triangles[4].position.y -= moveValue;
            triangles[4].position.z -= moveValue;
        } else {
            boolsFinished[22] = true;
        }
    } else {
        if (triangles[4].position.x < 0) {
            triangles[4].position.x += moveValue;
        }
        if (triangles[4].position.y < 0) {
            triangles[4].position.y += moveValue;
        }
        if (triangles[4].position.z < 0) {
            triangles[4].position.z += moveValue;
        }
        if (triangles[4].position.x >= 0 && triangles[4].position.y >= 0 && triangles[4].position.z >= 0) {
            boolsFinished[22] = true;
        }
    }

    if (transformOut === true) {
        if (triangles[5].position.y >= minY) {
            triangles[5].position.x -= moveValue;
            triangles[5].position.y -= moveValue;
            triangles[5].position.z += moveValue;
        } else {
            boolsFinished[23] = true;
        }
    } else {
        if (triangles[5].position.x < 0) {
            triangles[5].position.x += moveValue;
        }
        if (triangles[5].position.y < 0) {
            triangles[5].position.y += moveValue;
        }
        if (triangles[5].position.z > 0) {
            triangles[5].position.z -= moveValue;
        }
        if (triangles[5].position.x >= 0 && triangles[5].position.y >= 0 && triangles[5].position.z <= 0) {
            boolsFinished[23] = true;
        }
    }

    if (transformOut === true) {
        if (triangles[6].position.y >= minY) {
            triangles[6].position.x += moveValue;
            triangles[6].position.y -= moveValue;
            triangles[6].position.z -= moveValue;
        } else {
            boolsFinished[24] = true;
        }
    } else {
        if (triangles[6].position.x > 0) {
            triangles[6].position.x -= moveValue;
        }
        if (triangles[6].position.y < 0) {
            triangles[6].position.y += moveValue;
        }
        if (triangles[6].position.z < 0) {
            triangles[6].position.z += moveValue;
        }
        if (triangles[6].position.x <= 0 && triangles[6].position.y >= 0 && triangles[6].position.z >= 0) {
            boolsFinished[24] = true;
        }
    }

    if (transformOut === true) {
        if (triangles[7].position.y >= minY) {
            triangles[7].position.x += moveValue;
            triangles[7].position.y -= moveValue;
            triangles[7].position.z += moveValue;
        } else {
            boolsFinished[25] = true;
        }
    } else {
        if (triangles[7].position.x > 0) {
            triangles[7].position.x -= moveValue;
        }
        if (triangles[7].position.y < 0) {
            triangles[7].position.y += moveValue;
        }
        if (triangles[7].position.z > 0) {
            triangles[7].position.z -= moveValue;
        }
        if (triangles[7].position.x <= 0 && triangles[7].position.y >= 0 && triangles[7].position.z <= 0) {
            boolsFinished[25] = true;
        }
    }


    var boolAllTrue = true;
    for (var i = 0; i < 26; i++) {
        if (boolsFinished[i] === false) { // if item found to be incomplete
            boolAllTrue = false;        // all true is false
            break;
        }

        // if 25th bool is true then all segment movements are complete, so change transform out
        if (i === 25 && boolsFinished[i] === true) {

            transformOut = !transformOut;
        }

    }

    return boolAllTrue;
}