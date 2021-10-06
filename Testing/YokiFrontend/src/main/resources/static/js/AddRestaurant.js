window.onload = getRestaurant;
var restaurantId;
var isNew;
var XMLgetRestaurant = new XMLHttpRequest();
var XMLaddRestaurant = new XMLHttpRequest();
var XMLEditRestaurant = new XMLHttpRequest();
var xhr = new XMLHttpRequest();
var restaurant;
var imgLogoOnchange=false;
var imgRestaurantOnchange=false;


// To fetch restaurant details

function getRestaurant() {

	try {
		restaurantId = localStorage.getItem("restaurantId");
		isNew = localStorage.getItem("isNew");
		if (restaurantId != "null" && restaurantId != null) {

			XMLgetRestaurant.open('GET', 'http://localhost:8080/restaurant/getRestaurant/' + restaurantId);
			XMLgetRestaurant.onreadystatechange = function() {
				if (XMLgetRestaurant.readyState == 4 && XMLgetRestaurant.status == 200) {
					restaurant = JSON.parse(XMLgetRestaurant.responseText);
					fillRestaurantDetails(restaurant);
				}
			}
			XMLgetRestaurant.send();
		}

		else if (restaurantId == "null" || restaurantId == null) {

			document.getElementById("convenienceItem").style.display = "none";
		}
	}
	catch (e) {
		jsExceptionHandlingForRestaurantServiceForRestaurantService(e, "AddRestaurant.js-getRestaurant()")
	}

}


// To autofill restaurant details	


function fillRestaurantDetails(restaurant) {


	try {
		document.getElementById("field1").value = restaurant.restaurantName;
		document.getElementById("field1").disabled = true;

		document.getElementById("field2").value = restaurant.cuisineType;

		if (restaurant.restaurantType == "Restaurant") {
			document.getElementById("Restaurant").checked = true;
		}
		else if (restaurant.restaurantType == "Convenience") {
			document.getElementById("c-store").checked = true;
		}
		else if (restaurant.restaurantType == "Bar") {
			document.getElementById("bar").checked = true;
		}

		document.getElementById("Restaurant").disabled = true;
		document.getElementById("c-store").disabled = true;
		document.getElementById("bar").disabled = true;

		if (restaurant.restaurantType == "Convenience") {
			for (var i = 0; i < restaurant.itemBO.length; i++) {
				if (restaurant.itemBO[i].isConvenience == 1 && restaurant.itemBO[i].isDeleted == 0) {
					var liElement = document.createElement('li');
					liElement.className = "search-choice";
					liElement.innerHTML = "<span>" + restaurant.itemBO[i].itemName + "</span><a class='search-choice-close' onClick='removeItem(this)'></a>";
					var parent = document.getElementById('second_chosen');
					var element = parent.getElementsByTagName('ul')[0];
					element.prepend(liElement);
				}
			}
		}
		else if (restaurant.convenienceItems != "" && restaurant.convenienceItems != null) {
			var listItems="";
			for (var i = 0; i < restaurant.convenienceItems.split(";").length - 1; i++)
			 {
				
				if(listItems.includes(restaurant.convenienceItems.split(";")[i])==false){
					listItems+=restaurant.convenienceItems.split(";")[i];
				var liElement = document.createElement('li');
				liElement.className = "search-choice";
				liElement.innerHTML = "<span>" + restaurant.convenienceItems.split(";")[i] + "</span><a class='search-choice-close' onClick='removeItem(this)'></a>";
				var parent = document.getElementById('second_chosen');
				var element = parent.getElementsByTagName('ul')[0];
				element.prepend(liElement);}
			}
		}

		for (var i = 0; i < restaurant.itemBO.length; i++) {
			if (restaurant.itemBO[i].isChefSpecial == 1 && restaurant.itemBO[i].isDeleted == 0) {
				var liElement = document.createElement('li');
				liElement.className = "search-choice";
				liElement.innerHTML = "<span>" + restaurant.itemBO[i].itemName + "</span><a class='search-choice-close' onClick='removeItem(this)'></a>";
				var parent = document.getElementById('second2_chosen');
				var element = parent.getElementsByTagName('ul')[0];
				element.prepend(liElement);
			}
		}


var itemImageName = restaurant.restaurantLogo.split("_")[1];
var f=document.createElement('img');
f.src=restaurant.restaurantLogo;
const dataTransferObj = new DataTransfer();
dataTransferObj.items.add(new File([f], itemImageName));

document.getElementById('customFile1').files = dataTransferObj.files;


var imgLogo = document.getElementById("imageLogo");
		imgLogo.innerHTML = "<a href='#' onclick=window.open('"+restaurant.restaurantLogo+"')>" + restaurant.restaurantLogo.split("_")[1] + "</a>";
		document.getElementById("customFileLl").innerText = restaurant.restaurantLogo.split("_")[1];

		if (restaurant.restaurantImage != "" && restaurant.restaurantImage != null) {
			var imgLogo = document.getElementById("restaurantImage");
			imgLogo.innerHTML = "<a href='#' onclick=window.open('"+restaurant.restaurantImage+"')>" + restaurant.restaurantImage.split("_")[1] + "</a>";
			document.getElementById("customFileL").innerText = restaurant.restaurantImage.split("_")[1];
		}
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "AddRestaurant.js-fillRestaurantDetails()")
	}
}
function removeItem(obj) {
	try {
		var listEle = obj.closest('li');
		listEle.remove();
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "AddRestaurant.js-removeItem()")
	}
}




//Image validation

document.getElementById("customFile").addEventListener("change", imageValidation);
document.getElementById("customFile1").addEventListener("change", imageValidation);

function imageValidation() {
	try {
		if (document.getElementById("customFile").files.length != 0) {
			
			if (document.getElementById("customFile").files[0].size > 122880) {

				document.getElementById("customFileL").innerText = "File size too big";
				document.getElementById("customFileL").style.color = 'red';
				document.getElementById("restaurantImage").style.display = 'none';
			}
			else if (document.getElementById("customFile").files[0].size < 122880) {
				document.getElementById("customFileL").style.color = 'black';
				document.getElementById("customFileL").innerText = document.getElementById("customFile").files[0].name;
				document.getElementById("restaurantImage").style.display = 'block';
				var imgLogo = document.getElementById("restaurantImage");
				imgLogo.innerHTML = "<a href='' onclick=window.open('"+URL.createObjectURL(document.getElementById("customFile").files[0])+"')>" + document.getElementById("customFile").files[0].name + "</a>";

			}
		}
		if (document.getElementById("customFile1").files.length != 0) {
			
			if (document.getElementById("customFile1").files[0].size > 122880) {
				document.getElementById("customFileLl").innerText = "File size too big";
				document.getElementById("customFileLl").style.color = 'red';
				document.getElementById("imageLogo").style.display = 'none';
			}
			else if (document.getElementById("customFile1").files[0].size < 122880) {
				document.getElementById("customFileLl").style.color = 'black';
				document.getElementById("customFileLl").innerText = document.getElementById("customFile1").files[0].name;
				document.getElementById("imageLogo").style.display = 'block';
				var imgLogo = document.getElementById("imageLogo");
				imgLogo.innerHTML = "<a href='' onclick=window.open('"+URL.createObjectURL(document.getElementById("customFile1").files[0])+"')>" + document.getElementById("customFile1").files[0].name + "</a>";
			}
		}
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "AddRestaurant.js-imageValidation()")
	}
}
document.getElementById('customFile').addEventListener('change',function(){imgRestaurantOnchange=true;})
document.getElementById('customFile1').addEventListener('change',function(){imgLogoOnchange=true;})



//Form validation

document.getElementById("success-pop").addEventListener("click", formValidation);
function formValidation() {

	try {
		if (document.getElementById("field1").value == "") {
			document.getElementById("restNameError").style.display = 'block';
			document.getElementById("restNameError").innerText = "Restaurant name cannot be empty";
			document.getElementById("restNameError").style.color = 'red';
		}

		{
			if (document.getElementById("field2").value == "") {
				document.getElementById("restCuisineError").style.display = 'block';
				document.getElementById("restCuisineError").innerText = "Cuisine type cannot be empty";
				document.getElementById("restCuisineError").style.color = 'red';
			}
		}

		if (document.getElementById('customFile1').files.length == 0) {
			document.getElementById("customFileLl").innerText = "Restaurant Logo cannot be empty";
			document.getElementById("customFileLl").style.color = 'red';
		}

		var newRestaurant = {};
		var newRestaurantName = document.getElementById("field1").value;
		var newCuisineType = document.getElementById("field2").value;
		var image = document.getElementById("customFile1").files[0]
		var ele = document.getElementsByName('radio0');
		for (var i = 0; i < 3; i++) {
			if (ele[i].checked) {
				var newRestaurantType = ele[i].value
			}
		}

		var formData = new FormData();
		if (document.getElementById("customFile1").files.length != 0) {
			formData.append('files', document.getElementById("customFile1").files[0]);
		}

		if (document.getElementById("customFile").files.length != 0) {
			formData.append('files', document.getElementById("customFile").files[0]);
		}


		if (newRestaurantName != "" && newCuisineType != "" && image.size < 122880) {
			xhr.open("POST", "http://localhost:8070/file/multi-upload", true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					var imageURL = JSON.parse(xhr.responseText);
					newRestaurant.restaurantLogo = imageURL[0];
					newRestaurant.restaurantImage = imageURL[1];
					newRestaurant.restaurantName = newRestaurantName;
					newRestaurant.cuisineType = newCuisineType;
					newRestaurant.restaurantType = newRestaurantType;
					newRestaurant.isDeleted = 0;
					newRestaurant.restaurantStatus = "closed";
					if (isNew == "true") { newRestaurant.createdDate = new Date(); }
					else {newRestaurant.restaurantStatus=restaurant.restaurantStatus; newRestaurant.modifiedDate = new Date(); newRestaurant.createdDate = restaurant.createdDate; newRestaurant.restaurantId = restaurant.restaurantId 
					if(imgLogoOnchange==false){newRestaurant.restaurantLogo=restaurant.restaurantLogo}
					if(imgRestaurantOnchange==false){newRestaurant.restaurantImage=restaurant.restaurantImage}}
					newRestaurant.convenienceItems = "";

					saveButtonClicked(newRestaurant);

				}
			}
			xhr.send(formData);


		}
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "AddRestaurant.js-formValidation()")
	}

}

document.getElementById("field1").addEventListener('keyup', function() {
	if (document.getElementById("field1").value != "") {
		document.getElementById("restNameError").style.display = 'none';
	}
});

document.getElementById("field2").addEventListener('keyup', function() {
	if (document.getElementById("field2").value != "") {
		document.getElementById("restCuisineError").style.display = 'none';
	}
});


// For saving the restaurant

function saveButtonClicked(newRestaurant) {

	try {
		if (isNew == "true") {
			var valid;
			XMLaddRestaurant.open('POST', 'http://localhost:8080/restaurant/addRestaurant');
			XMLaddRestaurant.onreadystatechange = function() {
				if (XMLaddRestaurant.readyState == 4 && XMLaddRestaurant.status == 200) {
					valid = (XMLaddRestaurant.responseText);
					if (valid == "false") {
						document.getElementById("restNameError").style.display = 'block';
						document.getElementById("restNameError").style.color = 'red';
						document.getElementById("restNameError").innerText = "Restaurant name already exist";
					}
					else {
						$('.tivasta-success').fadeIn(300);
						localStorage.clear();
					}
				}
			}
			XMLaddRestaurant.setRequestHeader("Content-Type", "application/json");
			XMLaddRestaurant.send(JSON.stringify(newRestaurant));
		}

		if (isNew == "false") {

			if (newRestaurant.restaurantType != "Convenience") {
				var parent = document.getElementById('second_chosen');
				var element = parent.getElementsByTagName('ul')[0].getElementsByTagName('li');
				for (var i = 0; i < element.length - 1; i++) {
					newRestaurant.convenienceItems += element[i].getElementsByTagName('span')[0].innerHTML + ";";

				}
			}

			var chefSpecial ="none,";
			var editResponse;
			var parent = document.getElementById('second2_chosen');
			var element = parent.getElementsByTagName('ul')[0].getElementsByTagName('li');
			for (var i = 0; i < element.length - 1; i++) {
				chefSpecial += element[i].getElementsByTagName('span')[0].innerHTML + ",";
			}
			XMLEditRestaurant.open('PUT', 'http://localhost:8080/restaurant/editRestaurant/' + chefSpecial);
			XMLEditRestaurant.onreadystatechange = function() {
				if (XMLEditRestaurant.readyState == 4 && XMLEditRestaurant.status == 200) {
					editResponse = (XMLEditRestaurant.responseText);
					if (editResponse == "true") {
						$('.tivasta-success').fadeIn(300);
						localStorage.clear();
					}
				}
			}
			XMLEditRestaurant.setRequestHeader("Content-Type", "application/json");
			XMLEditRestaurant.send(JSON.stringify(newRestaurant));


		}
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "AddRestaurant.js-saveButtonClicked()")
	}
}

document.getElementById("okButton").addEventListener('click', function() {
	$('.tivasta-success').fadeOut(300);
	window.location.replace("http://localhost:8083/Restaurant_Grid.htm");
});



// To populate List of Convenience Items

var XMLgetConvenience = new XMLHttpRequest();
getConvenienceItems();

function getConvenienceItems() {

	try {
		XMLgetConvenience.open('GET', 'http://localhost:8080/items/convenience', false);
		XMLgetConvenience.onreadystatechange = function() {
			if (XMLgetConvenience.readyState == 4 && XMLgetConvenience.status == 200) {
				var convenienceItems = JSON.parse(XMLgetConvenience.responseText);
				for (i = 0; i < convenienceItems.length; i++) {


					var option = document.createElement('option');
					option.innerHTML = convenienceItems[i]; option.value = convenienceItems[i];
					document.getElementById("second").appendChild(option);
				}
			}
		}
		XMLgetConvenience.send();
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "AddRestaurant.js-getConvenienceItems()")
	}
}


// To populate list of restaurant items

getRestaurantItems();
function getRestaurantItems() {

	try {
		var rest = localStorage.getItem("restaurant");
		rest = rest.split("/");
		for (var i = 0; i < rest.length - 1; i++) {
			var option = document.createElement('option');
			option.innerHTML = rest[i]; option.value = rest[i];
			document.getElementById("second2").appendChild(option);
		}
	}
	catch (e) {
		jsExceptionHandlingForRestaurantService(e, "AddRestaurant.js-getRestaurantItems()")
	}

}

