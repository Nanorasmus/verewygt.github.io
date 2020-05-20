var perk_json;

function applyChanges() {
    var link = "https://verewygt.github.io/perkroulette/streaming-mode/embed/";

    if (document.querySelector("input#surv").checked) {
        link += "?type=surv";
    } else if (document.querySelector("input#kill").checked) {
        link += "?type=kill";
    }

    var perk_blacklist = [];
    for (var i = 0; i < perk_json.perks.length; i++) {

        var pchid = "pch-" + i;
        var checkbox = document.getElementById(pchid);

        if (checkbox.checked == false) {
            perk_blacklist.push(i);
        }
    }
    console.log(perk_blacklist);
    if (perk_blacklist != null) {
        link += "&exclude=" + perk_blacklist;
    }

    if (document.querySelector("input[name=bg-color]").value != "transparent") {
        link += "&bg-c=" + document.querySelector("input[name=bg-color]").value;
    }
    if (document.querySelector("input[name=perk-name-color]").value != "#ffffff") {
        link += "&pn-c=" + document.querySelector("input[name=perk-name-color]").value;
    }
    if (document.querySelector("input[name=char-color]").value != "#ff8800") {
        link += "&ch-c=" + document.querySelector("input[name=char-color]").value;
    }
    if (document.querySelector("input[name=bg-g-url]").value != "Default") {
        link += "&img-g-url=" + document.querySelector("input[name=bg-g-url]").value;
    }
    if (document.querySelector("input[name=bg-p-url]").value != "Default") {
        link += "&img-p-url=" + document.querySelector("input[name=bg-p-url]").value;
    }

    document.querySelector("#link-input").value = link;
    document.querySelector("#embed-preview").src = link;
}

function loadPerks() {
    var list = document.getElementById('perk-list');
    list.innerHTML = "";

    if (document.querySelector("input#surv").checked) {
        var request = new XMLHttpRequest();
        request.open("GET", "https://verewygt.github.io/perkroulette/js/survivor-perks.json", false);
        request.send(null);
        perk_json = JSON.parse(request.responseText);
    } else if (document.querySelector("input#kill").checked) {
        var request = new XMLHttpRequest();
        request.open("GET", "https://verewygt.github.io/perkroulette/js/killer-perks.json", false);
        request.send(null);
        perk_json = JSON.parse(request.responseText);
    }

    for (var i = 0; i < perk_json.perks.length; i++) {
        var pn = perk_json.perks[i].perk_name;

        var newLabel = document.createElement('label');
        newLabel.id = 'element-' + i;
        newLabel.classList.add('perk-list-item');

        var pchid = "pch-" + i;
        newLabel.setAttribute("for", pchid);
        newLabel.innerHTML = "<input type=\"checkbox\" name=\"perk-check\" id=\"pch-" + i + "\" checked><span class=\"perk-name\">" + pn + "<\/span>";

        list.appendChild(newLabel);
    }
}

function selAll() {
    for (var i = 0; i < perk_json.perks.length; i++) {
        var pchid = "pch-" + i;
        var checkbox = document.getElementById(pchid);

        checkbox.checked = true;
    }
}
function selNone() {
    for (var i = 0; i < perk_json.perks.length; i++) {
        var pchid = "pch-" + i;
        var checkbox = document.getElementById(pchid);

        checkbox.checked = false;
    }
}
function filter() {
    var input = document.getElementById("search-input");
    var perk_elements = document.getElementById("perk-list").getElementsByTagName("label");
    var filter = input.value.toUpperCase().replace(/ /gi, '').replace(/'/gi, '').replace(/-/gi, '').replace(/É/gi, 'E').replace(/È/gi, 'E').replace(/À/gi, 'A').replace(/:/gi, '');

    for (var i = 0; i < perk_elements.length; i++) {
        var perk_name = perk_elements[i].getElementsByTagName("span")[0];
        if (perk_name) {
            if (perk_name.innerHTML.toUpperCase().replace(/ /gi, '').replace(/'/gi, '').replace(/-/gi, '').replace(/É/gi, 'E').replace(/È/gi, 'E').replace(/À/gi, 'A').replace(/:/gi, '').indexOf(filter) != -1) {
                perk_elements[i].classList.remove('hidden');
            } else {
                perk_elements[i].classList.add('hidden');
            }
        }
    }

    if (input.value == "") {
        document.getElementById("search-clear").classList.add('hidden');
    } else {
        document.getElementById("search-clear").classList.remove('hidden');
    }
}

function resetFilter() {
    var perk_elements = document.getElementById("perk-list").getElementsByTagName("label");

    for (i = 0; i < perk_elements.length; i++) {
            perk_elements[i].classList.remove('hidden');
    }
    document.getElementById("search-clear").classList.add('hidden');
}
