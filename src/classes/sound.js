let audiopool = [];
let pannerNodes = [];

// change this so the audio context gets (loaded if not already) 
// when the game actually starts.
let audioContext;
let soundinitialized = false;
function InitAudio() {
    if(soundinitialized) return;
    soundinitialized = true;
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
jsfxr([3, 0.213, 0.207, 0.22463117094373963, 0.271, 0.115, 0, 0, 0, 0, 0, 0, 0.7594502133787636, 0.7471515023985824, 0, 0, 0.244, -0.838, 0.064, -0.133, 0.754, , 0.233, 1]),
jsfxr([1, 0, 0.02, 0.35, 0.49, 0.42, 0, 0, 0, 0, 0, 0.47, 0.62, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.25]),
jsfxr([3, 0.242, 0.119, 0, 0.073, 0.924, 0, -0.195, -0.257, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.534, 0, 0, 0.619, 0, 1]),
jsfxr([1, 0.026197096963704945, 0.07773150622798278, -0.024917629143260858, 0.04, 0.59, 0, -0.62, 0.04174663785506705, 0.0023499022553834445, -0.022194967729886494, 0.792, 0.38, 1.0049785381772562, -0.239, 0, -0.077, -0.10368285790472292, 0.542, -0.411, 0.132, 0.082, -0.083, 0.25]),
jsfxr([0, , 0.1207, 0.0763, 0.2221, 0.5849, 0.2, -0.2737, , , , , , 0.401, 0.0781, , , , 1, , , , , 1]),
jsfxr([0, , 0.1797, , 0.4004, 0.3195, , 0.2962, , , , , , 0.5604, , 0.4313, , , 1, , , , , 1]),
jsfxr([0, , 0.0343, , 0.2762, 0.533, , -0.4588, , , , , , 0.2202, , , , , 1, , , , , 1])
];

const sound = {
    play: function (params, p) {
        if(!soundinitialized) return;
        let pos={x:0,y:0,z:0};
        pannerNodes[currentSfxIndex].positionX.value = pos.x;
        pannerNodes[currentSfxIndex].positionY.value = pos.y;
        pannerNodes[currentSfxIndex].positionZ.value = pos.z;

        audiopool[currentSfxIndex].src = soundfx[params];
        audiopool[currentSfxIndex].play();
        currentSfxIndex = (currentSfxIndex + 1) % 25;
    },
  /*  
    move: 0,
    levelComplete: 1,
    teleport: 2,
    select: 3,
    unused: 4,
    unused: 5,
    unused: 6
    */
};
