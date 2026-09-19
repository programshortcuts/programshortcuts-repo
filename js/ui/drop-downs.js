const initializedDropdowns = new WeakSet();

export function initDropDowns(root = document) {
    root.querySelectorAll('.drop-down').forEach(control => {
        if (initializedDropdowns.has(control)) return;
        const downs = control.closest('.drop-parent')?.querySelector(':scope > .downs');
        if (!downs) return;
        initializedDropdowns.add(control);

        const setOpen = open => {
            downs.classList.toggle('hide', !open);
            downs.classList.toggle('show', open);
            control.setAttribute('aria-expanded', String(open));
        };
        setOpen(downs.classList.contains('show'));
        control.addEventListener('click', event => {
            event.preventDefault();
            setOpen(downs.classList.contains('hide'));
        });
        // Buttons already emit click for Enter and Space; avoid toggling twice.
        if (control.tagName !== 'BUTTON') {
            control.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setOpen(downs.classList.contains('hide'));
                }
            });
        }
    });
}
