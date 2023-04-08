var arr = JSON.parse(localStorage.getItem("favourites"));
var lalert = document.getElementById("list-alert");


// function for remove hero from favourites, update localstorage and reload 
function removeHero(id) {
  var index = arr.indexOf(id);
  arr.splice(index, 1);
  localStorage.setItem("favourites", JSON.stringify(arr));
  location.reload();
}

//function for show all favourites heros in html page

let html = "";

function fetchData() {
  for (let i = 0; i < arr.length; i++) {
    fetch(`https://www.superheroapi.com/api.php/5767730643352676/${arr[i]}`)
      .then((response) => response.json())
      .then((data) => {
        lalert.innerHTML = "your favorite heros";
        html +=
          `     <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;
                align-items: center;  height: 280px;  width: 300px;  border: 2px solid white;
                margin: 5px;  transform: scale(0.9);">
                <img style="height: 240px; width: 300px;" src="${data.image.url}">
                <div style="background-color: aliceblue;
                display: flex; align-items: center; justify-content:space-between; height: 40px; width: 300px; padding:15px;">
                 <h5 style="color:black; transform:scale(1.2); ">${data.name}</h5>
                    <i class="fa-solid fa-heart-circle-xmark" onclick="removeHero(${arr[i]})" style=" transform:scale(2.2); align-items: right; cursor:pointer; color:red;"></i>
                </div>
                </div>
                    `;
      });
  }
}

setTimeout(() => {
  document.getElementById("cards-group").innerHTML = html;
}, 800);