export function DynamicCropIntroduction() {
    return <>
        <p>
            Limelights are relatively low power embedded devices. The devices need to be
            efficient to produce accurate results at a reasonable pace for the accuracy of
            the system to succeed. There are many options and trade offs that Limelight
            offers to improve update rates. For instance, in the input tab you can choose
            a higher resolution for typically better accuracy at range, or higher framerates
            for a larger sampling rate at the expense of the other.</p>

        <p>
            These decisions are common with embedded devices. Not all tradeoffs are simple
            inversely proportional mechanisms. Sometimes the tradeoffs cost delicate continuous
            calibration, other times a chance of failure, or perhaps the complexity of the
            system risks maintainability and being bug free. This is the nature of systems
            architecture with embedded systems. The processing bandwidth and real time response
            speed only gives a finite value and it's up to the software and system engineers to
            maximize that potential.
        </p>

        <p>
            A more advanced skill in many computing fields is to process smaller more meaningful
            bits of data. This is a trade-off of efficiency for complexity. In computer vision,
            this a smaller sub image with many different names. A common synonym is called cropping
            an image. So lets take a look at how we can leverage a more intelligent system for
            picking the right area to look at in an image frame, and be smart with how we handle
            complexity.
        </p>
    </>;
}