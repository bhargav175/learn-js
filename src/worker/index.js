onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'ehe';
  console.log(workerResult);
  console.log('Posting message back to main script');
  postMessage(workerResult);
};
