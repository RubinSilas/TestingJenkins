
var pageIndex;
var loadMoreBtn = document.getElementById("loadMoreBtn");
var tBody = document.getElementById("tbody");
var totalCount;
var limit = 10;

window.onload = function() {
	getRestaurants();
	getTotalItemCount();
};


//To get restaurants 

function getRestaurants() {

	try {
		var xhrGetRestaurants = new XMLHttpRequest();
		xhrGetRestaurants.open("GET", "http://localhost:8080/restaurant/getRestaurants", true);
		xhrGetRestaurants.send();
		xhrGetRestaurants.onreadystatechange = function() {

			if (xhrGetRestaurants.readyState == 4 && xhrGetRestaurants.status == 200) {

				var restaurants = JSON.parse(this.responseText);

				var clearRestaurants = document.getElementById("restaurants-dropDown");
				var restaurantLength = clearRestaurants.options.length;

				for (i = restaurantLength - 1; i > 0; i--) {
					clearRestaurants.options[i] = null;
				}

				for (var key in restaurants) {

					var opt = document.createElement("option");

					opt.id = key;
					opt.innerHTML = restaurants[key];

					document.getElementById("restaurants-dropDown").options.add(opt);

				}

			}

		};
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-getRestaurants()")
	}
}



//To get Total item Count
var restaurantId;
var searchText;
function getTotalItemCount() {

	try {
		var selectedrestaurant = document.querySelector('#restaurants-dropDown').value;

		if (selectedrestaurant == "Select Restaurant") {
			restaurantId = 0;

		}



		if (document.getElementById("searchTxt").value == "") {
			searchText = 0;
		}
		else {
			searchText = document.getElementById("searchTxt").value;
		}


		var xhrGetItemsCount = new XMLHttpRequest();
		xhrGetItemsCount.open("GET", "http://localhost:8080/items/itemCount/" + restaurantId + "/" + searchText, true);
		xhrGetItemsCount.send();
		xhrGetItemsCount.onreadystatechange = function() {
			if (xhrGetItemsCount.readyState == 4 && xhrGetItemsCount.status == 200) {

				totalCount = this.responseText;

				if (totalCount <= 0) {
					loadMoreBtn.style.display = "none";
					document.getElementById("noRecords").innerHTML = "<span>No Record found</span>";
				}
				else if (totalCount > 0 && totalCount <= limit) {
					loadMoreBtn.style.display = "none";
					document.getElementById("noRecords").innerHTML = "";
				}
				else {
					loadMoreBtn.style.display = "block";
					document.getElementById("noRecords").innerHTML = "";
				}

				pageIndex = 0;

				getItems(pageIndex, restaurantId, searchText);

			}
		};
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-getTotalItemCount()");
	}
}




//To get Items
function getItems(pageIndex, restaurantId, searchText) {
	try {
		var xhrGetItems = new XMLHttpRequest();
		xhrGetItems.open("GET", "http://localhost:8080/items/getItems/" + pageIndex + "/" + restaurantId + "/" + searchText, true);
		xhrGetItems.send();
		xhrGetItems.onreadystatechange = function() {

			if (xhrGetItems.readyState == 4 && xhrGetItems.status == 200) {

				var itemsObj = JSON.parse(this.responseText);

				displayItems(itemsObj);

				if (totalCount == $("#tbody tr").length) {

					loadMoreBtn.style.display = "none";
				}
				else {
					loadMoreBtn.style.display = "block";
				}


			}

		};
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-getItems()");
	}
}


//To display items in Grid
function displayItems(itemsObj) {


	try {
		var rowLength = itemsObj.length;

		for (var i = 0; i < rowLength; i++) {

			var trow = document.createElement("tr");
			trow.id = "tr" + i;

			if (itemsObj[i].isChefSpecial == 1) {
				var chefTd = document.createElement("td");
				chefTd.id = "chefSpecial" + i;
				chefTd.innerHTML = "<img src='images/chef-special-item.png' alt='chef-item' class='tivasta-chef-image' />";
			}
			else {
				var chefTd = document.createElement("td");
				chefTd.id = "chefSpecial" + i;
				chefTd.innerHTML = "<img src='images/chef-item.png' alt='chef-item' class='tivasta-chef-image' />";
			}

			trow.appendChild(chefTd);


			var itemImageTd = document.createElement("td");
			itemImageTd.id = "itemImage" + i;
			itemImageTd.innerHTML = "<img src='" + itemsObj[i].itemImageUrl + "' alt='dish-image' class='tivasta-dish-image' />";
			trow.appendChild(itemImageTd);

			var itemNameTd = document.createElement("td");
			itemNameTd.id = "itemNameTd" + i;
			itemNameTd.innerHTML = "<span class=''><a href=''>" + itemsObj[i].itemName + "</a> </span>";
			trow.appendChild(itemNameTd);

			var restaurantNameTd = document.createElement("td");
			restaurantNameTd.id = "restaurantNameTd" + i;
			restaurantNameTd.innerHTML = itemsObj[i].restaurantName;
			trow.appendChild(restaurantNameTd);

			var categoryTd = document.createElement("td");
			categoryTd.id = "categoryTd" + i;
			categoryTd.innerHTML = itemsObj[i].itemCategory;
			trow.appendChild(categoryTd);

			var labelTd = document.createElement("td");
			labelTd.id = "labelTd" + i;
			labelTd.innerHTML = itemsObj[i].itemLabels;
			trow.appendChild(labelTd);

			var priceTd = document.createElement("td");
			priceTd.id = "priceTd" + i;
			priceTd.innerHTML = itemsObj[i].itemPrice;
			trow.appendChild(priceTd);

			if (itemsObj[i].isAvailable == 1) {
				var statusTd = document.createElement("td");
				statusTd.id = "statusTd" + i;
				statusTd.innerHTML = "<button type='button' class='btn btn-toggle toggle-btn active' id='" + itemsObj[i].itemId + "' onclick='updateItemStatus(this)'><span class='handle'></span></button> <span class='' id='span" + itemsObj[i].itemId + "'>Available</span>";
			}
			else {
				var statusTd = document.createElement("td");
				statusTd.id = "statusTd" + i;
				statusTd.innerHTML = "<button type='button' class='btn btn-toggle toggle-btn' id='" + itemsObj[i].itemId + "' onclick='updateItemStatus(this)'><span class='handle'></span></button> <span class='' id='span" + itemsObj[i].itemId + "'>Not - Available</span>";
			}

			trow.appendChild(statusTd);


			var actionTd = document.createElement("td");
			actionTd.id = "actionTd" + i;
			actionTd.className = "tivasta-text-center";
			actionTd.innerHTML = "<a href='#' title='Edit'><img src='images/edit.png' onclick='editButtonClicked(" + itemsObj[i].itemId + ")' alt='Edit Icon' class='tivasta-mr-2'></a><a href='#' title='Delete'><img src='images/trash.png' alt='Delete Icon' onclick='popUp(" + itemsObj[i].itemId + ")' data-toggle='modal' data-target='#delete'></a>";


			trow.appendChild(actionTd);

			tBody.appendChild(trow);

		}
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-displayItems()");
	}

}



//Edit button clicked
function editButtonClicked(id) {

	try {
		itemId = id;

		window.location.href = "Edit_Items.htm?id=" + itemId;
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-editButtonClicked()");
	}
}


var deleteId;
function popUp(id) {

	try {
		deleteId = id;
		$('.tivasta-confirm').fadeIn(300);
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-popUp()");
	}

}



function deleteItem() {

	try {
		var xhrDeleteItem = new XMLHttpRequest();
		xhrDeleteItem.open("PUT", "http://localhost:8080/items/deleteItem/" + deleteId, true);
		xhrDeleteItem.send();
		xhrDeleteItem.onreadystatechange = function() {

			if (xhrDeleteItem.readyState == 4 && xhrDeleteItem.status == 200) {

				var response = JSON.parse(this.responseText);
				if (response) {
					window.location.reload();
				}

			}

		};

	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-deleteItem()");
	}
}

var updateId;
var updateStatus;
function updateItemStatus(obj) {

	try {
		updateId = obj.id;

		//alert(document.getElementById("span"+updateId).innerText);

		if (document.getElementById("span" + updateId).innerText == "Available") {
			updateStatus = 0;
			document.getElementById("span" + updateId).innerText = "Not - Available";
		}
		else {
			updateStatus = 1;
			document.getElementById("span" + updateId).innerText = "Available"
		}

		var xhrUpdateItem = new XMLHttpRequest();
		xhrUpdateItem.open("PUT", "http://localhost:8080/items/updateStatus/" + updateId + "/" + updateStatus, true);
		xhrUpdateItem.send();
		xhrUpdateItem.onreadystatechange = function() {

			if (xhrUpdateItem.readyState == 4 && xhrUpdateItem.status == 200) {

				var response = JSON.parse(this.responseText);
				if (response) {
					$(obj).toggleClass("active");
				}

			}

		};
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-updateItemStatus()");
	}
}

document.getElementById("loadMoreBtn").addEventListener("click", function() {

	pageIndex++;

	var selectedrestaurant = document.querySelector('#restaurants-dropDown').value;

	if (selectedrestaurant == "Select Restaurant") {
		restaurantId = 0;

	}



	if (document.getElementById("searchTxt").value == "") {
		searchText = 0;
	}
	else {
		searchText = document.getElementById("searchTxt").value;
	}

	getItems(pageIndex, restaurantId, searchText);

});



function getItemsByRestaurant(obj) {
	try {
		$("#tbody").empty();
		restaurantId = $(obj).find('option:selected').attr('id');

		getTotalItemCount();
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-getItemsByRestaurant()");
	}
}


function searchItem() {
	try {
		$("#tbody").empty();
		getTotalItemCount();
	}
	catch (e) {
		jsExceptionHandling(e, "ItemGrid.js-searchItem()");
	}
}
