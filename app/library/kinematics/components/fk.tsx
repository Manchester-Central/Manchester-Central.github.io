"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Slider } from "rsuite";


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

// Actually a many-a-gon
function makeCircle(radius: number, originx: number, originy: number): Line2 {
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
function flattenVectorsToArray(list_of_vectors: THREE.Vector3[]): number[] {
  var points = [];
  for (var i = 0; i < list_of_vectors.length; i++) {
    points.push(list_of_vectors[i].x);
    points.push(list_of_vectors[i].y);
    points.push(list_of_vectors[i].z);
  }
  return points;
}
function makeThickLine(list_of_points: THREE.Vector3[], line_color: string): Line2 {
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

// global structures
var THREE_DISPLAY_SHIM = new THREE.Vector3(0,0,0.1)
var CARRIAGE_MOUNT_ANGLE = -15.0
var CARRIAGE_MOUNT_LENGTH = 0.2
var GRIPPER_LENGTH = 0.4
var mouse_left: number = 0;
var mouse_top: number = 0;
// The Z epsilons are to stop Z fighting
var base_offset = makeThickLine(
  [new THREE.Vector3(-1,0,0.1), new THREE.Vector3(1,0,0.1)],
  "#0000ff"
);
base_offset.material.linewidth = 4;
var elevator_segment = makeThickLine(
  [new THREE.Vector3(0,0,0.1), new THREE.Vector3(1,0,0.1)],
  "#00ffff"
);
elevator_segment.material.linewidth = 4;
var carriage_mount = makeThickLine(
  [new THREE.Vector3(0,0,0.1), new THREE.Vector3(1,0,0.1)],
  "#ff00ff"
);
carriage_mount.material.linewidth = 4;
var gripper_segment = makeThickLine(
  [new THREE.Vector3(0,0,0.1), new THREE.Vector3(1,0,0.1)],
  "#ff4400"
);
gripper_segment.material.linewidth = 4;

export default function ForwardExample() {
  const [_renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [debugText, setDebugText] = useState<string>();
  const [first_term, setFirstTerm] = useState<string>();
  const [second_term, setSecondTerm] = useState<string>();
  const [third_term, setThirdTerm] = useState<string>();

  const [pivot_deg, setPivotDeg] = useState(30);
  const [elevator_height, setElevatorHeight] = useState(0.3);
  const [wrist_deg, setWristDeg] = useState(-50);

  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0
  });

  function handleMouseMove(ev: { clientX: any; clientY: any; }) {
    setMousePosition({left: ev.clientX, top: ev.clientY});
    if (ev.clientX != 0) {
      mouse_left = ev.clientX;
      mouse_top = ev.clientY;
      updateFK(mouse_left, mouse_top);
    }
  }

  function updateFK(left: number, top: number) {
    var demo_elem = document.getElementById('fk');
    if (!demo_elem) return;
    var offsets = demo_elem.getBoundingClientRect();
    var centerx = offsets.x + offsets.width/2;
    var centery = offsets.y + offsets.height/2;
    var origin = new THREE.Vector3(0,0,0.1);
    // Note the coordinate inversion here

    // Setup the base offset to the bottom of the lift
    var base_offset_points = [new THREE.Vector3(0, 0, 0.1), new THREE.Vector3(-0.3, 0.2, 0.1)]
    updateLineWithPoints(base_offset, base_offset_points);
    
    // Setup the length of the elevator
    var elevator_points = [base_offset_points[1],
        new THREE.Vector3(Math.cos(pivot_deg/180.0*Math.PI),
                          Math.sin(pivot_deg/180.0*Math.PI),
                          0).multiplyScalar(elevator_height)
                            .add(base_offset_points[1])]
    updateLineWithPoints(elevator_segment, elevator_points);

    // Setup the carriage mount
    var carriage_points = [elevator_points[1],
        new THREE.Vector3(Math.cos((pivot_deg+CARRIAGE_MOUNT_ANGLE)/180.0*Math.PI),
                          Math.sin((pivot_deg+CARRIAGE_MOUNT_ANGLE)/180.0*Math.PI),
                          0).multiplyScalar(CARRIAGE_MOUNT_LENGTH)
                            .add(elevator_points[1])]
    updateLineWithPoints(carriage_mount, carriage_points);

    // Setup the wrist/end eff
    var gripper_points = [carriage_points[1],
        new THREE.Vector3(Math.cos((pivot_deg+CARRIAGE_MOUNT_ANGLE+wrist_deg)/180.0*Math.PI),
                          Math.sin((pivot_deg+CARRIAGE_MOUNT_ANGLE+wrist_deg)/180.0*Math.PI),
                          0).multiplyScalar(GRIPPER_LENGTH)
                            .add(carriage_points[1])]
    updateLineWithPoints(gripper_segment, gripper_points);


    // placeholder for end eff
    var angle = Math.atan2(centery-top, left-centerx);
    var sin_y = Math.sin(angle);
    setDebugText(`End Effector Location =`);
    setFirstTerm(`${gripper_points[1].getComponent(0)}`);
    setSecondTerm(`${gripper_points[1].getComponent(1)}`);
    setThirdTerm(`${gripper_points[1].getComponent(2)}`);
  }

  useEffect(() => {
    // setup //
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    setRenderer(renderer);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);

    let scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, -0.1, 1000);
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    camera.up.set(0, 1, 0);
    camera.position.set(0, 1.2, 4);

    /// geometry ///
    var floor_line = [new THREE.Vector3(-1, 0, 0.1), new THREE.Vector3(1, 0, 0.1)]
    var floor_obj = makeThickLine(floor_line, "#000000");
    scene.add(floor_obj);
    scene.add(base_offset);
    scene.add(elevator_segment);
    scene.add(carriage_mount);
    scene.add(gripper_segment);


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
      style={{ width: WIDTH, position: "relative",
        border: "1px solid black"}}
      onMouseMove={handleMouseMove}
    >
      <Container id="fk" child={_renderer.domElement} />
      <div>{debugText}</div>
      <div>&lt;{first_term},</div>
      <div>{second_term},</div>
      <div>0&gt;</div>
      <div>
          Base Pivot Angle: <Slider progress
                    style={{ marginTop: 16 }}
                    min={0}
                    value={pivot_deg}
                    max={100}
                    step={1.0}
                    onChange={value => {
                      // current_position.setComponent(0, pivot_deg);
                      setPivotDeg(value);
                    }} />
          Elevator Height: <Slider progress
                    style={{ marginTop: 16 }}
                    min={0}
                    value={elevator_height}
                    max={3}
                    step={0.1}
                    onChange={value => {
                      // current_position.setComponent(1, elevator_height);
                      setElevatorHeight(value);
                    }} />
          Wrist Angle: <Slider progress
                    style={{ marginTop: 16 }}
                    min={-70}
                    value={wrist_deg}
                    max={10}
                    step={0.1}
                    onChange={value => {
                      // current_position.setComponent(1, wrist_deg);
                      setWristDeg(value);
                    }} />
        </div>
    </div>
    </>
  );
}
