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
            let n = t.name;
            temtemNames.push(n.toLowerCase());
        })
    })
    filtered = temtemNames;
}

function pushTemtems(){
    getAll().then(e=>{
        e.forEach(t=>{
            let info = [];
            info.name = t.name;
            info.wikiPortraitUrlLarge = t.wikiPortraitUrlLarge;
            info.number = t.number;
            temtems.push(info);
        })
    }).then(()=>{
        display();
    })
}

function display(){
    list.innerText = "";
    temtems.forEach((t)=>{
        let n = t.name;
        if(filtered.includes(n.toLowerCase()) || filtered.includes(t.name)){
            let card = document.createElement("div");
            card.classList.add("listCard");
            card.onclick = function() { window.open("./temtem/index.html?temtem=" + t.number); };
            card.target = "_blank";
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
    input = input.toLowerCase()
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