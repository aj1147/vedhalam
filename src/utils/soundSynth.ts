// Web Audio API Synthesizer for funny, absurd, and meme sounds
// No external MP3 downloads required - 100% web audio generated!

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export type SoundEffectType = 
  | 'duck_quack' 
  | 'sad_trombone' 
  | 'dialup_modem' 
  | 'dog_bark' 
  | 'cat_meow' 
  | 'car_honk' 
  | 'boing' 
  | 'air_horn' 
  | 'crying' 
  | 'malayalam_meme';

export function playSillySound(type?: SoundEffectType): string {
  const ctx = getAudioContext();
  const soundTypes: SoundEffectType[] = [
    'duck_quack', 'sad_trombone', 'dialup_modem', 'dog_bark',
    'cat_meow', 'car_honk', 'boing', 'air_horn', 'crying', 'malayalam_meme'
  ];
  
  const chosenType = type || soundTypes[Math.floor(Math.random() * soundTypes.length)];

  const now = ctx.currentTime;

  switch (chosenType) {
    case 'duck_quack': {
      // Duck quack: sawtooth with swept resonant lowpass filter
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.25);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(400, now + 0.25);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.5, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
      return "🦆 Duck Quack!";
    }

    case 'sad_trombone': {
      // Sad trombone: D#4 -> D4 -> C#4 -> C4 (long slide with vibrato)
      const notes = [311.13, 293.66, 277.18, 261.63]; // D#4, D4, C#4, C4
      const durations = [0.35, 0.35, 0.35, 0.9];
      
      let startTime = now;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';

        const dur = durations[idx];
        if (idx === 3) {
          // Last pitch pitch-bends downward dramatically
          osc.frequency.setValueAtTime(freq, startTime);
          osc.frequency.linearRampToValueAtTime(freq * 0.75, startTime + dur);
        } else {
          osc.frequency.setValueAtTime(freq, startTime);
        }

        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);

        startTime += dur + 0.05;
      });
      return "🎺 Womp Womp... Sad Trombone!";
    }

    case 'dialup_modem': {
      // Dialup modem screech: multi-frequency chirps and noise bursts
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'square';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.linearRampToValueAtTime(2400, now + 0.15);
      osc1.frequency.linearRampToValueAtTime(900, now + 0.3);

      osc2.frequency.setValueAtTime(2200, now);
      osc2.frequency.linearRampToValueAtTime(1100, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.4);
      osc2.start(now);
      osc2.stop(now + 0.4);
      return "💾 Dial-up Modem Screech!";
    }

    case 'dog_bark': {
      // Dog bark: short burst of pitched noise envelope
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
      return "🐕 Woof! Woof!";
    }

    case 'cat_meow': {
      // Cat meowing off-key: sine wave with dramatic pitch drop & wobble vibrato
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.linearRampToValueAtTime(850, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.5);

      lfo.frequency.setValueAtTime(8, now); // wobble
      lfoGain.gain.setValueAtTime(30, now);

      lfo.connect(osc.frequency);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(now);
      osc.start(now);
      lfo.stop(now + 0.5);
      osc.stop(now + 0.5);
      return "🐈 Off-key Cat Meow!";
    }

    case 'car_honk': {
      // Car honk: two dissonant square waves
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'square';
      osc2.type = 'square';

      osc1.frequency.setValueAtTime(380, now);
      osc2.frequency.setValueAtTime(460, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
      return "🚗 Beep Beep! Honk!";
    }

    case 'boing': {
      // Cartoon Boing spring sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
      return "🌀 Cartoon Boing!";
    }

    case 'air_horn': {
      // Reggae / Meme Airhorn: Dissonant triple square sweep
      const freqs = [466.16, 622.25, 932.33];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);
      });
      return "📢 AIR HORN! BWA BWA BWA!";
    }

    case 'crying': {
      // Crying sound effect: rhythmic sobbing pitch slide
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.linearRampToValueAtTime(300, now + 0.2);
      osc.frequency.linearRampToValueAtTime(450, now + 0.35);
      osc.frequency.linearRampToValueAtTime(250, now + 0.55);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);
      return "😭 Melodramatic Crying!";
    }

    case 'malayalam_meme': {
      // Malayalam Meme sound synth: comical vocal glide ("Ellam Sheri Aavum!" formant pitch shift)
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.45);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.linearRampToValueAtTime(400, now + 0.45);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
      return "🌴 Malayalam Meme: 'Fiza verum Ellam sheri aavum! 😌'";
    }

    default:
      return "🔊 Silly Sound!";
  }
}
