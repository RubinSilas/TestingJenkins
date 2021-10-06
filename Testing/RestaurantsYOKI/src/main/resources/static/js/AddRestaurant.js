window.onload=getRestaurant;
var restaurantId;
var isNew;
var XMLgetRestaurant=new XMLHttpRequest();
var XMLaddRestaurant=new XMLHttpRequest();
var restaurant;



//// For testing



var chummaRestaurant={};
chummaRestaurant.restaurantName="Chumma";


var items=[];
var item = {};
item.itemName="samosa";
item.isChefSpecial=1;
item.isConvenience=1;
items.push(item);

chummaRestaurant.ItemBO = items;

/////

// To fetch restaurant details

function getRestaurant()

{
	
	restaurantId=localStorage.getItem("restaurantId");
	isNew=localStorage.getItem("isNew");
	//localStorage.clear();
	//alert(restaurantId);
	if(restaurantId!="null" || restaurantId!=null)
	{
		
		XMLgetRestaurant.open('GET','http://localhost:8085/restaurant/getRestaurant/'+restaurantId);
		XMLgetRestaurant.onreadystatechange=function()
		{
			if(XMLgetRestaurant.readyState == 4 && XMLgetRestaurant.status == 200)
			{
				restaurant=JSON.parse(XMLgetRestaurant.responseText);
				fillRestaurantDetails(restaurant);
				//alert(restaurant.restaurantName);
			}
		}
		XMLgetRestaurant.send();
	}
	
	else if(restaurantId=="null" || restaurantId==null)
	{

	document.getElementById("convenienceItem").style.display="none";
	}
		
	}
	
	
// To autofill restaurant details	


function fillRestaurantDetails(restaurant)
{
//	var length1=document.getElementById('second').options.length;
//			for (var i = length1 - 1; i > 0; i--) 
//			{
//			document.getElementById("second").options[i] = null;
//			}

var option1=document.createElement('option');
option1.value="Samosa";
option1.innerText="Samosa";
document.getElementById('second2').prepend(option1);
	
	
	document.getElementById("field1").value=restaurant.restaurantName;
	
	document.getElementById("field2").value=restaurant.cuisineType;
	
	if(restaurant.restaurantType=="Restaurant")
	{
		document.getElementById("Restaurant").checked=true;
	}
	else if(restaurant.restaurantType=="Convenience Store")
	{
		document.getElementById("c-store").checked=true;
	}
	else if(restaurant.restaurantType=="Bar")
	{
		document.getElementById("bar").checked=true;
	}
	
	for(var i=0;i<chummaRestaurant.ItemBO.length;i++)
	{
		if(chummaRestaurant.ItemBO[i].isConvenience==1)
		{
			var liElement=document.createElement('li');
			liElement.className="search-choice";
			liElement.innerHTML="<span>"+chummaRestaurant.ItemBO[i].itemName+"</span><a class='search-choice-close' onClick='removeItem(this)'></a>";
			var parent = document.getElementById('second_chosen');
			var element = parent.getElementsByTagName('ul')[0];
			element.prepend(liElement);
		}
	}
	
	for(var i=0;i<chummaRestaurant.ItemBO.length;i++)
	{
			if(chummaRestaurant.ItemBO[i].isChefSpecial==1)
		{
			var liElement=document.createElement('li');
			liElement.className="search-choice";
			liElement.innerHTML="<span>"+chummaRestaurant.ItemBO[i].itemName+"</span><a class='search-choice-close' onClick='removeItem(this)'></a>";
			var parent = document.getElementById('second2_chosen');
			var element = parent.getElementsByTagName('ul')[0];
			element.prepend(liElement);
		}
	}
}

function removeItem(obj)
{
	var listEle=obj.closest('li');
	listEle.remove();
}

function check()
{
//	alert("inside");
//	var mainDiv=document.getElementById("second2_chosen");
////	var ulist=document.createElement("ul");
//	//ulist.className="chosen-choices";
//	
	var liElement=document.createElement('li');
	liElement.className="search-choice";
	//liElement.className="active-result";
//	liElement.innerHTML="Samosa";
	
	liElement.innerHTML="<span>"+chummaRestaurant.ItemBO[0].itemName+"</span><a class='search-choice-close' onClick='removeItem(this)'></a>";
////	ulist.appendChild(liElement);
//var element = $('#second2_chosen ul');
//element[0].appendChild(liElement);
//	//mainDiv.innerHTML="";
//	//mainDiv.appendChild(ulist);
alert("hi");
var parent = document.getElementById('second_chosen');//<li class="active-result" data-option-array-index="0">Cool Drinks</li>
var element = parent.getElementsByTagName('ul')[0];
element.prepend(liElement);
//alert(element.length);


}





//Image validation

document.getElementById("customFile").addEventListener("change",imageValidation);
document.getElementById("customFile1").addEventListener("change",imageValidation);

function imageValidation()
{
	if(document.getElementById("customFile").files.length!=0)
	{
	if(document.getElementById("customFile").files[0].size>122880)
	{
		
		document.getElementById("customFileL").innerText="File size too big";
		document.getElementById("customFileL").style.color='red';
	}
	else if(document.getElementById("customFile").files[0].size<122880)
	{
		document.getElementById("customFileL").style.color='black';
		document.getElementById("customFileL").innerText=document.getElementById("customFile").files[0].name;
		
	}
	}
	if(document.getElementById("customFile1").files.length!=0)
	{
	if(document.getElementById("customFile1").files[0].size>122880)
	{
		document.getElementById("customFileLl").innerText="File size too big";
		document.getElementById("customFileLl").style.color='red';
	}
	else if(document.getElementById("customFile1").files[0].size<122880)
	{
		document.getElementById("customFileLl").style.color='black';
		document.getElementById("customFileLl").innerText=document.getElementById("customFile1").files[0].name;
		
	}
	}
}


//Form validation

document.getElementById("success-pop").addEventListener("click",formValidation);
function formValidation()
{

	if(document.getElementById("field1").value=="")
	{
		document.getElementById("restNameError").style.display='block';
		document.getElementById("restNameError").innerText="Restaurant name cannot be empty";
		document.getElementById("restNameError").style.color='red';
	}
	
	{
		if(document.getElementById("field2").value=="")
		{
		document.getElementById("restCuisineError").style.display='block';
		document.getElementById("restCuisineError").innerText="Cuisine type cannot be empty";
		document.getElementById("restCuisineError").style.color='red';
		}
	}
	
	if(document.getElementById('customFile1').files.length==0)
	{
		document.getElementById("customFileLl").innerText="Restaurant Logo cannot be empty";
		document.getElementById("customFileLl").style.color='red';
	}
	
	var newRestaurant={};
	var rname=document.getElementById("field1").value;
	var ctype=document.getElementById("field2").value;
	if(rname!="" && ctype!="")
	{
	
	var ele = document.getElementsByName('radio0');
	
	for(var i=0;i<3;i++)
	{
		if(ele[i].checked)
		{
			var rtype=ele[i].value
		}
	}
		newRestaurant.restaurantName=rname;
		newRestaurant.cuisineType=ctype;
		newRestaurant.restaurantType=rtype;
		newRestaurant.isDeleteted=0;
		newRestaurant.restaurantStatus="closed";
		newRestaurant.createdDate=new Date();
		//alert(newRestaurant.createdDate);

 	//	newRestaurant={"restaurantName":rname,"cuisineType":ctype,"restaurantType":rtype,"isDeleteted":0,"restaurantStatus":"closed"};
		
		saveButtonClicked(newRestaurant);
	
	}

}

document.getElementById("field1").addEventListener('keyup',function()
{
	if(document.getElementById("field1").value!="")
	{
		document.getElementById("restNameError").style.display='none';
	}
});

document.getElementById("field2").addEventListener('keyup',function()
{
	if(document.getElementById("field2").value!="")
	{
		document.getElementById("restCuisineError").style.display='none';
	}
});


// For saving the restaurant

function saveButtonClicked(newRestaurant)
{
	
	if(isNew=="true")
	{
		var valid;
		XMLaddRestaurant.open('POST','http://localhost:8085/restaurant/addRestaurant');
		XMLaddRestaurant.onreadystatechange=function()
		{
			if(XMLaddRestaurant.readyState == 4 && XMLaddRestaurant.status == 200)
			{
				//$('.tivasta-success').fadeIn(300);
				valid=(XMLaddRestaurant.responseText);
				if(valid=="false")
				{
					document.getElementById("restNameError").style.display='block';
					document.getElementById("restNameError").style.color='red';
					document.getElementById("restNameError").innerText="Restaurant name already exist";
				}
				else
				{
					$('.tivasta-success').fadeIn(300);
					localStorage.clear();
				}
			}
		}
		XMLaddRestaurant.setRequestHeader("Content-Type","application/json")
		XMLaddRestaurant.send(JSON.stringify(newRestaurant));
	}
	
}

document.getElementById("okButton").addEventListener('click',function()
{
	$('.tivasta-success').fadeOut(300);
	window.location.replace("http://localhost:8085/Restaurant_Grid.htm");
});


//var block1=document.getElementById("second_chosen");
//var block2=block1.getElementsByTagName('ul')[0];
//var block3;
//var block4;
//block2.addEventListener('click',function()
//{
//	alert("hi");
//	block3=block1.getElementsByTagName('ul')[1];
//	block4=block3.getElementsByTagName('li');
//	passto();
//	for(var i=0;i<block4.length;i++)
//	{
//	block4[i].addEventListener('click',alertf(this));
//	}
//});
//
//function alertf(obj)
//{
//	
//	alert(obj);
//}