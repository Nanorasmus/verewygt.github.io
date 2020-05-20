var perk_json;
var active_type;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

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
    if (perk_blacklist != []) {
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


function customColors() {
    if (getUrlVars()["bg-c"] != null) {
        document.querySelector("#streaming-mode-embed").style.background = getUrlVars()["bg-c"];
    }
    if (getUrlVars()["pn-c"] != null) {
        var x, i;
        x = document.querySelectorAll(".perk_name");
        for (i = 0; i < x.length; i++) {
            x[i].style.color = getUrlVars()["pn-c"];
        }
    }
    if (getUrlVars()["ch-c"] != null) {
        var x, i;
        x = document.querySelectorAll(".perk_character");
        for (i = 0; i < x.length; i++) {
            x[i].style.color = getUrlVars()["ch-c"];
        }
    }
}

function loadPerks() {
    customColors()

    if (getUrlVars()["type"] == "surv") {
        var request = new XMLHttpRequest();
        request.open("GET", "https://verewygt.github.io/perkroulette/js/survivor-perks.json", false);
        request.send(null);
        perk_json = JSON.parse(request.responseText);
        active_type = "surv";
    } else if (getUrlVars()["type"] == "kill") {
        var request = new XMLHttpRequest();
        request.open("GET", "https://verewygt.github.io/perkroulette/js/killer-perks.json", false);
        request.send(null);
        perk_json = JSON.parse(request.responseText);
        active_type = "kill";
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


function pickRandomPerk() {
    getUrlVars();
    loadPerks();


    if (getUrlVars()["exclude"] != null) {
        var perk_blacklist = getUrlVars()["exclude"].split(",");
    } else {
        perk_blacklist = [];
    }

    if (perk_blacklist.length > (perk_json.perks.length - 4)) {

        // TODO: Error: Not enough perks selected

    } else {
        var sel_perks = [];
        while (sel_perks.length < 4) {
            var randomnumber = Math.floor(Math.random() * (perk_json.perks.length));
            if (perk_blacklist.indexOf(randomnumber) > -1) continue;
        if (sel_perks.indexOf(randomnumber) > -1) continue;
            sel_perks[sel_perks.length] = randomnumber;
        }

        var i = 0;
        while (i < 4) {
            var id = 'p' + i.toString();
            if (perk_json.perks[sel_perks[i]].perk_color == "purple") {
                if (getUrlVars()["img-p-url"] != null) {
                    document.getElementById(id).style.backgroundImage = "url(" + getUrlVars()["img-p-url"] + ")";
                } else {
                    document.getElementById(id).style.backgroundImage = "url(https://verewygt.github.io/perkroulette/css/img/perk_purple.png)";
                }
            } else if (perk_json.perks[sel_perks[i]].perk_color == "green") {
                if (getUrlVars()["img-g-url"] != null) {
                    document.getElementById(id).style.backgroundImage = "url(" + getUrlVars()["img-g-url"] + ")";
                } else {
                    document.getElementById(id).style.backgroundImage = "url(https://verewygt.github.io/perkroulette/css/img/perk_green.png)";
                }
            }
            i++;

        }

        for (var i = 0; i < 4; i++) {
            document.getElementById("pn" + i).innerHTML = perk_json.perks[sel_perks[i]].perk_name;
            document.getElementById("pc" + i).innerHTML = perk_json.perks[sel_perks[i]].character;
            document.getElementById("pi" + i).style.backgroundImage = "url(https://verewygt.github.io/perkroulette/css/img/" + active_type + "/iconperks-" + perk_json.perks[sel_perks[i]].perk_name.toLowerCase().replace(/ /gi, '').replace(/'/gi, '').replace(/-/gi, '').replace(/é/gi, 'e').replace(/è/gi, 'e').replace(/à/gi, 'a').replace(/&/gi, 'and').replace(/!/gi, '').replace(/:/gi, '') + ".png)";

            document.getElementById("pn" + i).classList.add('transparent');
            document.getElementById("pc" + i).classList.add('transparent');
            document.getElementById("p" + i).classList.add('transparent');
        }

        window.setTimeout(perk1an, 250);
    }
}

function perk1an() {
    document.getElementById("p0").classList.remove('transparent');

    document.getElementById("p0").classList.add('animate1');
    document.getElementById("pn0").classList.add('animate2');
    document.getElementById("pc0").classList.add('animate3');

    window.setTimeout(perk2an, 1000);
}

function perk2an() {
    document.getElementById("p1").classList.remove('transparent');

    document.getElementById("p1").classList.add('animate1');
    document.getElementById("pn1").classList.add('animate2');
    document.getElementById("pc1").classList.add('animate3');

    window.setTimeout(perk3an, 1000);
}

function perk3an() {
    document.getElementById("p2").classList.remove('transparent');

    document.getElementById("p2").classList.add('animate1');
    document.getElementById("pn2").classList.add('animate2');
    document.getElementById("pc2").classList.add('animate3');

    window.setTimeout(perk4an, 1000);
}

function perk4an() {
    document.getElementById("p3").classList.remove('transparent');

    document.getElementById("p3").classList.add('animate1');
    document.getElementById("pn3").classList.add('animate2');
    document.getElementById("pc3").classList.add('animate3');
}

function cleanup() {
    document.getElementById("p0").classList.remove('animate1');
    document.getElementById("p1").classList.remove('animate1');
    document.getElementById("p2").classList.remove('animate1');
    document.getElementById("p3").classList.remove('animate1');

    document.getElementById("pn0").classList.remove('animate2');
    document.getElementById("pn1").classList.remove('animate2');
    document.getElementById("pn2").classList.remove('animate2');
    document.getElementById("pn3").classList.remove('animate2');

    document.getElementById("pc0").classList.remove('animate3');
    document.getElementById("pc1").classList.remove('animate3');
    document.getElementById("pc2").classList.remove('animate3');
    document.getElementById("pc3").classList.remove('animate3');
}
