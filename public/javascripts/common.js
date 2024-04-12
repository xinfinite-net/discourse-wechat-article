document.addEventListener("DOMContentLoaded", function () {
    // 更具体的选择器，确保只选取特定区域内的元素
    const repostInfo = document.querySelector('[data-wct-type="repost-info"]');
    if (!repostInfo) return; // 如果元素不存在，则不执行后续代码

    const toggleButton = document.createElement('button');
    toggleButton.textContent = '更多信息';
    repostInfo.parentNode.insertBefore(toggleButton, repostInfo.nextSibling);

    function updateButtonVisibility() {
        const isContentOverflowing = repostInfo.scrollHeight > repostInfo.offsetHeight;

        if (!isContentOverflowing) {
            toggleButton.style.display = 'none';
            repostInfo.style.maxHeight = 'none'; // 展示全部内容
        } else {
            toggleButton.style.display = 'block';
            repostInfo.style.maxHeight = '150px'; // 设回初始高度
            toggleButton.textContent = '更多信息';
        }
    }

    updateButtonVisibility(); // 初始页面加载时执行

    toggleButton.onclick = function () {
        if (repostInfo.style.maxHeight === 'none') {
            repostInfo.style.maxHeight = '150px'; // 重新折叠
            toggleButton.textContent = '更多信息';
        } else {
            repostInfo.style.maxHeight = 'none'; // 完全展开
            toggleButton.textContent = '收起';
        }
    };

    // 使用防抖技术优化窗口大小调整的事件处理
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateButtonVisibility, 100);
    });
});
