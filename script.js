const showCorrespondingHeros = () => {
    const xhr = new XMLHttpRequest();
    var name = document.getElementById("name").value;
  
   
    // section of getting result searching super hero name
    xhr.onload = function(){
      const responseJSON = JSON.parse(xhr.response);
       const characterAttributes = responseJSON.results;
      let html = "";
      html += "<div class='row'>";
        if (responseJSON.response == "success") {
          responseJSON.results.forEach((element) => {
            html += `
            
              <div class = "lis">
              <a href="superHeroPage.html?${element.name}"><img class="card-img-top" data-name="${element.name}" src="${element.image.url}"></a>
              <p class="card-title" onclick="showDetails(${element.id})">${element.name}</p>
                    <button id="${element.id}" class="addfav" onclick="addFavourite(${element.id})">Add to favorite list</button>
              </div>  `
            
          });
        }
        document.getElementById("cardsgroup").innerHTML = html;
    }
  
        xhr.open("GET", `https://www.superheroapi.com/api.php/5767730643352676/search/${name}`, true);
  
        xhr.send();
  }
  
  // make a favourites key for storing all favourites hero's id in local storage if not available
  if (localStorage.getItem("favourites")==null) {
    localStorage.setItem("favourites",JSON.stringify([]));
  }else{
    var arr = JSON.parse(localStorage.getItem("favourites"));
  }
  
  
  // function for show heros full details in a new page
  function showDetails(idnumber) {
    localStorage.setItem("id", idnumber);
  }
  
  
  // function for adding id value in local storage favourites key if not available this id 
  function addFavourite(id) {
   
    if (!arr.includes(id) == true) {
      arr.push(id);
      localStorage.setItem("favourites", JSON.stringify(arr));
    }else{
      alert("your hero already added in favourites")
    }
  }
  
  
  // CHARACTER
  function character() {
      // SO THAT THE URL CAN HAVE THE NAME INPUT AND ITS VALUE
      let urlQueryParameters = new URLSearchParams(window.location.search),
        queryParameterName = urlQueryParameters.get("name"),
        name = document.getElementById("name").value;
     
      if (queryParameterName !== null && queryParameterName !== "") {
        document.getElementById("name").value = queryParameterName;
        connection(document.getElementById("name").value);
    
      }
    }
  
  
  // ON LOAD SECTION
    
  document.addEventListener('click' , e =>{
      var Target = e.target;
      if(Target.classList.contains("card-img-top")){
        console.log(Target.dataset.name);
        connection(Target.dataset.name);
      }
  });