"use client";

import 'rsuite/dist/rsuite-no-reset.min.css';
import { useEffect, useRef, useState } from "react";
import { Slider } from "rsuite";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

let WIDTH = 600;
let HEIGHT = 400;
let ASPECT = WIDTH/HEIGHT;
let NUM_STEPS = 1000;
let STEP_SIZE = 0.01;
var GRAVITY = new THREE.Vector3(0,0,-9.81);

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

var current_position = new THREE.Vector3(4,3,0);
var target_position = new THREE.Vector3(0,4,2);
var current_velocity = new THREE.Vector3(2,2,0);
// We only care about the vertical component of our velocity vector to keep things simple
var target_speed = 3;
var aim_tolerance = 0.1;
var distance_coeff = 0.1;

export default function DescentDemo() {
	const [_renderer, setRenderer] = useState<THREE.WebGLRenderer>();
	// robot position
	const [posX, setPosX] = useState(3);
	const [posY, setPosY] = useState(4);
	// robot velocity
	const [velX, setVelX] = useState(1);
	const [velY, setVelY] = useState(1);
	// tuning vars
	var [toleranceMeters, setAimTolerance] = useState(0.4);
	var [distCoeff, setDistCoeff] = useState(0.1);
	var [targSpeed, setTargSpeed] = useState(3);

	// Makes a line following the projectile's path
	function makeTrajectory(initial_vector: THREE.Vector3, initial_point: THREE.Vector3, acceleration: THREE.Vector3) {
		var current_vector = initial_vector.clone();
		var current_point = initial_point.clone();
		var acceleration_step = acceleration.clone().multiplyScalar(STEP_SIZE);
		var points = [];
		points.push(current_point.clone());
		for (var i = 0; i < NUM_STEPS; i++) {
			current_point.add(current_vector.clone().multiplyScalar(STEP_SIZE));
			current_vector.add(acceleration_step);
			points.push(current_point.clone());
		}
		return points;
	}

	// Sums all of the vectors together piece wise.
	function combineVectors(list_of_vectors: Array<THREE.Vector3>) {
		if (list_of_vectors.length == 0) return new THREE.Vector3();
		var vec = list_of_vectors[0].clone();
		for (var i = 1; i < list_of_vectors.length; i++) {
			vec.add(list_of_vectors[i]);
		}
		return vec;
	}

	// Converts a sequence of THREE.Vector3s to a native list of numbers.
	// THREE.js uses this in its geometry buffers and converts them back
	// to the correct buffer layout for WebGPU.
	function flattenVectorsToArray(list_of_vectors: Array<THREE.Vector3>) {
		var points = [];
		for (var i = 0; i < list_of_vectors.length; i++) {
			points.push(list_of_vectors[i].x);
			points.push(list_of_vectors[i].y);
			points.push(list_of_vectors[i].z);
		}
		return points;
	}

	// Converts a list of THREE.Vector3s to a more readable line object that
	// is easier to read.
	function makeThickLine(list_of_points: Array<THREE.Vector3>, line_color: string) {
		var points = flattenVectorsToArray(list_of_points);
		var geometry = new LineGeometry();
		geometry.setPositions( points );
		var material = new LineMaterial( { color: line_color, linewidth: 2 } );
		var l = new Line2( geometry, material );
		return l;
	}

	// The real meat and potatoes
	function IterateGradiantDescent(current_aim: THREE.Vector3,
									current_position: THREE.Vector3,
									target_position: THREE.Vector3,
									current_velocity: THREE.Vector3) {
		var release_vector = combineVectors([current_aim, current_velocity]);
		var arc_path = makeTrajectory(release_vector, current_position, GRAVITY);

		if (arc_path.length == 0) {
			return current_aim.clone();
		}
		
		// Distance Trackers
		var min_point: THREE.Vector3 = arc_path[0];
		var diff_vector = target_position.sub(arc_path[0]);
		console.log(diff_vector);
		var min_distance: number = diff_vector.length();
		// Velocity Trackers
		var euler_velocity: THREE.Vector3 = new THREE.Vector3();
		// We can't assume the first closest point is the actual closest point,
		// because that will kill high angle lobs, so unfortunately we have to
		// either solve the parabolic equation, the vector calculus, or iterate
		// through the whole array. We choose the latter for simplicity for now.
		return current_aim.clone();
		for (var idx = 1; idx < arc_path.length; idx++) {
			var dist = target_position.sub(arc_path[idx]);
			if (dist.length() < min_distance) {
				diff_vector = dist;
				min_distance = diff_vector.length();
				min_point = arc_path[idx].clone();
			}
		}

		// If aim is within tolerance, return the current aim vector!
		if (min_distance < aim_tolerance) {
			return current_aim.clone();
		}

		// shift the aim by some proportion of the error
		var aim_difference = diff_vector.clone().multiplyScalar(distance_coeff);
		current_aim = current_aim.add(aim_difference);

		// if the peak is short, reduce angle and increase velocity

		return current_aim.clone();
	}

	function updateLineWithPoints(line: Line2, list_of_vec3: Array<THREE.Vector3>) {
		line.geometry.dispose();
		var points = flattenVectorsToArray(list_of_vec3);
		var geometry = new LineGeometry();
		geometry.setPositions( points );
		line.geometry = geometry;
	}

	var velocity_obj = makeThickLine(
			[current_position.clone(), current_position.clone().add(current_velocity)],
			"#ff0000");
	var target_obj = makeThickLine(
			[current_position.clone(), target_position.clone()],
			"#00ff00");
	var aim_vector = IterateGradiantDescent(new THREE.Vector3(), current_position, target_position, current_velocity);
	var aim_obj = makeThickLine(
			[current_position.clone(), current_position.clone().add(aim_vector)],
			"#0000ff");
	var trajectory_arc_obj = makeThickLine(makeTrajectory(combineVectors(
			[current_velocity.clone(), aim_vector]),
			current_position, GRAVITY), "#ff00ff");

	useEffect(() => {
		// setup //
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		setRenderer(renderer);
		renderer.setSize(WIDTH, HEIGHT);
		renderer.setPixelRatio(window.devicePixelRatio);

		let scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);

		camera.up.set(0, 0, 1);
		camera.position.set(15, 2, 5);
		let controls = new OrbitControls(camera, renderer.domElement);
		controls.target = target_position.clone();
		controls.target.setComponent(2, 0);
		controls.update();
		renderer.render(scene, camera);

		/// lighting ///
		const light = new THREE.AmbientLight(0xffaaff);
		light.position.set(10, 10, 10);
		scene.add(light);

		/// geometry ///
		const axesHelper = new THREE.AxesHelper( 10 );
		scene.add( axesHelper );
		const gridHelper = new THREE.GridHelper( 10, 10 );
		gridHelper.position.setComponent(0, 5);
		gridHelper.position.setComponent(1, 5);
		gridHelper.rotation.setFromVector3(new THREE.Vector3(Math.PI/2, 0, 0));
		scene.add( gridHelper );
		scene.add(velocity_obj);
		scene.add(target_obj);
		scene.add(aim_obj);
		scene.add(trajectory_arc_obj);
		animate();

		function animate() {
			requestAnimationFrame(animate);
			updateLineWithPoints(velocity_obj,
				[current_position.clone(), current_position.clone().add(current_velocity)]);
			updateLineWithPoints(target_obj, [current_position.clone(), target_position.clone()]);
			aim_vector = IterateGradiantDescent(aim_vector, current_position, target_position, current_velocity);
			updateLineWithPoints(aim_obj, [current_position.clone(), current_position.clone().add(aim_vector)]);
			updateLineWithPoints(trajectory_arc_obj,
				makeTrajectory(combineVectors([current_velocity.clone(), aim_vector]), current_position, GRAVITY));
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
					Position X: <Slider progress
										style={{ marginTop: 16 }}
										min={0}
										value={posX}
										max={15}
										step={0.1}
										onChange={value => {
											current_position.setComponent(0, posX);
											setPosX(value);
										}} />
					Position Y: <Slider progress
										style={{ marginTop: 16 }}
										min={0}
										value={posY}
										max={10}
										step={0.1}
										onChange={value => {
											current_position.setComponent(1, posY);
											setPosY(value);
										}} />
					Velocity X: <Slider progress
										style={{ marginTop: 16 }}
										min={-5}
										value={velX}
										max={5}
										step={0.1}
										onChange={value => {
											current_velocity.setComponent(0, velX);
											setVelX(value);
										}} />
					Velocity Y: <Slider progress
										style={{ marginTop: 16 }}
										min={0-5}
										value={velY}
										max={5}
										step={0.1}
										onChange={value => {
											current_velocity.setComponent(1, velY);
											setVelY(value);
										}} />
					Target Speed: <Slider progress
										style={{ marginTop: 16 }}
										min={-5}
										value={targSpeed}
										max={10}
										step={0.1}
										onChange={value => {
											target_speed = value;
											setTargSpeed(value);
										}} />
					
					Aim Tolerance: <Slider progress
										style={{ marginTop: 16 }}
										min={0}
										value={aim_tolerance}
										max={1.5}
										step={0.05}
										onChange={value => {
											aim_tolerance = value;
											setAimTolerance(value);
										}} />
					Change Coefficient: <Slider progress
										style={{ marginTop: 16 }}
										min={0}
										value={distance_coeff}
										max={2}
										step={0.01}
										onChange={value => {
											distance_coeff = value;
											setDistCoeff(value);
										}} />
				</div>
			</div>
		</>
	);
}
