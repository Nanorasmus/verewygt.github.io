var int = 1;
function switchToTab(int) {

    const tabs = document.querySelectorAll("div.box");

    if (int == 1) {
        document.querySelector("div.selected-underlay").style.top = "-5px";

        tabs.forEach(function(tab) {
            tab.style.display = "none";
        });
        document.querySelector("div.chat.box").style.display = "block";
    } else if (int == 2) {
        document.querySelector("div.selected-underlay").style.top = "125px";

        tabs.forEach(function(tab) {
            tab.style.display = "none";
        });
        document.querySelector("div.reminders.box").style.display = "block";
    } else if (int == 3) {
        document.querySelector("div.selected-underlay").style.top = "255px";

        tabs.forEach(function(tab) {
            tab.style.display = "none";
        });
        document.querySelector("div.file-explorer.box").style.display = "block";
    } else if (int == 4) {
        document.querySelector("div.selected-underlay").style.top = "385px";

        tabs.forEach(function(tab) {
            tab.style.display = "none";
        });
        document.querySelector("div.transactions.box").style.display = "block";
    } else if (int == 5) {
        document.querySelector("div.selected-underlay").style.top = "calc(100% - 145px)";

        tabs.forEach(function(tab) {
            tab.style.display = "none";
        });
        document.querySelector("div.settings.box").style.display = "block";
    }
}
