const button = document.querySelector('button');
const styles = getComputedStyle(document.querySelector(':root'));
const buttonPausedStyle = styles.getPropertyValue('--button-paused');
const buttonPlayingStyle = styles.getPropertyValue('--button-playing');

class A440 {
  constructor() {
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
    this.context ||=
      new window.AudioContext() || new window.webkitAudioContext();

    const { context } = this;
    const osc = context.createOscillator();
    osc.frequency.value = 440;
    osc.connect(context.destination);
    return osc;
  }
}
const a440 = new A440();
button.addEventListener('click', () => a440.toggle());
