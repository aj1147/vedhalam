// Web Audio API Synthesizer
// Long, continuous, obnoxious meme sounds.
// No external audio files required.

let audioCtx: AudioContext | null = null;
let activeNodes: AudioNode[] = [];
let activeOscillators: OscillatorNode[] = [];
let activeGains: GainNode[] = [];
let stopTimer: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as {
        webkitAudioContext: typeof AudioContext;
      }).webkitAudioContext;

    audioCtx = new AudioContextClass();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  return audioCtx;
}

export type SoundEffectType =
  | "duck_quack"
  | "sad_trombone"
  | "dialup_modem"
  | "dog_bark"
  | "cat_meow"
  | "car_honk"
  | "boing"
  | "air_horn"
  | "crying"
  | "malayalam_meme";

/* ------------------------------------------------ */
/* STOP EVERYTHING                                  */
/* ------------------------------------------------ */

export function stopSillySound() {
  if (stopTimer) {
    window.clearTimeout(stopTimer);
    stopTimer = null;
  }

  activeOscillators.forEach((osc) => {
    try {
      osc.stop();
    } catch {}
  });

  activeGains.forEach((gain) => {
    try {
      gain.gain.cancelScheduledValues(0);
      gain.gain.setValueAtTime(0, audioCtx?.currentTime || 0);
    } catch {}
  });

  activeOscillators = [];
  activeGains = [];
  activeNodes = [];
}

/* ------------------------------------------------ */
/* HELPERS                                          */
/* ------------------------------------------------ */

function trackOsc(osc: OscillatorNode) {
  activeOscillators.push(osc);
  activeNodes.push(osc);
}

function trackGain(gain: GainNode) {
  activeGains.push(gain);
  activeNodes.push(gain);
}

function createDistortion(ctx: AudioContext) {
  const distortion = ctx.createWaveShaper();

  const curve = new Float32Array(44100);

  for (let i = 0; i < curve.length; i++) {
    const x = (i * 2) / curve.length - 1;

    // Aggressive distortion
    curve[i] =
      ((3 + 20) * x * 20 * (Math.PI / 180)) /
      (Math.PI + 20 * Math.abs(x));
  }

  distortion.curve = curve;
  distortion.oversample = "4x";

  activeNodes.push(distortion);

  return distortion;
}

/* ------------------------------------------------ */
/* MAIN FUNCTION                                    */
/* ------------------------------------------------ */

export function startSillySound(type?: SoundEffectType): string {
  stopSillySound();

  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const soundTypes: SoundEffectType[] = [
    "duck_quack",
    "sad_trombone",
    "dialup_modem",
    "dog_bark",
    "cat_meow",
    "car_honk",
    "boing",
    "air_horn",
    "crying",
    "malayalam_meme",
  ];

  const chosenType =
    type || soundTypes[Math.floor(Math.random() * soundTypes.length)];

  /* ================================================= */
  /* DUCK QUACK                                        */
  /* ================================================= */

  if (chosenType === "duck_quack") {
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const distortion = createDistortion(ctx);

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);

    lfo.type = "sine";
    lfo.frequency.value = 3;

    lfoGain.gain.value = 100;

    filter.type = "bandpass";
    filter.frequency.value = 700;
    filter.Q.value = 12;

    gain.gain.value = 0.35;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(filter);
    filter.connect(distortion);
    distortion.connect(gain);
    gain.connect(ctx.destination);

    trackOsc(osc);
    trackOsc(lfo);
    trackGain(gain);

    osc.start();
    lfo.start();

    return "🦆 INFINITE DUCK. MAKE IT STOP.";
  }

  /* ================================================= */
  /* SAD TROMBONE                                      */
  /* ================================================= */

  if (chosenType === "sad_trombone") {
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = "sawtooth";

    osc.frequency.setValueAtTime(330, now);

    // Constantly sliding down and recovering
    osc.frequency.setValueAtTime(330, now);
    osc.frequency.linearRampToValueAtTime(180, now + 2);
    osc.frequency.linearRampToValueAtTime(310, now + 4);
    osc.frequency.linearRampToValueAtTime(140, now + 7);

    // Vibrato
    lfo.frequency.value = 5;
    lfoGain.gain.value = 18;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gain.gain.value = 0.3;

    osc.connect(gain);
    gain.connect(ctx.destination);

    trackOsc(osc);
    trackOsc(lfo);
    trackGain(gain);

    osc.start();
    lfo.start();

    return "🎺 WOMP WOMP WOMP WOMP WOMP...";
  }

  /* ================================================= */
  /* DIALUP MODEM                                     */
  /* ================================================= */

  if (chosenType === "dialup_modem") {
    const gain = ctx.createGain();
    const distortion = createDistortion(ctx);

    gain.gain.value = 0.18;

    distortion.connect(gain);
    gain.connect(ctx.destination);

    trackGain(gain);

    // Multiple constantly moving modem frequencies
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();

      osc.type = i % 2 === 0 ? "square" : "sawtooth";

      const base = 600 + i * 350;

      osc.frequency.setValueAtTime(base, now);

      osc.frequency.linearRampToValueAtTime(
        base * 3,
        now + 2
      );

      osc.frequency.linearRampToValueAtTime(
        base / 2,
        now + 4
      );

      osc.frequency.linearRampToValueAtTime(
        base * 2.5,
        now + 6
      );

      osc.frequency.linearRampToValueAtTime(
        base,
        now + 8
      );

      osc.connect(distortion);

      trackOsc(osc);

      osc.start();
    }

    return "💾 CONNECTING... CONNECTING... CONNECTING...";
  }

  /* ================================================= */
  /* DOG BARK                                         */
  /* ================================================= */

  if (chosenType === "dog_bark") {
    const gain = ctx.createGain();
    const osc = ctx.createOscillator();

    osc.type = "sawtooth";

    gain.gain.value = 0;

    osc.connect(gain);
    gain.connect(ctx.destination);

    trackOsc(osc);
    trackGain(gain);

    osc.start();

    // Repeated barking without another click
    const barkLoop = () => {
      if (!activeOscillators.includes(osc)) return;

      const t = ctx.currentTime;

      osc.frequency.setValueAtTime(
        180 + Math.random() * 180,
        t
      );

      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        t + 0.12
      );

      window.setTimeout(barkLoop, 250 + Math.random() * 350);
    };

    barkLoop();

    return "🐕 WOOF WOOF WOOF WOOF WOOF!!!";
  }

  /* ================================================= */
  /* CAT MEOW                                         */
  /* ================================================= */

  if (chosenType === "cat_meow") {
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = "sine";

    osc.frequency.value = 600;

    lfo.frequency.value = 7;
    lfoGain.gain.value = 80;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.value = 0.35;

    trackOsc(osc);
    trackOsc(lfo);
    trackGain(gain);

    osc.start();
    lfo.start();

    return "🐈 MEEEEEEEEEEEEEEEEEEEEEEEEEEEEOW";
  }

  /* ================================================= */
  /* CAR HONK                                         */
  /* ================================================= */

  if (chosenType === "car_honk") {
    const gain = ctx.createGain();
    const distortion = createDistortion(ctx);

    gain.gain.value = 0.18;

    distortion.connect(gain);
    gain.connect(ctx.destination);

    trackGain(gain);

    const frequencies = [350, 420, 490];

    frequencies.forEach((frequency) => {
      const osc = ctx.createOscillator();

      osc.type = "square";
      osc.frequency.value = frequency;

      osc.connect(distortion);

      trackOsc(osc);

      osc.start();
    });

    return "🚗 HONK HONK HONK HONK HONK HONK!!!";
  }

  /* ================================================= */
  /* BOING                                            */
  /* ================================================= */

  if (chosenType === "boing") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";

    gain.gain.value = 0.4;

    osc.connect(gain);
    gain.connect(ctx.destination);

    trackOsc(osc);
    trackGain(gain);

    osc.start();

    const boingLoop = () => {
      if (!activeOscillators.includes(osc)) return;

      const t = ctx.currentTime;

      osc.frequency.cancelScheduledValues(t);

      osc.frequency.setValueAtTime(
        100 + Math.random() * 100,
        t
      );

      osc.frequency.exponentialRampToValueAtTime(
        900 + Math.random() * 600,
        t + 0.25
      );

      osc.frequency.exponentialRampToValueAtTime(
        100 + Math.random() * 100,
        t + 0.7
      );

      window.setTimeout(boingLoop, 700);
    };

    boingLoop();

    return "🌀 BOOOOOOOOIIIIIINGGGGGGGGGGG";
  }

  /* ================================================= */
  /* AIR HORN                                         */
  /* ================================================= */

  if (chosenType === "air_horn") {
    const masterGain = ctx.createGain();
    const distortion = createDistortion(ctx);

    masterGain.gain.value = 0.12;

    distortion.connect(masterGain);
    masterGain.connect(ctx.destination);

    trackGain(masterGain);

    const frequencies = [
      466,
      622,
      932,
      1200,
    ];

    frequencies.forEach((frequency) => {
      const osc = ctx.createOscillator();

      osc.type = "square";
      osc.frequency.value = frequency;

      osc.connect(distortion);

      trackOsc(osc);

      osc.start();
    });

    return "📢 BWAHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!";
  }

  /* ================================================= */
  /* CRYING                                           */
  /* ================================================= */

  if (chosenType === "crying") {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = "triangle";

    osc.frequency.value = 450;

    lfo.frequency.value = 4;
    lfoGain.gain.value = 100;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gain.gain.value = 0.3;

    osc.connect(gain);
    gain.connect(ctx.destination);

    trackOsc(osc);
    trackOsc(lfo);
    trackGain(gain);

    osc.start();
    lfo.start();

    return "😭 AAAAAAAAAAAAAAA WAAAAAAAAAAAAAA";
  }

  /* ================================================= */
  /* MALAYALAM MEME CHAOS                             */
  /* ================================================= */

  if (chosenType === "malayalam_meme") {
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const distortion = createDistortion(ctx);

    osc.type = "sawtooth";

    osc.frequency.value = 240;

    lfo.type = "square";
    lfo.frequency.value = 2.5;

    lfoGain.gain.value = 180;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 15;

    gain.gain.value = 0.3;

    osc.connect(filter);
    filter.connect(distortion);
    distortion.connect(gain);
    gain.connect(ctx.destination);

    trackOsc(osc);
    trackOsc(lfo);
    trackGain(gain);

    osc.start();
    lfo.start();

    return "🌴 ELLAM SHERI AAVUMMMMMMMMMMMMMMMMM 😌";
  }

  return "🔊 SILLY NOISE FOREVER.";
}