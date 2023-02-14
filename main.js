let foodArray = [];

let foodObject = function (pID, pFlavor, pMenu, pType, pRecipe, pTime) {
    this.ID = pID;
    this.Flavor = pFlavor;
    this.Menu = pMenu;
    this.Type = pType;
    this.Recipe = pRecipe; 
    this.Time = pTime;
}

foodArray.push(new foodObject(1,"Spicy","Mexico", "Non-Veg", "Tacos", "30mins" ));
foodArray.push(new foodObject(2, "Original", "apanese", "veg", "Udon", "15mins"));
foodArray.push(new foodObject(3, "Garlic", "Chinese", "Non-Veg", "Beef Noddles"));

let selectedRecipe = "not selected";

function toggle_visibility(id) {
    let ul = document.getElementById('links');
    let box = document.getElementById(id);
    if(ul.style.display == 'none')
    {
        ul.style.display = 'block';
        box.style.display = 'block';
    }
    else
    {
        ul.style.display = 'none';
        box.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function () {

createList();
document.getElementById("buttonAdd").addEventListener("click", function () {
let flavor = document.getElementById("selectFlavor").value;
let menu = document.getElementById("selectMenu").value;
let type = document.getElementById("selectVeg").value;
let recipe = document.getElementById("selectRecipe").value;
let time = document.getElementById("youTime").value;

foodArray.push(new foodObject(foodArray.length+1,flavor, menu, type, recipe, time));
    document.location.href = "index.html#ListAll";
});

document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("selectFlavor").value = "";
    document.getElementById("selectMenu").value = "";
    document.getElementById("selectVeg").value = "";
    document.getElementById("selectRecipe").value = "";
    document.getElementById("youTime").value = "";
});

document.getElementById("sortByFlavor").addEventListener("click", function () {
    foodArray.sort(dynamicSort("Flavor"));
    createList();
});

document.getElementById("sortByMenu").addEventListener("click", function () {
    foodArray.sort(dynamicSort("Menu"));
    createList();
});

});
$(document).on("pagebeforeshow", "#ListAll", function (event) { 
    createList();
});

$(document).on("pagebeforeshow", "#details", function (event) {   

    let localID = localStorage.getItem('param');  
//   need to have the details of each recipe first, then when you click the recipe ,the the computer knows where and what to get
    foodArray = JSON.parse(localStorage.getItem('foodArray'));  

    document.getElementById("oneMenu").innerHTML = "The menu is: " + foodArray[localID - 1].Menu;
    document.getElementById("oneFlavor").innerHTML = "The flavor is: " + foodArray[localID - 1].Flavor;
    document.getElementById("oneType").innerHTML = "Type: " + foodArray[localID- 1].Type;
    document.getElementById("oneRecipe").innerHTML = "The recipe is: " + foodArray[localID- 1].Recipe;
    document.getElementById("oneTime").innerHTML = "the time is: " + foodArray[localID- 1].Time;
});

function createList() {
   let myRecipeListul =document.getElementById("RecipeListul");
   myRecipeListul.innerHTML = "";

   foodArray.forEach(function (oneMenu,) {
    let myLi = document.createElement('li');
    myLi.classList.add('oneMenu'); 
    myLi.setAttribute("data-param", oneMenu.ID);
    myLi.innerHTML = oneMenu.ID + ":  " + oneMenu.Flavor + "  " + oneMenu.Menu;
    myRecipeListul.appendChild(myLi);
});

    let liList = document.getElementsByClassName("oneMenu");
    let newfoodArray = Array.from(liList);
    newfoodArray.forEach(function (element) {
    element.addEventListener('click', function () {
    let key = this.getAttribute("data-param");  
    localStorage.setItem('param', key);

    let stringfoodArray = JSON.stringify(foodArray); 
    localStorage.setItem('foodArray', stringfoodArray);
 
    document.location.href = "index.html#details";
    });
});
}

function dynamicSort(property) {
    return function (a, b) {
        if (a[property] < b[property]) {
            return -1;
        } else if (a[property] > b[property]) {
            return 1;
        } else {
            return 0;
        }
    };
}