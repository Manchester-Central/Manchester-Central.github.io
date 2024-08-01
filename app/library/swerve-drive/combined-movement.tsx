import SwerveSimulation from "./components/simulation";

export function CombinedMovement() {
    return <>
        <p>
			Believe it or not, that's it. We have the only 2 velocity vectors we need for
			this sort of movement. Lets look at this in motion, and see how it plays out.
			The following demo shows a robot with 3 inconsistently placed wheels, and the
			calculated vectors to get it to move across the grid.
		</p>

		<div className="centered-content">
			<SwerveSimulation />
		</div>

		<p className="centered-content"><br />
			The blue lines are the lines to the robot center.<br />
			The red lines are the tangent vector.<br />
			The green lines are the translation vector.<br />
			The black lines are the effective vector.<br />
		</p>
    </>;
}