import { windowSettings, pushWindowToTop } from "../window.js";

const apps = document.querySelectorAll("div.dock div.app");

apps.forEach(app => {
    app.addEventListener("click", async () => {
        const div = document.querySelector(`div.window#${app.id}`);
        if (!div) {
            // build the window
            const window = document.createElement("div");
            window.className = "window";
            window.id = app.id;

            const header = document.createElement("div");
            header.className = "header";
            header.innerText = app.id;

            const menu = document.createElement("div");
            menu.className = "menu";
            // menu icons
            const minimize = document.createElement("div");
            minimize.className = "button";
            minimize.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /></svg>`;
            minimize.addEventListener("click", () => {
                document.querySelector(`div.window#${app.id}`).style.display = "none";
            });

            const maximize = document.createElement("div");
            maximize.className = "button";
            maximize.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg>`;
            maximize.addEventListener("click", () => {
                if (localStorage.getItem(window.id)) {
                    window.style.top = "100px";
                    window.style.left = "100px";
                    window.style.width = "400px";
                    window.style.height = "200px";
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
                document.querySelector(`div.window#${app.id}`).remove();
            });

            menu.appendChild(minimize);
            menu.appendChild(maximize);
            menu.appendChild(close);

            const body = document.createElement("div");
            body.className = "body";
            // body.innerText = `Content of ${app.id}`;
            // body.src = `apps/${app.id.toLowerCase()}.html`;
            body.style.height = "calc(100% - 30px)";
            /// body.style.border = "none";
            body.innerHTML = await fetch(`apps/${app.id.toLowerCase()}.html`).then(res => res.text());

            header.appendChild(menu);
            window.appendChild(header);
            window.appendChild(body);

            document.body.appendChild(window);
            windowSettings();
        } else {
            div.style.display = "block";
            pushWindowToTop(div);
        }
    });
});