let patchnote = document.getElementById("patchnotes");

var first = true;

fetch("https://temtem-api.mael.tech/api/patches").then(data => data.json()).then((res)=>{res.forEach(patch=>{
    let div = document.createElement("div");

    let name = document.createElement("h2");
    name.innerText = patch.name;
    name.onclick = function() { window.open(patch.url, '_blank'); };
    name.target = "_blank";

    let date = document.createElement("p");
    date.innerText = patch.date;
    date.classList.add("patchDate");

    let fixesHead = document.createElement("h3");
    fixesHead.innerText = "Fixes";
    let fixes = document.createElement("ul");
    patch.patchInfo.fixes.forEach(e=>{
        let li = document.createElement("li");
        li.innerText = e;
        fixes.appendChild(li);
    })

    let improvementsHead = document.createElement("h3");
    improvementsHead.innerText = "Improvements";
    let improvements = document.createElement("ul");
    patch.patchInfo.improvements.forEach(e=>{
        let li = document.createElement("li");
        li.innerText = e;
        improvements.appendChild(li);
    })

    let featuresHead = document.createElement("h3");
    featuresHead.innerText = "Features";
    let features = document.createElement("ul");
    patch.patchInfo.features.forEach(e=>{
        let li = document.createElement("li");
        li.innerText = e;
        features.appendChild(li);
    })

    let balanceHead = document.createElement("h3");
    balanceHead.innerText = "Balance";
    let balance = document.createElement("ul");
    patch.patchInfo.balance.forEach(e=>{
        let li = document.createElement("li");
        li.innerText = e;
        balance.appendChild(li);
    })

    if(first){
        patchnote.innerText = "";
        first = false;
    }

    div.appendChild(name);
    div.appendChild(date);

    if(patch.patchInfo.fixes.length){
        div.appendChild(fixesHead);
        div.appendChild(fixes);
    }

    if(patch.patchInfo.improvements.length){
        div.appendChild(improvementsHead);
        div.appendChild(improvements);
    }

    if(patch.patchInfo.features.length){
        div.appendChild(featuresHead);
        div.appendChild(features);
    }

    if(patch.patchInfo.balance.length){
        div.appendChild(balanceHead);
        div.appendChild(balance);
    }

    patchnote.appendChild(div);


})});