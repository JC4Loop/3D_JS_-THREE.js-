var THREE;
var GLOBAL_DIR;

function initTHREEforPlayGround(t,d) {
    THREE = t;
    GLOBAL_DIR = d;
}

function playGround() {
    this.playGround = new THREE.Object3D();
    var planeX = 150;
    var planeY = 180;
    var planeGeometry = new THREE.PlaneGeometry(planeX, planeY);
    var planeTexture = new THREE.TextureLoader().load(GLOBAL_DIR + "Cement2.jpg");
    var planeMaterial = new THREE.MeshPhongMaterial({
        map: planeTexture
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;

    this.playGround.add(plane);
 
    var mgrRotateGroup = new THREE.Object3D();
    var swingRotateGroup = new THREE.Object3D();
    var spotLights = [];
    var spotLightsPos = [];
    var lampPtLposY;
    var bSteelTexture = new THREE.TextureLoader().load(GLOBAL_DIR + "black-steel.jpg");
    var bSteelMat = new THREE.MeshLambertMaterial({
        map: bSteelTexture
    });
    var benchGroup1 = CreateBench(GLOBAL_DIR + "old-wood.jpg");
    var benchGroup2 = CreateBench(GLOBAL_DIR + "good-wood.jpg");
    benchGroup1.scale.set(1.2, 1.2, 1.2);
    benchGroup2.scale.set(1.2, 1.2, 1.2);
    this.playGround.add(benchGroup1);
    this.playGround.add(benchGroup2);
    benchGroup1.rotation.y = 0.5 * Math.PI;
    benchGroup1.position.x = 15;
    benchGroup1.position.z = -65;
    benchGroup1.position.y = 0.01;
    benchGroup2.position.x = 40;
    benchGroup2.position.y = 0.01;
    benchGroup2.position.z = -40;
    var merryGoRound = CreateMerryGoRound();
    this.playGround.add(merryGoRound);
    //merryGoRound.rotation.y = 0.25 * Math.PI;
    merryGoRound.position.x = 25;
    merryGoRound.position.y = 3;
    merryGoRound.position.z = 25;
    var swingObj = CreateSwing();
    swingObj.position.x = -30;
    swingObj.position.z = 30;
    this.playGround.add(swingObj);
    var lampPost1 = CreateLampPost();
    lampPost1.position.x = 45;
    lampPost1.position.z = -65;
    var lampPost2 = CreateLampPost();
    lampPost2.position.x = 45;
    lampPost2.position.z = 65;
    var lampPost3 = CreateLampPost();
    lampPost3.position.x = -45;
    lampPost3.position.z = 65;
    var lampPost4 = CreateLampPost();
    lampPost4.position.x = -45;
    lampPost4.position.z = -65;
    this.playGround.add(lampPost1);
    this.playGround.add(lampPost2);
    this.playGround.add(lampPost3);
    this.playGround.add(lampPost4);

    var sphereLightGeometry = new THREE.SphereGeometry(1);
    var sphereLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    var lightColorX = "#ffffff";
    var sLight1 = CreatePointLight(this.playGround);
    //sLight1.position = new THREE.Vector3(250, -20, 0);
    // sLight1.target.position.set(0,0,0);
    var sLight2 = CreatePointLight(this.playGround);
    //sLight2.position = new THREE.Vector3(45, 37, 65);
    //sLight2.target.position.set(-25,0,20);
    var sLight3 = CreatePointLight(this.playGround);
    //sLight3.position = new THREE.Vector3(45, 37, -65);
    // sLight3.target.position.set(0,0,0);
    var sLight4 = CreatePointLight(this.playGround);
    //sLight4.position = new THREE.Vector3(45, 37, -65);
   
    // sLight4.target.position.set(0,0,0);
    //  spotLights.push(sLight1);
    // spotLights.push(sLight2);
    // spotLights.push(sLight3);
    // spotLights.push(sLight4);

    for (i = 0; i < 4; i++) {
        this.playGround.add(spotLights[i]);
        spotLights[i].position.y = 37;
        spotLightsPos[i].position.y = spotLights[i].position.y;
        //alert(spotLights[i].position.y + " " + spotLightsPos[i].position.y);
    }
    spotLights[1].position.x = 45;
    spotLights[1].position.z = -65;
    spotLightsPos[1].position.x = 45
    spotLightsPos[1].position.z = -65;
   // spotLights[1].target.position.x = 0;
  //  spotLights[1].target.position.y = 50;
  //  spotLights[1].target.position.z = 0;
    spotLights[2].position.x = 45;
    spotLights[2].position.z = 65;
    spotLightsPos[2].position.x = 45;
    spotLightsPos[2].position.z = 65;
    spotLights[3].position.x = -45;
    spotLights[3].position.z = 65;
    spotLightsPos[3].position.x = -45;
    spotLightsPos[3].position.z = 65;
    spotLights[0].position.x = -45;
    spotLights[0].position.z = -65;
    spotLightsPos[0].position.x = -45;
    spotLightsPos[0].position.z = -65;
  
    this.addToScene = function(s){
        s.add(this.playGround);
    }

    function CreateBench(imageF) {
        var benchGroup = new THREE.Object3D();
        var benchStands = [];
        for (i = 0; i < 2; i++) {
            var benchStand = new THREE.Object3D();
            benchStands.push(benchStand);
        }

        var imageFile = "brushed-steel.jpg";

        var texture = new THREE.TextureLoader().load(GLOBAL_DIR + imageFile);

        var objMaterial = new THREE.MeshPhongMaterial({
            map: texture
        });

        var sChairlegHeight = 6;
        var bChairlegHeight = 7;

        for (a = 0; a < 2; a++) {
            var sChairLegGeometry = new THREE.CubeGeometry(1, sChairlegHeight, 1);
            var sChairleg1 = new THREE.Mesh(sChairLegGeometry, objMaterial);
            sChairleg1.castShadow = true;
            sChairleg1.recieveShadow = true;
            var bChairlegGeometry = new THREE.CubeGeometry(1, bChairlegHeight, 1);
            var bChairleg1 = new THREE.Mesh(bChairlegGeometry, objMaterial);
            bChairleg1.castShadow = true;
            bChairleg1.recieveShadow = true;
            var horSupportGeo = new THREE.CubeGeometry(8, 1, 1);
            var horSupport = new THREE.Mesh(horSupportGeo, objMaterial);
            horSupport.castShadow = true;
            horSupport.recieveShadow = true;
            var backBarGeo = new THREE.CubeGeometry(1, 6, 1);
            var backBar = new THREE.Mesh(backBarGeo, objMaterial);
            backBar.castShadow = true;
            backBar.recieveShadow = true;
            var smallMtlGeo = new THREE.PlaneGeometry(2.5, 2);
            var smallMtlMat = new THREE.MeshLambertMaterial({
                color: 0x000000
            });
            var smallMtls = [];
            for (i = 0; i < 2; i++) {
                var smallMtl = new THREE.Mesh(smallMtlGeo, smallMtlMat);
                smallMtl.recieveShadow = true;
                smallMtls.push(smallMtl);
                benchStands[a].add(sChairleg1);
                benchStands[a].add(bChairleg1);
                benchStands[a].add(horSupport);
                benchStands[a].add(backBar);
                benchStands[a].add(smallMtls[i]);
                sChairleg1.position.x = -3;
                sChairleg1.position.y = sChairlegHeight / 2;
                bChairleg1.position.x = 4;
                bChairleg1.position.y = bChairlegHeight / 2;
                horSupport.position.x = 0;
                horSupport.position.y = sChairlegHeight - 0.5;
            }
            backBar.rotation.z = -0.1 * Math.PI;
            backBar.position.x = 4.75;
            backBar.position.y = 9;
            smallMtls[0].rotation.x = -0.5 * Math.PI;
            smallMtls[0].position.x = -3;
            smallMtls[1].rotation.x = -0.5 * Math.PI;
            smallMtls[1].position.x = 4;
            benchGroup.add(benchStands[a]);
        }
        benchStands[0].position.z = -10;
        benchStands[1].position.z = 10;
        var seatPieceY = 0.75;
        var seatPieceX = 2.25;
        var seatPieceCRad = seatPieceY / 2;
        var seatPieceCurveGeo = new THREE.CylinderGeometry(seatPieceCRad, seatPieceCRad, 22, 22, 1);
        var spTexture = new THREE.TextureLoader().load(imageF);
        var seatPieceMat = new THREE.MeshLambertMaterial({
            map: spTexture
        });
        var seatPieceCurve = new THREE.Mesh(seatPieceCurveGeo, seatPieceMat);
        seatPieceCurve.castShadow = true;
        seatPieceCurve.recieveShadow = true;
        seatPieceCurve.rotation.x = 0.5 * Math.PI;
        benchGroup.add(seatPieceCurve);
        var seatPieceGeo = new THREE.CubeGeometry(seatPieceX, seatPieceY, 22);
        var seatPiece1 = new THREE.Mesh(seatPieceGeo, seatPieceMat);
        seatPiece1.castShadow = true;
        seatPiece1.recieveShadow = true;
        var seatPiece2 = new THREE.Mesh(seatPieceGeo, seatPieceMat);
        seatPiece2.castShadow = true;
        seatPiece2.recieveShadow = true;
        var seatPiece3 = new THREE.Mesh(seatPieceGeo, seatPieceMat);
        seatPiece3.castShadow = true;
        seatPiece3.recieveShadow = true;
        var backPieceGeo = new THREE.CubeGeometry(0.7, 2, 22);
        var backPiece1 = new THREE.Mesh(backPieceGeo, seatPieceMat);
        var backPiece2 = new THREE.Mesh(backPieceGeo, seatPieceMat);
        backPiece1.castShadow = true;
        backPiece1.recieveShadow = true;
        backPiece2.castShadow = true;
        backPiece2.recieveShadow = true;
        benchGroup.add(seatPiece1);
        benchGroup.add(seatPiece2);
        benchGroup.add(seatPiece3);
        benchGroup.add(backPiece1);
        benchGroup.add(backPiece2);
        seatPiece1.position.y = sChairlegHeight + 0.5;
        seatPiece1.position.x = -3;
        seatPieceCurve.position.x = seatPiece1.position.x - (seatPieceX / 2);
        seatPieceCurve.position.y = sChairlegHeight + 0.5;
        seatPiece2.position.x = -0.25;
        seatPiece2.position.y = sChairlegHeight + 0.5;
        seatPiece3.position.x = 2.5;
        seatPiece3.position.y = sChairlegHeight + 0.5;
        backPiece1.rotation.z = -0.1 * Math.PI;
        backPiece1.position.x = 5;
        backPiece1.position.y = 11;
        backPiece2.rotation.z = -0.1 * Math.PI;
        backPiece2.position.x = 4;
        backPiece2.position.y = 8.5;
        return benchGroup;
    }

    function CreateMerryGoRound() {
        var merryGoRound = new THREE.Object3D();
        var mgrDiameter = 20; // this is the radius not diameter
        var mgrBaseGeo = new THREE.CylinderGeometry(mgrDiameter, mgrDiameter, 1, 20, 1);

        var mgrBaseTexture = new THREE.TextureLoader().load(GLOBAL_DIR + "plygrndSurface.jpg");
        var mgrBNormalMap = new THREE.TextureLoader().load(GLOBAL_DIR + "plygrndSurNMap.jpg");

        // mgrBaseMaterial.specular = new THREE.Color(0xccffcc);
        //var color = new THREE.Color( 0xff0000 );

        var mgrBaseMaterial = new THREE.MeshPhongMaterial({
            map: mgrBaseTexture,
            normalMap: mgrBNormalMap
        });

        var mgrBase = new THREE.Mesh(mgrBaseGeo, mgrBaseMaterial);
        mgrBase.castShadow = true;
        mgrBase.recieveShadow = true;
        mgrBase.position.y = 2;
        var midCylGeo = new THREE.CylinderGeometry(1.5, 1.5, 12, 20, 1);
        var midCylMat = new THREE.MeshLambertMaterial({
            color: 0x252525
        });
        var midCyl = new THREE.Mesh(midCylGeo, midCylMat);
        midCyl.castShadow = true;
        midCyl.recieveShadow = true;
        midCyl.position.y = 7;
        var sphereDiameter = 2.5;
        var topSphereGeo = new THREE.SphereGeometry(sphereDiameter, 20, 20);
        var topSphereMat = new THREE.MeshLambertMaterial({
            color: 0x000000
        });
        var topSphere = new THREE.Mesh(topSphereGeo, topSphereMat);
        topSphere.castShadow = true;
        topSphere.position.y = 15;
        var sideBars = [];
        var sideBarHeight = 9;
        var sideBarMat = new THREE.MeshLambertMaterial({
            color: 0x7c0000
        });
        for (i = 0; i < 4; ++i) {
            var sideBarGeo = new THREE.CylinderGeometry(0.7, 0.7, sideBarHeight, 20, 1);
            var sideBar = new THREE.Mesh(sideBarGeo, sideBarMat);
            sideBar.castShadow = true;
            sideBar.recieveShadow = true;
            sideBars.push(sideBar);
        }
        var horizontalBars = [];
        for (i = 0; i < 2; i++) {
            var horizontalBarGeo = new THREE.CylinderGeometry(0.7, 0.7, 27, 20, 1);
            var horizontalBar = new THREE.Mesh(horizontalBarGeo, sideBarMat);
            horizontalBar.castShadow = true;
            horizontalBar.recieveShadow = true;
            horizontalBars.push(horizontalBar);
        }
        var torusBars = [];
        for (i = 0; i < 4; i++) {
            var torusBarGeo = new THREE.TorusGeometry(5, 0.7, 40, 20, 1.57);
            var torusBar = new THREE.Mesh(torusBarGeo, sideBarMat);
            torusBar.castShadow = true;
            torusBar.recieveShadow = true;
            torusBars.push(torusBar);
        }
        var sideBarPosY = 2 + (sideBarHeight / 2);
        sideBars[0].position.z = mgrDiameter - 2;;
        sideBars[0].position.y = sideBarPosY;
        sideBars[1].position.z = -(mgrDiameter - 2);
        sideBars[1].position.y = sideBarPosY;
        sideBars[2].position.x = mgrDiameter - 2;
        sideBars[2].position.y = sideBarPosY;
        sideBars[3].position.x = -(mgrDiameter - 2);
        sideBars[3].position.y = sideBarPosY;
        horizontalBars[0].rotation.x = 0.5 * Math.PI;
        horizontalBars[1].rotation.z = 0.5 * Math.PI;
        horizontalBars[0].position.y = topSphere.position.y;
        horizontalBars[1].position.y = topSphere.position.y;
        torusBars[0].rotation.y = -0.5 * Math.PI;
        torusBars[0].position.z = (sideBars[0].position.z) - 5;
        torusBars[0].position.y = 10;
        torusBars[1].rotation.y = 0.5 * Math.PI;
        torusBars[1].position.z = (sideBars[1].position.z) + 5;
        torusBars[1].position.y = 10;
        torusBars[2].position.x = (sideBars[2].position.x) - 5;
        torusBars[2].position.y = 10;
        torusBars[3].rotation.y = 1 * Math.PI;
        torusBars[3].position.x = (sideBars[3].position.x) + 5;
        torusBars[3].position.y = 10;
        mgrRotateGroup.add(mgrBase);
        mgrRotateGroup.add(midCyl);
        mgrRotateGroup.add(topSphere);
        for (i = 0; i < 4; i++) {
            mgrRotateGroup.add(sideBars[i]);
        }
        mgrRotateGroup.add(horizontalBars[0]);
        mgrRotateGroup.add(horizontalBars[1]);
        for (i = 0; i < 4; i++) {
            mgrRotateGroup.add(torusBars[i]);
        }
        var mgrPlaneGeo = new THREE.PlaneGeometry(52, 52);

        var mgrPlaneTexture = new THREE.TextureLoader().load(GLOBAL_DIR + "plSurfaceDark.jpg");
        var mgrPlaneMat = new THREE.MeshLambertMaterial({
            map: mgrPlaneTexture
        });
        //mgrPlaneTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
        //mgrPlaneTexture.repeat.set( 2, 1 );
        var mgrPlane = new THREE.Mesh(mgrPlaneGeo, mgrPlaneMat);
        mgrPlane.receiveShadow = true;
        mgrPlane.rotation.x = -0.5 * Math.PI;
        mgrPlane.position.y = -1.5;
        merryGoRound.add(mgrRotateGroup);
        merryGoRound.add(mgrPlane);
        return merryGoRound;
    }

    function CreateSwing() {
        var swing = new THREE.Object3D();
        var frameBarHeight = 35;
        var frameBarGeo = new THREE.CubeGeometry(1.25, frameBarHeight, 1.25);
        var frameBars = [];
        for (i = 0; i < 4; i++) {
            var frameBar = new THREE.Mesh(frameBarGeo, bSteelMat);
            frameBar.castShadow = true;
            frameBar.position.y = (frameBarHeight / 2) - 3;
            frameBars.push(frameBar);
            if (i === 0 || i === 2) {
                frameBar.rotation.x = 0.15 * Math.PI;
                frameBar.position.z = -7.7;
            }
            if (i === 1 || i === 3) {
                frameBar.rotation.x = -0.15 * Math.PI;
                frameBar.position.z = 7.7;
            }
            if (i < 2) {
                frameBar.position.x = 15;
            } else {
                frameBar.position.x = -15;
            }
            swing.add(frameBars[i]);
        }

        var horizontalBarGeo = new THREE.CylinderGeometry(1, 1, 30, 20, 1);
        var horizontalBar = new THREE.Mesh(horizontalBarGeo, bSteelMat);
        horizontalBar.castShadow = true;
        horizontalBar.rotation.z = 0.5 * Math.PI;
        horizontalBar.position.y = 30;
        swing.add(horizontalBar);
        for (i = 0; i < 2; i++) {
            var ropeGeo = new THREE.CylinderGeometry(0.3, 0.3, 18, 20, 1);
            var ropeTexture = new THREE.TextureLoader().load(GLOBAL_DIR + "Rope-texture.jpg");
            var ropeNormalMap = new THREE.TextureLoader().load(GLOBAL_DIR + "ropeNMap.jpg");
            var ropeMat = new THREE.MeshPhongMaterial({
                map: ropeTexture,
                normalMap: ropeNormalMap
            });
            var rope = new THREE.Mesh(ropeGeo, ropeMat);
            rope.castShadow = true;
            rope.position.y = -10;
            var triRopeGeo = new THREE.CylinderGeometry(0.3, 0.3, 3, 20, 1);
            var triRope1 = new THREE.Mesh(triRopeGeo, ropeMat);
            triRope1.castShadow = true;
            var triRope2 = new THREE.Mesh(triRopeGeo, ropeMat);
            triRope2.castShadow = true;
            triRope1.rotation.x = 0.15 * Math.PI;
            triRope2.rotation.x = -0.15 * Math.PI;
            triRope1.position.y = -20;
            triRope1.position.z = -1;
            triRope2.position.y = -20;
            triRope2.position.z = 1;
            swingRotateGroup.add(triRope1);
            swingRotateGroup.add(triRope2);
            swingRotateGroup.add(rope);
            if (i < 1) {
                rope.position.x = 5;
                triRope1.position.x = 5;
                triRope2.position.x = 5;
            } else {
                rope.position.x = -5;
                triRope1.position.x = -5;
                triRope2.position.x = -5;
            }
        }

        var sSeatTexture = new THREE.TextureLoader().load(GLOBAL_DIR + "good-wood.jpg");
        var swingSeatMat = new THREE.MeshLambertMaterial({
            map: sSeatTexture
        });
        var swingSeat = new THREE.Mesh(new THREE.CubeGeometry(11, 1, 4), swingSeatMat);
        swingSeat.castShadow = true;
        swingSeat.recieveShadow = true;
        swingSeat.position.y = -21;
        swingRotateGroup.add(swingSeat);
        swingRotateGroup.position.y = 30;
        swing.add(swingRotateGroup);
        return swing;
    }

    function CreateLampPost() {
        var lampPost = new THREE.Object3D();
        var groundTriHeight = 4;
        var groundTriGeo = new THREE.CylinderGeometry(5, 5, groundTriHeight, 6, 1);
        var groundTri = new THREE.Mesh(groundTriGeo, bSteelMat);
        groundTri.castShadow = true;
        var secondLprtHeight = 6;
        var secondLprtGeo = new THREE.CylinderGeometry(2, 5, secondLprtHeight, 6, 1);
        var secondLprt = new THREE.Mesh(secondLprtGeo, bSteelMat);
        secondLprt.castShadow = true;
        groundTri.position.y = groundTriHeight / 2;
        lampPost.add(groundTri);
        lampPost.add(secondLprt);
        secondLprt.position.y = groundTriHeight + (secondLprtHeight / 2);
        var thirdLprtHeight = 22;
        var thirdLprtGeo = new THREE.CylinderGeometry(2, 2, thirdLprtHeight, 6, 1);
        var thirdLprt = new THREE.Mesh(thirdLprtGeo, bSteelMat);
        thirdLprt.castShadow = true;
        thirdLprt.recieveShadow = true;
        thirdLprt.position.y = groundTriHeight + secondLprtHeight + (thirdLprtHeight / 2);
        lampPost.add(thirdLprt);
        var fourthLprtHeight = 2;
        var fourthLprtGeo = new THREE.CylinderGeometry(4, 2, fourthLprtHeight, 6, 1);
        var fourthLprt = new THREE.Mesh(fourthLprtGeo, bSteelMat);
        fourthLprt.position.y = thirdLprt.position.y + (thirdLprtHeight / 2) + (fourthLprtHeight / 2);
        lampPost.add(fourthLprt);
        var lightLprtHeight = 6;
        var lightLprtGeo = new THREE.CylinderGeometry(5, 4, lightLprtHeight, 6, 1);
        var lightLprtMat = new THREE.MeshPhongMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.8,
            shininess: 150,
            emissive: 0xffdb4d,
            specular: 0xffdb4d,
            side: THREE.BackSide
        });
        var lightLprt = new THREE.Mesh(lightLprtGeo, lightLprtMat);
        lightLprt.castShadow = false;
        lightLprt.recieveShadow = true;
        lightLprt.position.y = fourthLprt.position.y + (fourthLprtHeight / 2) + (lightLprtHeight / 2);
        lampPost.add(lightLprt);
        var lightColor = "#ffff85";
        var light = new THREE.PointLight(lightColor);
        light.position = lightLprt.position;
        light.distance = 100;
        light.intensity = 2;
        lampPost.add(light);
        lampPtLposY = light.position;
        /* var sphereLight = new THREE.SphereGeometry(0.2);
										var sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
										var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
										sphereLightMesh.position.y = light.position.y;
										lampPost.add(sphereLightMesh);*/
        var lightTop1Height = 0.5;
        var lightTop1Geo = new THREE.CylinderGeometry(5.2, 5.2, lightTop1Height, 20, 1);
        var lightTop1 = new THREE.Mesh(lightTop1Geo, bSteelMat);
        lightTop1.castShadow = true;
        lightTop1.recieveShadow = true;
        lightTop1.position.y = lightLprt.position.y + (lightLprtHeight / 2) + (lightTop1Height / 2);
        lampPost.add(lightTop1);
        var lightTop2Height = 2;
        var lightTop2Geo = new THREE.CylinderGeometry(2, 5, lightTop2Height, 8, 1);
        //var lightTop2Mat = new THREE.MeshLambertMaterial({color: 0x0000ff});
        var lightTop2 = new THREE.Mesh(lightTop2Geo, bSteelMat);
        lightTop2.castShadow = true;
        lightTop2.recieveShadow = true;
        lightTop2.position.y = lightTop1.position.y + (lightTop1Height / 2) + (lightTop2Height / 2);
        lampPost.add(lightTop2);
        var lightTop3Height = 3;
        var lightTop3Geo = new THREE.CylinderGeometry(0.1, 2, lightTop3Height, 8, 1);
        var lightTop3 = new THREE.Mesh(lightTop3Geo, bSteelMat);
        lightTop3.castShadow = true;
        lightTop3.recieveShadow = true;
        lightTop3.position.y = lightTop2.position.y + (lightTop2Height / 2) + (lightTop3Height / 2);
        lampPost.add(lightTop3);
        return lampPost;
    }

    function CreatePointLight(playGround) {
        var pLight = new THREE.PointLight(lightColorX,0.4);
    
     /*   sLight.castShadow = true;
        sLight.shadow.camera.near = 2;
        sLight.shadow.camera.far = 175;
        sLight.shadow.camera.fov = 70;
        sLight.angle = 4;
        sLight.distance = 175;
        sLight.intensity = 0 / 5;
        sLight.exponent = 5;
        sLight.shadowOn = true; //boolean for shadows
        sLight.shadowCameraVisible = false;
        sLight.visible = true;
*/
        spotLights.push(pLight);
        var lightPoint = new THREE.Mesh(sphereLightGeometry, sphereLightMaterial);
        spotLightsPos.push(lightPoint);
        playGround.add(lightPoint);
        return pLight;
    }
}