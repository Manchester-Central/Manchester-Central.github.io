"use client";

import { MathJax } from 'better-react-mathjax';
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import { useEffect } from "react";
import CropDemo from './components/crop-demo';
import cropPic from './images/crop.png';
import desmosPic from './images/desmos.png';
import futuramaPic from './images/futurama.png';
import projectionTypePic from './images/projection_type.png';

export function AprilTags() {
    
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return <>

        <p>
			Part of localization is to identify what even is an april tag. Even before we can start
			getting a pose relative to the tag, we need to find it in the image first. The
			<a href="https://april.eecs.umich.edu/media/pdfs/wang2016iros.pdf">april tag detection process</a>
			does an adaptive threshold, segmentation, quad identification, and then finally matches
			the quad pattern to a tag ID. This is a lot of work to run over a large image frame, especially
			if you realized that you were never going to find an april tag at the bottom of the image frame
			for your camera install orientation. Even more work if you realized you had to explain all of
			that in a single web page!
		</p>

		<p>
			Limelight (thankfully) has support for setting the crop of initial image frame. Even better
			than just that, it's configurable from NetworkTables. We have the ability to change our region
			of interest procedurally as our robot moves around the field. Typically this is handled in the image
			processing stack, but given that Limelight is a black box we can find workarounds.
		</p>

		<hr />

		<strong>Prep Work</strong>

		<p>
			In order to generate model points, we need to know both the transform and the model points.
			For simplicity's sake, and since the model transform never changes during a match, we bake
			them into the creation of the tag. Each resulting ll, lr, ur, and ul point are a corner of
			the april tag. This saves us the effort of having to multiply the transform against the vector
			every time we use it. The latter is what video games do because animations change the transform
			matrix. Those familiar know this as the <i>model transformation matrix</i> in the
			model&rarr;view&rarr;projection sequence. In other words, we can move each corner of the april tag
			to where it exists in the game field, be it over the stage, under the speaker, etc using a single
			transformation matrix for each of the 4 corners.
		</p>

		<p className="question">
			Given the following sample code to calculate the lower left corner of the april tag, what would you
			change for the other 3 corners?
		</p>
		

<pre><code className="language-java">
{`public AprilTag(Matrix<N4, N4> transform, double sizeInMeters) {
	Matrix<N4, N1> ll = convertCenteredPoseToWPIBluePose(
		transform.times( VecBuilder.fill(0, -0.5*sizeInMeters, -0.5*sizeInMeters, 1) )
	)
	Matrix<N4, N1> lr = ...
	Matrix<N4, N1> ur = ...
	Matrix<N4, N1> ul = ...
}`}
</code></pre>

		<p>
			<i>This article will not address row versus column major, just know that the order of the multiplication 
			matters. Matrix multiplication is not commutative!</i>
		</p>

		<p>
			<i>Additionally, we're skipping the homogenous coordinate discussion. That trailing 1 is important.</i>
		</p>
			
		<p>
			In order to stay consistent and mitigate against potential error sources, it's easiest to load the
			exact same dataset as the limelight does. Thankfully, WPILib includes a json parser called Jackson.
			So loading the files up into a series of points is nearly plug and play. Each tag (also called a
			<i>fiducial</i>) is listed in the fmap with 5 fields: <i>family, id, size, transform,</i> and
			<i>unique</i>. In 2024s game Crescendo, the family, size, and unique values were consistent across
			all tags.
		</p>

<pre><code className="language-java">
{`public ArrayList<AprilTag> LoadTagLocations(String fmap_path) {
	ArrayList<AprilTag> tags = new ArrayList<>();
	JsonNode productNode = new ObjectMapper().readTree(new File(fmap_path));
	for (var fidu : productNode.get("fiducials")) {
		double tag_size = fidu.get("size").asDouble();
		double[] transform = new ObjectMapper().readValue(
			fidu.get("transform").toString(),
			double[].class
		);
		var trans_mat = MatBuilder.fill(Nat.N4(), Nat.N4(), transform);

		// convert mm to meters
		var tag = new AprilTag(trans_mat, tag_size/1000.0);
		tags.add(tag);
	}
	return tags;
}`}
</code></pre>

		<hr />

		<strong>View Matrix</strong>

		<p>
			So we've got the tags placed in our virtual world, now what? In order to align the points
			relative to the camera, we have to apply something called a View Matrix. If you've ever
			heard people say that video games move the world around the camera, this is what they're
			referring to. Quickly observe that this doesn't use the normal robot coordinate system.
			Coordinate transforms can vary from domain to domain, and the math to make something appear
			on a computer screen uses a different frame of reference than a robot driving on the ground.
		</p>
		
		<p className='centered-content'>
            <Image src={futuramaPic} width={400} height={300} alt="Futurama Image" />
		</p>

<pre><code className="language-java">
{`public Matrix<N4, N4> ViewMatrix(Pose3d pose) {
	var trans = MatBuilder.fill(Nat.N4(), Nat.N4(), new double[] {
		1,0,0, -pose.getX(),
		0,1,0, -pose.getY(),
		0,0,1, -pose.getZ(),
		0,0,0, 1
	});

	var forward = new Translation3d(1, pose.getRotation()).toVector();
	var right = Vector.cross(forward, new Vector<>(new SimpleMatrix(new double[]{0,0,1})));
	right = right.div(right.norm()); // We normalize our vectors
	var up = Vector.cross(right, forward);

	return MatBuilder.fill(Nat.N4(), Nat.N4(), new double[] {
		right.get(0),   right.get(1),   right.get(2),   0,
		up.get(0),      up.get(1),      up.get(2),      0,
		-forward.get(0),-forward.get(1),-forward.get(2),0,
		0,0,0,1
	}).times(trans);
}`}
</code></pre>

		<p>
			Important: the Pose3d is the <i>camera</i> pose, not the <i>robot</i> pose. This needs
			a coodinate shift from robot pose to camera pose for the view matrix to function.
		</p>

		<hr />

		<strong>Frustum Projection</strong>

		<p>
			Knowing what's in front of the camera is half the battle, the other half is
			knowing what's in <i>view</i> of the camera. There are predominantly 2 ways
			to resolve this, <i>frustum</i> and <i>orthographic</i> projections. Orthographic
			projection is frequently used in CAD software, it's incredibly helpful to keep
			axes aligned when trying to associate parts together, or create measurements.
			Meanwhile Frustum is more common in video games and camera models since it
			accounts for the <i>field of view</i>, which is how our eyes work and we
			naturally perceive the world.
		</p>

		<p>
			This is definitely a visual concept, so see the image below to illustrate the
			difference. Notice how each cube's side length is the same regardless of the depth.
			Meanwhile the perspective (aka frustum) projection has a vanishing point, and the
			side lengths shrink as the depth increases.
		</p>

		<p className='centered-content'>
            <Image src={projectionTypePic} width={800} height={400} alt="Projection Type Image" />
		</p>


<pre><code className="language-java">
{`public static Matrix<N4, N4> FrustumProjectionMatrix(
	double hfov, double vfov, double n, double f)
{
	// simplified from (hfov/2)*(pi/180)
	var h = 1 / Math.tan(hfov*Math.PI/360.0);
	var v = 1 / Math.tan(vfov*Math.PI/360.0);
	return MatBuilder.fill(Nat.N4(), Nat.N4(), new double[] {
		h,  0,  0,          0,
		0,  v,  0,          0,
		0,  0,  -f/(f-n),   -f*n/(f-n),
		0,  0,  -1,         0
	});
}`}
</code></pre>

		<hr />

		<strong>Putting It All Together</strong>

		<p>
			This might sound like a lot, but bear with me. When we multiply the terms
			across, we get something pretty amazing.
		</p>

		<div className='centered-content'>
			<MathJax>{ `screen_space_location = FrustumMatrix * ViewMatrix * (ModelMatrix * Vertex)` }</MathJax>
		</div>
		<br />

		<p>
			The ModelMatrix was accounted for when we created the april tags.
			All we have to do after that is multiply the ViewMatrix and FrustumMatrix
			onto each corner of the april tag, and then divide each point by the 4th element
			in the resulting vector (This has to do with homogenous coordinates, don't
			worry about it and just trust me). The following desmos graph shows the april
			tag coordinates plotted in camera space straight from our equations.
		</p>

		<p className="question">
			Do you recognize what you're looking at here? Can you figure out where the camera
			is located "on" or maybe even "off the field"?
		</p>

		<p className='centered-content'>
            <Image src={desmosPic} width={800} height={160} alt="Desmos Image" />
		</p>

		<p>
			Not sure what you're looking at? Try moving the camera around in the interactive demo below.
		</p>

		<div className='centered-content'>
            <CropDemo plot_roi={false}/>
        </div>
        

		<hr />

		<strong>Region Of Interest</strong>

		<p>
			So if we know the coordinates we expect to see, we can define our region of
			interest as the area encompassing all of those points. In other words, we select
			the minimum and maximum x and y values of all the points. Take this example image
			from the MegaTag2 documentation:
		</p>

		<p className='centered-content'>
            <Image src={cropPic} width={800} height={400} alt="Crop Image" />
		</p>

		<p>
			So lets give it a shot, and see what we can do when it's all working together.
		</p>

		<div className='centered-content'>
            <CropDemo plot_roi={true}/>
        </div>
    </>;
}