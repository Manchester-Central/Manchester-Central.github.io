import Image from 'next/image';
import lens_system from './images/lens-system.jpg';
import radial_distortion from './images/radial-distortion.jpg';
import distortions from './images/distortions.png';

export function Calibration() {
    return <>
		<p>
			Camera Calibrations are incredibly important, and usually handled during assembly during the QA
			process. None the less, during robot competitions, vibrations and damage will loosen components
			over time. This includes the alignment of camera lenses and chassis components. So lets talk
			about the major aspects of calibration.
		</p>

		<hr />

		<strong>Intrinsic Matrix</strong>

		<div className='centered-content'>
			<Image src={lens_system} alt='Lens System Diagram' width={400} />
		</div>

		<p>
			There are two major systems in a camera: the lens system, and the sensor array. In an ideal world,
			something called the optical axis will extend perpendicularly from the center of the sensor array
			and pass through the middle of every perfectly aligned lens. In the image above, every beam of light
			going through the lenses condense to a single point on the right hand side. This is where the
			sensor array exists. The curvature of the lenses exist to condense many rays of light into a single
			point to improve precision and signal quality of an observed image. This is a field called
			Geometric Optics. Geometric Optics also addresses other issues with lens error like
		</p>

		<ul>
			<li><a href="https://en.wikipedia.org/wiki/Chromatic_aberration">Chromatic Abberation</a></li>
			<li><a href="https://en.wikipedia.org/wiki/Dispersion_(optics)">Dispersion</a></li>
			<li><a href="https://en.wikipedia.org/wiki/The_Dark_Side_of_the_Moon">Music Theory</a></li>
		</ul><br />

		<p>
			In reality, small microdefects and errors accumulate and cause the alignment to be off. This is
			solved with something called an intrinsic matrix. It describes the distortion of the image frame
			onto the sensor array. If you want a deep dive into the matrices that go into this, there is
			a <a href="https://ksimek.github.io/2013/08/13/intrinsic/">good article by Kyle Simek</a> that
			shows diagrams and the math.
		</p>

		<p>
			One thing you might wonder about, seeing that there's an <i>intrinsic</i> matrix, might there
			also be an <i>extrinsic</i> matrix? There is! It's the orientation of the camera in the world
			space. This is also called the View Matrix, which you can read more in the article
			about <a href="http://127.0.0.1:3000/library/dynamic-crop">procedural crop</a>.
		</p>

		<hr />

		<strong>Radial Distortion</strong>

		<div className='centered-content'>
			<Image src={radial_distortion} alt='Lens System Diagram' width={200} />
			<Image src={distortions} alt='Lens Distortions' width={550}/>
		</div>

		<p>
			While the former section was about translational and skew distortions, there is also the chance
			for radial distortion over the surface of the lens. There are several types, however the most
			common distortion with these simpler cameras is <i>barrel</i> distortion which causes straight
			lines to bend outwards. The image above is an example of that.
		</p>

		<hr />

		<strong>ChArUco Board</strong>

		<p>
			So how do we keep a camera calibrated on the field? Typically with ChArUco boards, but a
			chessboard also works. ChArUco boards are chess boards with april tags inserted into them.
			This allows for the camera calibration process to collect not just the grid lines, but also
			the board's orientation.
		</p>

		<p>
			Before matches, you can take a series of calibration snapshots and re-run the calibration
			calculations. This is relatively quick, only a minute or so, and the more images you can
			fit into the calibration check, the better!
		</p>

		<p>
			Both <a href="https://docs.limelightvision.io/docs/docs-limelight/performing-charuco-camera-calibration">Limelight</a>&nbsp;
			and <a href="https://docs.photonvision.org/en/latest/docs/calibration/calibration.html">PhotonVision</a> have
			articles on checking the calibration of a camera on the fly.
		</p>
    </>;
}