function toggleSidebar() {
	document.querySelector('.sidebar').classList.toggle('active');
}

// 点击外部区域关闭侧边栏
document.addEventListener('click', function(event) {
	const sidebar = document.querySelector('.sidebar');
	const toggleBtn = document.querySelector('.toggle-btn');

	if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
		sidebar.classList.remove('active');
	}
});