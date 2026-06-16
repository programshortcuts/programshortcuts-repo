// I need to get async down this is inefficent
let playing = false
export function playVids(){
    const stepTxts = document.querySelectorAll('.step-txt')
    const allVideos = document.querySelectorAll('video')
    allVideos.forEach(vid => {
        // vid.volume = 0;
        vid.loop = true;
        vid.controls = true;  // IMPORTANT
        vid.style.width = '100%'; // Optional for responsiveness
        vid.addEventListener('click', e => {
            const step = getStep(e.target)
            playing = !playing
            toggleVideoSize(e.target)
            handleVideo(e,step)
        })
    })
    /**
 When step-txt has focus OR video is clicked
    vid z-index should be higher so 2, and any other one lower

    */
    stepTxts.forEach(el => {
        el.addEventListener('focus', e => {
            const step = getStep(e.target.parentElement)
            const vid = step.querySelector('video')
            denlargeAllVideos()

            if(vid && vid.classList.contains('enlarge-vid')){
                vid.style.zIndex = 2
            }
        })
        el.addEventListener('focusout', e => {
            const step = getStep(e.target.parentElement)
            const vid = step.querySelector('video')

            if(vid && vid.classList.contains('enlarge-vid')){
                vid.style.zIndex = 1
            }
        })
        el.addEventListener('keydown', e => {            
            let step = getStep(e.target.parentElement)
            stopAllVideos()
            handleVideo(e,step)
        })
    })
    function denlargeAllVideos(){
        allVideos.forEach(el => {
            const step = getStep(el.parentElement)
            if(el.classList.contains('enlarge-vid')){
                el.classList.remove('enlarge-vid')
                step.classList.remove('relative')
                // el.parentElement.classList.remove('')
            }
        })
    }
    function handleVideo(e,step){
        let stepVid = step.querySelector('.step-vid')     
        const vid = stepVid?.querySelector('video')      
        if(vid){
            playPauseVideo(e,vid)
        }
    }

    function playPauseVideo(e, vid) {
        const keyCode = e.keyCode;

        switch (keyCode) {
            case 13: // Enter
                // denlargeAllVideos()
                e.target.scrollIntoView({behavior: 'smooth', inline: 'end'})
                console.log(e.target)
                playing = true;
                if(playing && vid.classList.contains('enlarge-vid')){
                    playing = !playing
                }
                toggleVideoSize(vid);
                break;
            case 32: // Space
                e.preventDefault();
                playing = !playing;
                break;
            case 37: // Left Arrow
                e.preventDefault();
                vid.currentTime -= 1;
                break;
            case 39: // Right Arrow
                e.preventDefault();
                vid.currentTime += 1;
                break;
        }

        playing ? vid.play() : vid.pause();
    }
    function toggleVideoSize(vid){
        // denlargeAllVideos()
        const step = getStep(vid.parentElement)
        step.classList.toggle('relative')
        vid.classList.toggle('enlarge-vid')
        
    }

    function stopAllVideos(){
        allVideos.forEach(vid => vid.pause())

    }
    addEventListener('click', e => {
        e.preventDefault()
        if(!e.target.parentElement.classList.contains('step-vid')){
            denlargeAllVideos()
        }
    })
    function getStep(parent){
        if(parent.classList.contains('step') || parent.classList.contains('step-float')){
            return parent
        } else if (parent.parentElement){
            return getStep(parent.parentElement)
        } else {
            return null
        }
    }
    addEventListener('keydown', e => {
        if(e.target.classList.contains('step-txt')) return
        if(e.keyCode === 32){
            if(playing ){
                console.log('yes')
                // e.preventDefault()
                stopAllVideos()
            } 
            
        }
        
    })
}


