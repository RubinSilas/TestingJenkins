var pathName= window.location.origin;
function jsExceptionHandling(e, methodAndFileName) {
	var jsExceptionXhr = new XMLHttpRequest();
	jsExceptionXhr.open("PUT", "http://localhost:8080/items/jsExceptions/"+e+methodAndFileName, true);
	jsExceptionXhr.send();
	jsExceptionXhr.onreadystatechange = function(){
		
	};
}

function jsExceptionHandlingForRestaurantService(e, methodAndFileName) {
	var jsExceptionXhr = new XMLHttpRequest();
	jsExceptionXhr.open("PUT", "http://localhost:8080/restaurant/jsExceptions/"+e+methodAndFileName, true);
	jsExceptionXhr.send();
	jsExceptionXhr.onreadystatechange = function(){
		
	};
}