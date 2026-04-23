"use client";

import Image from "next/image";
import { useEffect } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css';
import networks from './images/networks.png';


export function Networking() {

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return <>
		<p>
			The desired networking layout in the pit is not always plausible. Some years the robot design works out, and other years the design fights back. Below is the example of the best case scenario. It features a single switch with 2 VLANs, one side extends to the Cellular 4G router, while the other side is an isolated robot network.
		</p>

		<div className="centered-content">
			<Image src={networks} width={600} alt="Networks" />
		</div>

		<p>
			Here, you can see solid lines between devices which don't change (sans the driver station laptop disappearing for matches). The dashed line represents how the Programming Laptop should be connected to one network, or the other, but not both at the same time. This can be either Programming Laptop, or even both at the same time.
		</p>

		<p>
			That said, frequently this is not the case. In 2026, the robot design made it impractical to leave an ethernet cable consistently deployed to the center of the pit, and table space was a luxury which led to half of this networking diagram disappearing. In these situations, a single 25' ethernet cable gets passed around between the laptops and robot.
		</p>
    </>;
}
