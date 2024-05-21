
    document.addEventListener('DOMContentLoaded', () => {

        if (window.location.pathname === '/home') {
            let hicon = document.querySelector('#home #icon');
            let hometab = document.querySelector('#home');
            if (hicon) {
                hometab.style.background = "#15bf50"
                hicon.style.color = "#ffffff"
                hicon.classList.remove("ri-home-3-line");
                hicon.classList.add("ri-home-3-fill");
            }
            else{
                hicon.classList.remove("ri-home-3-fill");
                hicon.classList.add("ri-home-3-line");
            }
        }
        if (window.location.pathname === '/fav') {
            let hicon = document.querySelector('#fav #icon');
            let favtab = document.querySelector('#fav');
            if (hicon) {
                favtab.style.background = "#15bf50"
                hicon.style.color = "#ffffff"
                hicon.classList.remove("ri-heart-line");
                hicon.classList.add("ri-heart-fill");
            }
            else{
                hicon.classList.remove("ri-heart-fill");
                hicon.classList.add("ri-heart-line");
            }
        }
        if (window.location.pathname === '/playlist') {
            let hicon = document.querySelector('#playlist #icon');
            let playlisttab = document.querySelector('#playlist');
            if (hicon) {
                playlisttab.style.background = "#15bf50"
                hicon.style.color = "#ffffff"
                hicon.classList.remove("ri-heart-line");
                hicon.classList.add("ri-heart-fill");
            }
            else{
                hicon.classList.remove("ri-heart-fill");
                hicon.classList.add("ri-heart-line");
            }
        }
    });
