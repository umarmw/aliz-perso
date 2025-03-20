document.getElementById("openLogin").addEventListener("click", function () {
    document.getElementById("loginModal").style.display = "flex";
});

document.getElementById("closeLogin").addEventListener("click", function () {
    document.getElementById("loginModal").style.display = "none";
});

document.getElementById("submitLogin").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    if (email) {
        document.cookie = `userEmail=${email}; path=/; max-age=86400`; // Cookie valid for 1 day
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        alert("Login successful!");
    } else {
        alert("Please enter an email.");
    }
});