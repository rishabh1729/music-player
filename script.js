const audio = document.querySelector('audio');
const playPauseBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next');
const previousBtn = document.querySelector('#previous');
const songList = document.querySelector('.song-list');
const title = document.querySelector('#title');
const record = document.querySelector('.record');
const volSlider = document.querySelector('.slider');
const progressBar = document.querySelector('.progress-bar');

let songArray = [];
let songHeading = '';
let songIndex = 0;
let isPlaying = false;

function loadAudio() {
    audio.src = songArray[songIndex];

    let songListItems = songList.getElementsByTagName('li');
    songHeading = songListItems[songIndex].getAttribute('data-name');
    title.innerText = songHeading;

    for (let i = 0; i < songListItems.length; i++) {
        songListItems[i].classList.remove('active');
    }

    songListItems[songIndex].classList.add('active');
}

function loadSongs() {
    let songListItems = songList.getElementsByTagName('li');
    for (let i = 0; i < songListItems.length; i++) {
        songArray.push(songListItems[i].getAttribute('data-src'));
    }

    loadAudio();
}

loadSongs();

function playAudio() {
    audio.play();
    playPauseBtn.querySelector('i.fas').classList.remove('fa-play');
    playPauseBtn.querySelector('i.fas').classList.add('fa-pause');
    isPlaying = true;
    record.classList.add('record-animation');
}

function pauseAudio() {
    audio.pause();
    playPauseBtn.querySelector('i.fas').classList.remove('fa-pause');
    playPauseBtn.querySelector('i.fas').classList.add('fa-play');
    isPlaying = false;
    record.classList.remove('record-animation');
}

function nextSong() {
    songIndex += 1;
    if (songIndex >= songArray.length) {
        songIndex = 0;
    }
    loadAudio();
    playAudio();
}

function previousSong() {
    songIndex -= 1;
    if (songIndex < 0) {
        songIndex = songArray.length - 1;
    }
    loadAudio();
    playAudio();
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}, false);

nextBtn.addEventListener('click', () => {
    nextSong();
}, false);

previousBtn.addEventListener('click', () => {
    previousSong();
}, false);

songList.addEventListener('click', (e) => {
    songIndex = e.target.closest('li').getAttribute('data-index');
    loadAudio();
    playAudio();
}, false);

audio.addEventListener('ended', () => {
    nextSong();
});

volSlider.addEventListener('input', () => {
    audio.volume = volSlider.value / 100;
});

audio.addEventListener('timeupdate', () => {
    progressBar.value = parseInt((audio.currentTime / audio.duration) * 100);
});

progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value * audio.duration / 100;
});