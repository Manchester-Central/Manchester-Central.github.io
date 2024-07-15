"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const WIDTH = 400;
const HEIGHT = 400;

interface ContainerProps {
  child: HTMLElement;
  id: string;
}
function Container({ child, id }: ContainerProps) {
	return (
		<div
			id={id}
			ref={(ref) => {
				ref?.appendChild(child);
			}}
		></div>
	);
}

function makeCircle(radius: number, originx: number, originy: number) {
	var points: THREE.Vector3[] = [];
	var verts = 128;
	for (var i = 0; i < verts+1; i++) {
		var r = i/verts * 2*Math.PI;
		points.push(new THREE.Vector3(radius*Math.cos(r), radius*Math.sin(r), 0));
	}
	var circle = makeThickLine(points, "#000000");
	circle.translateX(originx);
	circle.translateY(originy);
	return circle;
}
function flattenVectorsToArray(list_of_vectors: THREE.Vector3[]) {
	var points = [];
	for (var i = 0; i < list_of_vectors.length; i++) {
		points.push(list_of_vectors[i].x);
		points.push(list_of_vectors[i].y);
		points.push(list_of_vectors[i].z);
	}
	return points;
}
function makeThickLine(list_of_points: THREE.Vector3[], line_color: string) {
	var points = flattenVectorsToArray(list_of_points);
	var geometry = new LineGeometry();
	geometry.setPositions( points );
	var material = new LineMaterial( { color: line_color, linewidth: 2 } );
	material.resolution.set( WIDTH, HEIGHT );
	var l = new Line2( geometry, material );
	return l;
}
function updateLineWithPoints(line: Line2, list_of_vec3: THREE.Vector3[]) {
	line.geometry.dispose();
	var points = flattenVectorsToArray(list_of_vec3);
	var geometry = new LineGeometry();
	geometry.setPositions( points );
	line.geometry = geometry;
}

var mouse_left: number = 0;
var mouse_top: number = 0;
// The Z epsilons are to stop Z fighting
var radius_obj = makeThickLine(
	[new THREE.Vector3(0,0,0.1), new THREE.Vector3(1,0,0.1)],
	"#0000ff"
);
radius_obj.material.linewidth = 4;
var sin_obj = makeThickLine(
	[new THREE.Vector3(0,0,0.1), new THREE.Vector3(1,0,0.1)],
	"#00ffff"
);
sin_obj.material.linewidth = 4;
var cos_obj = makeThickLine(
	[new THREE.Vector3(0,0,0.1), new THREE.Vector3(1,0,0.1)],
	"#ff00ff"
);
cos_obj.material.linewidth = 4;

export default function UnitCircleDemo() {
	const [_renderer, setRenderer] = useState<THREE.WebGLRenderer>();
	const [debugText, setDebugText] = useState<string>();

	const [MousePosition, setMousePosition] = useState({
		left: 0,
		top: 0
	});

	function handleMouseMove(ev: { clientX: any; clientY: any; }) {
		setMousePosition({left: ev.clientX, top: ev.clientY});
		if (ev.clientX != 0) {
			mouse_left = ev.clientX;
			mouse_top = ev.clientY;
			updateTrigLines(mouse_left, mouse_top);
		}
	}

	function updateTrigLines(left: number, top: number) {
		var demo_elem = document.getElementById('unit-circle');
		if (!demo_elem) return;
		var offsets = demo_elem.getBoundingClientRect();
		var centerx = offsets.x + offsets.width/2;
		var centery = offsets.y + offsets.height/2;
		var origin = new THREE.Vector3(0,0,0.1);
		// Note the coordinate inversion here
		var new_pt = new THREE.Vector3(left-centerx, centery-top, 0.1).normalize();
		updateLineWithPoints(radius_obj, [origin.clone(), new_pt.clone()]);
		var angle = Math.atan2(centery-top, left-centerx);
		var cos_x = Math.cos(angle);
		var cos_pt = new THREE.Vector3(cos_x, 0, 0.1);
		updateLineWithPoints(cos_obj, [origin.clone(), cos_pt.clone()]);
		var sin_y = Math.sin(angle);
		var sin_pt = new THREE.Vector3(cos_x, sin_y, 0.1);
		updateLineWithPoints(sin_obj, [cos_pt.clone(), sin_pt.clone()]);
		setDebugText(
			`cosθ = ${cos_x.toFixed(3)}          sinθ = ${sin_y.toFixed(3)}`,
		  );
	}

	useEffect(() => {
		// setup //
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		setRenderer(renderer);
		renderer.setSize(WIDTH, HEIGHT);
		renderer.setPixelRatio(window.devicePixelRatio);

		let scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -0.1, 1000);
		var controls = new OrbitControls(camera, renderer.domElement);
		controls.update();
		camera.up.set(0, 1, 0);
		camera.position.set(0, 0, 1);

		/// geometry ///
		var circle_obj = makeCircle(1, 0, 0);
		var x_axis = makeThickLine(
			[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0)],
			"#000000");
		var y_axis = makeThickLine(
			[new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 1, 0)],
			"#000000");
		scene.add(circle_obj);
		scene.add(x_axis);
		scene.add(y_axis);
		scene.add(radius_obj);
		scene.add(sin_obj);
		scene.add(cos_obj);


		controls.update();
		controls.enabled = false;
		animate();

		function animate() {
			requestAnimationFrame(animate);
			controls.update();
			renderer?.render(scene, camera);
		}
	}, []);

	if (!_renderer) {
		return <>Loading...</>;
	}

	return (
		<>
		<div
			style={{ width: WIDTH, position: "relative" }}
			onMouseMove={handleMouseMove}
		>
			<Container id="unit-circle" child={_renderer.domElement} />
			<div>{debugText}</div>
		</div>
		</>
	);
}
