var perk_json;
var active_type;

function loadPerks() {

    var list = document.getElementById('perk-list');
    list.innerHTML = "";

    if (document.getElementById('surv').checked) {
        var request = new XMLHttpRequest();
        request.open("GET", "js/survivor-perks.json", false);
        request.send(null);
        perk_json = JSON.parse(request.responseText);
        active_type = "surv";
    } else if (document.getElementById('kill').checked) {
        var request = new XMLHttpRequest();
        request.open("GET", "js/killer-perks.json", false);
        request.send(null);
        perk_json = JSON.parse(request.responseText);
        active_type = "kill";
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

function pickRandomPerk() {

    var perk_blacklist = [];
    for (var i = 0; i < perk_json.perks.length; i++) {

        var pchid = "pch-" + i;
        var checkbox = document.getElementById(pchid);

        if (checkbox.checked == false) {
            perk_blacklist.push(i);
        }
    }

    if (perk_blacklist.length > (perk_json.perks.length - 4)) {

        var errorbox = document.getElementById('btn-error-msg');
        errorbox.innerHTML = "Not enough perks selected. Please select at least four.";
        errorbox.style.display = "table";

    } else {

        var errorbox = document.getElementById('btn-error-msg');
        errorbox.style.display = "none";

        cleanup();
        document.getElementById("stcky").disabled = true;

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
                document.getElementById(id).style.backgroundImage = "url(css/img/perk_purple.png)";
            } else if (perk_json.perks[sel_perks[i]].perk_color == "green") {
                document.getElementById(id).style.backgroundImage = "url(css/img/perk_green.png)";
            }
            i++;

        }

        for (var i = 0; i < 4; i++) {
            document.getElementById("pn" + i).innerHTML = perk_json.perks[sel_perks[i]].perk_name;
            document.getElementById("pc" + i).innerHTML = perk_json.perks[sel_perks[i]].character;
            document.getElementById("pi" + i).style.backgroundImage = "url(css/img/" + active_type + "/iconperks-" + perk_json.perks[sel_perks[i]].perk_name.toLowerCase().replace(/ /gi, '').replace(/'/gi, '').replace(/-/gi, '').replace(/é/gi, 'e').replace(/è/gi, 'e').replace(/à/gi, 'a').replace(/&/gi, 'and').replace(/!/gi, '').replace(/:/gi, '') + ".png)";

            document.getElementById("pn" + i).style.opacity = "0";
            document.getElementById("pc" + i).style.opacity = "0";
            document.getElementById("p" + i).style.opacity = "0";
        }

        window.setTimeout(perk1an, 250);
    }
}

function perk1an() {
    document.getElementById("p0").style.opacity = "1";

    document.getElementById("p0").style.animation = "perkRevealAnimation 1.5s ease-out";
    document.getElementById("pn0").style.animation = "perkRevealAnimation 1s ease-out";
    document.getElementById("pc0").style.animation = "perkRevealAnimation 1s ease-out 0.3s";

    window.setTimeout(perk2an, 1000);
}

function perk2an() {
    document.getElementById("p1").style.opacity = "1";

    document.getElementById("p1").style.animation = "perkRevealAnimation 1.5s ease-out";
    document.getElementById("pn1").style.animation = "perkRevealAnimation 1s ease-out";
    document.getElementById("pc1").style.animation = "perkRevealAnimation 1s ease-out 0.3s";

    window.setTimeout(perk3an, 1000);
}

function perk3an() {
    document.getElementById("p2").style.opacity = "1";

    document.getElementById("p2").style.animation = "perkRevealAnimation 1.5s ease-out";
    document.getElementById("pn2").style.animation = "perkRevealAnimation 1s ease-out";
    document.getElementById("pc2").style.animation = "perkRevealAnimation 1s ease-out 0.3s";

    window.setTimeout(perk4an, 1000);
}

function perk4an() {
    document.getElementById("p3").style.opacity = "1";

    document.getElementById("p3").style.animation = "perkRevealAnimation 1.5s ease-out";
    document.getElementById("pn3").style.animation = "perkRevealAnimation 1s ease-out";
    document.getElementById("pc3").style.animation = "perkRevealAnimation 1s ease-out 0.3s";

    window.setTimeout(enableButton, 1500);
}

function enableButton() {
    document.getElementById("stcky").disabled = false;
}

function cleanup() {
    document.getElementById("p0").removeAttribute("style");
    document.getElementById("p1").removeAttribute("style");
    document.getElementById("p2").removeAttribute("style");
    document.getElementById("p3").removeAttribute("style");

    document.getElementById("pn0").removeAttribute("style");
    document.getElementById("pn1").removeAttribute("style");
    document.getElementById("pn2").removeAttribute("style");
    document.getElementById("pn3").removeAttribute("style");

    document.getElementById("pc0").removeAttribute("style");
    document.getElementById("pc1").removeAttribute("style");
    document.getElementById("pc2").removeAttribute("style");
    document.getElementById("pc3").removeAttribute("style");
}
