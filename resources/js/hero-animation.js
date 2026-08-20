import * as THREE from 'three';
import { gsap } from 'gsap';

export class HeroAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        this.objects = [];
        this.mouse = { x: 0, y: 0 };

        this.init();
        this.addObjects();
        this.addLights();
        this.animate();
        this.handleResize();
        this.handleMouseMove();
    }

    init() {
        // Init background or other settings if needed
    }

    addObjects() {
        // Orbiting Rings
        const ringGeometry = new THREE.TorusGeometry(3, 0.005, 16, 100);
        const ringMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4DA6FF, 
            transparent: true, 
            opacity: 0.2 
        });

        for (let i = 0; i < 5; i++) {
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.random() * Math.PI;
            ring.rotation.y = Math.random() * Math.PI;
            ring.scale.set(1 - i * 0.15, 1 - i * 0.15, 1 - i * 0.15);
            this.scene.add(ring);
            this.objects.push({ mesh: ring, type: 'ring', speed: 0.002 + i * 0.001 });
        }

        // Floating Glass Cards
        const cardGeometry = new THREE.BoxGeometry(1.2, 1.6, 0.02);
        const cardMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0.1,
            transmission: 0.95,
            thickness: 0.2,
            transparent: true,
            opacity: 0.3,
            clearcoat: 1,
        });

        for (let i = 0; i < 6; i++) {
            const card = new THREE.Mesh(cardGeometry, cardMaterial);
            card.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 4
            );
            card.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            this.scene.add(card);
            this.objects.push({ 
                mesh: card, 
                type: 'card', 
                offset: Math.random() * Math.PI * 2,
                floatSpeed: 0.005 + Math.random() * 0.005,
                rotSpeed: (Math.random() - 0.5) * 0.01
            });
        }

        // Floating Glowy Spheres (representing data/AI)
        const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
        const colors = [0x4DA6FF, 0x7B61FF, 0x00D1FF, 0xFF61D2];

        for (let i = 0; i < 15; i++) {
            const mat = new THREE.MeshStandardMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                emissive: colors[Math.floor(Math.random() * colors.length)],
                emissiveIntensity: 2,
            });
            const sphere = new THREE.Mesh(sphereGeometry, mat);
            sphere.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            );
            this.scene.add(sphere);
            this.objects.push({ 
                mesh: sphere, 
                type: 'sphere',
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.01,
                    (Math.random() - 0.5) * 0.01
                )
            });
        }
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x7B61FF, 15);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0x4DA6FF, 15);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        });
    }

    handleMouseMove() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) - 0.5;
            this.mouse.y = (e.clientY / window.innerHeight) - 0.5;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        this.objects.forEach(obj => {
            if (obj.type === 'ring') {
                obj.mesh.rotation.z += obj.speed;
                obj.mesh.rotation.y += obj.speed * 0.5;
            } else if (obj.type === 'card') {
                obj.mesh.position.y += Math.sin(time + obj.offset) * 0.002;
                obj.mesh.rotation.x += obj.rotSpeed;
                obj.mesh.rotation.y += obj.rotSpeed * 0.5;
            } else if (obj.type === 'sphere') {
                obj.mesh.position.add(obj.velocity);
                
                // Keep spheres within bounds
                const bounds = { x: 8, y: 8, z: 5 };
                if (Math.abs(obj.mesh.position.x) > bounds.x) obj.velocity.x *= -1;
                if (Math.abs(obj.mesh.position.y) > bounds.y) obj.velocity.y *= -1;
                if (Math.abs(obj.mesh.position.z) > bounds.z) obj.velocity.z *= -1;
                
                // Subtle pulse
                const scale = 1 + Math.sin(time * 2 + obj.mesh.position.x) * 0.1;
                obj.mesh.scale.set(scale, scale, scale);
            }
        });

        // Mouse reactivity for camera
        gsap.to(this.camera.position, {
            x: this.mouse.x * 2,
            y: -this.mouse.y * 2,
            duration: 1,
            ease: 'power2.out'
        });
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }
}
