var MyWorker = require("worker!./worker/index.js");
 
var worker = new MyWorker();
worker.postMessage({a: 1});
worker.onmessage = function(event) {console.log(event);};
worker.addEventListener("message", function(event) {
	console.log(event);
	console.log(window);
});

export default {};