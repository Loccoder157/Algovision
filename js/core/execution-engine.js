/**
 * ALGOVISION - Step-based Execution Engine
 * Supports forward, backward (rewind), play, pause, and speed adjustments
 */

export class ExecutionEngine {
  constructor() {
    this.steps = [];
    this.currentStepIndex = -1;
    this.isPlaying = false;
    this.speed = 1.0; // 0.25x to 4.0x
    this.baseDelay = 700; // ms per step at 1x
    this.timerId = null;
    this.listeners = {
      stepChange: [],
      playbackChange: [],
      complete: []
    };
  }

  loadSteps(steps) {
    this.pause();
    this.steps = steps || [];
    this.currentStepIndex = this.steps.length > 0 ? 0 : -1;
    this.notifyStepChange();
    this.notifyPlaybackChange();
  }

  getCurrentStep() {
    if (this.currentStepIndex >= 0 && this.currentStepIndex < this.steps.length) {
      return this.steps[this.currentStepIndex];
    }
    return null;
  }

  play() {
    if (this.isPlaying) return;
    if (this.steps.length === 0) return;

    if (this.currentStepIndex >= this.steps.length - 1) {
      this.currentStepIndex = 0;
      this.notifyStepChange();
    }

    this.isPlaying = true;
    this.notifyPlaybackChange();
    this.scheduleNextStep();
  }

  pause() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.isPlaying) {
      this.isPlaying = false;
      this.notifyPlaybackChange();
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  stepForward() {
    this.pause();
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.notifyStepChange();
      return true;
    }
    return false;
  }

  stepBackward() {
    this.pause();
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.notifyStepChange();
      return true;
    }
    return false;
  }

  reset() {
    this.pause();
    if (this.steps.length > 0) {
      this.currentStepIndex = 0;
      this.notifyStepChange();
    }
  }

  goToStep(index) {
    this.pause();
    if (index >= 0 && index < this.steps.length) {
      this.currentStepIndex = index;
      this.notifyStepChange();
    }
  }

  setSpeed(multiplier) {
    this.speed = Math.max(0.2, Math.min(5.0, multiplier));
  }

  scheduleNextStep() {
    if (!this.isPlaying) return;

    const delay = Math.max(80, Math.round(this.baseDelay / this.speed));
    this.timerId = setTimeout(() => {
      if (!this.isPlaying) return;

      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
        this.notifyStepChange();
        this.scheduleNextStep();
      } else {
        this.pause();
        this.notifyComplete();
      }
    }, delay);
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  notifyStepChange() {
    const step = this.getCurrentStep();
    this.listeners.stepChange.forEach(fn => fn(step, this.currentStepIndex, this.steps.length));
  }

  notifyPlaybackChange() {
    this.listeners.playbackChange.forEach(fn => fn(this.isPlaying));
  }

  notifyComplete() {
    this.listeners.complete.forEach(fn => fn());
  }
}
