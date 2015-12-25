

let inMemoryInsertion = function(){
	console.log('inserting 100000 records');
	var my_cache = [];
	for(var i = 0;i < 100000 ; i++){
		my_cache.push({obj:i});
	}

}


let indexedDBInsertion = function(){
		// In the following line, you should include the prefixes of implementations you want to test.
		var indexedDB = indexedDB || webkitIndexedDB;
		var request = indexedDB.open("SuperDatabase", 1);
		request.onerror = function(event) {
		  // Do something with request.errorCode!
		  console.log('something went wrong');
		};
		request.onsuccess = (event)=>{
			 let db = event.target.result;
			 console.log('inserting');
			    let numbersObjectStore = db.transaction("numbers", "readwrite").objectStore("numbers");
			    for(let i = 1;i < 100000 ; i++){
			       var req = numbersObjectStore.add({id:i,value:Math.random()});
			       req.onsuccess = function(){
			       	 	console.log('added '+i);
			       }
			       req.onerror = function(error){
			       		console.log(error);
			       }
			   }

		};
		request.onupgradeneeded = function(event) {
		  // Do something with request.result!
		   let db = event.target.result;
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

onmessage = function(e) {
  console.log('Message received from main script');
  console.log('Posting message back to main script');
  console.log(arguments);
  if(e.data.doStuff === 1){
  	 indexedDBInsertion();
  	   postMessage({done:true});

  }else if(e.data.doStuff===0){
  	 inMemoryInsertion();
  	   postMessage({done:true});

  }
};
