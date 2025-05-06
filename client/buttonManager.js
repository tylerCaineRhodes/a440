class ButtonManager {
  constructor() {
    this.styles = getComputedStyle(document.querySelector(':root'));
    this.buttonPausedStyle = this.styles.getPropertyValue('--button-paused');
    this.buttonPlayingStyle = this.styles.getPropertyValue('--button-playing');
  }

  setButtonStyle({ isPlaying }) {
    this.button.style.backgroundColor = isPlaying
      ? this.buttonPlayingStyle
      : this.buttonPausedStyle;
  }

  get button() {
    return document.querySelector('button');
  }
}

export default ButtonManager;
