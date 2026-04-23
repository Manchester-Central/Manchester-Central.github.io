"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css';

export function Packing() {

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return <>
		<p>
			There is a silver metal case, a small black nylon box, and a black messenger bag used for packing. 
		</p>

		<table className="table-auto border-collapse border border-slate-400">
			<thead>
				<tr>
					<th className="border border-slate-300 px-4 py-2">Quantity</th>
					<th className="border border-slate-300 px-4 py-2">Item</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="border border-slate-300 px-4 py-2">2</td>
					<td className="border border-slate-300 px-4 py-2">Oculus Quest 3S</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">2</td>
					<td className="border border-slate-300 px-4 py-2">Paired Quest 3S Controller</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">4</td>
					<td className="border border-slate-300 px-4 py-2">Game Controllers</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">2+</td>
					<td className="border border-slate-300 px-4 py-2">Spare USB-A Storage Devices (64GB Minimum)</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">1</td>
					<td className="border border-slate-300 px-4 py-2">3'+ USB-A/C to USB-C Cable</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">1</td>
					<td className="border border-slate-300 px-4 py-2">3'+ USB-A/C to USB-B Cable</td>
				</tr>


				<tr>
					<td className="border border-slate-300 px-4 py-2">3+</td>
					<td className="border border-slate-300 px-4 py-2">Backup Robot Ethernet Cable</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">2+</td>
					<td className="border border-slate-300 px-4 py-2">25' Ethernet Cable</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">2+</td>
					<td className="border border-slate-300 px-4 py-2">2' Ethernet Cable</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">1</td>
					<td className="border border-slate-300 px-4 py-2">6+ Port Switch</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2">3</td>
					<td className="border border-slate-300 px-4 py-2">USB-C Laptop Chargers (Labelled DriverStation)</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2"></td>
					<td className="border border-slate-300 px-4 py-2">Driver Station Laptop</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2"></td>
					<td className="border border-slate-300 px-4 py-2">Primary Programming Laptop</td>
				</tr>
				<tr>
					<td className="border border-slate-300 px-4 py-2"></td>
					<td className="border border-slate-300 px-4 py-2">Secondary Programming Laptop</td>
				</tr>
			</tbody>
		</table>
    </>;
}
