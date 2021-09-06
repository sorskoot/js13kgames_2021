let audiopool = [];
let pannerNodes = [];

// change this so the audio context gets (loaded if not already) 
// when the game actually starts.
let audioContext;

function InitAudio() {
    //     if (audioContext) return;
    audioContext = new AudioContext();
 //   audioContext.listener.upX.value = 0;
    audioContext.listener.upY.value = 1;
  //  audioContext.listener.upZ.value = 0;
    audioContext.sampleRate = 11025;
    let gain = audioContext.createGain();
    gain.connect(audioContext.destination);

    for (let i = 0; i < 25; i++) {
        const audio = new Audio();
        audiopool.push(audio);
        const element = audioContext.createMediaElementSource(audio);
        const pn = new PannerNode(audioContext, {
            panningModel: 'HRTF',
            distanceModel: 'exponential',
        });

        element.connect(pn);
        pn.connect(gain);
        pannerNodes.push(pn);
    }
}
let currentSfxIndex = 0;
let soundfx = [
jsfxr([1, 0.0119, 0.13, 0.1713, 0.11, 0.531, 0.0692, -0.56, -0.0392, 0.0925, , -0.48, 0.7, 0.4932, 0.0138, , -0.1301, -0.0553, 0.9552, -0.0111, 0.0242, 0.258, -0.1164, 0.3]),
jsfxr([3, , 0.58, 0.35, 0.0547, 0.16, , -0.18, , , , -0.3774, 0.6619, , , , 0.598, -0.1327, 1, , , , , 0.6]),
jsfxr([3, 0.09, 0.67, 0.35, 0.93, 0.2, , -0.12, , , , -0.3774, 0.62, , , , 0.1399, -0.3, 1, , , , , 0.5]),
jsfxr([3,0.29978917102132563,0.09195090990858697,,0.11082600521679305,0.7741007441192245,,0.34508506362070257,,,,,,,,,,,1,,,0.9409469537584538,,1]),
jsfxr([0, , 0.1207, 0.0763, 0.2221, 0.5849, 0.2, -0.2737, , , , , , 0.401, 0.0781, , , , 1, , , , , 1]),
jsfxr([0, , 0.1797, , 0.4004, 0.3195, , 0.2962, , , , , , 0.5604, , 0.4313, , , 1, , , , , 1]),
jsfxr([0, , 0.0343, , 0.2762, 0.533, , -0.4588, , , , , , 0.2202, , , , , 1, , , , , 1])
];

const sound = {
    play: function (params, p) {
        let pos={x:0,y:0,z:0};
        pannerNodes[currentSfxIndex].positionX.value = pos.x;
        pannerNodes[currentSfxIndex].positionY.value = pos.y;
        pannerNodes[currentSfxIndex].positionZ.value = pos.z;

        audiopool[currentSfxIndex].src = soundfx[params];
        audiopool[currentSfxIndex].play();
        currentSfxIndex = (currentSfxIndex + 1) % 25;
    },
  /*  
    fire: 0,
    explosion: 1,
    gameover: 2,
    select: 3,
    spawn: 4,
    upgrade: 5,
    place: 6
    */
};
