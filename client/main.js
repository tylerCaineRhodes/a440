const button = document.querySelector('button');
const styles = getComputedStyle(document.querySelector(':root'));
const buttonPausedStyle = styles.getPropertyValue('--button-paused');
const buttonPlayingStyle = styles.getPropertyValue('--button-playing');

class A440 {
  constructor() {
    this.isPlaying = false;
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    document.addEventListener('visibilitychange', () =>
      this.handleVisibilityChange()
    );
  }

  handleVisibilityChange() {
    if (document.visibilityState === 'visible' && this.isPlaying) {
      this.context.resume().then(() => {
        if (this.isPlaying) {
          this.#recreateOscillator();
        }
      });
    }
  }

  #recreateOscillator() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect(this.context.destination);
    }

    this.oscillator = this.#createOscillator();
    this.oscillator.start();

    button.style.backgroundColor = buttonPlayingStyle;
  }

  #createOscillator() {
    const { context } = this;
    const osc = context.createOscillator();
    osc.frequency.value = 440;
    osc.connect(context.destination);
    return osc;
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
    this.context
      .resume()
      .then(() => {
        this.oscillator = this.#createOscillator();
        this.oscillator.start();
        button.style.backgroundColor = buttonPlayingStyle;
        this.isPlaying = true;
      })
      .catch((err) => {
        console.error('Failed to resume AudioContext:', err);
        button.style.backgroundColor = buttonPausedStyle;
      });
  }
}
const a440 = new A440();
button.addEventListener('click', () => a440.toggle());
