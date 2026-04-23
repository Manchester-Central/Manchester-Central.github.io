"use client";

import pitlayout from './images/pit-layout.png';
import Image from "next/image";
import { useEffect } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css';

export function Layout() {

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return <>
		<div className="centered-content">
			<Image src={pitlayout} width={350} alt="Pit Layout" />
		</div>
    </>;
}
