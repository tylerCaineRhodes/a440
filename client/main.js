const context = new window.AudioContext() || new window.webkitAudioContext();

class A440 {
  constructor() {
    this.isPlaying = false;
  }
  toggle() {
    this.isPlaying ? this.#pause() : this.#play();
  }
  #pause() {
    this.oscillator.stop();
    this.oscillator.disconnect(context.destination);
    this.isPlaying = false;
  }
  #play() {
    this.oscillator = this.#createOscillator();
    this.oscillator.start();
    this.isPlaying = true;
  }
  #createOscillator() {
    const osc = context.createOscillator();
    osc.frequency.value = 440;
    osc.connect(context.destination);
    return osc;
  }
}

const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};
const listenEvent = isTouchDevice() ? 'touchstart' : 'click';
const a440 = new A440();
document.addEventListener(listenEvent, () =>
  a440.toggle()
);
