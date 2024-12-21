// Main file: index.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { setupRoutes } from './routes';

// Setting up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Adding 3D Text (Example for Home Section)
const fontLoader = new THREE.FontLoader();
fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new THREE.TextGeometry('Masum Verma', {
        font: font,
        size: 0.5,
        height: 0.2,
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-2, 0, 0);
    scene.add(textMesh);
});

// Adding 3D Models (Example for Projects Section)
const loader = new GLTFLoader();
loader.load('/models/project.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, -1, -2);
});

// Rendering Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Responsive Canvas
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Routes for Navigation
setupRoutes(scene, camera);
