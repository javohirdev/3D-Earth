(function() {
    var webglEL = document.getElementById('webgl');

    if(!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEL);
        return;
    }

    //o'lcham
    var width = window.innerWidth,
        height = window.innerHeight;

    var radius = 0.5,
        segments = 32,
        rotation = 6;

    //scene - holat
    var scene = new THREE.Scene();

    //camera - kamera holati
    let camera = new THREE.PerspectiveCamera(25, width / height, 0.01, 1000);
    camera.position.z = 1.15;
    camera.position.x = 3.15;

    //renderer
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    scene.add(new THREE.AmbientLight(0x333333));

    //light - yorug'lik
    let light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(50,50,20);
    scene.add(light);

    let sphere = createSphere(radius, segments)
        sphere.rotation.y = rotation;
        scene.add(sphere)

    //clouds earth
    let clouds = createClouds(radius, segments);
        clouds.rotation.y = rotation;
        scene.add(clouds);

        //stars 
        let stars = createStars(90, 64);
        scene.add(stars);

        //controls
        let controls = new THREE.TrackballControls(camera)

        webglEL.appendChild(renderer.domElement);
        render();

    //render uchun
    function render() {
        controls.update();
        sphere.rotation.y += 0.0005;
        clouds.rotation.y += 0.0015;		
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    //umumiy holatni hosil qilish
    function createSphere(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshPhongMaterial({
                map:     THREE.ImageUtils.loadTexture('textures/2_no_clouds_4k.jpg'),
                bumpMap: THREE.ImageUtils.loadTexture('textures/elev_bump_4k.jpg'),
                bumpScale: 0.005,
                specularMap: THREE.ImageUtils.loadTexture('textures/water_4k.png'),
                specular: new THREE.Color('grey'),
            })
        );
    }

    //bulutlarni hosil qilish
    function createClouds(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.003, segments, segments),
            new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('textures/fair_clouds_4k.png'),
                transparent: true
            })
        );
    }

    //yulduzlarni hosil qilish
    function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments), 
			new THREE.MeshBasicMaterial({
				map:  THREE.ImageUtils.loadTexture('textures/galaxy_starfield.png'), 
				side: THREE.BackSide
			})
		);
	}

    //resize responsive
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}());