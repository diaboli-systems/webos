fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        // Display the IP address on the screen
        document.getElementById("ip").innerText = data.ip;
    })
    .catch(error => {
        console.error("Error fetching IP address:", error);
    });

document.getElementById("sign-in").addEventListener("click", () => {
    alert("Signing in...");
});

document.getElementById("storage-capacity").addEventListener("click", () => {
    alert("0/5 GB used");
})