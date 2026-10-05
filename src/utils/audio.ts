/**
 * Vikram Portfolio - Pure Web Audio API Sound Synthesizer
 * Zero external audio files required. Instant, offline, zero-latency feedback.
 * Level-calibrated to -22dB for comfortable, tactile acoustic haptics.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private activeAmbientNode: AudioNode | null = null;
  private activeGainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientSound();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Mechanical Camera Shutter (Dual-curtain focal plane click + wind)
   */
  public playShutter() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // 1. Shutter Curtain 1 Strike (Crisp snap)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const filter1 = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(320, t);
    osc1.frequency.exponentialRampToValueAtTime(40, t + 0.04);

    filter1.type = 'highpass';
    filter1.frequency.setValueAtTime(800, t);

    gain1.gain.setValueAtTime(0.35, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.ctx.destination);

    osc1.start(t);
    osc1.stop(t + 0.06);

    // 2. Metallic Mirror Slap / Noise Burst
    const bufferSize = this.ctx.sampleRate * 0.04;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2200, t);
    noiseFilter.Q.setValueAtTime(3, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    whiteNoise.start(t);

    // 3. Shutter Curtain 2 Release (Second delayed clack 45ms later)
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const t2 = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(540, t2);
      osc2.frequency.exponentialRampToValueAtTime(80, t2 + 0.035);

      gain2.gain.setValueAtTime(0.28, t2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.04);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t2);
      osc2.stop(t2 + 0.05);
    }, 45);
  }

  /**
   * Lens Focus Ring Tactile Micro-Click
   */
  public playFocusTick(pitchMultiplier: number = 1) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400 * pitchMultiplier, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.012);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.02);
  }

  /**
   * Vintage Pull-Chain Light Switch Clack
   */
  public playLightSwitch(isOn: boolean) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Metallic spring tension
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(isOn ? 880 : 660, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.06);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  /**
   * Liquid Chemical Bath Slosh / Splash
   */
  public playWaterSlosh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.15;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);
    filter.frequency.exponentialRampToValueAtTime(900, t + 0.07);
    filter.frequency.exponentialRampToValueAtTime(300, t + 0.15);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  /**
   * Focus Lock Success Fanfare / Chime
   */
  public playFocusLock() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [587.33, 880, 1174.66]; // D5, A5, D6 harmonic chime
    notes.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + index * 0.04);

      gain.gain.setValueAtTime(0.12, t + index * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + index * 0.04 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(t + index * 0.04);
      osc.stop(t + index * 0.04 + 0.28);
    });
  }

  /**
   * Slide / Loupe Tactile Interaction
   */
  public playLoupeClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.02);

    gain.gain.setValueAtTime(0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  /**
   * Tactile Physical Album Page Turn (3-phase acoustic realism: lift, air swish, landing settle)
   */
  public playPageTurn() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // Phase 1: Initial Paper Friction / Lift (0 - 0.25s)
    const liftSize = Math.floor(this.ctx.sampleRate * 0.22);
    const liftBuffer = this.ctx.createBuffer(1, liftSize, this.ctx.sampleRate);
    const liftData = liftBuffer.getChannelData(0);
    for (let i = 0; i < liftSize; i++) {
      liftData[i] = (Math.random() * 2 - 1) * Math.sin((i / liftSize) * Math.PI);
    }
    const liftNoise = this.ctx.createBufferSource();
    liftNoise.buffer = liftBuffer;
    const liftFilter = this.ctx.createBiquadFilter();
    liftFilter.type = 'bandpass';
    liftFilter.frequency.setValueAtTime(1100, t);
    liftFilter.frequency.exponentialRampToValueAtTime(500, t + 0.22);
    liftFilter.Q.setValueAtTime(2.2, t);
    const liftGain = this.ctx.createGain();
    liftGain.gain.setValueAtTime(0.12, t);
    liftGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    liftNoise.connect(liftFilter);
    liftFilter.connect(liftGain);
    liftGain.connect(this.ctx.destination);
    liftNoise.start(t);

    // Phase 2: Air Whoosh as Paper Swings Across Spine (0.2s - 0.55s)
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const t2 = this.ctx.currentTime;
      const whooshSize = Math.floor(this.ctx.sampleRate * 0.28);
      const whooshBuffer = this.ctx.createBuffer(1, whooshSize, this.ctx.sampleRate);
      const whooshData = whooshBuffer.getChannelData(0);
      for (let i = 0; i < whooshSize; i++) {
        whooshData[i] = (Math.random() * 2 - 1) * Math.pow(Math.sin((i / whooshSize) * Math.PI), 3);
      }
      const whooshNoise = this.ctx.createBufferSource();
      whooshNoise.buffer = whooshBuffer;
      const whooshFilter = this.ctx.createBiquadFilter();
      whooshFilter.type = 'lowpass';
      whooshFilter.frequency.setValueAtTime(800, t2);
      whooshFilter.frequency.exponentialRampToValueAtTime(280, t2 + 0.28);
      const whooshGain = this.ctx.createGain();
      whooshGain.gain.setValueAtTime(0.10, t2);
      whooshGain.gain.exponentialRampToValueAtTime(0.001, t2 + 0.28);
      whooshNoise.connect(whooshFilter);
      whooshFilter.connect(whooshGain);
      whooshGain.connect(this.ctx.destination);
      whooshNoise.start(t2);
    }, 180);

    // Phase 3: Soft Paper Landing Tap on Album Stack (at ~0.65s)
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const t3 = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const landGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, t3);
      osc.frequency.exponentialRampToValueAtTime(45, t3 + 0.08);
      landGain.gain.setValueAtTime(0.09, t3);
      landGain.gain.exponentialRampToValueAtTime(0.001, t3 + 0.09);
      osc.connect(landGain);
      landGain.connect(this.ctx.destination);
      osc.start(t3);
      osc.stop(t3 + 0.1);
    }, 620);
  }

  /**
   * Ambient Exhibition Soundscape (Warm museum gallery drone)
   */
  public startAmbientGallery(): boolean {
    if (this.isMuted) return false;
    this.initContext();
    if (!this.ctx) return false;

    if (this.activeAmbientNode) {
      this.stopAmbientSound();
      return false;
    }

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, t); // A2 warm room fundamental

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(165, t); // E3 perfect fifth

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 1.2); // Gentle fade in

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);

    this.activeAmbientNode = osc1;
    this.activeGainNode = gain;
    return true;
  }

  public stopAmbientSound() {
    if (this.activeGainNode && this.ctx) {
      const t = this.ctx.currentTime;
      this.activeGainNode.gain.setValueAtTime(this.activeGainNode.gain.value, t);
      this.activeGainNode.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
      setTimeout(() => {
        if (this.activeAmbientNode) {
          try {
            (this.activeAmbientNode as unknown as AudioScheduledSourceNode).stop();
          } catch {
            // ignore
          }
          this.activeAmbientNode = null;
          this.activeGainNode = null;
        }
      }, 900);
    }
  }

  public isAmbientPlaying(): boolean {
    return this.activeAmbientNode !== null;
  }
}

export const sound = new SoundEngine();
