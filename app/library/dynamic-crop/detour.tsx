export function Detour() {
    return <>
		<p>
			Before looking at FRC style robotics, lets take a look at other fields and how they
			handle certain problems.
		</p>
	
		<hr />

		<strong>Video Games</strong>

		<p>
			Kings and queens of efficient programming and computational math. Video games have
			a long history of finding the easiest ways to calculate something. Predominantly
			using linear algebra, video games are fundamentally built around these ideas of
			transformation matrices and ray calculations. In order to improve the <i>rendering
			efficiency</i>, the rendering engine will pick and choose what goes on screen.
			There's several ways to accomplish this, and the techniques are referred to as culling.
			Projection (or frustum) culling, occlusion queries, portal culling, back face culling,
			the list goes on. Game designers have come up with a lot of ways to not have to do work!
		</p>

		<p>
			I'm going to pick one specifically for this topic: Projection Culling. Frequently called
			Frustum Culling because of the frustum matrix's prevalence in game design, this cropping
			happens after transforming vertices into screen space from camera space. Based on the
			field of view of a camera, all points within sight are typically scaled into a box ranging
			from [-1, 1] in the x and y direction, and [0, 1] in the z direction. Anything outside
			these bounds can be discarded, because it's not in view!
		</p>

		<p>
			A brief <a href="https://twitter.com/noclipvideo/status/1354169521326542848">Twitter Video</a>
			featuring Michiel van der Leeuw that illustrates this concept can be found within a
			documentary on the game Horizon: Zero Dawn. The rectangular pyramid in blue that swirls
			around is the view frustum. Notice that around the edges of the frustum objects pop in
			and out of existence. This is projection culling! The view projection matrix allows us
			to easily identify what exists and where in the computer monitor's screen.
		</p>

		<hr />

		<strong>Security</strong>

		<p>
			Take a security camera. It's a particularly uneventful day, and the only thing moving is
			the grass wiggling in the wind. It's a low power system, trying as hard as possible to be
			negligent during downtime. Low framerate, low resolution, low power draw. Around the corner
			walks a person, and the camera takes notice. The camera zooms in on the person, the
			resolution increases, and the device calculates something called a <i>chip</i>. Sometimes
			this is called a window, subframe, or region of interest. This subregion enables the device
			to focus on a smaller slice of more important data, and trigger on demand. This is a core
			technique to computer vision and signal processing since it allows the system to swap
			parameters as it needs. Adjust exposure times, processing power, data storage, etc. It's a
			classic work smarter - not harder move.
		</p>
    </>;
}