//? A class structure
//* Ahh, long time not oop dy
import { works } from '../../datas/home.js';

class GalleryScene {
    constructor(canvasId, config) {
        this.canvas = document.querySelector(canvasId);

        if (!this.canvas) {
            console.error(`Canvas element '${canvasId}' not found`);
            return;
        }

        this.config = config;

        this.renderSize = {
            width: window.innerWidth,
            height: window.innerHeight * 0.75
        };

        this.projects = [];
        this.projectsData = works; // Store the works data
        this.isAnimating = false;
        this.currentProjectIndex = 0;
        
        // Initialize UI elements
        this.initUIElements();
        
        // Add error handling for debugging
        if (!this.projectsData || this.projectsData.length === 0) {
            console.error('No project data available');
            return;
        }
        
        console.log('Loading gallery with', this.projectsData.length, 'projects');
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();
        this.controls = this.createControls();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        //* For panning
        this.mouseDownPos = { x: 0, y: 0 };
        this.isTouching = false;
        this.touchStartY = 0;

        this.loadImages();

        this.addEventListeners();
        
        // Initialize UI with first project
        if (this.projectsData.length > 0) {
            setTimeout(() => {
                this.updateProjectInfo(this.projectsData[0], 0);
                this.updateNavigationCounter(0);
                console.log('Initial project info updated');
            }, 1000);
        }
        
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
        const renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas,

         });
        renderer.setSize(this.renderSize.width, this.renderSize.height);
        renderer.setClearColor(0xfaf9fa)
        renderer.setPixelRatio(window.devicePixelRatio);
        return renderer;
    }

    createControls() {
        const controls = new THREE.OrbitControls(this.camera, this.canvas);

        controls.minPolarAngle = Math.PI / 2.1;  // 限制最低角度
        controls.maxPolarAngle = Math.PI / 1.9;  // 限制最高角度

        controls.enableDamping = this.config.controls.enableDamping;
        controls.enableZoom = this.config.controls.enableZoom;
        controls.enablePan = this.config.controls.enablePan;

        //* 倒数
        controls.rotateSpeed = (1 / this.projectsData.length) * 10;

        return controls;
    }

    loadImages() {

        const radius = this.config.circle.radius;

        const textureLoader = new THREE.TextureLoader();

        //? Why screen factor?
        //? Because in 3d world it's not pixel as unit. The unit in 3d world is relative to 3d scene 
        let screenFactor;

        let innerWidth = window.innerWidth;


        if (innerWidth > 2160) {
            screenFactor = innerWidth * 0.00008 * this.config.circle.radius
        }
        else if (innerWidth > 1080) {
            screenFactor = innerWidth * 0.00012 * this.config.circle.radius
        } else if (window.innerWidth > 720) {
            screenFactor = innerWidth * 0.00017 * this.config.circle.radius
        } else {
            screenFactor = innerWidth * 0.0003 * this.config.circle.radius
        }

        const imageWidth = screenFactor * 1.5;  // 调整宽高比例
        const imageHeight = screenFactor;

        // Calculate starting angle offset to center the first image in front
        const angleOffset = -Math.PI / 2; // Start from front (negative Z-axis)


        this.projectsData.forEach((project, index) => {

            const angle = (index / this.projectsData.length) * Math.PI * 2 - angleOffset; // Calculate angle for each project

            const texture = textureLoader.load(project.image1);

            // Set texture properties for better quality
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBAFormat;
            
            // Ensure proper texture wrapping
            texture.wrapS = THREE.ClampToEdgeWrap;
            texture.wrapT = THREE.ClampToEdgeWrap;

            // const geometry = new THREE.PlaneGeometry(...this.config.imageSize);
            const geometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );

            mesh.userData = {
                projectIndex: index,
                baseScale: 1.0,
                projectData: project, // Store the complete project data
                title: project.title,
                year: project.year,
                jobType: project.jobType,
                projectType: project.projectType,
                tags: project.tags,
                cta: project.cta
            };

            // mesh.lookAt(new THREE.Vector3(0,0,0))
            mesh.lookAt(this.camera.position)

            this.projects.push(mesh);
            this.scene.add(mesh);
        });

    }

    addEventListeners() {
        window.addEventListener("resize", () => this.onWindowResize());

        //* Pointer listener for mouse event
        this.canvas.addEventListener("pointerdown", (event) => { this.onPointerDown(event) });
        this.canvas.addEventListener("pointerup", (event) => this.onPointerUp(event));
    }

    animate() {

        //* Keep repeating animate
        requestAnimationFrame(() => this.animate());

        //* Animate的时候更新相机的位置
        this.controls.update();

        const minDistance = this.config.circle.radius;
        const maxDistance = this.config.circle.radius * 3;
        const scaleFactor = 1;


        this.projects.forEach(mesh => {
            const distance = this.camera.position.distanceTo(mesh.position);
            // 归一化距离到 0 ~ 1（近处 0，远处 1）
            const normalizedDistance = Math.min(1, Math.max(0, (distance - minDistance) / (maxDistance - minDistance)));

            // 控制缩放（近处最大，远处最小）
            const scale = mesh.userData.baseScale * Math.pow((1 - normalizedDistance), 1.1) * (1 + scaleFactor);

            if (!this.isMouseDown) {
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

        // Update UI based on currently focused project
        const focusedResult = this.getCurrentlyFocusedProject();
        if (focusedResult && focusedResult.index !== this.currentProjectIndex) {
            this.currentProjectIndex = focusedResult.index;
            const projectData = this.projectsData[this.currentProjectIndex];
            this.updateProjectInfo(projectData, this.currentProjectIndex);
            this.updateNavigationCounter(this.currentProjectIndex);
        }

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
            const projectData = clickedProject.userData.projectData;

            this.navigateToProject(projectData.cta)
        }

    }

    //* Calculate the move position
    onPointerDown(event) {

        this.isMouseDown = true;
        this.mouseDownPos = { x: event.clientX, y: event.clientY }

        this.projects.forEach(mesh => {
            gsap.to(mesh.scale, {
                x: mesh.userData.baseScale,
                y: mesh.userData.baseScale,
                z: mesh.userData.baseScale,
                duration: 0.25,
                onUpdate: () => {
                    this.renderer.render(this.scene, this.camera); // Ensure re-rendering during animation
                }
            });
        });
    }

    //* Mouse up
    onPointerUp(event) {

        this.isMouseDown = false;

        const moveDistance = Math.sqrt(
            Math.pow(event.clientX - this.mouseDownPos.x, 2) + Math.pow(event.clientY - this.mouseDownPos.y, 2)
        )

        const clickThreshold = 5

        if (moveDistance < clickThreshold) {
            this.onMouseClick(event)
        }

        if (moveDistance > 20 && this.isAnimating == false){

            this.canvas.style.pointerEvents = "none"
            this.isAnimating = true
            
            setTimeout(() => {
                let { nearestObject } = getNearestObject(this.camera, this.projects);
                
                //* The thetha of object
                let phi = Math.atan2(nearestObject.position.z, nearestObject.position.x)
                
                if (nearestObject) {
                    gsap.to(this.camera.position, {
                        x: this.config.circle.radius * 2 * Math.cos(phi), // Calculate the new X position
                        y: this.camera.position.y,       // Keep the Y position the same
                        z: this.config.circle.radius * 2 * Math.sin(phi), // Calculate the new Z position
                        duration: 1, // Duration of 1 second for the animation
                        onUpdate: () => {
                            this.renderer.render(this.scene, this.camera); // Ensure re-rendering during animation
                        },
                        onComplete: () => {
                            this.isAnimating = false
                            this.canvas.style.pointerEvents = "auto"
                        }
                    });
                }
            }, 500)
        }


    }

    //* Handle Window Resizing
    onWindowResize() {
        this.renderSize.width = window.innerWidth;
        this.renderSize.height = window.innerHeight;

        this.camera.aspect = this.renderSize.width / this.renderSize.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.renderSize.width, this.renderSize.height);
    }


    updateCameraPositionAroundOrbit(newAngle) {

        this.camera.position.x = 2 * radius * Math.cos(newAngle); // Update X position
        this.camera.position.z = 2 * radius * Math.sin(newAngle); // Update Z position

    }

    //* Navigate to project page
    navigateToProject(ctaPath) {
        if (ctaPath) {
            window.location.href = `/${ctaPath}/index.html`;
        }
    }    initUIElements() {
        // Get UI elements
        this.infoPanel = document.getElementById('project-info-panel');
        this.projectTitle = document.getElementById('project-title');
        this.projectYear = document.getElementById('project-year');
        this.projectType = document.getElementById('project-type');
        this.currentProjectSpan = document.getElementById('current-project');
        this.totalProjectsSpan = document.getElementById('total-projects');
        this.progressCircle = document.getElementById('progress-circle');
        
        console.log('UI Elements initialized:', {
            infoPanel: !!this.infoPanel,
            projectTitle: !!this.projectTitle,
            navigation: !!this.currentProjectSpan
        });
        
        // Set total projects count
        if (this.totalProjectsSpan) {
            this.totalProjectsSpan.textContent = this.projectsData.length;
        }
        
        // Add click handler for info panel
        if (this.infoPanel) {
            this.infoPanel.addEventListener('click', () => {
                const currentProject = this.projectsData[this.currentProjectIndex];
                if (currentProject && currentProject.cta) {
                    this.navigateToProject(currentProject.cta);
                }
            });
        }
    }

    getCurrentlyFocusedProject() {
        if (this.projects.length === 0) return null;
        
        let minDistance = Infinity;
        let focusedProject = null;
        let focusedIndex = 0;
        
        this.projects.forEach((mesh, index) => {
            const distance = this.camera.position.distanceTo(mesh.position);
            if (distance < minDistance) {
                minDistance = distance;
                focusedProject = mesh;
                focusedIndex = index;
            }
        });
        
        return { project: focusedProject, index: focusedIndex };
    }

    updateProjectInfo(projectData, index) {
        if (!this.infoPanel || !projectData) return;
        
        // Update project info
        if (this.projectTitle) {
            this.projectTitle.textContent = projectData.title || 'Untitled Project';
        }
        
        if (this.projectYear) {
            this.projectYear.textContent = projectData.year || '';
        }
        
        if (this.projectType) {
            this.projectType.textContent = projectData.projectType || projectData.jobType || '';
        }
        
        if (this.projectTags) {
            this.projectTags.innerHTML = '';
            if (projectData.tags && Array.isArray(projectData.tags)) {
                projectData.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'project-tag';
                    tagElement.textContent = tag;
                    this.projectTags.appendChild(tagElement);
                });
            }
        }
        
        if (this.projectDescription) {
            // Create a description from available data if no description field exists
            let description = projectData.description || projectData.subtitle || '';
            if (!description) {
                description = `A ${projectData.projectType || 'project'} in ${projectData.jobType || 'development'}`;
                if (projectData.tags && projectData.tags.length > 0) {
                    description += ` using ${projectData.tags.slice(0, 2).join(' and ')}`;
                    if (projectData.tags.length > 2) {
                        description += ` and more`;
                    }
                }
                description += '.';
            }
            this.projectDescription.textContent = description;
        }
        
        // Show the info panel
        this.infoPanel.classList.add('active');
        
        // Add debug class for testing
        this.infoPanel.classList.add('debug');
        
        console.log('Project info updated:', projectData.title);
    }

    updateNavigationCounter(currentIndex) {
        // Update current project number (1-based)
        if (this.currentProjectSpan) {
            this.currentProjectSpan.textContent = currentIndex + 1;
        }
        
        // Update circular progress
        if (this.progressCircle) {
            const progress = (currentIndex + 1) / this.projectsData.length;
            const circumference = 157; // 2 * π * r (where r = 25)
            const offset = circumference - (progress * circumference);
            this.progressCircle.style.strokeDashoffset = offset;
        }
    }    hideProjectInfo() {
        if (this.infoPanel) {
            this.infoPanel.classList.remove('active');
        }
    }
}

//* Function to get the nearest object
function getNearestObject(camera, objects) {
    let minDistance = Infinity;
    let nearestObject = null;
    let nearestIndex = -1;

    objects.forEach((mesh, index) => {
        const distance = camera.position.distanceTo(mesh.position);
        if (distance < minDistance) {
            minDistance = distance;
            nearestObject = mesh;
            nearestIndex = index;
        }
    })


    return { nearestObject };
}

const radius = 45;

const galleryConfig = {
    camera: {
        fov: 45,
        position: [0, 0, radius * 2]
    },
    controls: {
        enableDamping: true,
        enableZoom: false,
        enablePan: false
    },
    circle: {
        radius: radius
    }
};

const gallery = new GalleryScene("#infinte-gallery", galleryConfig)