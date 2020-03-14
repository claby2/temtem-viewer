let profile = document.getElementById("profile");

function getTemtem(number){
    return fetch("https://temtem-api.mael.tech/api/temtems/" + number)
    .then(data => data.json())
    .then(res => res);
}

var types = [];

function mapTypes(){
    fetch("https://temtem-api.mael.tech/api/types")
    .then(data => data.json())
    .then(res =>{
        res.forEach(e=>{
            types[e.name] = e.icon;  
        })
    }).then(()=>{display();});
}

mapTypes();

var first = true;

let params = new URLSearchParams(location.search);
let id  = params.get("temtem");

function display(){
    getTemtem(id).then(t=>{

        let div = document.createElement("div");
    
        let divNext = document.createElement("section");
    
        let portrait = document.createElement("img");
        portrait.src = t.wikiPortraitUrlLarge;
        portrait.classList.add("portrait");
    
        let name = document.createElement("p");
        name.innerText = t.name + " #" + t.number;
        name.classList.add("temname");
    
        let typeDiv = document.createElement("div");

        t.types.forEach(type=>{
            let typeImg = document.createElement("img");
            typeImg.src = "https://temtem-api.mael.tech" + types[type];
            typeImg.classList.add("typeIcon");
            typeDiv.appendChild(typeImg);
        })
    
        if(first){
            profile.innerText = "";
            first = false;
        }

        let description = document.createElement("p");
        description.innerText = t.gameDescription;
        description.classList.add("description");
    
        div.appendChild(portrait);
        div.appendChild(name);
        div.appendChild(typeDiv);

        divNext.appendChild(description);
    
        profile.appendChild(div);
        profile.appendChild(divNext);
    
    
    
    });
}
