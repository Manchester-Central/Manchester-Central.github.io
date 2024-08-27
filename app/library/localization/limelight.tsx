import Image from 'next/image';

export function Limelight() {
    return <>
		<p>
			<a href="https://limelightvision.io">Limelights</a> are somewhat of
			a <a href="https://en.wikipedia.org/wiki/Black_box">Black Box</a>. They has a decent library
			of <a href="https://docs.limelightvision.io/docs/docs-limelight/getting-started/summary">documentation</a>,
			but is still somewhat undocumented. Which, of course, is normal for paid products to have only basic
			documentation. They exist to do everything you will continue to read about in this article.
		</p>

		<p>
			They run off of typical consumer grade hardware, recent models have run off of a Raspberry PI
			<a href="https://www.raspberrypi.com/products/compute-module-4/?variant=raspberry-pi-cm4001000"> CM4 </a>
			on a custom carrier board with a ~$25 CSI camera.
		</p>

		<p>
			There is another open source competitor to Limelight called <a href="https://photonvision.org">PhotonVision</a>.
			It's an open source project with many of the same goals and features as Limelight. They are usually
			a cheaper solution, and feature accuracy/complexity trade offs. If there is someone versed in AI or
			signal processing, then PhotonVision may be a better solution for the team. Otherwise Limelights are
			highly functional out of the box and require little setup or tuning.
		</p>

		<p>
			Of course, there is also a third option, of a completely inhouse solution. It's possible to build
			a full CV pipeline on top of NetworkTables from WPILib to run on a coprocessor, and OpenCV built
			for a RaspberryPI and cameras of your choosing. Or even
			an <a href="https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/">Nvidia Jetson</a> embedded
			system using the same libraries, or
			Nvidia's <a href="https://docs.nvidia.com/vpi/index.html">VPI Library</a> and using GPU Acceleration.
		</p>

		<p>
			Limelight is the most popular for a reason, but it is not the only way to handle vision and pose
			calculations in FRC.
		</p>
    </>;
}
