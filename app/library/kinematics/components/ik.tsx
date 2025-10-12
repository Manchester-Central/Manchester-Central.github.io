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

export default function InverseExample() {
  const [_renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [first_term, setFirstTerm] = useState<string>();
  const [second_term, setSecondTerm] = useState<string>();
  const [third_term, setThirdTerm] = useState<string>();

  const [target_x, setTargetX] = useState(0.8);
  const [target_y, setTargetY] = useState(1.2);
  const [endeff_angle, setEndEffAngle] = useState(-50);

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
    var endeff_point = new THREE.Vector3(target_x, target_y, 0.1);
    // Note the coordinate inversion here

    // Setup the base offset to the bottom of the lift
    var base_offset_points = [new THREE.Vector3(0, 0, 0.1), new THREE.Vector3(-0.3, 0.2, 0.1)]
    updateLineWithPoints(base_offset, base_offset_points);

    // Setup the wrist/end eff
    var gripper_points = [endeff_point,
        new THREE.Vector3(Math.cos((endeff_angle)/180.0*Math.PI),
                          Math.sin((endeff_angle)/180.0*Math.PI),
                          0).multiplyScalar(-GRIPPER_LENGTH)
                            .add(endeff_point)]
    updateLineWithPoints(gripper_segment, gripper_points);
    
    // Do some of our invkin math
    var bottom_elevator = base_offset_points[1];
    var wrist_point = gripper_points[1];
    var distance = wrist_point.distanceTo(bottom_elevator);
    var distance_vector = wrist_point.sub(bottom_elevator);

    var subtriangle_angle_radians = Math.abs(CARRIAGE_MOUNT_ANGLE)/180.0*Math.PI;

    var dc_length = Math.sin(subtriangle_angle_radians)*CARRIAGE_MOUNT_LENGTH;
    var angle_a_radians = Math.asin(dc_length/distance);
    var elevator_angle_radians = angle_a_radians +
        Math.atan2(distance_vector.getComponent(1), distance_vector.getComponent(0));
    console.log("elevator_angle_radians = y / x",
      elevator_angle_radians,
      distance_vector.getComponent(1),
      distance_vector.getComponent(0));
    var elevator_height = Math.cos(angle_a_radians)*distance -
        Math.cos(subtriangle_angle_radians)*CARRIAGE_MOUNT_LENGTH;

    // Setup the length of the elevator
    var elevator_points = [bottom_elevator,
        new THREE.Vector3(Math.cos(elevator_angle_radians),
                          Math.sin(elevator_angle_radians),
                          0).multiplyScalar(elevator_height)
                            .add(bottom_elevator)]
    updateLineWithPoints(elevator_segment, elevator_points);

    // Setup the carriage mount
    var carriage_points = [elevator_points[1],
        new THREE.Vector3(Math.cos(elevator_angle_radians+CARRIAGE_MOUNT_ANGLE/180.0*Math.PI),
                          Math.sin(elevator_angle_radians+CARRIAGE_MOUNT_ANGLE/180.0*Math.PI),
                          0).multiplyScalar(CARRIAGE_MOUNT_LENGTH)
                            .add(elevator_points[1])]
    updateLineWithPoints(carriage_mount, carriage_points);

    // Display EndEffector value
    setFirstTerm(`Base Pivot Angle: ${elevator_angle_radians*180.0/Math.PI}`);
    setSecondTerm(`Elevator Height: ${elevator_height}`);
    setThirdTerm(`Wrist Angle: ${elevator_angle_radians*180.0/Math.PI+CARRIAGE_MOUNT_ANGLE+endeff_angle}`);
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
    // controls.enabled = false;
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
      <div>{first_term}</div>
      <div>{second_term}</div>
      <div>{third_term}</div>
      <div>
          Target X: <Slider progress
                    style={{ marginTop: 16 }}
                    min={-1}
                    value={target_x}
                    max={2.5}
                    step={0.1}
                    onChange={value => {
                      // current_position.setComponent(0, pivot_deg);
                      setTargetX(value);
                    }} />
          Target Y: <Slider progress
                    style={{ marginTop: 16 }}
                    min={0}
                    value={target_y}
                    max={3}
                    step={0.1}
                    onChange={value => {
                      // current_position.setComponent(1, elevator_height);
                      setTargetY(value);
                    }} />
          EndEff Angle: <Slider progress
                    style={{ marginTop: 16 }}
                    min={-90}
                    value={endeff_angle}
                    max={90}
                    step={1}
                    onChange={value => {
                      // current_position.setComponent(1, wrist_deg);
                      setEndEffAngle(value);
                    }} />
        </div>
    </div>
    </>
  );
}
