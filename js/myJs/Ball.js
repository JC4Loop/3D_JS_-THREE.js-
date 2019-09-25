function Ball(radius){
	this.mesh = null;
	this.radius = radius;
	this.tdCircumference = 2 * Math.PI * radius;
	this.x = 0, this.y = 0, this.z = 0;
	this.origMoveValueX = 0, this.origMoveValueY = -0.3, this.origMoveValueZ = 0;
	this.moveValueX = this.origMoveValueX, this.moveValueY = this.origMoveValueY, this.moveValueZ = this.origMoveValueZ;
	// mesh is rotated 45 degrees so that rotation on the z axis takes in to account the y rotation
	this.setMesh = function(m){this.mesh = m; this.mesh.rotation.y = 45 * Math.PI / 180;}
	this.setX = function(posX){
		this.mesh.position.x = posX;
		this.x = posX;
	}
	this.setY = function(posY){
		this.mesh.position.y = posY;
		this.y = posY;
	}
	this.setZ = function(posZ){
		this.mesh.position.z = posZ;
		this.z = posZ;
	}
	this.move = function(otherObj){
		let bCollision = false;
		if (this.collisionWith(otherObj)){
			bCollision = true; 
		}
		if (bCollision == false){ // if no collision with any objects set original movementVal
			this.moveValueX = this.origMoveValueX;
			this.moveValueY = this.origMoveValueY;
			this.moveValueZ = this.origMoveValueZ;
		}
		if (this.y < -50){
			this.setX(90);
			this.setY(70);
			this.setZ(-80);
		}
		this.setX(this.x + this.moveValueX);
		this.setY(this.y + this.moveValueY);
		this.setZ(this.z + this.moveValueZ);
	}
	this.get45 = function(otherObj){
		let p1X = otherObj.points[0][0];
		//let p1Y = otherObj.points[0][1];
		let p1Z = otherObj.points[0][2];
		let p2X = otherObj.points[5][0];
		//let p2Y = otherObj.points[5][1];
		let p2Z = otherObj.points[5][2];
		let slopeDeg = otherObj.slopeDeg;
		let angleDegXZ = (-Math.atan2(p2Z - p1Z, p2X - p1X) * 180 / Math.PI);

		let xNew = (this.radius * Math.cos(slopeDeg * Math.PI / 180)) + (0 * Math.sin(slopeDeg * Math.PI / 180));
		let yNew = (this.radius * -Math.sin(slopeDeg * Math.PI / 180)) + (0 * Math.cos(slopeDeg * Math.PI / 180));
		//alert("xNew " + xNew + " ynew " + yNew);
		//alert(angleDegXZ);
		let xNew2 = (xNew * Math.cos(otherObj.rotationY * Math.PI / 180));
		//let yNew = 0 + tPoints[i][1] + 0;
		let zNew = (xNew * -Math.sin(otherObj.rotationY * Math.PI / 180));
		//alert("xNew2 " + xNew2 + " ynew " + yNew + " znew " + zNew);

		xNew2 += this.x;
		yNew += this.y;
		zNew += this.z;
	
		return {x: xNew2, y: yNew, z: zNew, angleXY: slopeDeg, angleXZ: otherObj.rotationY};
	}
	this.collisionWith = function(otherObj){ // collision with TriBlock
		let bCollision = false;
		if (!(this.y - radius > otherObj.yTop || this.y + radius < otherObj.yBottom)){
			if (!(this.x - radius > otherObj.xRight || this.x + radius < otherObj.xLeft)){
				if (!(this.z - radius > otherObj.zClose || this.z + radius < otherObj.zFar)){
					var ball90Point = this.get45(otherObj);
					//alert("x " + ball90Point.x + " y " + ball90Point.y + " z " + ball90Point.z);
					//alert(ball90Point.angleXY + " " + ball90Point.angleXZ);
					let tangent = Math.tan(ball90Point.angleXZ * (Math.PI / 180));
					//alert('tangent is ' + tangent);
					let x2 = ball90Point.x + 2;
					let z2 = ball90Point.z + -(tangent * 2);
					let x1 = ball90Point.x;
					let z1 = ball90Point.z;
					//alert(x1 + " " + z1 + " / " + x2 + " " + z2);
					let m = (z2 - z1) / (x2 - x1);
					let b = z1 - (m * x1);

					
					//let topM = otherObj.xzTop.m;
					//let topB = otherObj.xzTop.b;
					let r1 = -m + otherObj.xzTop.m;;	// invert m1 and b2 or could have inverted m2 and b1
					let r2 = b + -otherObj.xzTop.b;
					let xtIntersept = r2 / r1;
					let ytIntersept = otherObj.yTop;
					let ztIntersept = (xtIntersept * m) + b;
					//alert(xIntersept);
					//alert(yIntersept);
					//alert(m + " "  + b + " " + zIntersept);
					//let bottomM = otherObj.xzBottom.m;
					//let bottomB = otherObj.xzBottom.b;
					r1 = -m + otherObj.xzBottom.m;
					r2 = b + -otherObj.xzBottom.b;
					let xbIntersept = r2 / r1;
					let ybIntersept = otherObj.yBottom;
					let zbIntersept = (xbIntersept * m) + b;

					m = (ytIntersept - ybIntersept) / (xtIntersept - xbIntersept);
					b = ybIntersept - (m * xbIntersept);

					r1 = (m * ball90Point.x) + b;
					if (ball90Point.y < r1){
						bCollision = true;
						let angleXY = (-Math.atan2(ytIntersept - ybIntersept, xtIntersept - xbIntersept) * 180 / Math.PI) + 90;
						//alert('angle is now ' + angleXY);
						let yMove = (90 - angleXY);
						let xMove = (90 - yMove);
						//alert(yMove + " " + xMove);
						xMove = (xMove / 90) * 100; //turn in to percentage
						yMove = (yMove / 90) * 100;
						xMove = (xMove / 100) * this.origMoveValueY;
						yMove = (yMove / 100) * this.origMoveValueY;
						this.moveValueX = xMove;
						this.moveValueY = yMove;
						
						let zMove = ball90Point.angleXZ;
						zMove = ball90Point.angleXZ;
						zMove = (zMove / 90) * 100;
						zMove = (zMove / 100) * this.origMoveValueY;
						
						let movementXY = this.origMoveValueX + this.origMoveValueY;
						let pcnt = (movementXY / this.tdCircumference) * 100;
						this.mesh.rotation.z -= ((pcnt / 100) * (2 * Math.PI) /2);
						//As the Ball is already rotated 45 degrees on the Y axis, only rotation on the z axis is required
						// IF TRIBLOCK WAS NOT 45 DEGREES, THIS WHOULD NOT WORK // could be done with grouping

						/*
						let movementXZ = this.origMoveValueZ + this.origMoveValueY;
						pcnt = (movementXZ / this.tdCircumference) * 100;
						this.mesh.rotation.x -= ((pcnt / 100) * (2 * Math.PI) /2);
						alert(zMove);
						*/
						this.moveValueZ = -zMove;
						//alert(this.mesh.rotation.x + " " + this.mesh.rotation.z);
					} // end of collision True
				}	// end of Z check
			}	// end of X check
		}	// end of Y check
		return bCollision;
	} // end of collision method
}