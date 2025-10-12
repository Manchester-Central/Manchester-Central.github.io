import Image from 'next/image';

import trianglesolve from './images/inv_trig_2025_solution.png';

import ForwardExample from './components/fk';
import InverseExample from './components/ik';

import robot from './images/2025robot.png';

export function Kinematics2025() {
    return <>
    <p>
      So lets take a look at how some of these concepts can be used, and look at the
      2 jointed robot design from 2025, <i>Angler</i>.
    </p>

    <div className="centered-content">
      <Image src={robot} width="500" alt="Chaos's 2025 robot" />
    </div>

    <hr />

    <strong>Forward</strong>

    <p>
      There are many <i>ligaments</i> that make up this robot. When you trace the side
      profile of the robot, you can group these lines into several groups. See the image
      on the right for each line segment, and note the joints indicated by the red dots.
      Also, each group has the same color for all line segments. What you can gather from
      this is that each group can be simplified.
    </p>

    <p>
      You can simplify by looking at the group, and identifying the segments with a locked
      or fixed angle between them. This typically means the two segments can be added
      together. This is best done with <i><a href="http://localhost:3000/library/math1#Vectors">vectors</a></i>.
      If you add all of the vectors within a group together, this should bring you to the
      next joint, or linear component.
    </p>

    <p>
      The interactive demo below shows the simplified kinematic model, note how the parts
      all move circularly around their corresponding joints.
    </p>

    <div className='centered-content'>
      <ForwardExample />
    </div>

    <hr />

    <strong>Inverse</strong>

    <p>
      Once we have our simplified kinematic model, we can leverage that with inverse kinematics.
      Lets break down each ligament, the local coordinate frame of each, and how to derive
      unknown angles and lengths given a target <i>end effector</i> state.
    </p>

    <p>
      The first step is to start at the origin, and trace the vectors forward as much as possible.
      In our 2025 robot, this first ligament is a constant offset from the robot origin to a joint,
      and we need to know what the <i>effective</i> origin is for the inverse calculations. So we
      make a note of where this axle is, and move to the opposite side of the problem.
    </p>

    <p>
      Just like we looked at the initial ligament, we're going to do the same thing with the final
      ligament that connects to the end effector. One of the requirements of end effectors with
      inverse kinematics is that you need to know both their <i>position</i> and their
      <i>orientation</i>. Knowing this, and the length of the final ligament, we can calculate
      where the nearest joint lands.
    </p>

    <p>
      Thankfully, the 2025 robot is simple enough that we don't have any more joints! We only
      have a linear slide (elevator, lift, what have you), and a ligament at a fixed angle
      representing the carriage mount.
    </p>

    <p>
      This means we have 2 points in space, with several knowns and unknowns. We can leverage
      our trigonometry skills to calculate the angle of our lift, the length of it, and the
      relative angle of our end effector all relatively easily!
    </p>

    <p>
      As we set up our triangle, it's important to annotate what we know, and what we want to
      know. We know the vector of our problem space, it's the gap between our joints and it's
      indicated by the &lt;x, y&gt; along one edge. We also know the length of the carriage
      attachment, marked as 0.39 (meters). Lastly, we know the angle of the carriage mounting
      relative to the direction of the lift, marked as 118 degrees.
    </p>

    <p>
      Now notice that we have not just one triangle here, but 2. That's because this problem
      is easier to solve by forming a right hand triangle out of the existing known data. We
      can derive the lengths of all 3 sides because of our skills in Trig! Why might this be
      useful? because it allows us to <i>combine</i> the two triangles into a larger right
      triangle, and solve the lower angle this way, and ultimately find the length <i>h</i>.
      This length h is the length of our lift!
    </p>

    <div className='centered-content'>
			<Image src={trianglesolve} alt={''} />
		</div>

    <div>
      Now, having this, we can derive what the angle of the base pivot is to put our wrist
      in the right spot, as well as the angle of the wrist relative to the lift.
    </div>

    <div className='centered-content'>
      <InverseExample />
    </div>

    <div>
      As you control the target location, you can see how the robot re-orients its parts
      to calculate the 3 terms from earlier. See how close the values get to the previous
      demo above? By implementing a few constraints into the problem, and blending
      techniques, you can simplify many Inverse Kinematic problems!
    </div>

    <div>
      You might notice you can shove the end effector right through the robot itself, that's
      no good! It's important when designing systems like this to enforce bounds on joints,
      and range of things. For instance, we don't ever want the lift on the 2025 robot to
      rotate backwards too much. We <i>also</i> don't want to shove the gripper through the
      bottom. Setting a range of acceptable values is critical to a functioning robot.
    </div>

    </>;
}
