let darkModeInitialized = false;

export function darkMode() {
    if (darkModeInitialized) return;
    darkModeInitialized = true;
    document.addEventListener('keydown', event => {
        if (event.key.toLowerCase() !== 'k' || !event.shiftKey || !event.metaKey) return;
        event.preventDefault();
        const enabled = document.body.classList.toggle('dark-mode');
        document.querySelectorAll('.page-container').forEach(page => {
            page.classList.toggle('dark-mode', enabled);
        });
    });
}
