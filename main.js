import './style.css'

import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/fontloader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector('#render'),
    antialias:true,
    alpha:true
});

// set renderer size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// set camera pos
camera.position.setX(-10);
camera.position.setY(10);
camera.position.setZ(150);

// lighting
const pointLight = new THREE.PointLight(0xFE8CFF, 0.8);
pointLight.position.set(100, 100, 100);

const ambientLight = new THREE.AmbientLight(0xFE8CFF, 0.4);
scene.add(pointLight, ambientLight);

// load font
let fontFile;
const loader = new FontLoader();
loader.load("font/Inter_Bold.json", function(font) {
    fontFile = font;
    createManyText();
});

// create text
function createText() {
    const text = new THREE.Mesh(
        new TextGeometry("saku", {
            font:fontFile,
            size:10,
            height:6,
            curveSegments:12
        }),
        new THREE.MeshStandardMaterial({color:0xFFFFFF})
    );

    const [x,y,z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(300));

    text.position.set(x,y,z);
    const randomSpeed = THREE.MathUtils.randFloat(-0.05, 0.05)
    setInterval(() => {
        text.rotation.y += randomSpeed;
    }, 1000/60)
    
    scene.add(text);
};

// create loads of text
function createManyText() {
    Array(400).fill().forEach(createText);
}


// render to screen
const clock = new THREE.Clock();
let delta = 0;
let interval = 1/60;
function animate() {
    requestAnimationFrame(animate);
    delta += clock.getDelta();
    if (delta > interval) {
        renderer.render(scene, camera);
        // text.rotation.y += 0.03;

        delta = delta % interval;
    };
}

animate();