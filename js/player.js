const playList = [
    {
        title: 'Aqua Caelestis',
        src: '../assets/sounds/assets_sounds_Aqua Caelestis.mp3',
        duration: '00:58',
        id: 1
    },
    {
        title: 'River Flows In You',
        src: '../assets/sounds/assets_sounds_River Flows In You.mp3',
        duration: '03:50',
        id: 2
    },
    {
        title: 'Summer Wind',
        src: '../assets/sounds/assets_sounds_Summer Wind.mp3',
        duration: '05:05',
        id: 3
    },
    {
        title: 'Ennio Morricone',
        src: '../assets/sounds/assets_sounds_Ennio Morricone.mp3',
        duration: '05:03',
        id: 4

    }
]



const prevBtn = document.querySelector('.play-prev'),
    playBtn = document.querySelector('.play'),
    nextBtn = document.querySelector('.play-next'),
    pauseBtn = document.querySelector('.pause'),
    audioList = document.querySelector('.play-list');


const pauseMusicListen = pauseBtn.addEventListener('click', pauseMusic);
const nextMusicListen = nextBtn.addEventListener('click', nextSong);
const prevMusicListen = prevBtn.addEventListener('click', prevSong);

let audio = new Audio(playList[0].src);
const playtMusicListen = playBtn.addEventListener('click', () => audio.play());

playList.forEach((sound) => {
    audioList.innerHTML += `<li onclick="onSongClick(event)" id="${sound.id}">${sound.title}</li>`;
});

function onSongClick(e) {
    let song = playList.find((el) => el.id == Number.parseInt(e.target.id));
    Array.from(audioList.children).forEach((li) => li.classList.remove('active-song'));
    audio.pause();
    e.target.classList.add('active-song');
    audio = new Audio(song.src);
    audio.play();
};

function pauseMusic() {

    audio.pause();
}

function nextSong() {
    const childrenArray = Array.from(audioList.children);
    const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));
    console.log(currentSongElement);
    audio.pause();
    if (!currentSongElement) {
        audio = new Audio(playList[0].src);
        childrenArray[0].classList.add('active-song');
    } else {
        childrenArray.forEach((li) => li.classList.remove('active-song'));
        let currentId = currentSongElement.id;
        let songIndex = playList.findIndex((s) => s.id == Number.parseInt(currentId));
        if (songIndex < 0) {
            songIndex = 0;
        } else if (songIndex >= playList.length - 1) {
            songIndex = 0;
        } else {
            songIndex++;
        }
        audio = new Audio(playList[songIndex].src);
        childrenArray[songIndex].classList.add('active-song');
    }
    audio.play();
}

function prevSong() {
    const childrenArray = Array.from(audioList.children);
    const currentSongElement = childrenArray.find(el => el.classList.contains('active-song'));
    console.log(currentSongElement);
    audio.pause();
    if (!currentSongElement) {
        audio = new Audio(playList[playList.length - 1].src);
        childrenArray[playList.length - 1].classList.add('active-song');
    } else {
        childrenArray.forEach((li) => li.classList.remove('active-song'));
        let currentId = currentSongElement.id;
        let songIndex = playList.findIndex((s) => s.id == Number.parseInt(currentId));
        if (songIndex < 0) {
            songIndex = playList.length - 1;
        } else if (songIndex == 0) {
            songIndex = playList.length - 1;
        } else {
            songIndex--;
        }
        audio = new Audio(playList[songIndex].src);
        childrenArray[songIndex].classList.add('active-song');
    }
    audio.play();
}













