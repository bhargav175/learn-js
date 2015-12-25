
var MyWorker = require("worker!./worker/index.js");
var registerServiceWorker = require("serviceworker!./serviceWorker/index.js");


var worker = new MyWorker();
worker.postMessage({a: 1});
worker.addEventListener("message", function(event) {
	if(event.data.done){
		console.log('insertion successful');
	}
});
import React from 'react';


let inMemoryInsertion = function(){
	console.log('inserting 100000 records');
	var my_cache = [];
	for(var i = 0;i < 100000 ; i++){
		my_cache.push({obj:i});
	}

}
let localStorageInsertion = function(){
	 let myStorage = window.localStorage;
	 for(var i = 0;i < 100000 ; i++){
		myStorage.setItem('doc'+i,Math.random());
	}
}

let indexedDBInsertion = function(){
	    var request = window.indexedDB.open("SuperDatabase", 1);
		request.onerror = function(event) {
		  // Do something with request.errorCode!
		  console.log('something went wrong');
		};
		request.onsuccess = (event)=>{
			 let db = event.target.result;
			 console.log('connection successful');
			 console.log('inserting');
			    let numbersObjectStore = db.transaction("numbers", "readwrite").objectStore("numbers");
			    for(let i = 1;i < 100000 ; i++){
			      numbersObjectStore.add({id:i,value:Math.random()});
			   }
		};
		request.onupgradeneeded = function(event) {
		  // Do something with request.result!
		   let db = event.target.result;
		   console.log('connection successful');
		   let objectStore = db.createObjectStore("numbers", { keyPath: "id" });

			  // Create an index to search customers by name. We may have duplicates
			  // so we can't use a unique index.

			  // Create an index to search customers by email. We want to ensure that
			  // no two customers have the same email, so use a unique index.
			  objectStore.createIndex("value", "value", { unique: false });

			  // Use transaction oncomplete to make sure the objectStore creation is 
			  // finished before adding data into it.
			  objectStore.transaction.oncomplete = function(event) {
			    // Store values in the newly created objectStore.
			    
			  };
		};
}


/*
Service Worker
*/


if ('serviceWorker' in navigator) {
  registerServiceWorker({scope:'/'}).then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}




export default class Stuff extends React.Component{
	doStuff(){
		//worker.postMessage({doStuff:1});
		
	}
	render(){
		return <div>
		<img src="http://cdn2.vox-cdn.com/uploads/chorus_asset/file/136146/CwTMhsN.0.gif" alt="char"/>
		<button onClick={this.doStuff.bind(this)}>Do Stuff</button>
		</div>
	}
};