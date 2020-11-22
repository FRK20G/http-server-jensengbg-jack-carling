const audio = document.querySelector('#player');
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const backwardBtn = document.querySelector('#backward');
const forwardBtn = document.querySelector('#forward');
const progressBar = document.querySelector('#progressBar');
const progressBarBtn = document.querySelector('.progress');
const timeElem = document.querySelector('#time');
const songLengthElem = document.querySelector('#songLength');
const coverBackground = document.querySelector('#base');
const volumeBar = document.querySelector('#volumerange');
const volumeBtn = document.querySelector('#volume');
const volumeElem = document.querySelector('.volume');

function togglePlayAndPause() {
    playBtn.classList.toggle('hide');
    pauseBtn.classList.toggle('hide');
}

function updateTime() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime - minutes * 60);

    const songMinutes = Math.floor(audio.duration / 60);
    const songSeconds = Math.floor(audio.duration - songMinutes * 60);

    if (seconds < 10) {
        timeElem.innerHTML = minutes + ':0' + seconds;
    } else {
        timeElem.innerHTML = minutes + ':' + seconds;
    }

    if (!isNaN(audio.duration)) {
        if (songSeconds < 10) {
            songLengthElem.innerHTML = songMinutes + ':0' + songSeconds;
        } else {
            songLengthElem.innerHTML = songMinutes + ':' + songSeconds;
        }
    }
}

function randomCover() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    coverBackground.style.fill = '#' + randomColor;
}

randomCover();

playBtn.addEventListener('click', () => {
    audio.play();
    togglePlayAndPause();
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
    togglePlayAndPause();
});

forwardBtn.addEventListener('click', () => audio.currentTime += 10);
backwardBtn.addEventListener('click', () => audio.currentTime -= 10);

progressBarBtn.addEventListener('click', (event) => {
    audio.currentTime = ((event.offsetX / progressBarBtn.offsetWidth) * audio.duration);
});

volumeBtn.addEventListener('click', () => volumeElem.classList.toggle('hide'));

volumeBar.addEventListener('mousemove', () => {
    audio.volume = volumeBar.value / 100;
    if (audio.volume === 0) {
        volumeBtn.style.color = '#E5E5E5';
    } else {
        volumeBtn.style.color = '#000000';
    }
});

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    updateTime();
});

audio.addEventListener('ended', togglePlayAndPause);
audio.addEventListener('canplaythrough', updateTime);