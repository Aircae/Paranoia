function toggleSidebar() {
	document.querySelector('.sidebar').classList.toggle('active');
}

document.addEventListener('click', function(event) {
	const sidebar = document.querySelector('.sidebar');
	const toggleBtn = document.querySelector('.toggle-btn');

	if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
		sidebar.classList.remove('active');
	}
});

const audio = document.getElementById('music-player');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const songTitle = document.querySelector('.song-title');

// 动态生成播放列表
const songItems = document.querySelectorAll('.song-item');
const playlist = Array.from(songItems).map(item => ({
	title: item.textContent.trim(),
	file: item.dataset.song
}));

let currentTrack = 0;
let isPlaying = false;

// 修复播放功能
function togglePlay() {
	isPlaying = !isPlaying;
	playBtn.classList.toggle('active');
	playBtn.querySelector('i').className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
	isPlaying ? audio.play() : audio.pause();
}

function loadTrack(index) {
	currentTrack = (index + playlist.length) % playlist.length;
	audio.src = playlist[currentTrack].file;
	songTitle.textContent = playlist[currentTrack].title;

	// 预加载音频
	audio.load();

	songItems.forEach(item => item.classList.remove('active'));
	songItems[currentTrack].classList.add('active');

	if (isPlaying) {
		audio.play().catch(error => {
			console.error('播放错误:', error);
			isPlaying = false;
			togglePlay();
		});
	}
}
const volumeSlider = document.querySelector('.volume-slider');
const volumeBtn = document.querySelector('.volume-btn');
let lastVolume = 1;

volumeSlider.addEventListener('input', (e) => {
	const value = e.target.value;
	audio.volume = value;
	volumeBtn.innerHTML = value == 0 ?
		'<i class="fas fa-volume-mute"></i>' :
		value < 0.5 ?
		'<i class="fas fa-volume-down"></i>' :
		'<i class="fas fa-volume-up"></i>';
});

// 静音切换
volumeBtn.addEventListener('click', () => {
	if (audio.volume > 0) {
		lastVolume = audio.volume;
		audio.volume = 0;
		volumeSlider.value = 0;
		volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
	} else {
		audio.volume = lastVolume;
		volumeSlider.value = lastVolume;
		volumeBtn.innerHTML = lastVolume < 0.5 ?
			'<i class="fas fa-volume-down"></i>' :
			'<i class="fas fa-volume-up"></i>';
	}
});

// 初始化音量
audio.volume = 1;

// 歌曲点击事件
songItems.forEach((item, index) => {
	item.addEventListener('click', () => {
		loadTrack(index);
		if (!isPlaying) togglePlay();
	});
});

// 事件绑定
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => loadTrack(currentTrack - 1));
nextBtn.addEventListener('click', () => loadTrack(currentTrack + 1));

// 进度更新
audio.addEventListener('timeupdate', () => {
	const progress = (audio.currentTime / audio.duration) * 100;
	document.querySelector('.progress').style.width = `${progress}%`;
});

// 自动下一首
audio.addEventListener('ended', () => loadTrack(currentTrack + 1));

// 初始化首曲
loadTrack(0);
const progressContainer = document.querySelector('.progress-container');
// 进度条跳转逻辑
progressContainer.addEventListener('click', (e) => {
	const rect = progressContainer.getBoundingClientRect();
	const percent = (e.clientX - rect.left) / rect.width;
	audio.currentTime = percent * audio.duration;
});