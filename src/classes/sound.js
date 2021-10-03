import {jsfxr} from './jsfxr';

let audiopool = [];
let pannerNodes = [];

// change this so the audio context gets (loaded if not already) 
// when the game actually starts.
let audioContext;
let soundinitialized = false;

function InitAudio() {
    if(soundinitialized) return;
    soundinitialized = true;    
    audioContext = new AudioContext();
    //audioContext.sampleRate = 11025;
    let gain = audioContext.createGain();
    gain.connect(audioContext.destination);
    for (let i = 0; i < 25; i++) {
        const audio = new Audio();
        audiopool.push(audio);
        const element = audioContext.createMediaElementSource(audio);                
        element.connect(gain);        
    }
}
let currentSfxIndex = 0;
let soundfx = [
jsfxr([3, 0.21, 0.21, 0.22, 0.27, 0.12, 0, 0, 0, 0, 0, 0, 0.76, 0.75, 0, 0, 0.24, -0.84, 0.06, -0.13, 0.75, , 0.23, 1]),
jsfxr([1, 0, 0.02, 0.35, 0.49, 0.42, 0, 0, 0, 0, 0, 0.47, 0.62, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.25]),
jsfxr([3, 0.24, 0.12, 0, 0.073, 0.92, 0, -0.195, -0.257, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.534, 0, 0, 0.619, 0, 1]),
jsfxr([1, 0.03, 0.08, -0.02, 0.04, 0.59, 0, -0.62, 0.041, 0.002, -0.02, 0.792, 0.38, 1.004, -0.23, 0, -0.08, -0.10, 0.54, -0.41, 0.13, 0.08, -0.083, 0.25])
];

export const sound = {
    InitAudio,
    play: function (params) {
        if(!soundinitialized) return;       
        audiopool[currentSfxIndex].src = soundfx[params];
        audiopool[currentSfxIndex].play();
        currentSfxIndex = (currentSfxIndex + 1) % 25;
    },
  /*  
    move: 0,
    levelComplete: 1,
    teleport: 2,
    select: 3
    */
};
