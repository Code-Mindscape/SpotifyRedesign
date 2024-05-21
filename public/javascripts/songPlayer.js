const songBoxes = document.querySelectorAll(".songBox");
console.log(songBoxes)
const PlayerBoxBottom = document.querySelector("#playerBox");

const AppearPlayerBox = (
  title,
  artist,
  coverSRC,
  isplaying,
  currentPlaying
) => {
  PlayerBoxBottom.style.display = "flex";
  console.log(title, artist, coverSRC);
  PlayerBoxBottom.querySelector("#CoverImage").setAttribute("src", coverSRC);
  PlayerBoxBottom.querySelector("#musicTitle").innerHTML = title;
  PlayerBoxBottom.querySelector("#artistName").innerHTML = artist;

  let playerPlayIcon = PlayerBoxBottom.querySelector("#playIcon");

  playerPlayIcon.addEventListener("click", () => {
    if (!currentPlaying.paused) {
      currentPlaying.pause();
      playerPlayIcon.classList.add("ri-play-circle-fill");
      playerPlayIcon.classList.remove("ri-pause-circle-fill");
    } else {
      currentPlaying.play();
      playerPlayIcon.classList.add("ri-pause-circle-fill");
      playerPlayIcon.classList.remove("ri-play-circle-fill");
    }
  });

  if (isplaying) {
    playerPlayIcon.classList.remove("ri-play-circle-fill");
    playerPlayIcon.classList.add("ri-pause-circle-fill");
  } else {
    playerPlayIcon.classList.remove("ri-pause-circle-fill");
    playerPlayIcon.classList.add("ri-play-circle-fill");
  }
};

const song = new Audio();
let currentPlayingSongBox = null;

songBoxes.forEach((songBox) => {

  const audioPath = songBox.dataset.song;
  console.log(audioPath);
  const playBtn = songBox.querySelector(".playIcon");
  const rangeInput = PlayerBoxBottom.querySelector("#musicRange");
  const musicDuration = PlayerBoxBottom.querySelector("#musicDuration");
  const volumeBtn = PlayerBoxBottom.querySelector("#volumeBtn");
  const volumeIcon = PlayerBoxBottom.querySelector("#volumeBtn i");

  const currentSONG_COVER = songBox
    .querySelector("#songCoverImage")
    .getAttribute("src");
  const currentSONG_TITLE = songBox.querySelector("#songTitle").innerHTML;
  const currentSONG_ARTIST = songBox.querySelector("#songArtist").innerHTML;
  let isplaying = false;

  songBox.addEventListener("click", () => {
    if (currentPlayingSongBox === songBox && !song.paused) {
      song.pause();
      playBtn.classList.remove("ri-pause-circle-fill");
      playBtn.classList.add("ri-play-circle-fill");
      currentPlayingSongBox = null;
      isplaying = false;
      AppearPlayerBox(
        currentSONG_TITLE,
        currentSONG_ARTIST,
        currentSONG_COVER,
        isplaying,
        song
      );
    } else {
      song.src = audioPath;
      song.play();
      isplaying = true;

      let disabled = true;
        volumeBtn.addEventListener('click', function() {
            disabled = disabled === true? false : true;
            if(!disabled) {
                volumeBtn.style.background = "#52525B"
                volumeIcon.classList.remove("ri-volume-up-fill");
                volumeIcon.classList.add("ri-volume-mute-fill");
                song.volume = 0;
            }
            else{
                song.volume = 1;
                volumeBtn.style.background = "#3F3F46"
                volumeIcon.classList.remove("ri-volume-mute-fill");
                volumeIcon.classList.add("ri-volume-up-fill");
            }
        })

      song.addEventListener("timeupdate", function () {
        const percent = (song.currentTime / song.duration) * 100;
        rangeInput.value = percent;
      });

      rangeInput.addEventListener("input", function () {
        const percent = rangeInput.value;
        const duration = song.duration;
        song.currentTime = (percent / 100) * duration;
      });


      if (currentPlayingSongBox && currentPlayingSongBox !== songBox) {
        const prevPlayBtn = currentPlayingSongBox.querySelector(".playIcon");
        prevPlayBtn.classList.remove("ri-pause-circle-fill");
        prevPlayBtn.classList.add("ri-play-circle-fill");
        AppearPlayerBox(
          currentSONG_TITLE,
          currentSONG_ARTIST,
          currentSONG_COVER,
          isplaying,
          song
        );
      }

      playBtn.classList.remove("ri-play-circle-fill");
      playBtn.classList.add("ri-pause-circle-fill");
      currentPlayingSongBox = songBox;
      AppearPlayerBox(
        currentSONG_TITLE,
        currentSONG_ARTIST,
        currentSONG_COVER,
        isplaying,
        song
      );
    }
  });
});
