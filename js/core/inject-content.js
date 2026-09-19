import { initDropDowns } from "../ui/drop-downs.js";
import { effectsLoops } from "../../pages/home-page/js-home/effects-home.js";

export const mainLandingPage = document.querySelector('.main-landing-page');
let latestRequest = 0;
let stopPageEffects;
let pageLinksInitialized = false;

// Injected fragments use paths relative to index.html, as the existing pages do.
export function isInternalPageLink(anchor) {
    const href = anchor.getAttribute('href')?.trim();
    if (!href || href.startsWith('#') || anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')) return false;
    try {
        const url = new URL(href, document.baseURI);
        return ['http:', 'https:'].includes(url.protocol) && url.origin === location.origin &&
            !url.hash && /\.html?$/i.test(url.pathname);
    } catch {
        return false;
    }
}

export async function injectContent(href) {
    if (!href || !mainLandingPage) return false;
    let url;
    try {
        url = new URL(href.trim(), document.baseURI);
    } catch (error) {
        console.warn('Unable to load page: invalid URL.', href, error);
        return false;
    }
    if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) return false;

    const request = ++latestRequest;
    try {
        const response = await fetch(url.href);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const contentType = response.headers.get('content-type');
        if (contentType && !/^(text\/html|application\/xhtml\+xml)\b/i.test(contentType)) {
            throw new Error('The response is not an HTML page.');
        }
        if (response.url && new URL(response.url).origin !== location.origin) {
            throw new Error('The page redirected to an external site.');
        }
        const html = await response.text();
        if (request !== latestRequest) return false;
        const parsedPage = new DOMParser().parseFromString(html, 'text/html');
        const page = parsedPage.querySelector('.page-container');
        if (!page) throw new Error('The page is unfinished or has no .page-container.');

        // Full-document fragments must not add another head, stylesheet, or script to the shell.
        page.querySelectorAll('script, style, link').forEach(element => element.remove());
        page.classList.toggle('dark-mode', document.body.classList.contains('dark-mode'));
        stopPageEffects?.();
        mainLandingPage.replaceChildren(page);
        openPageLinks();
        initDropDowns(mainLandingPage);
        stopPageEffects = effectsLoops(mainLandingPage);
        return true;
    } catch (error) {
        console.warn(`Unable to load ${url.pathname}; keeping the current page.`, error);
        return false;
    }
}

function openPageLinks() {
    if (pageLinksInitialized) return;
    pageLinksInitialized = true;
    mainLandingPage.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
            event.ctrlKey || event.shiftKey || event.altKey) return;
        const anchor = event.target.closest('a');
        if (!anchor || !mainLandingPage.contains(anchor) || !isInternalPageLink(anchor)) return;
        event.preventDefault();
        injectContent(anchor.href);
    });
}
