const button = document.querySelector('button');
class A440 {
  constructor() {
    this.isPlaying = false;
  }
  toggle() {
    this.isPlaying ? this.#pause() : this.#play();
  }
  #pause() {
    this.oscillator.stop();
    button.style.backgroundColor = '#f0f0f0';
    this.oscillator.disconnect(this.context.destination);
    this.isPlaying = false;
  }
  #play() {
    this.oscillator = this.#createOscillator();
    this.oscillator.start();
    button.style.backgroundColor = '#d4d4d6';
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
