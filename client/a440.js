export default class A440 {
  #buttonManager;

  constructor(buttonManager) {
    this.#buttonManager = buttonManager;
    this.#setup();
  }

  toggle() {
    this.isPlaying ?
      this.#pause() :
      this.#play();
  }

  forceStop() {
    this.#forceStop();
  }

  #setup() {
    this.isPlaying = false;
    this.context = null;

    document.addEventListener(
      'visibilitychange',
      this.#handleVisibilityChange.bind(this)
    );
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

    this.isPlaying = false;
    this.#setButtonStyle();
  }

  #pause() {
    this.oscillator.stop();
    this.oscillator.disconnect(this.context.destination);
    this.isPlaying = false;
    this.#setButtonStyle();
  }

  #setButtonStyle() {
    this.#buttonManager.setButtonStyle({ isPlaying: this.isPlaying });
  }

  #play() {
    this.oscillator = this.#createOscillator();
    this.oscillator.start();
    this.isPlaying = true;
    this.#setButtonStyle();
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
