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

var current_position = new THREE.Vector3(4,3,0.8);
var target_position = new THREE.Vector3(1,4,0);
var current_velocity = new THREE.Vector3(2,2,0);
var target_angle = 52*Math.PI/180;

export default function LandingForAngleDemo() {
	const [_renderer, setRenderer] = useState<THREE.WebGLRenderer>();
	const [posX, setPosX] = useState(3);
	const [posY, setPosY] = useState(4);
	const [velX, setVelX] = useState(1);
	const [velY, setVelY] = useState(1);
	var [targAngle, setTargAngle] = useState(3.141592/2.5);

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

	// The real meat and potatoes
	function calculateLandingArc(current_position: THREE.Vector3,
								target_position: THREE.Vector3,
								current_velocity: THREE.Vector3) {
		var ground_vector = target_position.clone().sub(current_position);
		ground_vector.setComponent(2, 0);
		var final = new THREE.Vector3();
		var d = ground_vector.length();
		var h = target_position.z - current_position.z;
		var x_hat = Math.sqrt( (9.81/2*d*d) / (Math.sin(target_angle)/Math.cos(target_angle)*d - h) )
		ground_vector = ground_vector.divideScalar(d).multiplyScalar(x_hat);

		var y_hat = x_hat * Math.sin(target_angle)/Math.cos(target_angle);

		var final = ground_vector.clone();
		final.setComponent(2, y_hat).sub(current_velocity);

		return final
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
	var aim_vector = calculateLandingArc(current_position, target_position, current_velocity);
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
			aim_vector = calculateLandingArc(current_position, target_position, current_velocity);
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
										min={0}
										value={velX}
										max={5}
										step={0.1}
										onChange={value => {
											current_velocity.setComponent(0, velX);
											setVelX(value);
										}} />
					Velocity Y: <Slider progress
										style={{ marginTop: 16 }}
										min={0}
										value={velY}
										max={5}
										step={0.1}
										onChange={value => {
											current_velocity.setComponent(1, velY);
											setVelY(value);
										}} />
					Target Angle: <Slider progress
										style={{ marginTop: 16 }}
										min={0}
										value={targAngle}
										max={3.141592/2.2}
										step={0.01}
										onChange={value => {
											target_angle = value;
											setTargAngle(value);
										}} />
				</div>
			</div>
		</>
	);
}
