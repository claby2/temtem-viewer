let list = document.getElementById("list");
let search = document.getElementById("search");

var temtems = [];
var temtemNames = [];
var filtered = [];

function getAll(){
    return fetch("https://temtem-api.mael.tech/api/temtems")
    .then(data => data.json())
    .then(res => res);
}

function getNamesList(){
    fetch("https://temtem-api.mael.tech/api/temtems")
    .then(data => data.json())
    .then(res =>{
        res.forEach((t)=>{
            temtemNames.push(t.name);
        })
    })
    filtered = temtemNames;
}

function getTemtem(number){
    return fetch("https://temtem-api.mael.tech/api/temtems/" + number)
    .then(data => data.json())
    .then(res => res);
}

function getTypes(){
    return fetch("https://temtem-api.mael.tech/api/types")
    .then(data => data.json())
    .then(res => res);
}

function pushTemtems(){
    getAll().then(e=>{
        e.forEach(t=>{
            let info = [];
            info.name = t.name;
            info.wikiPortraitUrlLarge = t.wikiPortraitUrlLarge;
            temtems.push(info);
        })
    }).then(()=>{
        display();
    })
}

function display(){
    list.innerText = "";
    temtems.forEach((t)=>{
        if(filtered.includes(t.name)){
            let card = document.createElement("div");
            card.classList.add("listCard");
            let name = document.createElement("h2");
            name.innerText = t.name;
            let portrait = document.createElement("img");
            portrait.src = t.wikiPortraitUrlLarge;
            card.appendChild(name);
            card.appendChild(portrait);
            list.appendChild(card);
        }

    })
}

search.addEventListener("keyup", ()=>{
    let input = search.value;
    if(input === ""){
        getAll();
        filtered = temtemNames;
    } else {
        filtered = [];
        filtered = temtemNames.filter((e)=>
            e.indexOf(input) != -1
        );
    }
    display();
})

getNamesList();

pushTemtems();