"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import fmap from "../assets/frc2024.json";

const WIDTH = 600;
const HEIGHT = 400;
const CROP_BUFFER = 0.1;

function makeQuad(length: number) {
  const geometry = new THREE.BoxGeometry(0.08, length, length);
  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geometry, material);
  // Three will overwrite the transformation matrix every frame render otherwise
  mesh.matrixAutoUpdate = false;
  return mesh;
}

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

interface DemoProps {
  plot_roi: boolean;
}
export default function CropDemo({ plot_roi }: DemoProps) {
  const [_renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [debugText, setDebugText] = useState<string>();
  const markerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // setup //
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    setRenderer(renderer);

    const tags = fmap.fiducials.map((fiducial) => {
      var new_tag = makeQuad(fiducial.size / 1000.0);
      new_tag.matrix.fromArray(fiducial.transform, 0);
      new_tag.matrix = new_tag.matrix.transpose();
      new_tag.matrixWorld.fromArray(fiducial.transform, 0);
      new_tag.matrixWorld = new_tag.matrixWorld.transpose();
      return new_tag;
    });
    renderer.setSize(WIDTH, HEIGHT);

    let scene = new THREE.Scene();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);

    camera.up.set(0, 0, 1);
    camera.position.set(15, 0, 5);
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    renderer.render(scene, camera);

    /// lighting ///
    const light = new THREE.AmbientLight(0xffaaff);
    light.position.set(10, 10, 10);
    scene.add(light);

    /// geometry ///
    scene.add(...tags);

    animate();

    function animate() {
      requestAnimationFrame(animate);
      if (plot_roi) {
        var minx = 1.1;
        var miny = 1.1;
        var maxx = -1.1;
        var maxy = -1.1;

        tags.forEach((tag) => {
          // This one line is what 95% of the article is about.
          var uv = new THREE.Vector3(0, 0, 0)
            .applyMatrix4(tag.matrixWorld)
            .project(camera);
          if (
            -1 < uv.x &&
            uv.x < 1 &&
            -1 < uv.y &&
            uv.y < 1 &&
            0 < uv.z &&
            uv.z < 1
          ) {
            if (uv.x < minx) minx = uv.x;
            if (maxx < uv.x) maxx = uv.x;
            if (uv.y < miny) miny = uv.y;
            if (maxy < uv.y) maxy = uv.y;
          }
        });

        minx = Math.max(minx - CROP_BUFFER, -1);
        miny = Math.max(miny - CROP_BUFFER, -1);
        maxx = Math.min(maxx + CROP_BUFFER, 1);
        maxy = Math.min(maxy + CROP_BUFFER, 1);
        let divheight = ((maxy - miny) / 2) * HEIGHT;

        minx = (WIDTH * (1 + minx)) / 2;
        miny = (-HEIGHT * (miny - 1)) / 2;
        maxx = (WIDTH * (1 + maxx)) / 2;
        maxy = (-HEIGHT * (maxy - 1)) / 2;

        let marker = markerDivRef.current;
        if (marker) {
          marker.style.transform = `translate(${minx}px, ${maxy}px)`;
          marker.style.width = maxx - minx + "px";
          marker.style.height = divheight + "px";
        }


        let crop_size = (maxx - minx) * divheight;
        let source_size = WIDTH * HEIGHT;
        setDebugText(
          `Achieved ${(source_size / crop_size).toFixed(3)}x performance increase`,
        );
      } else {
		let marker = markerDivRef.current;
        if (marker) {
          marker.style.display = "none";
        }
	  }
      renderer?.render(scene, camera);
    }
  }, [plot_roi]);

  if (!_renderer) {
    return <>Loading...</>;
  }

  return (
    <>
      <div
        style={{ border: "1px solid black", width: 600, position: "relative" }}
      >
        <div
          ref={markerDivRef}
          style={{
            position: "absolute",
            zIndex: 0,
            border: "2px solid red",
            pointerEvents: "none",
          }}
        ></div>
        <Container child={_renderer.domElement} />
        <div>{debugText}</div>
      </div>
    </>
  );
}
