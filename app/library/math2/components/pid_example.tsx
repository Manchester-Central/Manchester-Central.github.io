"use client";

import { Data } from "plotly.js";
import { useEffect, useRef, useState } from "react";
import React from 'react';

import { Slider } from "rsuite";

import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import {PlotParams} from 'react-plotly.js';

function PIDExample() {
	var [pval, setP] = useState(0.1);
	var [ival, setI] = useState(0.1);
	var [dval, setD] = useState(0.1);

	const TARGET_VALUE: number = 1;
	const START_VALUE: number = 0;
	const NUM_DATA_POINTS: number = 100;
	const DT: number = 1/20.0;
	const MIN_MOVEMENT: number = 0.01;
	const MAX: number = 5;
	const MIN: number = -5;
	var X_VALUES: Array<number> = Array.from(Array(NUM_DATA_POINTS).keys());
	X_VALUES = X_VALUES.map((num) => { return num*DT; });


	var curr_val = START_VALUE;
	var p_y_vals: Array<number> = [];
	for (var idx = 0; idx < NUM_DATA_POINTS; idx++) {
		p_y_vals.push(curr_val);
		var err = TARGET_VALUE-curr_val;
		var Pout = err*pval*DT;
		var change = Pout;
		if (-MIN_MOVEMENT < change && change < MIN_MOVEMENT) {
			change = 0;
		}
		curr_val += change;
	}

	var curr_val = START_VALUE;
	var pi_err: number = 0;
	var pi_y_vals: Array<number> = [];
	for (var idx = 0; idx < NUM_DATA_POINTS; idx++) {
		pi_y_vals.push(curr_val);
		var err = TARGET_VALUE-curr_val;
		pi_err += err*DT;
		var Pout = err*pval*DT;
		var Iout = pi_err*ival;
		var change = Pout + Iout;
		if (-MIN_MOVEMENT < change && change < MIN_MOVEMENT) {
			change = 0;
		}
		curr_val += change;
	}

	var curr_val = START_VALUE;
	var pid_err: number = 0;
	var pid_y_vals: Array<number> = [];
	var prev_err = 0;
	for (var idx = 0; idx < NUM_DATA_POINTS; idx++) {
		pid_y_vals.push(curr_val);
		var err = TARGET_VALUE-curr_val;
		pid_err += err*DT;
		var Pout = err*pval*DT;
		var Iout = pid_err*ival;
		var Dout = (err-prev_err)*DT*dval;
		var change = Pout + Iout + Dout;
		if (-MIN_MOVEMENT < change && change < MIN_MOVEMENT) {
			change = 0;
		}
		curr_val += change;
	} 

	var pid_data_points: Array<Data> = [
		{
			x: [0, X_VALUES[X_VALUES.length-1]],
			y: [TARGET_VALUE, TARGET_VALUE],
			mode: "lines",
			type: "scatter",
			name: "target"
		},
		{
			x: X_VALUES,
			y: p_y_vals,
			mode: "lines", //"lines+markers"
			type: "scatter",
			name: "P",
		},
		{
			x: X_VALUES,
			y: pi_y_vals,
			mode: "lines",
			type: "scatter",
			name: "PI",
			marker: { color: "red" },
		},
		{
			x: X_VALUES,
			y: pid_y_vals,
			mode: "lines",
			type: "scatter",
			name: "PID",
			marker: { color: "green" },
		},
	];

	// useEffect(() => {
	// 	//
	// }, []);

	return (
		<>
			<div
				className="App"
				style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				}}
			>
				<Plot
				data={pid_data_points}
				layout={{
					title: "Interactive Example",
					xaxis: { title: "Time Steps", },
					yaxis: { title: "Output", },
					width: 400,
					height: 400,
				}}
				/>
			</div>
			<div style={{width: 400}}><br />
				P: <Slider progress
					style={{ marginTop: 16 }}
					min={0}
					value={pval}
					max={2.2}
					step={0.001}
					onChange={value => {
						setP(value);
					}} />
				<br />
				I: <Slider progress
					style={{ marginTop: 16 }}
					min={0}
					value={ival}
					max={0.8}
					step={0.001}
					onChange={value => {
						setI(value);
					}} />
				<br />
				D: <Slider progress
					style={{ marginTop: 16 }}
					min={0}
					value={dval}
					max={0.5}
					step={0.0001}
					onChange={value => {
						setD(value);
					}} />
				<br />
			</div>
		</>
	);
}

export default PIDExample;
