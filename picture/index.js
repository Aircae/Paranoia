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

// 渐隐显示图片
document.querySelectorAll('.image-item').forEach(item => {
    item.style.opacity = 0;
    setTimeout(() => {
        item.style.opacity = 1;
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    // 给每张图片添加点击事件监听器
    document.querySelectorAll('.image').forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.querySelector('.modal');
            const modalImg = document.getElementById('expandedImg');
            modal.style.display = 'block';
            modalImg.src = this.src; // 将点击的图片地址赋值给模态框中的图片
        });
    });

    // 给模态框添加点击事件监听器
    document.querySelector('.modal').addEventListener('click', function(e) {
        // 如果点击的是模态框本身或者关闭按钮，则关闭模态框
        if (e.target === this || e.target.classList.contains('close-btn')) {
            this.style.display = 'none';
        }
    });

    // 按ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelector('.modal').style.display = 'none';
        }
    });
});