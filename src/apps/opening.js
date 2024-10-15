import { windowSettings, pushWindowToTop, windowBuilder } from "../window.js";

const apps = document.querySelectorAll("div.dock div.app");

apps.forEach(app => {
    app.addEventListener("click", async () => {
        const div = document.querySelector(`div.window#${app.id}`);
        if (!div) {
            await windowBuilder(app.id);
        } else {
            div.style.display = "block";
            pushWindowToTop(div);
        }
    });
});