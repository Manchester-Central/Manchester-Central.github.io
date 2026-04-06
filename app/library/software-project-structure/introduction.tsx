export function SoftwareProjectStructureIntroduction() {
	return <>
		<p>
			This is a CHAOS focused document detailed project structure, and common resources.
		</p>

		<p>
			Git and file Setup:<br /><br />
			ProjectYear - SeasonName<br />
			- CHAOS-Shared-Code<br />
			- Additional Submodule 1<br />
			- Additional Submodule 2
		</p>

		<p>
			It's highly encouraged to setup SSH keys for your git account. This makes pulling,
			pushing, and handling merges much simpler since an HTTPS login can expire. Projects
			can be cloned with the `--recurse` flag.
		</p>

		{/* <div className="centered-content">
			<SwerveSimulation />
		</div> */}

		{/* <p className="centered-content"><br />
			The blue lines are the lines to the robot center.<br />
			The red lines are the tangent vector.<br />
			The green lines are the translation vector.<br />
			The black lines are the effective vector.<br />
		</p> */}
	</>;
}