import Image from 'next/image';

export function Sensors() {
    return <>
		<p>
			Typically, CV pipelines can only function on the incoming signal data. But that's
			only part of the story. Robot localization is done best as a <i>multi-modal</i>&nbsp;
			model. This means that additional sensor data can provide a more accurate and stable
			understanding of the robot's location and orientation. There are many froms of sensor
			data, but we are going to look at 3, which typically form something called an IMU,
			or <i>Inertial Measurement Unit</i>. This is a "fun" phrase to mean that the device
			tracks its movement over short distances.
		</p>

		<hr />

		<strong>Gyro</strong>

		<p>
			The first, and probably most likely component to be on your robot is a <i>gyro</i>.
			Not the edible greek wrap, your gyro is likely 0 initialized and will always start
			off facing "forwards", even if forwards is completely backwards in reality! This is
			where the benefits of a robust multi-modal localization system comes into play.
			The vision system will inform the gyro what direction is the initial orientation at
			startup, and the two systems will improve eachother's accuracy over time.
		</p>

		<p>
			Note: Your Gyro may actually include other components within it, like those
			mentioned below. Please pay attention to its documentation!
		</p>

		<p>
			The gyro may or may not be built into the camera system itself. Limelights are not
			built with a Gyro on board, but a RoboRIO can send any other Gyro data back to the
			Limelight when using
			their <a href="https://docs.limelightvision.io/docs/docs-limelight/apis/complete-networktables-api">MegaTag2</a> pipeline.
			PhotonVision does not include a gyro signal input, and can only integrate the
			vision pose with the gyro on the RIO.
		</p>

		<p>
			Custom pipeline enthusiasts rejoice! By using something like
			a <a href="https://www.raspberrypi.com/products/sense-hat/">sense hat</a> with a
			Raspberry PI, or an ultra low power IMU
			for <a href="https://www.bosch-sensortec.com/products/motion-sensors/imus/bmi270/">Nvidia Jetsons</a> you
			can incorporate this sensor directly into your pose calculations. This can help
			handle motion blur, and improve pose quality before ever going back
			to the RIO.
		</p>

		<hr />

		<strong>Accelerometer</strong>

		<p>
			Accelerometers are usually a sibling component of a gyro, and they describe acceleration.
			Similarly, Limelights and PhotonVision don't have accelerometers on board, but the intrepid
			vision specialist can certainly include this on their coprocessor as well. Including
			an accelerometer into the pipeline will help deal with motion blur, and projecting the
			pose forward in time.
		</p>

		<hr />

		<strong>Magnetometer</strong>

		<p>
			Finally, the magnetometer is the classic compass you think about. It's the needle that
			detects north, which means that while the other two components detect motion, this one
			detects rotational position. Again, this isn't on a Limelight or supported by PhotonVision,
			but the adventurous among you can still incoporate it into your vision pipelines. Doing
			so helps with image rectification before processing. This, while unlikely, happens when
			robots get knocked over, or with control schemes that need to understand what "forward"
			actually means. Tight calibration and alignment at startup between the compass and the
			vision pipeline is necessary for the two to stay in agreement overtime.
		</p>
    </>;
}
