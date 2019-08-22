function Ball(radius){
	this.mesh = null;
	this.radius = radius;
	this.x = 0, this.y = 0, this.z = 0;
	this.origMoveValueX = 0, this.origMoveValueY = -0.3, this.origMoveValueZ = 0;
	this.moveValueX = this.origMoveValueX, this.moveValueY = this.origMoveValueY, this.moveValueZ = this.origMoveValueZ;
	this.setMesh = function(m){this.mesh = m;}
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
			this.setY(70);
		}
		this.setX(this.x + this.moveValueX);
		this.setY(this.y + this.moveValueY);
		this.setZ(this.z + this.moveValueZ);
	}
	this.collisionWith = function(otherObj){
		let bCollision = false;
		if (!(this.y - radius > otherObj.yTop || this.y + radius < otherObj.yBottom)){
			if (!(this.x - radius > otherObj.xRight || this.x + radius < otherObj.xLeft)){
				if (!(this.z - radius > otherObj.zClose || this.z + radius < otherObj.zFar)){
					//alert('clash');
					bCollision = true;
				}
			}
		}
		return bCollision;
	}
}