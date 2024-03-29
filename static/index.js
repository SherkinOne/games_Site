function createRoom() {
    // planes for floors and walls


}

function loadPapers(){

//     var geo = new THREE.PlaneBufferGeometry(1000, 200, 8, 8);
// var mat = new THREE.MeshBasicMaterial({ color: 0x124320, side: THREE.DoubleSide });
// var plane = new THREE.Mesh(geo, mat);
// plane.position.setZ(25);
// scene.add(plane);
// // this is a wall - needs to be rotated and material  - may clone it
// wall=plane.clone;
// plane.rotateZ(2);
// scene.add(wall);
}


function loadFurniture() {
    console.log("load furniture");

   
    var ship_material = new THREE.MeshPhongMaterial({ color: 0x444444 });
    var loader = new THREE.OBJLoader();
    loader.load('/static/models/chaise.obj',
        // loader.load( '/static/models/desk.obj',
        function (obj) {
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = ship_material;
                }
            });
            obj.scale.set(8, 6, 8);
            obj.position.setZ(-25);
            obj.position.setY(-17);
            obj.position.setX(25);

            scene.add(obj);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + "% loaded")
        },
        function (err) {
            console.error("Error loading 'ship.obj'")
        }
    );
    var loader = new THREE.TextureLoader();

    loader.load("/static/images/wood.jpg",
        function (texture) {
            displayPanels(texture);
        });

}

function displayPanels(texture) {
    var ship_material = new THREE.MeshPhongMaterial({ color: 0x412444, map: texture });
    var loader = new THREE.OBJLoader();
    loader.load('/static/models/room.obj',
        // loader.load( '/static/models/desk.obj',
        function (obj) {
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = ship_material;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            // obj.rotateY(90);
            obj.scale.set(10, 10, 10);
            // obj.position.setZ(-20);
            scene.add(obj);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + "% loaded")
        },
        function (err) {
            console.error("Error loading 'ship.obj'")
        }
    );

}
//init scene, camera and camera position
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera, renderer.domElement);

function init() {

    renderer.setSize(window.innerWidth, 1000);

    document.body.appendChild(renderer.domElement);

    // add planes relative to the arrays (double side them)

    // Add block for pixel data - merge to original
    camera.position.z = -200;
    camera.position.y = 20;
    // camera.rotation.x= 1.5;
    scene.add(camera);
 
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 10;
    
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);

    //OBJECTS
    //here we add objects by functions which we will write below
    createRoom();
    loadFurniture();
    loadPapers();

    //adding scene and camera to the render

    var animate = function () {
        requestAnimationFrame(animate);

        controls.update();
        renderer.render(scene, camera);
    };

    animate();
};

init();