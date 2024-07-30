"use client";

import 'rsuite/dist/rsuite-no-reset.min.css';
import { useEffect, useRef, useState } from "react";
import { Button, Slider } from "rsuite";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

let WIDTH = 600;
let HEIGHT = 400;
const ORIGIN = new THREE.Vector3();
let INITIAL_SPOT = new THREE.Vector3(2,1,0);
let INITIAL_MARKER = makeCube(0.2, INITIAL_SPOT);
let END_SPOT = new THREE.Vector3(8,9,0);
let END_MARKER = makeCube(0.2, END_SPOT);
let WHEEL_STARTS = [
	new THREE.Vector3(-1,2,0),
	new THREE.Vector3(3,0,0),
	new THREE.Vector3(-1,-1,0)
];
let TRANSLATION_DIRECTION = END_SPOT.clone().sub(INITIAL_SPOT).normalize();

interface ContainerProps {
	child: HTMLElement;
}
function Container({ child }: ContainerProps) {
	return (
		<div
			ref={(ref) => {
				ref?.appendChild(child);
			}}
		></div>
	);
}

function flattenVectorsToArray(list_of_vectors: Array<THREE.Vector3>) {
	var points = [];
	for (var i = 0; i < list_of_vectors.length; i++) {
		points.push(list_of_vectors[i].x);
		points.push(list_of_vectors[i].y);
		points.push(list_of_vectors[i].z);
	}
	return points;
}

function makeThickLine(list_of_points: Array<THREE.Vector3>, line_color: string) {
	var points = flattenVectorsToArray(list_of_points);
	var geometry = new LineGeometry();
	geometry.setPositions( points );
	var material = new LineMaterial( { color: line_color, linewidth: 2 } );
	var l = new Line2( geometry, material );
	return l;
}

function updateLineWithPoints(line: Line2, list_of_vec3: Array<THREE.Vector3>) {
	line.geometry.dispose();
	var points = flattenVectorsToArray(list_of_vec3);
	var geometry = new LineGeometry();
	geometry.setPositions( points );
	line.geometry = geometry;
}

function makeCube(length: number, location: THREE.Vector3) {
	const geometry = new THREE.BoxGeometry(length, length, length);
	const material = new THREE.MeshBasicMaterial({
		color: 0x000000,
		side: THREE.DoubleSide,
	});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.translateOnAxis(location, 1);
	// Three will overwrite the transformation matrix every frame render otherwise
	//mesh.matrixAutoUpdate = false;
	return mesh;
}

export default function SwerveSimulation() {
	const [_renderer, setRenderer] = useState<THREE.WebGLRenderer>();
	var [rot_speed, setRotSpeed] = useState(30);
	var [trans_speed, setTransSpeed] = useState(4);
	var [playing, setPlaying] = useState(false);

	class RobotWheel {
		offset: THREE.Vector3;
		translation_ray: THREE.Ray;
		translation_line: Line2;
		centripetal_ray: THREE.Ray;
		centripetal_line: Line2;
		tangent_ray: THREE.Ray;
		tangent_line: Line2;
		effective_ray: THREE.Ray;
		effective_line: Line2;

		constructor(scene: THREE.Scene, offset: THREE.Vector3) {
			this.offset = offset;
			this.translation_ray = new THREE.Ray(offset.clone(), TRANSLATION_DIRECTION.clone());
			this.centripetal_ray = new THREE.Ray(ORIGIN, offset.clone());
			var tangent_direction = new THREE.Vector3(-offset.y, offset.x, 0);
			tangent_direction.normalize();
			tangent_direction.multiplyScalar(offset.length());
			this.tangent_ray = new THREE.Ray(offset.clone(), tangent_direction);
			var effctv = TRANSLATION_DIRECTION.clone().add(tangent_direction);
			this.effective_ray = new THREE.Ray(offset.clone(), effctv);

			this.translation_line = this.makeLine2FromRay(this.translation_ray, "#00ff00");
			this.centripetal_line = this.makeLine2FromRay(this.centripetal_ray, "#0000ff");
			this.tangent_line = this.makeLine2FromRay(this.tangent_ray, "#ff0000");
			this.effective_line = this.makeLine2FromRay(this.effective_ray, "#000000")
			scene.add(this.translation_line);
			scene.add(this.centripetal_line);
			scene.add(this.tangent_line);
			scene.add(this.effective_line);
		}

		makeLine2FromRay(ray: THREE.Ray, line_color: string) {
			var points = flattenVectorsToArray([ray.origin, ray.direction.clone().add(ray.origin)]);
			var geometry = new LineGeometry();
			geometry.setPositions( points );
			var material = new LineMaterial( { color: line_color, linewidth: 2 } );
			var l = new Line2( geometry, material );
			return l;
		}

		updateLine2FromRay(line: Line2, ray: THREE.Ray, scale: number = 1.0) {
			line.geometry.dispose();
			var targ_point = ray.origin.clone().add(ray.direction.clone());
			var points = flattenVectorsToArray([ray.origin, targ_point]);
			var geometry = new LineGeometry();
			geometry.setPositions( points );
			line.geometry = geometry;
		}

		updateVectors(robot_origin: THREE.Vector3, facing_angle: number, translation_speed: number) {
			var rot_matrix = new THREE.Matrix4().makeRotationZ(facing_angle);
			this.translation_ray.origin.applyMatrix4(rot_matrix);
			updateLineWithPoints(this.translation_line, [
				this.translation_ray.origin.clone().add(robot_origin),
				this.translation_ray.origin.clone().add(robot_origin).add(this.translation_ray.direction.clone())
			]);
			this.centripetal_ray.applyMatrix4(rot_matrix);
			updateLineWithPoints(this.centripetal_line, [
				this.centripetal_ray.origin.clone().add(robot_origin),
				this.centripetal_ray.origin.clone().add(robot_origin).add(this.centripetal_ray.direction.clone())
			]);
			this.tangent_ray.applyMatrix4(rot_matrix);
			this.tangent_ray.direction.normalize().multiplyScalar(this.offset.length());
			updateLineWithPoints(this.tangent_line, [
				this.tangent_ray.origin.clone().add(robot_origin),
				this.tangent_ray.origin.clone().add(robot_origin).add(this.tangent_ray.direction.clone())
			]);
			var effctv = TRANSLATION_DIRECTION.clone().add(this.tangent_ray.direction);
			this.effective_ray.set(this.tangent_ray.origin, effctv);
			updateLineWithPoints(this.effective_line, [
				this.effective_ray.origin.clone().add(robot_origin),
				this.effective_ray.origin.clone().add(robot_origin).add(this.effective_ray.direction.clone())
			]);
		}
	}

	class Robot {
		wheels: Array<RobotWheel>;
		center: THREE.Vector3;
		facing_angle: number;

		constructor() {
			this.wheels = [];
			this.center = INITIAL_SPOT.clone();
			this.facing_angle = 0;
		}

		updateRobot(time_delta: number) {
			var rot = rot_speed*(Math.PI/180)*time_delta;
			this.facing_angle = rot;

			this.wheels.forEach((wheel) => {
				wheel.updateVectors(this.center, this.facing_angle, trans_speed*time_delta);
			});
		}
	}

	useEffect(() => {
		// setup //
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		setRenderer(renderer);
		renderer.setSize(WIDTH, HEIGHT);
		renderer.setPixelRatio(window.devicePixelRatio);

		let scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
		camera.up.set(0, 0, 1);
		camera.position.set(10, -10, 15);
		let controls = new OrbitControls(camera, renderer.domElement);
		controls.target = new THREE.Vector3(5, 5, 0);
		controls.update();
		renderer.render(scene, camera);

		/// lighting ///
		const light = new THREE.AmbientLight(0xffaaff);
		light.position.set(10, 10, 10);
		scene.add(light);

		/// geometry ///
		const parts = new Robot();
		parts.wheels.push(new RobotWheel(scene, WHEEL_STARTS[0]));
		parts.wheels.push(new RobotWheel(scene, WHEEL_STARTS[1]));
		parts.wheels.push(new RobotWheel(scene, WHEEL_STARTS[2]));

		const gridHelper = new THREE.GridHelper( 10, 10 );
		gridHelper.position.setComponent(0, 5);
		gridHelper.position.setComponent(1, 5);
		gridHelper.rotation.setFromVector3(new THREE.Vector3(Math.PI/2, 0, 0));
		scene.add( gridHelper );
		scene.add(INITIAL_MARKER);
		scene.add(END_MARKER);

		var clock = new THREE.Clock();
		clock.start();

		animate();
		function animate() {
			requestAnimationFrame(animate);
			var time_delta = clock.getDelta();
			// We could update the lines here
			parts.updateRobot(time_delta);
			renderer?.render(scene, camera);
		}
	}, []);

	if (!_renderer) {
		return <>Loading...</>;
	}

	return (
		<>
			<div
				style={{ border: "1px solid black", width: 600,
				position: "relative" }}
			>
				<Container child={_renderer.domElement} />
				<div>
					<Button
						color="green"
						onClick={() => {
							playing = !playing;
						}}
					>Play</Button><br />
					Rotation Speed: <Slider progress
										style={{ marginTop: 16 }}
										min={-360}
										value={rot_speed}
										max={360}
										step={1.0}
										onChange={value => {
											setRotSpeed(value);
										}} />
					Translation Speed: <Slider progress
										style={{ marginTop: 16 }}
										min={0}
										value={trans_speed}
										max={10}
										step={0.1}
										onChange={value => {
											setTransSpeed(value);
										}} />
				</div>
			</div>
		</>
	);
}
