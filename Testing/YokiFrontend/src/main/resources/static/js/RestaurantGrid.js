var XMLgetRestaurantCount = new XMLHttpRequest();
var XMLgetAllRestaurants = new XMLHttpRequest();
var XMLgetSearchCount = new XMLHttpRequest();
var XMLgetSearchedRestaurants = new XMLHttpRequest();
var XMLchangeStatus = new XMLHttpRequest();
var XMLdeleteRestaurant = new XMLHttpRequest();
var searchApplied;
var restaurantCount;
var pageIndex;
var listOfRestaurants;
var searchText;
var sendStatus;
var buttonId;
var restaurantId;




window.onload = getRestaurantCount;

// To get the total Restaurant count

function getRestaurantCount() {

	try {
		searchApplied = false;
		$("#tableBody").empty();
		XMLgetRestaurantCount.open('GET', 'http://localhost:8080/restaurant/getCount');
		XMLgetRestaurantCount.onreadystatechange = function() {
			if (XMLgetRestaurantCount.readyState == 4 && XMLgetRestaurantCount.status == 200) {
				restaurantCount = (XMLgetRestaurantCount.responseText);
				//	alert(restaurantCount);
				pageIndex = 0;
				if (restaurantCount > 0) {
					document.getElementById('noRestaurant').style.display = "none";
					getAllRestaurants(pageIndex);
				}
				else {
					document.getElementById('loadMore').style.display = "none";
					//	document.getElementById('table').style.display="none";
					//	document.getElementById('loadMore').style.display="none";
					//document.getElementById('tableBody').style.display="none";
					document.getElementById('noRestaurant').style.display = "block";


				}

			}
		}
		XMLgetRestaurantCount.send(null);
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-getRestaurantCount()");
	}
}


// To fetch the list of restaurants

function getAllRestaurants(pageNumber) {
	try {
		XMLgetAllRestaurants.open('GET', 'http://localhost:8080/restaurant/getAllRestaurant/' + pageNumber);
		XMLgetAllRestaurants.onreadystatechange = function() {
			if (XMLgetAllRestaurants.readyState == 4 && XMLgetAllRestaurants.status == 200) {
				listOfRestaurants = JSON.parse(XMLgetAllRestaurants.responseText)
				displayRestaurants(listOfRestaurants);
			}
		}
		XMLgetAllRestaurants.send(null);
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-getAllRestaurants()");
	}
}

// To append the List of RestaurantBO objects in the table

function displayRestaurants(restaurantList) {

	try {
		for (var i = 0; i < restaurantList.length; i++) {
			var restaurant = document.createElement('tr');
			restaurant.id = "row" + restaurantList[i].restaurantId;

			var restaurantImage = document.createElement('td');
			restaurantImage.innerHTML = "<img src=" + restaurantList[i].restaurantLogo + " alt=' ' class='tivasta-restaurant-image'/>"

			var restaurantName = document.createElement('td');
			restaurantName.innerHTML = "<a href='#'>" + restaurantList[i].restaurantName + "</a>";

			var cuisineType = document.createElement('td');
			cuisineType.innerHTML = restaurantList[i].cuisineType;

			var chefSpecial = document.createElement('td');
			var first = false;
			for (var j = 0; j < restaurantList[i].itemBO.length; j++) {

				if (restaurantList[i].itemBO[j].isChefSpecial == 1 && restaurantList[i].itemBO[j].isDeleted == 0) {
					if (first == true) {
						chefSpecial.innerHTML += ",";
					}
					chefSpecial.innerHTML += restaurantList[i].itemBO[j].itemName;
					first = true;

				}
			}

			var status = document.createElement('td');
			var printStatus = restaurantList[i].restaurantStatus;
			if (printStatus == "opened") {
				status.innerHTML = "<button type='button' class='btn btn-toggle toggle-btn active' onclick='updateRestaurantStatus(this)' id=" + restaurantList[i].restaurantId + "><span class='handle'></span></button><span class='' id='span" + restaurantList[i].restaurantId + "'>Opened</span>";
			}

			else if (printStatus == "closed") {

				status.innerHTML = "<button type='button' class='btn btn-toggle toggle-btn' onclick='updateRestaurantStatus(this)' id=" + restaurantList[i].restaurantId + "><span class='handle'></span></button><span class='' id='span" + restaurantList[i].restaurantId + "'>Closed</span>";
			}

			var editAndDelete = document.createElement('td');
			editAndDelete.className = "tivasta-text-center";
			editAndDelete.innerHTML = "<a href='#' title='Edit'><img src='images/edit.png' alt='Edit Icon' class='tivasta-mr-2' id='edit/" + restaurantList[i].restaurantId + "' onclick='editButtonClicked(this)'></a><a href='#' id='confirm-delete' title='Delete'><img src='images/trash.png' alt='Delete Icon' data-toggle='modal' data-target='#delete' class='delete-icon' id='delete/" + restaurantList[i].restaurantId + "' onclick='deleteButtonClicked(this)'></a>"

			var fullRestaurant = document.createElement('td');
			fullRestaurant.style.display = 'none';
			fullRestaurant.id = "full" + restaurantList[i].restaurantId;
			for (var j = 0; j < restaurantList[i].itemBO.length; j++) {
				if (restaurantList[i].itemBO[j].isDeleted == 0) {
					fullRestaurant.innerHTML += restaurantList[i].itemBO[j].itemName + "/";
				}
			}

			restaurant.appendChild(restaurantImage);
			restaurant.appendChild(restaurantName);
			restaurant.appendChild(cuisineType);
			restaurant.appendChild(chefSpecial);
			restaurant.appendChild(status);
			restaurant.appendChild(editAndDelete);
			restaurant.appendChild(fullRestaurant);


			document.getElementById("tableBody").appendChild(restaurant);

		}
		if ($('#tableBody tr').length == restaurantCount) {
			document.getElementById('loadMore').style.display = "none";
		}
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-displayRestaurants()");
	}
}


// To get the search count of restaurants

document.getElementById('searchBar').addEventListener('keyup', getSearchCount)

function getSearchCount() {

	try {
		searchApplied = true;
		$("#tableBody").empty();
		searchText = document.getElementById('searchBar').value;
		if (searchText != "") {
			XMLgetSearchCount.open('GET', 'http://localhost:8080/restaurant/searchCount/' + searchText);
			XMLgetSearchCount.onreadystatechange = function() {
				if (XMLgetSearchCount.readyState == 4 && XMLgetSearchCount.status == 200) {
					restaurantCount = XMLgetSearchCount.responseText;
					pageIndex = 0;
					if (restaurantCount > 0) {
						document.getElementById('noRestaurant').style.display = "none";
						//document.getElementById('loadMore').style.display="block";
						//document.getElementById('tableBody').style.display="block";
						searchRestaurant(searchText, pageIndex);
					}
					else {
						document.getElementById('loadMore').style.display = "none";
						//document.getElementById('tableBody').style.display="none";
						document.getElementById('noRestaurant').style.display = "block";
					}
				}
			}
			XMLgetSearchCount.send(null);
		}
		else {
//			document.getElementById('loadMore').style.display = "block";
//			getRestaurantCount();
			window.location.reload();
		}
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-getSearchCount()");
	}
}


// To get the search results

function searchRestaurant(searchedText, pageNumber) {
	try {
		XMLgetSearchedRestaurants.open('GET', 'http://localhost:8080/restaurant/searchRestaurant/' + searchedText + '/' + pageNumber);
		XMLgetSearchedRestaurants.onreadystatechange = function() {
			if (XMLgetSearchedRestaurants.readyState == 4 && XMLgetSearchedRestaurants.status == 200) {
				listOfRestaurants = JSON.parse(XMLgetSearchedRestaurants.responseText)
				displayRestaurants(listOfRestaurants);
			}
		}
		XMLgetSearchedRestaurants.send(null);
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-searchRestaurant()");
	}
}


// For pagination

document.getElementById("loadMore").addEventListener('click', loadMoreButtonClicked)

function loadMoreButtonClicked() {
	try {
		pageIndex = pageIndex + 1;
		if (searchApplied == false) {
			getAllRestaurants(pageIndex);
		}
		else {
			searchRestaurant(pageIndex);
		}

	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-loadMoreButtonClicked()");
	}
}

// To update the restaurant status (open/closed)

function updateRestaurantStatus(obj) {
	try {
		restaurantId = obj.id;
		if (document.getElementById("span" + restaurantId).innerText == "Closed") {
			sendStatus = "opened";
		}
		else if (document.getElementById("span" + restaurantId).innerText == "Opened") {
			sendStatus = "closed";
		}


		XMLchangeStatus.open('PUT', 'http://localhost:8080/restaurant/changeStatus/' + restaurantId + '/' + sendStatus)
		XMLchangeStatus.onreadystatechange = function() {

			if (XMLchangeStatus.readyState == 4 && XMLchangeStatus.status == 200) {

				if (sendStatus == "opened") {
					$(obj).toggleClass("active");
					document.getElementById("span" + restaurantId).innerText = "Opened";
				}
				else if (sendStatus == "closed") {
					$(obj).toggleClass("active");
					document.getElementById("span" + restaurantId).innerText = "Closed";
				}

			}
		};

		XMLchangeStatus.send();
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-updateRestaurantStatus()");
	}
}



//To edit a particular restaurant


function editButtonClicked(editObj) {
	try {
		id = editObj.id.split("/");
		restaurantId = id[1];
		localStorage.setItem("restaurantId", restaurantId);
		localStorage.setItem("isNew", "false");
		localStorage.setItem("restaurant", document.getElementById("full" + restaurantId).innerHTML);
		window.location.replace("http://localhost:8083/Add_New_Restaurant.htm");
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-editButtonClicked()");
	}
}

// To add a new Restaurant

document.getElementById("addNew").addEventListener('click', addNewButtonClicked);
function addNewButtonClicked() {
	localStorage.setItem("restaurantId", "null");
	localStorage.setItem("isNew", "true");
	window.location.replace("http://localhost:8083/Add_New_Restaurant.htm");
}

// To delete a particular restaurant

function deleteButtonClicked(deleteObj) {

	try {
		$('.tivasta-confirm').fadeIn(300);

		id = deleteObj.id.split("/");
		restaurantId = id[1];
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-deleteButtonClicked()");
	}
}
document.getElementById("yesButton").addEventListener('click', deleteFunction);
function deleteFunction() {
	try {
		XMLdeleteRestaurant.open('PUT', 'http://localhost:8080/restaurant/deleteRestaurant/' + restaurantId)
		XMLdeleteRestaurant.onreadystatechange = function() {
			if (XMLdeleteRestaurant.readyState == 4 && XMLdeleteRestaurant.status == 200) {
				document.getElementById("row" + restaurantId).remove();
				$('.tivasta-confirm').fadeOut(300);
				//window.location.reload();
				getSearchCount();
			}
		}
		XMLdeleteRestaurant.send();
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "RestaurantGrid.js-deleteFunction()");
	}
}
document.getElementById("noButton").addEventListener('click', function() {

	$('.tivasta-confirm').fadeOut(300);
});


