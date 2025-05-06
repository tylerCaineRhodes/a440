import ButtonManager from './buttonManager.js';
import A440 from './a440.js';

const buttonManager = new ButtonManager();
const a440 = new A440(buttonManager);

buttonManager.button.addEventListener('click', () => a440.toggle());
window.addEventListener('blur', () => {
  if (a440.isPlaying) {
    a440.forceStop();
  }
});
