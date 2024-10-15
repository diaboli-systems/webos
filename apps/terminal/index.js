autoSelect();
function autoSelect() {
    const latestInput = document.querySelectorAll("div.terminal input")[document.querySelectorAll("div.terminal input").length - 1];
    latestInput.focus();
}

document.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        const latestInput = document.querySelectorAll("div.terminal input")[document.querySelectorAll("div.terminal input").length - 1];

        latestInput.setAttribute("disabled", "true");

        switch (latestInput.value) {
            case "ls":
                const ls = document.createElement("span");
                ls.innerText = `Applications Downloads Pictures`;
                document.querySelector("div.terminal").appendChild(ls);
                break;
            case "cd Applications":
                const cdApplications = document.createElement("span");
                cdApplications.innerText = `Applications`;
                document.querySelector("div.terminal").appendChild(cdApplications);
                break;
            default:
                const message = document.createElement("span");
                message.innerText = `command not found: ${latestInput.value}`;
                document.querySelector("div.terminal").appendChild(message);
        }

        const newInput = document.createElement("span");
        newInput.innerText = "~";
        newInput.appendChild(document.createElement("input"));

        document.querySelector("div.terminal").appendChild(newInput);
        autoSelect();
    }
})