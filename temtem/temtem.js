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

function createStatBar(value){
    let fill = document.createElement("div");
    fill.classList.add("barFill");
    fill.style.width = (0.83*value) + "%";
    return fill;
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


        let stats = document.createElement("div");
        stats.classList.add("stats");

        let statsLeft = document.createElement("div");
        let statsRight = document.createElement("div");

        let hp = document.createElement("div");
        displayStat(t.stats.hp, hp, "HP");
        
        let sta = document.createElement("div");
        displayStat(t.stats.sta, sta, "STA");

        let spd = document.createElement("div");
        displayStat(t.stats.spd, spd, "SPD");

        let atk = document.createElement("div");
        displayStat(t.stats.atk, atk, "ATK");

        let total = document.createElement("div");
        total.innerText = "Total " + t.stats.total;

        let def = document.createElement("div");
        displayStat(t.stats.def, def, "DEF");
        let spatk = document.createElement("div");
        displayStat(t.stats.spatk, spatk, "SPATK");
        let spdef = document.createElement("div");
        displayStat(t.stats.spdef, spdef, "SPDEF");

        statsLeft.appendChild(hp);
        statsLeft.appendChild(sta);
        statsLeft.appendChild(spd);
        statsLeft.appendChild(atk);
        statsLeft.appendChild(total);
        statsRight.appendChild(def);
        statsRight.appendChild(spatk);
        statsRight.appendChild(spdef);

        stats.appendChild(statsLeft);
        stats.appendChild(statsRight);
    
        div.appendChild(portrait);
        div.appendChild(name);
        div.appendChild(typeDiv);

        divNext.appendChild(description);
        divNext.appendChild(stats);
    
        profile.appendChild(div);
        profile.appendChild(divNext);
    
    
    
    });
}

function displayStat(value, div, text){
    let bar = document.createElement("div");
    bar.classList.add("bar");
    let name = document.createElement("p");
    name.innerText = text;
    let val = document.createElement("p");
    val.innerText = value;
    div.appendChild(name);
    bar.appendChild(createStatBar(value));
    div.appendChild(bar);
    div.appendChild(val)
}
