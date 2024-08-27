import Image from 'next/image';

export function PoseEstimate() {
    return <>
		<p>
			This section is mostly for those who are trying to develop their own
			pipeline, and want to know what sort of math goes on, and how to
			leverage OpenCV to get that work done. Work will be filled in at a
			later date.
		</p>

		<hr />

		<strong>Linear Algebra</strong>

		<hr />

		<strong>Trig</strong>

		<hr />

		<strong>IMU</strong>

		<hr />

		<strong>Pose Feedback Loop</strong>

		<hr />

		<strong>Latency Gotcha</strong>

		<p>
			One important thing to keep in mind, is that your coprocessor handling
			vision pose estimations isn't aligned with the timestamps of the RIO.
			Any time there are two independent systems running, there will be an
			issue of <i>latency</i>. Latency causes problems for control systems,
			and it's important to include any latency values in pose estimations.
		</p>

		<p>
			The WPILib pose estimator has a memory structure built into it, that
			lasts for a reasonably long amount of time. Both Limelight and
			PhotonVision currently use something called NetworkTables4 to keep
			these timestamps aligned, but those making their own pipelines need
			to be careful, or they will introduce desynced data into their robot
			and cause problems during motion.
		</p>
    </>;
}