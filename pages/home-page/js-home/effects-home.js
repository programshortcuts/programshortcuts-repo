// effects.js
// const efxChangeBtn = document.querySelector('#efxChangeBtn')
let hoveredEl = null;
let isPaused = false;
let choice = 0
let numChoices = 2
let i = 0;
// let speed = 400;
let j = 0;
let direction = 1; // 1 = up, -1 = down
let resumeTimeout;
function forceResume() {
    isPaused = false;

    // optional: re-pause shortly after if still focused/hovered
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
        const active = document.activeElement;
        const isStillInside = active?.closest('#youtubeResources');

        if (isStillInside) {
            isPaused = true;
        }
    }, 500); // adjust timing to taste
}
export function effectsLoops(root = document){
    const youtubeProjects = root.querySelectorAll('#youtubeResources .topic')
    if (!youtubeProjects.length) return;
    const controller = new AbortController();
    const { signal } = controller;
    const indicator = root.querySelector('#effect-indicator');
    let frame;
    isPaused = false;
    i = 0;
    j = 0;
    // efxChangeBtn.addEventListener('click', e => {
    //     if (choice < numChoices - 1) {
    //         choice++;
    //     } else {
    //         choice = -1;
    //     }
        
    // })
    function changeEffect() {
            if (choice < numChoices - 1) {
                choice++;
            } else {
                choice = -1;
            }
            forceResume()
            const labels = {
                '-1': 'No Effect',
                '0': 'Wave',
                '1': 'Scale'
            };

            showIndicator(labels[choice], indicator);
    }
    document.addEventListener('keydown',e => {
        const key = e.key.toLowerCase()
        if (e.metaKey && e.shiftKey && key === 'e') {
            e.preventDefault();
            changeEffect();
        }
    }, { signal });
    root.querySelector('#efxChangeBtn')?.addEventListener('click', changeEffect, { signal });
    function animate() {
        frameIncrements(youtubeProjects)
        frame = requestAnimationFrame(animate);
    }
    animate();
    youtubeProjects.forEach(el => {
    el.addEventListener('mouseenter', () => {
        isPaused = true;
    }, { signal });

    el.addEventListener('mouseleave', () => {
        isPaused = false;
    }, { signal });

    el.addEventListener('focus', () => {
        isPaused = true;
        youtubeProjects.forEach(el => {
            el.style.transform = 'scale(1)';
            el.style.backgroundColor = '';
            el.style.opacity = '';
        });
    }, { signal });

    el.addEventListener('blur', () => {
        isPaused = false;
    }, { signal });
});
    return () => {
        controller.abort();
        cancelAnimationFrame(frame);
        clearTimeout(resumeTimeout);
        clearTimeout(indicator?._timeout);
    };
}
function frameIncrements(youtubeProjects){
    // debug
    if(choice === 0){
        // spacingEfx(i,j,youtubeProjects)
        const speed = 500
        incrementFrame(youtubeProjects,speed)
        waveStaggeredPulse({i,youtubeProjects,speed})
        return
    }
    if(choice === 1){
        let speed = 80
        incrementFrame(youtubeProjects,speed)
        transformElsEfx({i,j,youtubeProjects})
        waveStaggeredPulse({i,youtubeProjects,speed : 200})
        return
        
    }
    if(choice === -1){
        youtubeProjects.forEach(el => {
            el.style.transform = 'scale(1)';
            el.style.backgroundColor = '';
            el.style.opacity = '';
            el.style.borderRadius = '0'
        });
        return;
    }
    
}
function incrementFrame(youtubeProjects,speed){
    if (isPaused) return;

    i += direction;
        // hit top → start going down
    if (i  >= speed) {
        i = speed;       // clamp
        direction = -1;
    }
    // hit bottom → start going up + increment j
    if (i <= 0) {
        i = 0;         // clamp
        direction = 1;
        
        if(j < youtubeProjects.length - 1){
            j++;
        } else {
            j = 0;
        }
    }
}
function spacingEfx(i,j,youtubeProjects){
    let margin = i;
}
function transformElsEfx({i,j,youtubeProjects}){
    let sizeTransform = (1.03 / 100) * i + 1;
    let bRadius = i 
    youtubeProjects.forEach((el, index) => {
        if (index === j) {
            el.style.transform = `scale(${sizeTransform})`;
            el.style.borderRadius = `${Math.floor(bRadius)}px`
            el.style.paddingLeft = `${Math.floor(bRadius * .9)}px`
            el.style.paddingTop = `${Math.floor(bRadius * .2)}px`
        } else {
            el.style.transform = 'scale(1)';
        }
    });
}
function waveStaggeredPulse({i, youtubeProjects,speed}) {
    youtubeProjects.forEach((el, index) => {
        if (el === hoveredEl) return;

        const offset = index * 20; // spacing between waves
        let value = i - offset;

        // wrap value so it loops smoothly
        if (value < 0) value += speed;

        // normalize 0 → 1
        let progress = value / speed;

        // create fade in/out (triangle wave)
        let opacity = progress <= 0.5
            ? progress * 2
            : (1 - progress) * 2;

        applyEffect(el, opacity);
    });
}
function applyEffect(el, opacity) {
    // base opacity
    const minOpactiy = .4
    el.style.opacity = 0.6 + opacity * 0.5;
    
    // el.style.opacity = 0.5 + opacity * 0.5;
    // detect type via id
    if (el.id === 'aiYoutube') {
        el.style.backgroundColor = `rgba(255, 69, 0, ${opacity * minOpactiy})`;
    }
    if (el.id === 'cssYoutube') {
        el.style.backgroundColor = `rgb(143, 141, 159, ${opacity * minOpactiy})`;
    }
    if (el.id === 'dockerYoutube') {
        el.style.backgroundColor = `rgba(72, 61, 139, ${opacity * minOpactiy})`;
    }
    if (el.id === 'jsYoutube') {
        el.style.backgroundColor = `rgba(255, 255, 0, ${opacity * minOpactiy})`;
    }
    if (el.id === 'freecodecampYoutube') {
        el.style.backgroundColor = ` rgb(31, 81, 31, ${opacity * minOpactiy})`;
    }
    if (el.id === 'nodeJsYoutube') {
            el.style.backgroundColor = `rgb(32, 55, 122, ${opacity * minOpactiy})`;
    }
    if (el.id === 'arduinoYoutube') {
            el.style.backgroundColor = `rgb(32, 55, 122, ${opacity * minOpactiy})`;
    }
    if (el.id === 'pythonYoutube') {
        el.style.backgroundColor = `rgba(147, 112, 216, ${opacity * minOpactiy})`;
    }

    if (el.id === 'reactJsYoutube') {
        el.style.backgroundColor = `rgb(92, 107, 153, ${opacity * minOpactiy})`;
    }
}
function showIndicator(text, el) {
    if (!el) return;
    el.textContent = text;
    el.style.opacity = 1;

    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => {
        el.style.opacity = 0;
    }, 1000);
}
