//fake data to LocalStorage
localStorage.setItem('name','Robert Paulson');
localStorage.setItem('fromAddress','2405 Robert Dedman Dr, Austin, TX, US');
localStorage.setItem('fromCity','Austin');
// localStorage.setItem('fromState','TX');
// localStorage.setItem('fromZip','78712');
// localStorage.setItem('fromLocationString', '2405 Robert Dedman Dr Austin, TX 78712')
localStorage.setItem('toAddress','11411 Research Blvd, Houston, TX, US');
localStorage.setItem('toCity','Houston');
// localStorage.setItem('toState','TX');
// localStorage.setItem('toZip','78759');
// localStorage.setItem('toLocationString','11411 Research Blvd Austin, TX 78759');

localStorage.setItem('requiredArrivalTime','09:00 AM');
localStorage.setItem('morningRoutineTime','20');

//sets a fake cookie
document.cookie = "commuteUser=4444444444444444; expires=01 Jan 1969 12:00:00 UTC";

//sets localStorage and cookies to an inspectable object
var localStorageObject = window.localStorage;
var cookieObject = document.cookie;

//prints localStorage objects for this solution
console.log(localStorageObject.name);
console.log(localStorageObject.fromAddress);
console.log(localStorageObject.fromCity);
// console.log(localStorageObject.fromState);
// console.log(localStorageObject.fromZip);
// console.log(localStorageObject.fromLocationString);
console.log(localStorageObject.toAddress);
console.log(localStorageObject.toCity);
// console.log(localStorageObject.toState);
// console.log(localStorageObject.toZip);
// console.log(localStorageObject.toLocationString);
console.log(localStorage.requiredArrivalTime);
console.log(localStorageObject.morningRoutineTime); 

//print Cookie query response to console
console.log(cookieObject.indexOf('commuteUser'));