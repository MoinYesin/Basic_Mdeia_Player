let isPlaying = false;
let currentSongIndex = 0;
const audioElement = document.getElementById('myAudio');
const seekBar = document.querySelector('.seek-bar');
const coverArtElement = document.getElementById('coverArt');
const songQueue = [
  { src: 'song1.mp3', cover: 'cover1.jpg', title: "Let's Talk About Sex - Cheat Codes" },
  { src: 'song2.mp3', cover: 'cover2.jpg', title: 'Hope - The Chainsmokers' },
  { src: 'song3.mp3', cover: 'cover3.jpg', title: 'This Feeling - The Chainsmokers' }
];

function togglePlayPause() {
  const playPauseButton = document.querySelector('.play-pause');
  isPlaying = !isPlaying;

  if (isPlaying) {
    playPauseButton.textContent = 'Pause';
    playCurrentSong();
  } else {
    playPauseButton.textContent = 'Play';
    audioElement.pause();
  }
}

function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songQueue.length;
  playCurrentSong();
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songQueue.length) % songQueue.length;
  playCurrentSong();
}

const currentSongTitleElement = document.getElementById('currentSongTitle');

function playCurrentSong() {
    const currentSong = songQueue[currentSongIndex];
    audioElement.src = currentSong.src;
    coverArtElement.src = currentSong.cover;
    currentSongTitleElement.textContent = currentSong.title; // Display the title
    audioElement.play();
    updateQueue();
}

function updateQueue() {
  const songQueueElement = document.getElementById('songQueue');
  songQueueElement.innerHTML = '';

  songQueue.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.title}`;
    songQueueElement.appendChild(listItem);
  });
}

// ... (rest of the code)

// ... (rest of the code)


function updateSeekBar(value) {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = (value / 100) * duration;

  audioElement.currentTime = currentTime;
  currentTimeElement.textContent = formatTime(currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audioElement.addEventListener('timeupdate', () => {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = audioElement.currentTime;

  seekBar.value = (currentTime / duration) * 100;
  currentTimeElement.textContent = formatTime(currentTime);
});

// Optional: Auto-play the first song on page load
window.addEventListener('load', () => {
  playCurrentSong();
});

