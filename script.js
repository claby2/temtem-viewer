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
    if(sessionStorage.length === 0){
        return fetch("https://temtem-api.mael.tech/api/temtems")
        .then(data => data.json())
        .then(res =>{
            res.forEach((t)=>{
                let n = t.name;
                temtemNames.push(n.toLowerCase());
            })
            sessionStorage.setItem("temtemNames", JSON.stringify(temtemNames));
            filtered = temtemNames;
        })
    } else {
        return new Promise((resolve, reject) =>{
            resolve()
            
        })
    }
}

function pushTemtems(){
    getAll().then(e=>{
        e.forEach(t=>{
            let sessionInfo = [];

            sessionInfo.push(t.name);
            sessionInfo.push(t.wikiPortraitUrlLarge);
            sessionInfo.push(t.number);

            sessionStorage.setItem(sessionStorage.length-1, JSON.stringify(sessionInfo));
        })
    }).then(()=>{
        display();
    })
}

function display(){
    list.innerText = "";
    for(let i = 0; i < sessionStorage.length-1; i++){
        let t = JSON.parse(sessionStorage.getItem(i));
        let n = t[0];
        if(filtered.includes(n.toLowerCase()) || filtered.includes(t[0])){
            console.log("test");
            let card = document.createElement("div");
            card.classList.add("listCard");
            card.onclick = function() { window.location = "./temtem/index.html?temtem=" + t[2]; };
            card.target = "_blank";
            let name = document.createElement("h2");
            name.innerText = t[0];
            let portrait = document.createElement("img");
            portrait.src = t[1];
            card.appendChild(name);
            card.appendChild(portrait);
            list.appendChild(card);
        }
    }
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

getNamesList().then(()=>{
    if(sessionStorage.length < 2){
        pushTemtems();
        console.log(temtems);
    } else {
        temtemNames = JSON.parse(sessionStorage.getItem("temtemNames"));
        filtered = temtemNames;
        console.log(sessionStorage);
        display();
    }
});