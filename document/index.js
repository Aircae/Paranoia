// 侧边栏切换
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// 点击外部关闭侧边栏
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');

    if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// 章节菜单切换（唯一函数定义）
function toggleChapters(button) {
    const menu = button.nextElementSibling;
    menu.classList.toggle('show');

    // 清除旧的事件监听器
    const oldScrollHandler = menu._scrollHandler;
    if (oldScrollHandler) {
        menu.removeEventListener('scroll', oldScrollHandler);
    }

    if (menu.classList.contains('show')) {
        // 滚动触发展开逻辑
        const scrollHandler = function(e) {
            const threshold = e.target.scrollHeight - e.target.clientHeight;
            if (e.target.scrollTop >= threshold - 5) { // 允许5px误差
                menu.classList.add('expanded');
                menu.removeEventListener('scroll', scrollHandler);
            }
        };
        menu._scrollHandler = scrollHandler;
        menu.addEventListener('scroll', scrollHandler);

        // 点击展开按钮逻辑
        const expandBtn = menu.querySelector('.expand-btn');
        const updateButtonText = () => {
            expandBtn.textContent = menu.classList.contains('expanded') 
                ? '收起 ▲' 
                : '显示更多 ▼';
        };

        expandBtn.onclick = function() {
            menu.classList.toggle('expanded');
            updateButtonText();
        };
    }

    // 关闭时重置状态
    const closeHandler = function(e) {
        if (!button.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('show', 'expanded');
            const expandBtn = menu.querySelector('.expand-btn');
            if (expandBtn) expandBtn.textContent = '显示更多 ▼';
            document.removeEventListener('click', closeHandler);
        }
    };
    document.addEventListener('click', closeHandler);
}