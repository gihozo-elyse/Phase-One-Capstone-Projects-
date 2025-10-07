
document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
});

function setupMenu() {
    const menuButton = document.getElementById('mobileMenuButton');
    const closeButton = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    
    if (menuButton) {
        menuButton.onclick = () => {
            sidebar.classList.add('open');
        };
    }
    
    if (closeButton) {
        closeButton.onclick = () => {
            sidebar.classList.remove('open');
        };
    }
}