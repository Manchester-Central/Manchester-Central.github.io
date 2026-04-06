//

export function Commands() {

    return <>
		<p>
			Commands are a feature of WPILib, they support a subsystem locking mechanism that only permits 1 command to control a subsystem at a time, and the way to lock the subsystem to a command is the <code>addRequirements(...)</code> function you can call inside a Command's constructor. Each subsystem is driven by a default command in the event a higher priority command isn't running.
		</p>

		<p>
			In practice, this means two critical things: (1) a drive team member can't accidentally send conflicting commands to the robot with a gamepad, (2) the operator and driver can't send conflicting commands to the robot and fight over the robot. Therefore, in order to create a hybrid or low priority action, it probably needs to be done within the default command for that subsystem, or very rarely within another Command owning the subsystem.
		</p>

		<p>
			You might be able to infer from this that it's entirely opt-in protection, which it is! It's up to the programmer to set this correctly: If the command changes the state of the subsystem it needs to be a parameter to the <code>addRequirements(...)</code> call, if it's not controlled it should <i>not</i> be a parameter. This will allow a command to read the state of another subsystem to function, like detect a sensor's status, motor stall, or mechanism position.
		</p>

		<p>
			There is an alternative to non-requirement sub-systems by leveraging a java feature called <i>lambdas</i> or <i>suppliers</i>. These tricks can pass a function in (with the pattern: <code>() -&gt; subsystem.getValue() </code>) which can then get called inside the command to <i>only</i> get a value from that subsystem. It's only effective for situations where a single value needs to be retrieved since this will require a supplier for each piece of data.
		</p>

		<p>
			Each Command has 4 critical functions it runs through to control the subsystems:
		</p>

		<table><tbody>
			<tr><td><code>initialize()</code></td><td>Runs at the beginning of a robot loop when the command is scheduled to start, will not run again while the command is still active. Edge case: command interruption will retrigger this if it goes back to this command the next loop.</td></tr>
			<tr><td><code>execute()</code></td><td>Runs ever single robot loop while the command is active.</td></tr>
			<tr><td><code>isFinished()</code>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Checks if the command should stop running, this can frequently just be <code>false</code> and let the command end when the button is released on the controller.</td></tr>
			<tr><td><code>end(bool interrupted)</code></td><td>Enabled command cleanup, and indicates whether the command was interrupted or if it ended on its own terms. It will end on its own terms when <code>isFinished</code> returns true.</td></tr>
		</tbody></table><br />
    </>;
}
