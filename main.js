

// 使用插件
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; //控制相機
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; //加載3D模型
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js'; //移動效果
import { FontLoader } from 'three/addons/loaders/FontLoader.js'; //建立文字
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'; //建立文字

//建立場景
var scene = new THREE.Scene();

//建立渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); //場景大小
renderer.setClearColor(0x000000, 1.0); //預設背景顏色
renderer.shadowMap.enable = true; //陰影效果
document.body.appendChild(renderer.domElement); //將渲染器的DOM綁到網頁上

//建立相機
var camera = new THREE.PerspectiveCamera(
    45,//視角45
    window.innerWidth / window.innerHeight, //大小
    0.1,
    1000
);
camera.position.set(10, 10, 10); //相機位置
camera.lookAt(scene.position); //相機焦點

// scene.add(new THREE.AxesHelper(5)); //加入x、y、z軸
// scene.add(new THREE.GridHelper(30, 30, 0x555555)); //加入grid
// camera.lookAt(scene.position); //改成由上方往原點看

//建立光源
let pointLight = new THREE.SpotLight(0xADD8E6); //建一個SpotLight
pointLight.position.set(0, 8, 0); //位置
pointLight.intensity = 1; //燈光強度
scene.add(pointLight); //將燈光添加到場景裡

let play_Light = new THREE.PointLight(0x800080); //建一個PointLight
play_Light.position.set(3.5, 1.4, -6.5);
play_Light.intensity = 1;
scene.add(play_Light);

let sign_Light = new THREE.PointLight(0x00ffff); //建一個PointLight
sign_Light.position.set(-3.5, 1.2, -6);
sign_Light.intensity = 1;
scene.add(sign_Light);

//建立地板
const geometry1 = new THREE.PlaneGeometry(12, 12); //建一個平面
const material1 = new THREE.MeshPhongMaterial({ //建材質
    color: 0x272727 //給顏色
});
const plane2 = new THREE.Mesh(geometry1, material1); //建立網格物件
plane2.position.set(0, 0, 0); //設置位置
plane2.rotation.x = Math.PI / 2; //平面向x軸旋轉90度
plane2.rotation.y = Math.PI; //平面向z軸旋轉180度
scene.add(plane2); //將平面添加到場景中

//建立 OrbitControls
var cameraControl = new OrbitControls(camera, renderer.domElement); //建一個相機控制器
cameraControl.enableDamping = true; // 啟用阻尼效果(類似滑鼠靈敏度)
cameraControl.dampingFactor = 0.25; // 阻尼系數(類似滑鼠靈敏度)


//加載3D模型
var loader = new GLTFLoader();
//建立vending_machine
loader.load('/Final/coca-cola_vending_machine_low-poly_prop/scene.gltf', function (gltf) {
    const vending_machine = gltf.scene;
    vending_machine.scale.set(1.2, 1.2, 1.2);
    vending_machine.rotation.y = Math.PI / 2;
    vending_machine.position.z = -2;
    vending_machine.position.x = 3;
    scene.add(vending_machine);
}, undefined, function (error) {
    console.error(error);
});

//建立pacman_machine開始--------------------
loader.load('/Final/pacman_arcade__animation/scene.gltf', function (gltf) {
    const pacman_machine = gltf.scene;
    pacman_machine.scale.set(0.05, 0.05, 0.05);
    pacman_machine.position.z = -5;
    scene.add(pacman_machine);
}, undefined, function (error) {
    console.error(error);
});
const pacman_video = document.createElement('video'); //匯入影片
pacman_video.src = 'pacman-1980-gameplay.mp4'; 
pacman_video.loop = true; //影片設置成循環播放
const pacman_videoTexture = new THREE.VideoTexture(pacman_video); //將影片做成材質
pacman_videoTexture.minFilter = THREE.LinearFilter;
pacman_videoTexture.magFilter = THREE.LinearFilter;
pacman_videoTexture.format = THREE.RGBAFormat; //影片格式
//建立pacman_machine動畫
const pacman_Animation = new THREE.PlaneGeometry(1.3, 1.65); //建立一個平面
const material_pacman = new THREE.MeshBasicMaterial({ map: pacman_videoTexture }); //將影片套在平面上
const plane_pacman = new THREE.Mesh(pacman_Animation, material_pacman);
plane_pacman.rotation.x = -Math.PI / 6;
plane_pacman.position.set(0, 2.1, -5);
scene.add(plane_pacman);
//建立pacman_machine結束--------------------

//建立table
loader.load('/Final/table/scene.gltf', function (gltf) {
    const table = gltf.scene;
    table.scale.set(0.5, 0.5, 0.5);
    table.position.x = 1.5;
    table.position.y = 1.5;
    table.position.z = 3.5;
    scene.add(table);
}, undefined, function (error) {
    console.error(error);
});

//建立pc開始------------------
loader.load('/Final/cheburashka_pc-2023/scene.gltf', function (gltf) {
    const pc = gltf.scene;
    pc.scale.set(0.3, 0.3, 0.3);
    pc.position.y = 2;
    pc.position.x = -4;
    pc.rotation.y = Math.PI / 2;
    scene.add(pc);
}, undefined, function (error) {
    console.error(error);
});
const pc_video = document.createElement('video');
pc_video.src = 'windows-2000-startup-and-shutdown.mp4';
pc_video.loop = true;
const videoTexture = new THREE.VideoTexture(pc_video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBAFormat;
//建立PC動畫
const PC_Animation = new THREE.PlaneGeometry(1.2, 0.68);
const material_PC = new THREE.MeshBasicMaterial({ map: videoTexture });
const plane_PC = new THREE.Mesh(PC_Animation, material_PC);
plane_PC.rotation.y = Math.PI / 2;
plane_PC.position.set(-4.01, 2.05, 0);
scene.add(plane_PC);
//建立pc結束------------------

//建立sofa
loader.load('/Final/sofa/scene.gltf', function (gltf) {
    const sofa = gltf.scene;
    sofa.scale.set(2, 2, 2);
    sofa.position.x = 5;
    sofa.rotation.y = -Math.PI / 2;
    scene.add(sofa);
}, undefined, function (error) {
    console.error(error);
});

//建立chair
loader.load('/Final/old_leather_office_chair/scene.gltf', function (gltf) {
    const chair = gltf.scene;
    chair.rotation.y = Math.PI / 2;
    chair.scale.set(1.2, 1.2, 1.2);
    chair.position.y = 1.2;
    chair.position.x = -2.3;
    scene.add(chair);
}, undefined, function (error) {
    console.error(error);
});

//建立dragon_glass
loader.load('/Final/dragon_glass/scene.gltf', function (gltf) {
    const dragon_glass = gltf.scene;
    dragon_glass.scale.set(0.08, 0.08, 0.08);
    dragon_glass.position.x = -4;
    dragon_glass.position.y = 1.2;
    dragon_glass.position.z = 3;
    scene.add(dragon_glass);
}, undefined, function (error) {
    console.error(error);
});
const dragon_Animation = new THREE.PlaneGeometry(0.8, 2.25);
const material_dragon = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
const plane_dragon = new THREE.Mesh(dragon_Animation, material_dragon);
plane_dragon.rotation.y = Math.PI / 2;
plane_dragon.position.set(-3.5, 1.2, 3);
scene.add(plane_dragon);

//建立sign_neon
loader.load('/Final/sign_neon/scene.gltf', function (gltf) {
    const sign_neon = gltf.scene;
    sign_neon.scale.set(0.08, 0.08, 0.08);
    sign_neon.position.x = -3.5;
    sign_neon.position.y = 1.2;
    sign_neon.position.z = -6;
    scene.add(sign_neon);
}, undefined, function (error) {
    console.error(error);
});

//建立play_neon
loader.load('/Final/play_neon/scene.gltf', function (gltf) {
    const play_neon = gltf.scene;
    play_neon.scale.set(0.3, 0.3, 0.3);
    play_neon.position.x = -6.5;
    play_neon.position.y = 1.5;
    play_neon.position.z = -5.5;
    scene.add(play_neon);
}, undefined, function (error) {
    console.error(error);
});

// 製作reset_camera按鈕開始----------------------
const reset_camera = new THREE.PlaneGeometry(0.12, 0.05);
const reset_material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
const plane_reset = new THREE.Mesh(reset_camera, reset_material);
plane_reset.rotation.y = Math.PI / 2;
plane_reset.position.set(-3.999, 1.8, -0.4);
scene.add(plane_reset);

const reset_camera1 = new THREE.PlaneGeometry(0.12, 0.08);
const plane_reset1 = new THREE.Mesh(reset_camera1, reset_material);
plane_reset1.position.set(0, 2.3, -3.9);
scene.add(plane_reset1);

const reset_camera2 = new THREE.PlaneGeometry(0.12, 0.08);
const plane_reset2 = new THREE.Mesh(reset_camera2, reset_material);
plane_reset2.position.set(-2.9, 1.2, 3);
plane_reset2.rotation.y = Math.PI / 2;
scene.add(plane_reset2);
// 製作reset_camera按鈕結束----------------------

//創建時鐘鐘錶
var clockGeometry = new THREE.CircleGeometry(0.75, 1);
var clockMaterial = new THREE.MeshBasicMaterial({ color: 0x191970, transparent: true, opacity: 0.7 });
var clock = new THREE.Mesh(clockGeometry, clockMaterial);
clock.position.x = -5;
clock.position.y = 2.2;
clock.position.z = -4;
clock.rotation.y = Math.PI / 2;
clock.rotation.z = Math.PI / 2;
scene.add(clock);

//創建時針
var hourHandGeometry = new THREE.BoxGeometry(0.025, 0.2, 0.025);
var hourHandMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f8ff });
var hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
hourHand.rotation.x = Math.PI;
clock.add(hourHand);

//創建分針
var minuteHandGeometry = new THREE.BoxGeometry(0.025, 0.4, 0.025);
var minuteHandMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f8ff });
var minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);
minuteHand.rotation.x = Math.PI;
clock.add(minuteHand);

//創建秒針
var secondHandGeometry = new THREE.BoxGeometry(0.025, 0.6, 0.05);
var secondHandMaterial = new THREE.MeshBasicMaterial({ color: 0xb0c4de });
var secondHand = new THREE.Mesh(secondHandGeometry, secondHandMaterial);
secondHand.rotation.x = Math.PI;
clock.add(secondHand);

function animate() {
    requestAnimationFrame(animate);
    // 獲取當前時間
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    //設置時針、分針與秒針的旋轉角度
    hourHand.rotation.z = -Math.PI / 2 + (hours + minutes / 60) * (Math.PI / 6);
    minuteHand.rotation.z = -Math.PI / 2 + (minutes + seconds / 60) * (Math.PI / 30);
    secondHand.rotation.z = -Math.PI / 2 + seconds * (Math.PI / 30);
}

//滑鼠點擊，視線追蹤
document.addEventListener('mousedown', onDocumentMouseDown, false);
function onDocumentMouseDown(event) {
    event.preventDefault(); //阻止滑鼠行為，避免頁面滾動

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; //獲取滑鼠點擊位置
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster(); //創建一個射線投射器
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) { //如果點到物品，拉近相機
        const intersectedObject = intersects[0].object;
        const cameraStartPosition = camera.position.clone(); //紀錄目前相機位置
        const duration = 1000; //持續1秒
        const easing = TWEEN.Easing.Quadratic.Out; //使用二次函数移動

        //如果點到電腦，相機聚焦到電腦前
        if (intersectedObject.id === plane_PC.id) {
            const targetPosition = new THREE.Vector3(-3, 2.05, 0); //相機目標位置
            const lookAtPosition = new THREE.Vector3(-5, 2.05, 0); //相機面向位置

            new TWEEN.Tween(cameraStartPosition) //相機從目前位置開始移動
                .to(targetPosition, duration) //移動到targetPosition這個位置
                .easing(easing) //移動效果
                .onUpdate(() => { //在Tween動畫更新時更新相機位置
                    // console.log('targetPosition:', targetPosition);
                    camera.position.copy(cameraStartPosition); //紀錄相機位置
                    camera.lookAt(lookAtPosition); //改變相機朝向
                    cameraControl.target.set(lookAtPosition); //改變相機朝向
                    // console.log('lookAtPosition:', lookAtPosition);
                })
                .start();
            pc_video.play(); //播放影片
        }

        //如果點到遊戲機，相機聚焦到遊戲機前
        if (intersectedObject.id === plane_pacman.id) {
            const targetPosition = new THREE.Vector3(0, 3, -2.2); //相機目標位置
            const lookAtPosition = new THREE.Vector3(0, 2, -5); //相機面向位置

            new TWEEN.Tween(cameraStartPosition)
                .to(targetPosition, duration)
                .easing(easing)
                .onUpdate(() => {//在Tween動畫更新時更新相機位置
                    console.log('targetPosition:', targetPosition);
                    camera.position.copy(cameraStartPosition);
                    camera.lookAt(lookAtPosition);
                    cameraControl.target.set(lookAtPosition);
                    console.log('lookAtPosition:', lookAtPosition);
                })
                .start();
            pacman_video.play();
        }

        //如果點到龍的展示櫃，相機聚焦到展示櫃前
        if (intersectedObject.id === plane_dragon.id) {
            const targetPosition = new THREE.Vector3(-1, 1.2, 3); //相機目標位置
            const lookAtPosition = new THREE.Vector3(-4, 1.2, 3); //相機面向位置

            new TWEEN.Tween(cameraStartPosition)
                .to(targetPosition, duration)
                .easing(easing)
                .onUpdate(() => {//在Tween動畫更新時更新相機位置
                    console.log('targetPosition:', targetPosition);
                    camera.position.copy(cameraStartPosition);
                    camera.lookAt(lookAtPosition);
                    cameraControl.target.set(lookAtPosition);
                })
                .start();

            //創建說明文字
            const textLoader = new FontLoader();
            textLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', //匯入文字模組
            function (font) {
                const textGeometry = new TextGeometry('· Dragon', {
                    font: font,
                    size: 0.05, //字的大小
                    height: 0.01, //字的厚度
                });
                const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(-3, 1.4, 2.6); //設置文字位置
                textMesh.rotation.y = Math.PI / 2;
                scene.add(textMesh);
                textMesh.visible = true;
            });
        }

        //如果點到時鐘，相機聚焦到時鐘前
        if (intersectedObject.id === clock.id) {
            const targetPosition = new THREE.Vector3(-3, 2.2, -4); //相機目標位置
            const lookAtPosition = new THREE.Vector3(-5, 2.2, -4); //相機面向位置

            new TWEEN.Tween(cameraStartPosition)
                .to(targetPosition, duration)
                .easing(easing)
                .onUpdate(() => {//在Tween動畫更新時更新相機位置
                    console.log('targetPosition:', targetPosition);
                    camera.position.copy(cameraStartPosition);
                    camera.lookAt(lookAtPosition);
                    cameraControl.target.set(lookAtPosition);
                    console.log('lookAtPosition:', lookAtPosition);
                })
                .start();
        }

        //恢復相機視角
        if (intersectedObject.id === plane_reset.id || intersectedObject.id === plane_reset1.id ||
            intersectedObject.id === plane_reset2.id || intersectedObject.id === hourHand.id) {
            camera.position.set(10, 10, 10); //相機位置
            camera.lookAt(scene.position); //相機焦點
            cameraControl.target.set(0, 0, 0);
            pc_video.pause(); //暫停影片
            pacman_video.pause(); //暫停影片
        }
    }
}

//渲染場景
function render() {
    requestAnimationFrame(render);
    TWEEN.update();
    renderer.render(scene, camera);
    animate(); //時鐘轉動動畫
}

render();
