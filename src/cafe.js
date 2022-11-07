const APIController = (function() {

    const clientId = "653f3d82e98749f78d637e1e472c6eab";
    const clientSecret = "f06b23d21d1d465984b5c1bc11d83bee";


    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 15;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();



const UIController = (function() {


    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list'
    }


    return {


        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },


        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        },

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },
        createTrack(img,artist,id, name) {
            const html = `
            <div class="row">
             <div class="col">
                    <img src="${img}" />
                 </div>
            <div class="col">
                    <h5 class="card-title">${artist}</h5>
                    <h6 class="card-title">${name}</h6>
            </div>
            <div class="col">
            <h5 class="card-title">${artist}</h5>
            <h6 class="card-title">${name}</h6>
    </div>
            </div>
            <div class="col-lg-4">
                <div class="card card-margin">
                    <div class="card-body pt-0">
                    <div class="widget-49">
                        <div class="widget-49-title-wrapper">
                        <div class="widget-49-date-primary">
                        
                        </div>
                        <div class="widget-49-meeting-info">
                        
                        </div>
                    </div>
                    <ul class="widget-49-meeting-points">
                    <a href="#" class="list-group-item list-group-item-action list-group-item-light" data-dismiss="modal" id="${id}"><img src="https://i.ibb.co/hRRKtVM/play.png" alt="play" border="0" /></a>
                    </ul>
                    <div class="widget-49-meeting-action">
                    </div>
                </div>
            </div>
        </div>
    </div>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },

        createTrackDetail(img, title, artist,href) {
            const uri = href.split("https://api.spotify.com/v1/tracks/");
            console.log(uri);
            const detailDiv = document.querySelector(DOMElements.divSongDetail);

            detailDiv.innerHTML = '';

            const html =`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${uri[1]}?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        },

        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

})();

const APPController = (function(UICtrl, APICtrl) {


    const DOMInputs = UICtrl.inputField();


    const loadGenres = async () => {

        const token = await APICtrl.getToken();

        UICtrl.storeToken(token);

        const genres = await APICtrl.getGenres(token);

        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
    }


    DOMInputs.genre.addEventListener('change', async () => {

        UICtrl.resetPlaylist();

        const token = UICtrl.getStoredToken().token;

        const genreSelect = UICtrl.inputField().genre;

        const genreId = genreSelect.options[genreSelect.selectedIndex].value;

        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);

        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href));
    });



    DOMInputs.submit.addEventListener('click', async (e) => {

        e.preventDefault();

        UICtrl.resetTracks();

        const token = UICtrl.getStoredToken().token;

        const playlistSelect = UICtrl.inputField().playlist;

        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;

        const tracks = await APICtrl.getTracks(token, tracksEndPoint);

        tracks.forEach(el => UICtrl.createTrack(el.track.album.images[2].url,el.track.artists[0].name,el.track.href, el.track.name))

    });

    DOMInputs.tracks.addEventListener('click', async (e) => {

        e.preventDefault();
        UICtrl.resetTrackDetail();

        const token = UICtrl.getStoredToken().token;

        const trackEndpoint = e.target.id;

        const track = await APICtrl.getTrack(token, trackEndpoint);

        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name,track.href);
    });

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);


APPController.init();

var url_string = window.location.href;
var url = new URL(url_string);
let username = url.searchParams.get("username");

var blockContent = document.getElementById("blockContent");

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