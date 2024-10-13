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

export function pushWindowToTop(window) {
    document.querySelectorAll("div.window").forEach(w => {
        w.style.zIndex = 1;
    });

    window.style.zIndex = 2;
}