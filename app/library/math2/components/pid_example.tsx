"use client";

import { Data } from "plotly.js";
import { useEffect, useRef, useState } from "react";
import React from 'react';

import Plot from 'react-plotly.js';
import { Slider } from "rsuite";

function PIDExample() {
	var [pval, setP] = useState(0.1);
	var [ival, setI] = useState(0.1);
	var [dval, setD] = useState(0.1);

	const TARGET_VALUE: number = 1;
	var START_VALUE: number = 0;
	const NUM_DATA_POINTS: number = 100;
	const X_VALUES: Array<number> = Array.from(Array(NUM_DATA_POINTS).keys());

	var curr_val = START_VALUE;
	var p_y_vals: Array<number> = [];
	for (var idx = 0; idx < NUM_DATA_POINTS; idx++) {
		p_y_vals.push(curr_val);
		var err = TARGET_VALUE-curr_val;
		curr_val += err*pval;
	}

	var curr_val = START_VALUE;
	var pi_err: number = 0;
	var pi_y_vals: Array<number> = [];
	for (var idx = 0; idx < NUM_DATA_POINTS; idx++) {
		pi_y_vals.push(curr_val);
		var err = TARGET_VALUE-curr_val;
		pi_err += err;
		curr_val += err*pval + pi_err*ival;
	}

	var pid_data_points: Array<Data> = [
		{
			x: X_VALUES,
			y: p_y_vals,
			mode: "lines+markers",
			type: "scatter",
			name: "P",
		},
		{
			x: X_VALUES,
			y: pi_y_vals,
			mode: "lines+markers",
			type: "scatter",
			name: "PI",
			marker: { color: "red" },
		},
	];

	useEffect(() => {
		//
	}, []);

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
					title: "Growth Rate in Children",
					xaxis: { title: "Age (years)", },
					yaxis: { title: "Height (inches)", },
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
					max={2}
					step={0.001}
					onChange={value => {
						setD(value);
					}} />
				<br />
			</div>
		</>
	);
}

export default PIDExample;
