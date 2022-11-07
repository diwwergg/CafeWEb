// when click on login button get the email and username from the form 
// and open the cafe page with parameters email and username

var formLogin = document.getElementById("formLogin");

function getEmailAndName() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    console.log("set email and username");
    console.log(email);
    console.log(username);
    const userData = { email, username };
    return userData;
}

function openCafePage(email, username) {
    window.location.href = "cafe.html?email=" + email + "&username=" + username;
}

function varidateLogin(email, username) {
    if (email === "" || email === null) {
        alert("Please enter email");
        return false;
    }
    if (username === "" || username === null) {
        alert("Please enter username");
        return false;
    }
    console.log(email);
    console.log(username);
    return true;
}

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    let userData = getEmailAndName();
    if (varidateLogin(userData.email, userData.username)) {
        openCafePage(userData.email, userData.username);
    }
});

// <div id="music"></div>
var music1 = document.getElementById("music1");
music1.onclick(function () {
    document.getElementById('aaron-family').innerHTML += `<audio src="https://docs.google.com/uc?export=download&id=1662U7CksAIv2xjoBrJGXypUmLlBoFrlr" autoplay loop></audio>`
});