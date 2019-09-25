function TriangleBlock(){
	this.mesh = null;
	this.x = 0,this.y = 0,this.z = 0;
	this.xLeft = null, this.xRight = null, this.yTop = null, this.yBottom = null, this.zFar = null, this.zClose = null;
    this.xzBottom = {m: null, b: null}; // xzBottom is the m and b values for calculating the lines equation, this line is the bottom y of the hypotenuse
    this.xzTop = {m: null, b: null};
    this.slopeDeg = null;
	this.points = [ [-30,0,-30]
	               ,[-30,0,30]
	               ,[30,0,30]
	               ,[30,0,-30]
	               ,[30,60,30]
	               ,[30,60,-30]];
    this.faces = [[2,1,0]
                 ,[3,2,0]
                 ,[2,3,4]
                 ,[5,4,3]
                 ,[1,4,5]
                 ,[0,1,5]
                 ,[1,2,4]
                 ,[5,3,0]];
    this.rotationY = 0;
    this.slopeDeg = 45;
    this.getPoints = function(){return this.points;}
    this.getFaces = function(){return this.faces;}
    this.setMesh = function(m){this.mesh = m;}
    this.setX = function(posX){
    	let change = posX - this.x;
    	for (let i = 0; i < 6; i++){
    		this.points[i][0] += change;
    	}
    	this.mesh.position.x = posX;
    	this.x = posX;
    }
    this.setY = function(posY){
    	let change = posY - this.y;
    	for (i = 0; i < 6; i++){
    		this.points[i][1] += change;
    	}
    	this.mesh.position.y = posY;
    	this.y = posY;
    }
    this.setZ = function(posZ){
    	let change = posZ - this.z;
    	for (i = 0; i < 6; i++){
    		this.points[i][2] += change;
    	}
    	this.mesh.position.z = posZ;
    	this.z = posZ;
    }
    this.setXLeft = function(){
    	let xl = this.points[0][0];
    	for (let i = 0; i < this.points.length; i++){
    		if (this.points[i][0] < xl){
    			xl = this.points[i][0];
    		}
    	}
    	this.xLeft = xl;
    }
    this.setXRight = function(){
    	let xr = this.points[0][0];
    	for (let i = 0; i < this.points.length; i++){
    		if (this.points[i][0] > xr){
    			xr = this.points[i][0];
    		}
    	}
    	this.xRight = xr;
    }
    this.setYTop = function(){
    	let yt = this.points[0][1];
    	for (let i = 0; i < this.points.length; i++){
    		if (this.points[i][1] > yt){
    			yt = this.points[i][1];
    		}
    	}
    	this.yTop = yt;
    }
    this.setYBottom = function(){
    	let yb = this.points[0][1];
    	for (let i = 0; i < this.points.length; i++){
    		if (this.points[i][1] < yb){
    			yb = this.points[i][1];
    		}
    	}
    	this.yBottom = yb;
    }
    this.setZFar = function(){
    	let zf = this.points[0][2];
		for (let i = 1; i < this.points.length; i++){
			if (this.points[i][2] < zf){
				zf = this.points[i][2];
			}
		}
		this.zFar = zf;
    }
    this.setZClose = function(){
    	let zc = this.points[0][2];
    	for (let i = 0; i < this.points.length; i++){
    		if(this.points[i][2] > zc){
    			zc = this.points[i][2];
    		}
    	}
    	this.zClose = zc;
    }
    this.setXZEquations = function(){
        // 4 and 5 highpoints
        let x1 = this.points[4][0];
        let x2 = this.points[5][0];
        let z1 = this.points[4][2];
        let z2 = this.points[5][2];
        this.xzTop.m = (z2 - z1) / (x2 - x1);
        this.xzTop.b = z1 - (this.xzTop.m * x1);
        //alert(this.xzTop.m + " " + this.xzTop.b);
        // 0 and 1 lowpoints
        x1 = this.points[0][0];
        x2 = this.points[1][0];
        z1 = this.points[0][2];
        z2 = this.points[1][2];
        this.xzBottom.m = (z2 - z1) / (x2 - x1);
        this.xzBottom.b = z1 - (this.xzBottom.m * x1);
        //alert(this.xzBottom.m + " " + this.xzBottom.b);
    }
    this.getTempPoints = function(){
    	return [ [null,null,null],
						[null,null,null],
						[null,null,null],
						[null,null,null],
						[null,null,null],
						[null,null,null]
					];
    }
    this.rotateY = function(angle){
    	//angle in degrees;
        this.rotationY = angle; // save angle in degrees before converting angle to radians
    	angle = angle * Math.PI / 180;
    	let tPoints = this.getTempPoints();

		for (i = 0; i < 6; i++){
			tPoints[i][0] = this.points[i][0] - this.x;
			//tPoints[i][1] = this.points[i][1] - this.y;
			tPoints[i][2] = this.points[i][2] - this.z;
			//alert(tPoints[i][0] + " " + tPoints[i][2]);
		}
		for (i = 0; i < 6; i++){
			let xNew = (tPoints[i][0] * Math.cos(angle)) + 0 + (tPoints[i][2] * Math.sin(angle));
			//let yNew = 0 + tPoints[i][1] + 0;
			let zNew = (tPoints[i][0] * -Math.sin(angle)) + 0 + (tPoints[i][2] * Math.cos(angle));
			//alert(tPoints[i][0] + " " + (tPoints[i][0] * Math.cos(angle)));
			this.points[i][0] = xNew + this.x;
			//this.points[i][1] = yNew + this.y;
			this.points[i][2] = zNew + this.z;
		}
		this.mesh.rotation.y = angle;
		////rotation.y = 0.25 * Math.PI;
        this.setXZEquations();
    }
    this.setVirtualCube = function(){
    	// As the TriangleBLock is not moved it is best to set
    	// if TriangleBlock was moving, get methods that would consistently calculate would need to be used
    	this.setXLeft();
    	this.setXRight();
    	this.setYTop();
    	this.setYBottom();
    	this.setZFar();
    	this.setZClose();
    }

}