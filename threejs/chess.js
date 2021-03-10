"use strict";

//meter:
//https://threejs.org/docs/#manual/en/introduction/Loading-3D-models

var renderer, scene, camera, cubo;
var cameraControls;
var angulo = -0.01;

init();
loadModel(1.0);
render();

function init()
{
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( new THREE.Color(0x7777FF) );
  document.getElementById('container').appendChild( renderer.domElement );

  scene = new THREE.Scene();

  var aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera( 50, aspectRatio , 0.1, 100 );
  camera.position.set( 1, 1.5, 2 );

  cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
  cameraControls.target.set( 0, 0, 0 );

  window.addEventListener('resize', updateAspectRatio );
}

function loadModel(lado) {
	const geometry = new THREE.BoxGeometry( lado, lado, lado);
	// Configura un material
	var textura = new THREE.ImageUtils.loadTexture( 'images/ilovecg.png' );
	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors, map: textura, side: THREE.DoubleSide } );
	// Construye el objeto grafico 
	cubo = new THREE.Mesh(geometry, material );
	// Añade el objeto grafico a la escena
	scene.add( cubo );
	
	const loader = new THREE.GLTFLoader();

	loader.load( 'models/soldado/soldado.json', function ( gltf ) {
		scene.add( gltf.scene );
	}, undefined, function ( error ) {
		console.error( error );
	});
}

function updateAspectRatio()
{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function update()
{
  // Cambios para actualizar la camara segun mvto del raton
  cameraControls.update();

  // Movimiento propio del cubo
	cubo.rotateOnAxis( new THREE.Vector3(0,1,0), angulo );
}

function render()
{
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}