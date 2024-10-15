export function windowSettings() {
    document.querySelectorAll("div.window").forEach(window => {
        dragElement(window); // enable dragging
    
        window.addEventListener("click", () => pushWindowToTop(window));
    });
    
    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
        if (elmnt.querySelector("div.header")) {
            // if present, the header is where you move the DIV from
    
            elmnt.querySelector("div.header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV
            elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
            e.preventDefault();
            // get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

            // console.log(elmnt.style.top, elmnt.style.left);
        }
    
        function closeDragElement() {
            // stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
    
            // push window Z index to top
            pushWindowToTop(elmnt);
    
            // save the position of the window
        }
    }
}

export async function windowBuilder(name) {
    // build the window
    const window = document.createElement("div");
    window.className = "window animate__bounceIn";
    window.id = name;

    const header = document.createElement("div");
    header.className = "header";
    header.innerText = name;

    const menu = document.createElement("div");
    menu.className = "menu";
    // menu icons
    const minimize = document.createElement("div");
    minimize.className = "button";
    minimize.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /></svg>`;
    minimize.addEventListener("click", () => {
        document.querySelector(`div.window#${name}`).style.display = "none";
    });

    const maximize = document.createElement("div");
    maximize.className = "button";
    maximize.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg>`;
    maximize.addEventListener("click", () => {
        if (localStorage.getItem(window.id)) {
            window.style.top = "100px";
            window.style.left = "100px";
            window.style.width = "500px";
            window.style.height = "250px";
            window.style.border = "1px solid #d3d3d3";
            localStorage.removeItem(window.id);
        } else {
            localStorage.setItem(window.id, true);
            window.style.top = "0px";
            window.style.left = "0px";
            window.style.width = "100%";
            window.style.height = "100%";
            window.style.border = "none";
        }
    });

    const close = document.createElement("div");
    close.className = "button exit";
    close.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>`;
    close.addEventListener("click", () => {
        alert("Shutting down application...");
        document.querySelector(`div.window#${name}`).remove();
    });

    menu.appendChild(minimize);
    menu.appendChild(maximize);
    menu.appendChild(close);

    const body = document.createElement("div");
    body.className = "body";
    // ${name.toLowerCase()}/index.html
    body.innerHTML = await fetch(`apps/${name.toLowerCase()}/index.html`).then(res => res.text());

    header.appendChild(menu);
    window.appendChild(header);
    window.appendChild(body);

    document.body.appendChild(window);
    windowSettings();

    eval(await fetch(`apps/${name.toLowerCase()}/index.js`).then(res => res.text()));
}

export function pushWindowToTop(window) {
    document.querySelectorAll("div.window").forEach(w => {
        w.style.zIndex = 1;
    });

    window.style.zIndex = 2;
}