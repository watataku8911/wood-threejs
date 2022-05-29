import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// DOM取得
const domElement = document.querySelector("#myCanvas");

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerWidth,
};

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 3, 65);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: domElement,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor("#262837");

// road
const roadGeometory = new THREE.PlaneBufferGeometry(40, 140);
const roadMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
});
const roadMesh = new THREE.Mesh(roadGeometory, roadMaterial);

roadMesh.rotation.x = -Math.PI * 0.5;
scene.add(roadMesh);

//tree
const tree = new THREE.Group();
scene.add(tree);

// stem
const stemGeometory = new THREE.BoxGeometry(1, 10, 1);
const stemMaterial = new THREE.MeshStandardMaterial({
  color: "brown",
});

//leaf
const leafGeometory = new THREE.SphereGeometry(3, 16, 16);
const leafMaterial = new THREE.MeshStandardMaterial({
  color: "green",
});

for (let i = 0; i < 25; i++) {
  const tree = new THREE.Group();
  tree.position.x = (Math.random() * 2 - 1) * 20;
  tree.position.z = (Math.random() - 0.5) * 100;
  scene.add(tree);

  const stemMesh = new THREE.Mesh(stemGeometory, stemMaterial);
  stemMesh.position.y = 5;
  tree.add(stemMesh);

  const leafMesh = new THREE.Mesh(leafGeometory, leafMaterial);
  leafMesh.position.y = 12;
  tree.add(leafMesh);
}

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionLight);

//fog
const fog = new THREE.Fog("#262837", 50, 7);
scene.fog = fog;

// control
const controls = new OrbitControls(camera, domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

const animation = () => {
  const elapsedTime = clock.getElapsedTime();
  camera.position.x = Math.cos(Math.PI * elapsedTime * 0.15) * 20;
  camera.position.z = Math.sin(Math.PI * elapsedTime * 0.15) * 20;
  camera.lookAt(0, 3, 0);
  requestAnimationFrame(animation);

  controls.update();
  renderer.render(scene, camera);
};

animation();

const onResize = () => {
  // サイズを取得
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(sizes.width, sizes.height);

  // カメラのアスペクト比を正す
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
};

onResize();

// リサイズイベント発生時に実行
window.addEventListener("resize", onResize);
