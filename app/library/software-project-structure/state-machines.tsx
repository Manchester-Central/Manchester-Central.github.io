// import Image from 'next/image';
// import tangentvector from './images/tengentvector.svg';

export function StateMachines() {
    return <>
		<p>
			State machines in FRC are situational. They are very valuable with mechanisms that can achieve many orientations or uses, but not simultaneously. This was the case in 2025 where the multi-jointed arm had a long list of poses and prep-poses that required careful management to avoid damaging the robot, or failing to reach a target state.
		</p>

		<p>
			In FRC, state machines can be simplified to a state and a transition check (and new state). Usually there's an edge transition function attached, and rarely there can be a "can transition" check. FIRST is not that safety critical or complex where a state machine needs to handle simultaneous access, message duplication, controls latency or other potential failure points in complex safety critical operations. The state machine is largely self contains to the robot and its own control scheme. As a result, "can transition" is almost always ignored.
		</p>

		<strong>Defining States</strong>

		<p>
			States are best defined with enums, these are numbers represented with strings, and it makes it easier to identify which "numbers" or states are being used in the state machine, validated against typos, and is far easier to decipher while debugging. State machines typically don't include any values in their enum representation, so they're as simple as a list like below.
		</p>

<pre><code className="language-java">
{`// Define each state with a name
public enum RobotState {
	STATE1,
	STATE2,
	...
}`}
</code></pre>

		<strong>Robot Loop - Switch Statement</strong>

		<p>
			Each robot loop the robot must re-evaluate itself, adjust based on controls inputs, and flush out commands. In a state machine, this turns out to be pretty simple. We can divide up the actions being done in a state into individual functions, and switch based on the tracked state.
		</p>

<pre><code className="language-java">
{`RobotState currentState = STATE1;

@Override
public void periodic() {
	...
	switch (currentState) {
	case STATE1:
		doState1();
	case STATE2:
		doState2();
	}
}`}
</code></pre>

		<strong>Edge Transitions</strong>

		<p>
			Handling edge behavior, like initializing a value or an entire state when entering that state. This is more problematic because different states can need different initialization patterns. The below example is a way to do it with argument-less void functions, or <i>Runnables</i>. In FRC, you can usually get away without an edge initialization function, but more sophisticated models (like motion profiling), or more complex systems (like distributed robot architectures), you might need to consider initialization functions when moving along edges.
		</p>

<pre><code className="language-java">
{`Map<RobotState, Supplier<RobotState>> edgeChecks = ...;
Map<RobotState, Runnable> edgeInit = ...;
Supplier<RobotState> checkForNewState = () -> null;

@Override
public void periodic() {
	RobotState new_state = checkForNewState.get();
	if (new_state != null) {
		currentState = new_state;
		checkForNewState = edgeChecks.get(currentState);
		edgeInit.get(new_state).run();
	}

	switch (currentState) {
		...
	}
}`}
</code></pre>

    </>;
}
