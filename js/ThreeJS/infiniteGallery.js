//? A class structure
//* Ahh, long time not oop dy

class GalleryScene {
    //* Constructor, you know that, when you initialize the object (For OOP)
    constructor(canvasId, config) {
        //? this means variable for this object
        this.canvas = document.querySelector(canvasId);

        if (!this.canvas) {
            console.error(`Canvas element '${canvasId}' not found`);
            return;
        }

        this.config = config;
        this.renderSize = {
            width: window.innerWidth,
            height: window.innerHeight * 0.8
        };

        this.canvas.width = this.renderSize.width * window.devicePixelRatio;  // Adjust for device pixel ratio
        this.canvas.height = this.renderSize.height * window.devicePixelRatio; // Adjust for device pixel ratio


        console.log("Device Pixel Ratio " + window.devicePixelRatio)

        // Set canvas CSS to match the visual size
        this.canvas.style.width = `${this.renderSize.width}px`;
        this.canvas.style.height = `${this.renderSize.height}px`;


        this.projects = []; // Holds Three.js objects

        this.init();
    }

    init() {


        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();
        this.controls = this.createControls();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.mouseDownPos = { x: 0, y: 0 }

        this.loadImages();

        this.addEventListeners();
        this.animate();

    }

    createCamera() {
        const camera = new THREE.PerspectiveCamera(
            this.config.camera.fov,
            this.renderSize.width / this.renderSize.height,
            0.1,
            1000
        );
        camera.position.set(...this.config.camera.position);
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        return camera;
    }

    createRenderer() {
        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        renderer.setSize(this.renderSize.width, this.renderSize.height);
        renderer.setClearColor(0xfaf9fa)
        renderer.setPixelRatio(window.devicePixelRatio);
        return renderer;
    }

    createControls() {
        const controls = new THREE.OrbitControls(this.camera, this.canvas);
        // controls.enableDamping = this.config.controls.enableDamping;

        controls.minPolarAngle = Math.PI / 2;  // 限制最低角度
        controls.maxPolarAngle = Math.PI / 2;  // 限制最高角度

        controls.enableZoom = this.config.controls.enableZoom;
        controls.enablePan = this.config.controls.enablePan;
        return controls;
    }

    loadImages() {

        const radius = 5;

        const textureLoader = new THREE.TextureLoader();

        //? Why screen factor?
        //? Because in 3d world it's not pixel as unit. The unit in 3d world is relative to 3d scene 
        let screenFactor;

        let innerWidth = window.innerWidth;

        if (innerWidth > 1080) {
            screenFactor = innerWidth * 0.005
        } else if (window.innerWidth > 720) {
            screenFactor = innerWidth * 0.007

        } else {
            screenFactor = innerWidth * 0.01
            console.log(screenFactor)

        }

        const imageWidth = screenFactor * 1.5;  // 调整宽高比例
        const imageHeight = screenFactor;

        this.config.projectImages.forEach((img, index) => {

            const angle = (index / this.config.projectImages.length) * Math.PI * 2;

            const texture = textureLoader.load(img);
            // const geometry = new THREE.PlaneGeometry(...this.config.imageSize);
            const geometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            const mesh = new THREE.Mesh(geometry, material);

            // Randomized Positioning
            mesh.position.set(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );

            mesh.userData = { 
                projectIndex: index,
                baseScale: 0.7
            };

            // mesh.lookAt(new THREE.Vector3(0,0,0))
            mesh.lookAt(this.camera.position)

            this.projects.push(mesh);
            this.scene.add(mesh);
        });

    }

    addEventListeners() {
        window.addEventListener("resize", () => this.onWindowResize());
        // this.canvas.addEventListener("click", (event) => this.onMouseClick(event));
        this.canvas.addEventListener("pointerdown", (event) => { this.onMouseDown(event) });
        this.canvas.addEventListener("pointerup", (event) => this.onMouseUp(event));
        this.canvas.addEventListener("mousedown", (event) => { this.onMouseDown(event) });
        this.canvas.addEventListener("mouseup", (event) => this.onMouseUp(event));
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();

        // 最近的距离，圆的半径
        const minDistance = 15;
        // 最远距离，相机的距离
        const maxDistance = 20;
        const scaleFactor = 0.5;


        this.projects.forEach(mesh => {

            const distance = this.camera.position.distanceTo(mesh.position);
            // 归一化距离到 0 ~ 1（近处 0，远处 1）
            const normalizedDistance = Math.min(1, Math.max(0, (distance - minDistance) / (maxDistance - minDistance)));

            // 控制缩放（近处最大，远处最小）
            const scale = mesh.userData.baseScale * (1 + scaleFactor * (1 - normalizedDistance));
            
            if(!this.isMouseDown){
                // mesh.scale.set(scale, scale, scale);
                gsap.to(mesh.scale, {
                    x: scale, 
                    y: scale, 
                    z: scale, 
                    duration: 0.15
                });
            }

            // 控制透明度（近处最清晰，远处最透明）
            mesh.material.opacity = Math.max(0.2, 1 - normalizedDistance);
            mesh.material.needsUpdate = true;

            mesh.lookAt(this.camera.position)
        })

        this.renderer.render(this.scene, this.camera);
    }

    //* Handle Click Events for Image Selection
    onMouseClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.projects);

        if (intersects.length > 0) {
            const clickedProject = intersects[0].object;
            const projectIndex = clickedProject.userData.projectIndex;
            alert(`Clicked on project: ${this.config.projectImages[projectIndex]}`);
        }

        console.log(event)
    }

    //* Calculate the move position
    onMouseDown(event) {

        this.isMouseDown = true;
        this.mouseDownPos = { x: event.clientX, y: event.clientY }

        console.log("DOWN")
        this.projects.forEach(mesh => {
            gsap.to(mesh.scale, {
                x: mesh.userData.baseScale , 
                y: mesh.userData.baseScale , 
                z: mesh.userData.baseScale , 
                // x: mesh.scale.x * 0.8 , 
                // y: mesh.scale.y * 0.8 , 
                // z: mesh.scale.z * 0.8 , 
                duration: 0.25,
                onUpdate: () => {
                    this.renderer.render(this.scene, this.camera); // Ensure re-rendering during animation
                }
            });
        });
    }

    //* Mouse up
    onMouseUp(event) {
        this.isMouseDown = false;


        const moveDistance = Math.sqrt(
            Math.pow(event.clientX - this.mouseDownPos.x, 2) + Math.pow(event.clientY - this.mouseDownPos.y, 2)
        )

        const clickThreshold = 5

        if (moveDistance < clickThreshold) {
            this.onMouseClick(event)
        }

        console.log("UP")
        // this.projects.forEach(mesh => {
        //     gsap.to(mesh.scale, {
        //         x: mesh.userData.baseScale, 
        //         y: mesh.userData.baseScale, 
        //         z: mesh.userData.baseScale, 
        //         duration: 0.2, 
        //         onUpdate: () => {
        //             this.renderer.render(this.scene, this.camera); // Ensure re-rendering during animation
        //         }
        //     });
        // });
    }

    //* Handle Window Resizing
    onWindowResize() {
        this.renderSize.width = window.innerWidth;
        this.renderSize.height = window.innerHeight;

        this.camera.aspect = this.renderSize.width / this.renderSize.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.renderSize.width, this.renderSize.height);
    }


}

const galleryConfig = {
    camera: {
        fov: 45,
        position: [0, 0, 20]
    },
    controls: {
        enableDamping: true,
        enableZoom: false,
        enablePan: false
    },
    imageSize: [4, 3], //Width, Height
    randomPositionRange: 10,
    projectImages: [
        "/assets/images/ProjectImage/vitalz.png",
        "/assets/images/ProjectImage/hygieia.png",
        "/assets/images/ProjectImage/vitalz.png",
        "/assets/images/ProjectImage/hygieia.png",
    ]
};

const gallery = new GalleryScene("#infinte-gallery", galleryConfig)