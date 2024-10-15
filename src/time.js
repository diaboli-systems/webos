function time() {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let second = currentTime.getSeconds();

    if (hour > 12) hour -= 12;

    if (minute < 10) minute = "0" + minute;

    if (second < 10) second = "0" + second;

    document.getElementById("time").innerHTML = `${hour}:${minute}${localStorage.getItem("show-seconds") ? `:${second}` : ""} ${hour > 11 ? "pm" : "am"}`;
    setTimeout(time, 1000);
}