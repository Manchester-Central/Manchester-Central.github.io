export function WhereItGoesWrong() {
    return <>
		<p>
			The whole point of robot localization in FRC is because motors are only accurate
			over small distances. As the match unfolds, sources of error start to pile up. 
			<i>Especially</i> if the robot had a collision. The CV pipeline needs to be able
			to reset when things go wrong, and it also needs to know where it is to function
			properly. Normally this would be handled within the CV pipeline, but limelight
			doesn't do that. We can however use the pose estimator instead. This leads to a
			symbiotic system where the limelight helps correct the robot, and the robot in turn
			helps keep the limelight running efficiently.
		</p>

		<p>
			So what do you do when things go catastrophically wrong? You drop the crop. Even if
			tags are being occluded, you keep track of how many tags are being read, if nothing
			is detected, you can drop the crop and revert to full frame analysis. You lose the
			update speed, but that will quickly return as the camera and pose estimator resync.
		</p>

		<p>
			There is one problem with a not so difficult solution. Everything has error. The pose
			estimator has error, the camera lens has error, the people who assembled the robot did
			it with some amount of error. You can rely on a specific coordinate value, and you need
			to bake in some amount of margin into the system. The simplest way is to pad the range of
			the crop with some extra value. This is left as an exercise to the reader, but as a
			helpful hint, <i>think radially</i>. Each pixel can be treated as a ray cast from the
			center of the lens.
		</p>

		<p className="question">
			So, seeing how a frustum projection works, and the resulting -1 to 1 box we
			end up with, what would you do to pad the crop out?
		</p>
    </>;
}