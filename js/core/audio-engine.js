/**
 * ALGOVISION - Web Audio Synthesis Engine
 * Generates harmonious acoustic feedback mapped to array values and algorithm operations
 * Zero external dependencies, pure Web Audio API
 */

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.baseFreq = 220; // A3
    this.maxFreq = 880;  // A5
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playTone(val, minVal = 10, maxVal = 100, type = 'sine', duration = 0.08) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const normalized = Math.max(0, Math.min(1, (val - minVal) / (maxVal - minVal || 1)));
      const freq = this.baseFreq + normalized * (this.maxFreq - this.baseFreq);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type; // 'sine', 'triangle', 'sawtooth'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // AudioContext policy catch
    }
  }

  playCompare(val1, val2) {
    this.playTone(val1, 10, 100, 'triangle', 0.06);
  }

  playSwap(val1, val2) {
    this.playTone(val2, 10, 100, 'sawtooth', 0.09);
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [523.25, 659.25, 783.99, 1046.50]; // C Major chord
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.3);
        } catch (e) {}
      }, idx * 60);
    });
  }
}
