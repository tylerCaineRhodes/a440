const button = document.querySelector('button');
const styles = getComputedStyle(document.querySelector(':root'));
const buttonPausedStyle = styles.getPropertyValue('--button-paused');
const buttonPlayingStyle = styles.getPropertyValue('--button-playing');

class A440 {
  constructor() {
    this.isPlaying = false;
    this.context = null;

    document.addEventListener('visibilitychange', () =>
      this.#handleVisibilityChange()
    );
  }
  forceStop() {
    this.#forceStop();
  }
  #handleVisibilityChange() {
    if (document.visibilityState === 'hidden' && this.isPlaying) {
      this.#forceStop();
    }
  }
  #forceStop() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }

    if (this.context) {
      this.context.close();
      this.context = null;
    }

    button.style.backgroundColor = buttonPausedStyle;
    this.isPlaying = false;
  }
  toggle() {
    this.isPlaying ? this.#pause() : this.#play();
  }
  #pause() {
    this.oscillator.stop();
    button.style.backgroundColor = buttonPausedStyle;
    this.oscillator.disconnect(this.context.destination);
    this.isPlaying = false;
  }
  #play() {
    this.oscillator = this.#createOscillator();
    this.oscillator.start();
    button.style.backgroundColor = buttonPlayingStyle;
    this.isPlaying = true;
  }
  #createOscillator() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    const { context } = this;
    const osc = context.createOscillator();
    osc.frequency.value = 440;
    osc.connect(context.destination);
    return osc;
  }
}

const a440 = new A440();
button.addEventListener('click', () => a440.toggle());
window.addEventListener('blur', () => {
  if (this.isPlaying) {
    a440.forceStop();
  }
});
