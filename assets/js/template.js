window.onload = function() {
	fetch('/template.html')
		.then(response => response.text())
		.then(data => document.body.innerHTML = data)
		.then(vals => {
			document.getElementById("main").children[0].appendChild(
				document.importNode(document.getElementById("page_body").content, true));

			var scripts_to_load = [
				"/assets/js/util.js",
				"/assets/js/main.js"
			];

			scripts_to_load.forEach((script_url) => {
				var script1 = document.createElement("script");
				script1.setAttribute("src", script_url);
				script1.setAttribute("type", "text/javascript");
				document.body.appendChild(script1);
			});
			document.title = document.getElementById("header").innerText;
			hljs.highlightAll();
		})
};
