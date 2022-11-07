var url_string = window.location.href;
var url = new URL(url_string);
let username = url.searchParams.get("username");

var blockContent = document.getElementById("blockContent");

if (username != "" && username != null) {
    textUsername.innerHTML = "Welcome to cafe:  " + username;
}else{
    textUsername.innerHTML = "Welcome to cafe";
}
console.log(username);

function swiftMode(id){
    var elementBody = document.body;
    elementBody.classList.toggle("dark-mode");
    var imageMode1 = document.getElementById("btnSwiftMode1");
    var imageMode2 = document.getElementById("btnSwiftMode2");
    console.log(id);
    if ( id == "btnSwiftMode1"){
        imageMode2.style.display = "block";
        imageMode1.style.display = "none";
        blockContent.className = "block-light block-content";
        setYudBackground(srcBackground.light);
        textUsername.style.color = "#fff";
        
    } else {
        imageMode1.style.display = "block";
        imageMode2.style.display = "none";
        blockContent.className = "block-dark block-content";
        setYudBackground(srcBackground.dark);
        textUsername.style.color = "#ffcf96";
    }
}

function timerClick(){
    
}
const srcBackground = { 
    light:"styles/image/bgLight.png",
    dark:"styles/image/bgDark.png"
};
setYudBackground(srcBackground.light);
function setYudBackground(dataSrc){
    let yudBackground = document.getElementById("yudBackground");
    yudBackground.src = dataSrc;
}


const swiftModeChange = {
    light: "styles/image/lightmode.png",
    dark: "styles/image/darkmode.png"
}
function setSwiftModeChange(dataSrc){
    let swiftModeChange = document.getElementById("btnSwiftMode1");
    swiftModeChange.src = dataSrc;
}