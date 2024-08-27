"use client";

import { MathJax } from 'better-react-mathjax';
import Image from 'next/image';

export function AprilTags() {
    return <>
		<p>
			April Tags use a clever algorithm to identify flat planes out in the world. It's a 4 step
			algorithm that breaks an image up into edges, segments, and eventually maps the squares to
			a pattern.
		</p>

		<ol>
			<li>Adaptive Threshold</li>
			<li>Segmentation</li>
			<li>Detect Quads</li>
			<li>Identify Tags</li>
		</ol><br />

		<p>
			You can read whitepapers of the algorithm iteration approaches here:
		</p>

		<ol>
			<li><a href="https://april.eecs.umich.edu/papers/details.php?name=olson2011tags">AprilTag: A robust and flexible visual fiducial system</a> [2011]</li>
			<li><a href="https://april.eecs.umich.edu/papers/details.php?name=wang2016iros">AprilTag 2: Efficient and robust fiducial detection</a> [2016]</li>
			<li><a href="https://april.eecs.umich.edu/papers/details.php?name=krogius2019iros">Flexible Layouts for Fiducial Tags</a> [2019]</li>
		</ol><br />

		<strong>Adaptive Threshold / Edges</strong>

		<p>
			This is a technique that looks at the average brightness of an image over a small surrounding
			region of the image. By looking at the nearby pixel values for brightness, the algorithm automatically
			scales up the magnitude of the edge based on its immediate environment. That is to say, a strong edge
			found on a black and white piece of paper will always evaluate to 1, even if it's in a dimly lit corner
			of the room with a pixel value of 188. It will evaluate the same way even if there was a light shining
			on the image, and the white pixel value was 255.
		</p>

		<strong>Segmentation</strong>

		<p>
			This is a lengthy iteration process based around thresholding, erosion/dilation (or shrinking/expanding),
			distance calculations, and more thresholding. You can see more of this in action with the OpenCV article
			on <a href="https://docs.opencv.org/4.x/d3/db4/tutorial_py_watershed.html">Watershed Analysis</a>.
		</p>

		<p>
			The goal is to identify consistent regions of an image, and their contours. Combining the edges from an
			Adaptive Threshold with segmentation, you can reliably pick out square shapes from various angles and
			orientations. This includes where vertices are located at the intersections of lines.
		</p>

		<strong>Detect Quads and Identify Tags</strong>
		
		<p>
			Leveraging the edges and shapes, vertices and shape positions can be found. This allows the algorithm to
			convert the shape and position into a <i>code</i> that can be evaluated to a number. The blocks are not
			a binary representation of the number, but arranged in a specific way to make it easier to convert from
			tiles to digits while reducing ambiguities.
		</p>
    </>;
}
