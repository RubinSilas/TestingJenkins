var editFlag = false;

window.onload = onLoad;

var itemId;

var fileUploadFlag = false;
var itemStatus= 0;

var existingImageUrl;

// To get itemId from query string parameter
var itemObj;
function onLoad() {
	try {
		var urlParams = new URLSearchParams(window.location.search);
		itemId = urlParams.get('id');

		if (itemId != null) {

			var xhrGetItem = new XMLHttpRequest();
			xhrGetItem.open("GET", "http://localhost:8080/items/getItem/" + itemId, true);

			xhrGetItem.send();
			xhrGetItem.onreadystatechange = function() {

				if (xhrGetItem.readyState == 4 && xhrGetItem.status == 200) {

					itemObj = JSON.parse(this.responseText);
					editFlag = true;


					document.getElementById("itemName").value = itemObj.itemName;
					document.getElementById("itemName").disabled = true;
					document.getElementById("itemPrice").value = itemObj.itemPrice;
					document.getElementById("itemCategory").value = itemObj.itemCategory;
					document.getElementById("itemTax").value = itemObj.itemTax;
					document.getElementById("itemDescription").value = itemObj.itemDescription;
					document.getElementById("totalCalories").value = itemObj.totalCalories;
					document.getElementById("allergensName").value = itemObj.allergensName;
					document.getElementById("allergensDescription").value = itemObj.allergensDescription;
					itemStatus = itemObj.isAvailable;
					var nutritionRowCounter;

					for (var i = 0; i < itemObj.nutritions.length; i++) {

						nutritionRowCounter++;

						var trow = document.createElement("tr");

						var nutritionTd = document.createElement("td");
						nutritionTd.innerHTML = "<input type='text' class='tivasta-form-control'  id='field6" + nutritionRowCounter + "' value='" + itemObj.nutritions[i].nutritionType + "' disabled>";
						trow.appendChild(nutritionTd);

						var nutritionValueTd = document.createElement("td");
						nutritionValueTd.innerHTML = "<input type='text' class='tivasta-form-control'  id='field7" + nutritionRowCounter + "' value='" + itemObj.nutritions[i].nutritionValue + "' disabled>";
						trow.appendChild(nutritionValueTd);

						var actionTd = document.createElement("td");
						actionTd.innerHTML = "<span class='tivasta-d-inline-block tivasta-py-2'><a title='Edit' id='" + nutritionRowCounter + "' onclick = 'editNutrition(this)'><img src='images/edit.png' alt='Edit Icon' class='tivasta-mr-4'></a><a title='Delete' onclick=removeNutrition(this)><img src='images/trash.png' alt='Delete Icon'></a></span>";
						trow.appendChild(actionTd);

						document.getElementById("nutrition-tbody").appendChild(trow);
					}

					var counter;

					for (var i = 0; i < itemObj.ingredients.length; i++) {

						counter++;
						document.getElementById("ingredient-div").innerHTML += "<span class='tivasta-ingredient-list'>" + itemObj.ingredients[i].ingredientName + "<a class='search-choice-close' data-option-array-index='" + (counter) + "' onclick='return removeSelectedIngredient(this)'></a></span>";
					}


					var labels = itemObj.itemLabels;
					var splitLabels = labels.split(",");

					if (itemObj.itemLabels != "") {
						for (var i = 0; i < splitLabels.length; i++) {
							//document.getElementById("label-div").innerHTML += "<div class='chosen-container chosen-container-multi' id=    'second_chosen' style='width: 438px;'><ul class='chosen-choices'> <li class='search-choice'> <span>"+splitLabels[i]+"</span><a class='search-choice-close' data-option-array-index='"+i+"'></a></li> </ul></div>";
							var li = document.createElement("li");
							li.className = 'search-choice';
							li.innerHTML = "<span>" + splitLabels[i] + "</span><a class='search-choice-close' data-option-array-index='" + i + "' onclick='return removeSelectedLabel(this)'></a>";
							var parent = document.getElementById('second_chosen');
							var element = parent.getElementsByTagName('ul')[0];
							element.prepend(li);
						}
					}

					existingImageUrl = itemObj.itemImageUrl;
					var itemImageName;
					var rawFile = new XMLHttpRequest();
					rawFile.open("GET", itemObj.itemImageUrl, true);
					rawFile.onreadystatechange = function() {
						if (rawFile.readyState == 4 && rawFile.status == 200) {
							var allText = rawFile.responseText;

							var splittedName = itemObj.itemImageUrl.split("_");
							itemImageName = splittedName[1];

							const dataTransferObj = new DataTransfer();
							dataTransferObj.items.add(new File([allText], itemImageName));
							document.getElementById('customFile').files = dataTransferObj.files;

							document.getElementById("file-span").innerHTML = "<a href='#' onclick = window.open('"+itemObj.itemImageUrl+"') >" + itemImageName + "</a>";
							document.getElementById("fileLable").innerHTML = itemImageName;
						}
					}
					rawFile.send();
				}
			};
		}

		getRestaurants();
		getNutritionType();
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-onLoad()");
	}
}


// To get Nutrition Types

function getNutritionType() {

	try {
		var xhrNutrition = new XMLHttpRequest();
		xhrNutrition.open("GET", "http://localhost:8080/items/getNutritions", true);
		xhrNutrition.send();
		xhrNutrition.onreadystatechange = function() {
			if (xhrNutrition.readyState == 4 && xhrNutrition.status == 200) {

				var nutrionsMap = JSON.parse(this.responseText);

				var clearNutritions = document.getElementById("nutrition-dropDown");
				var nutritionLength = clearNutritions.options.length;

				for (i = nutritionLength - 1; i > 0; i--) {
					clearNutritions.options[i] = null;
				}

				for (var key in nutrionsMap) {

					var opt = document.createElement("option");

					opt.id = key;
					opt.innerHTML = nutrionsMap[key];

					document.getElementById("nutrition-dropDown").options.add(opt);

				}
			}

		};
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-getNutritionType()");
	}

}


// To get Restaurants

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

				if (itemObj != undefined) {
					document.querySelector("#restaurants-dropDown").value = itemObj.restaurantName;
					for (var key in restaurants) {

						if (restaurants[key] == itemObj.restaurantName) {

							restaurantId = key;
						}

					}
				}

			}

		};
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-getRestaurants()");
	}
}


// To validate restaurant dropdown

function onBlurOfRestaurant() {

	try {
		var selectedrestaurant = document.querySelector('#restaurants-dropDown').value;

		if (selectedrestaurant == "Select") {

			document.getElementById("restaurant-span").innerHTML = "Select Restaurant";
			document.getElementById("restaurants-dropDown").style.borderColor = "red";

		}
		else {
			document.getElementById("restaurant-span").innerHTML = "";
			document.getElementById("restaurants-dropDown").style.borderColor = "";
		}
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-onBlurOfRestaurant()");
	}
}


// To validate Item Name field

function onBlurOfItemName() {

	try {
		var itemName = document.getElementById('itemName').value;

		if (itemName == "") {

			document.getElementById("itemName-span").innerHTML = "Item Name cannot be empty";
			document.getElementById("itemName").style.borderColor = "red";

		}
		else {
			document.getElementById("itemName-span").innerHTML = "";
			document.getElementById("itemName").style.borderColor = "";
		}
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-onBlurOfItemName()");
	}
}


// To get Ingredients


function getIngredients() {
	try {
		var searchIngredient = document.getElementById("ingredients").value;
		if (searchIngredient.length >= 3) {

			var xhrGetIngredients = new XMLHttpRequest();
			xhrGetIngredients.open("GET", "http://localhost:8080/items/getIngredients/" + searchIngredient, true);
			xhrGetIngredients.send();
			xhrGetIngredients.onreadystatechange = function() {

				if (xhrGetIngredients.readyState == 4 && xhrGetIngredients.status == 200) {

					var ingredients = JSON.parse(this.responseText);

					document.getElementById("ingredient-outer").innerHTML = " <div class='tivasta-multi-select tivasta-w-85 ' id='ingredient-suggession-div'><select id='ingredient-suggession' data-placeholder='Choose Labels' class='chosen-select tivasta-w-100' multiple tabindex='4' onchange='selectIngredient()'></select></div>";

					for (var i = 0; i < ingredients.length; i++) {

						//document.getElementById("ingredient-div").innerHTML += "<span class='tivasta-ingredient-list'>"+ingredients[i].ingredientName+"<span class='search-choice-close'></span></span>";


						var opt = document.createElement("option");
						opt.id = "ingredient" + i;
						opt.innerHTML = ingredients[i].ingredientName;
						opt.value = ingredients[i].ingredientName;
						//opt.onclick=selectIngredient(this);
						document.getElementById("ingredient-suggession").options.add(opt);
					}


				}

			};

		}
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-getIngredients()");
	}

}


// To append Selected Ingredient

var counter = 0;
function selectIngredient() {
	try {
		counter++;
		document.getElementById("ingredient-div").innerHTML += "<span class='tivasta-ingredient-list'>" + document.querySelector('#ingredient-suggession').value + "<a class='search-choice-close' data-option-array-index='" + (counter) + "' onclick='return removeSelectedIngredient(this)'></a></span>";
		document.getElementById("ingredient-suggession-div").style.display = "none";
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-selectIngredient()");
	}
}


// To remove Selected Ingredient

function removeSelectedIngredient(obj) {
	try {
		var spanTag = obj.closest('span');
		$(spanTag).remove();
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-removeSelectedIngredient()");
	}
}


// To remove selected label

function removeSelectedLabel(obj) {
	try {
		var spanTag = obj.closest('li');
		$(spanTag).remove();
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-removeSelectedLabel()");
	}
}


// To add Nutrition


var nutritionRowCounter = 0;
function addNutrition() {

	try {
		nutritionRowCounter++;

		var selectedNutrition = document.querySelector("#nutrition-dropDown").value;

		if (selectedNutrition == "Select Type") {

			document.getElementById("nutrition-span").innerHTML = "Select Restaurant";
			document.getElementById("nutrition-dropDown").style.borderColor = "red";
			return false;
		}


		var nutritionValue = document.getElementById("nutritionText").value;
		if (nutritionValue == "") {

			document.getElementById("nutritionTxt-span").innerHTML = "Select Restaurant";
			document.getElementById("nutritionText").style.borderColor = "red";
			return false;
		}


		var trow = document.createElement("tr");

		var nutritionTd = document.createElement("td");
		nutritionTd.innerHTML = "<input type='text' class='tivasta-form-control'  id='field6" + nutritionRowCounter + "' value='" + selectedNutrition + "' disabled>";
		trow.appendChild(nutritionTd);

		var nutritionValueTd = document.createElement("td");
		nutritionValueTd.innerHTML = "<input type='text' class='tivasta-form-control'  id='field7" + nutritionRowCounter + "' value='" + nutritionValue + "' disabled>";
		trow.appendChild(nutritionValueTd);

		var actionTd = document.createElement("td");
		actionTd.innerHTML = "<span class='tivasta-d-inline-block tivasta-py-2'><a title='Edit' id='" + nutritionRowCounter + "' onclick = 'editNutrition(this)'><img src='images/edit.png' alt='Edit Icon' class='tivasta-mr-4'></a><a title='Delete' onclick=removeNutrition(this)><img src='images/trash.png' alt='Delete Icon'></a></span>";
		trow.appendChild(actionTd);

		document.getElementById("nutrition-tbody").appendChild(trow);
		document.getElementById("nutritionText").value = "";
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-addNutrition()");
	}

}



// To edit Nutrition

function editNutrition(obj) {
	try {
		document.getElementById("nutritionText").value = document.getElementById("field7" + obj.id).value;
		var deleteRow = obj.closest("tr");
		$(deleteRow).remove();
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-editNutrition()");
	}

}


// To remove Nutrition

function removeNutrition(obj) {
	try {
		var deleteRow = obj.closest("tr");
		$(deleteRow).remove();
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-removeNutrition()");
	}
}



document.getElementById("nutritionText").addEventListener("click", function() {
	document.getElementById("nutritionTxt-span").innerHTML = "";
	document.getElementById("nutritionText").style.borderColor = "";
});

document.getElementById("nutrition-dropDown").addEventListener("click", function() {
	document.getElementById("nutrition-span").innerHTML = "";
	document.getElementById("nutrition-dropDown").style.borderColor = "";

});

// To get restaurant id

var restaurantId;
function getRestaurantId(obj) {
	try {
		restaurantId = $(obj).find('option:selected').attr('id');
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-getRestaurantId()");
	}
}


document.getElementById("customFile").addEventListener("change", function() {

	fileUploadFlag = true;

	var itemImage = document.getElementById("customFile");


	if (itemImage.files.length > 0) {
		for (var i = 0; i <= itemImage.files.length - 1; i++) {

			const fsize = itemImage.files.item(i).size;
			const file = Math.round((fsize / 1024));
			// The size of the file.
			if (file > 120) {
				document.getElementById("file-span").innerHTML = "File size should be less than 120kb";
				document.getElementById("fileLable").innerHTML = "Choose file";
				return false;
			}
			else {
				document.getElementById("file-span").innerHTML = "<a href='' onclick=window.open('"+URL.createObjectURL(itemImage.files[0])+"')>" + itemImage.files.item(i).name + "</a>";
				document.getElementById("fileLable").innerHTML = itemImage.files.item(i).name;

				return false;
			}
		}
	}

});


// Save button clicked - save/update

function saveButtonClicked() {

	try {
		var itemName;
		var restaurant;
		var restaurantName;
		var selectedrestaurant = document.querySelector('#restaurants-dropDown');
		var itemImage = document.getElementById("customFile");

		if ((document.getElementById('itemName').value == "") || (selectedrestaurant.value == "Select") || (itemImage.files.length <= 0)) {
			if (document.getElementById('itemName').value == "") {

				document.getElementById("itemName-span").innerHTML = "Item Name cannot be empty";
				document.getElementById("itemName").style.borderColor = "red";

			}
			else {
				itemName = document.getElementById('itemName').value;

			}

			if (selectedrestaurant.value == "Select") {

				document.getElementById("restaurant-span").innerHTML = "Select Restaurant";
				document.getElementById("restaurants-dropDown").style.borderColor = "red";
			}
			else {
				restaurantName = selectedrestaurant.value;
				restaurant = restaurantId;

			}

			if (itemImage.files.length <= 0) {
				document.getElementById("file-span").innerHTML = "File cannot be empty";
				itemImage.style.borderColor = "red";
			}

			return false;
		}
		else {
			itemName = document.getElementById('itemName').value;
			restaurantName = selectedrestaurant.value;
			restaurant = restaurantId;
		}







		if (itemImage.files.length > 0) {
			for (var i = 0; i <= itemImage.files.length - 1; i++) {

				const fsize = itemImage.files.item(i).size;
				const file = Math.round((fsize / 1024));
				// The size of the file.
				if (file > 120) {
					document.getElementById("file-span").innerHTML = "File size should be less than 120kb";

					return false;
				}
			}
		}
		else {
			document.getElementById("file-span").innerHTML = "File cannot be empty";

			return false;
		}

		let formData = new FormData();
		formData.append('image', itemImage.files[0]);

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://localhost:8070/file/upload/", true);
		xhr.onreadystatechange = function() {

			if (xhr.readyState == 4 && xhr.status == 200) {

				var itemImageUrl = this.responseText;



				var itemPrice = document.getElementById('itemPrice').value;
				var itemCategory = document.getElementById('itemCategory').value;
				var itemTax = document.getElementById('itemTax').value;
				var itemDescription = document.getElementById('itemDescription').value;


				var isAlchoholic = document.querySelector('input[name="radio0"]:checked').innerText;
				if (isAlchoholic == "Yes") {
					isAlchoholic = 1;
				}
				else {
					isAlchoholic = 0;
				}

				var totalCalories = document.getElementById('totalCalories').value;
				var allergensName = document.getElementById('allergensName').value;
				var allergensDescription = document.getElementById('allergensDescription').value;

				var labels = "";
				for (var i = 0; i < document.getElementById('second_chosen').getElementsByTagName('ul')[0].getElementsByTagName('li').length - 1; i++) {

					var label = document.getElementById('second_chosen').getElementsByTagName('ul')[0].getElementsByTagName('li')[i].getElementsByTagName("span")[0].innerText;
					if (labels == "") {
						labels += label;
					}
					else {
						labels += "," + label;
					}
				}

				var ingredientsList = [];
				for (var i = 0; i < document.getElementById('ingredient-div').getElementsByTagName('span').length; i++) {

					var ingredient = document.getElementById('ingredient-div').getElementsByTagName("span")[i].innerText;
					var ingredients = {};
					ingredients.ingredientName = ingredient;
					ingredientsList.push(ingredients);
				}

				var nutritionsList = [];
				for (var i = 1; i < document.getElementById('nutrition-tbody').getElementsByTagName('tr').length; i++) {

					var nutrition = document.getElementById('nutrition-tbody').getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0].value;
					var nutritionValue = document.getElementById('nutrition-tbody').getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value
					var nutritions = {};
					nutritions.nutritionType = nutrition;
					nutritions.nutritionValue = nutritionValue;
					nutritionsList.push(nutritions);
				}


				var itemObj = {};

				if (!editFlag) {

					itemObj.itemName = itemName;
					itemObj.itemPrice = itemPrice;
					itemObj.restaurantName = restaurantName;
					itemObj.itemCategory = itemCategory;
					itemObj.itemTax = itemTax;
					itemObj.itemDescription = itemDescription;
					itemObj.itemImageUrl = itemImageUrl;
					itemObj.isAlchoholic = isAlchoholic;
					itemObj.allergensName = allergensName;
					itemObj.allergensDescription = allergensDescription;
					itemObj.totalCalories = totalCalories;
					itemObj.itemLabels = labels;
					itemObj.ingredients = ingredientsList;
					itemObj.nutritions = nutritionsList;

					var xhrEditItem = new XMLHttpRequest();
					xhrEditItem.open("POST", "http://localhost:8080/items/addItem/" + restaurant, true);
					xhrEditItem.onreadystatechange = function() {

						if (xhrEditItem.readyState == 4 && xhrEditItem.status == 200) {

							var saveFlag = this.responseText;
							if (saveFlag == "true") {
								window.location.href = "Manage_Items.htm"
							}
							else {
								document.getElementById("save-span").innerHTML = "Item already exist";
							}
						}

					};
					xhrEditItem.setRequestHeader("Content-Type", "application/json");
					xhrEditItem.send(JSON.stringify(itemObj));

				}
				else {
					itemObj.itemId = itemId;
					itemObj.itemName = itemName;
					itemObj.itemPrice = itemPrice;
					itemObj.itemCategory = itemCategory;
					itemObj.itemTax = itemTax;
					itemObj.itemDescription = itemDescription;
					if (!fileUploadFlag) {
						itemObj.itemImageUrl = existingImageUrl;
					}
					else {
						itemObj.itemImageUrl = itemImageUrl;
					}
					itemObj.isAlchoholic = isAlchoholic;
					itemObj.allergensName = allergensName;
					itemObj.allergensDescription = allergensDescription;
					itemObj.totalCalories = totalCalories;
					itemObj.itemLabels = labels;
					itemObj.ingredients = ingredientsList;
					itemObj.nutritions = nutritionsList;
					itemObj.isAvailable = itemStatus;

					var xhrEditItem = new XMLHttpRequest();
					xhrEditItem.open("PUT", "http://localhost:8080/items/editItem/" + restaurant, true);
					xhrEditItem.onreadystatechange = function() {

						if (xhrEditItem.readyState == 4 && xhrEditItem.status == 200) {

							var updateFlag = this.responseText;
							if (updateFlag) {
								window.location.href = "Manage_Items.htm"
							}
						}

					};
					xhrEditItem.setRequestHeader("Content-Type", "application/json");
					xhrEditItem.send(JSON.stringify(itemObj));

				}
			}
		};

		xhr.send(formData);
	}
	catch (e) {
		jsExceptionHandling(e, "AddItem.js-saveButtonClicked()");
	}

}

