function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mask = document.querySelector('#sidebar');
    sidebar.classList.toggle('active');
    mask.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
}
window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    const mask = document.querySelector('#sidebar');
    if (window.innerWidth > 768) {
        mask.style.display = 'none';
    } else {
        mask.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    }
});
document.querySelector('.main-content').addEventListener('click', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
});
function toggleTheme() {
			const body = document.body;
			body.classList.toggle('night-mode');
	};
