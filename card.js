function heroDetail(){

    var Name = location.search.substring(1);
    
     console.log(Name);
        const xhr = new XMLHttpRequest();
        const params = "name=" + Name;
    
    
        // handle of innerhtml for card view
    
      // IN CASE OF ERROR
          xhr.onerror = function() {
              document.getElementById("characterSection").innerHTML = '<h2 id="characterMainTitle">An error has occured, check connection.</h2>';
          }
    
      // INCASE OF NO ERROR load
          xhr.onload = function(){
              var responseJSON = JSON.parse(xhr.response);
    
              console.log(responseJSON.data);
              if (responseJSON.data.count === 0) {
                document.getElementById("characterSection").innerHTML =
                  '<h2 id="characterMainTitle"><span style="font-weight:bold;">No results for... ' +
                  Name + "</span>" + ". Try again.</h2>";
               
              }
              // IF SOMETHING WRONG WRITTEN IN THE INPUT
              else if (responseJSON == undefined || responseJSON.length == 0) {
                document.getElementById("characterSection").innerHTML =
                  '<h2 id="characterMainTitle">' +
                  "An error might have occured on our end, Sorry. <br>In this case, try again later.</h2>";
               
              } 
              // IF EVERYTHING IS FINE
              else {
                const characterAttributes = responseJSON.data.results[0],
                characterID = responseJSON.data.results[0].id;
                // THE CHACTER INFO SECTION
                let output = "";
                output = output + 
                '<h2 id="characterMainTitle" style="color:white; ">' + characterAttributes.name + "</h2>" +
                '<div class="card flex-md-row mb-4 box-shadow h-md-250" id="characterCard" style="max-width:1200px; max-height:540px;">' +
                '<div id="characterImage">' +
                '<img class="card-img-right flex-auto d-md-block img-fluid" style=" max-height:540px;"' +
                ' alt="Picture of ' + characterAttributes.name +
                '" src="' + characterAttributes.thumbnail["path"] + "." + characterAttributes.thumbnail["extension"] +'">' +"</div>" +
                '<div class="card-body d-flex flex-column align-items-start">' +
                '<h3 class="mb-0 text-dark" id="characterName">' +
                characterAttributes.name +
                "</h3>" +
                '<p class="card-text mb-3" id="characterDescription">';
                if (characterAttributes.description !== "") {
                  output += characterAttributes.description;
                }
                output +=
                  "</p>" +
                  '<p class="text-muted mb-3" id="comicsAvailable">' +
                  "Comics: " +
                  characterAttributes.comics.available +
                  " | " +
                  "Series: " +
                  characterAttributes.series.available +
                  " | " +
                  "Stories: " +
                  characterAttributes.stories.available +
                  " | " +
                  "Events: " +
                  characterAttributes.events.available +
                  "</p>" +
                  '<p class="mb-1 text-muted" id="characterInfoAttribution">' +
                  responseJSON["attributionText"] +
                  "</p>" +
                  "</div>" +
                  "</div>";
                document.getElementById("characterSection").innerHTML = output;
                document.querySelector('body').style.backgroundImage = `url(${characterAttributes.thumbnail["path"]}.${characterAttributes.thumbnail["extension"]})`
                
              }
          }
    
    
          xhr.open("GET", `https://gateway.marvel.com/v1/public/characters?${params}&ts=1&apikey=5b2a69d661ecf1e1982d3d29497915bd&hash=3b85128540c6eda1984d2a20119233d1`, true);
    
          xhr.send();
        } 
    // call for card
    heroDetail();