const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Set default text on init
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    // Optional: filter to just english voices if desired, but we'll show all here
    // .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// In some browsers, voices load asynchronously, so we must listen for the event
speechSynthesis.addEventListener('voiceschanged', populateVoices);

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); // Restart speech with new voice
}

function toggle(startOver = true) {
  speechSynthesis.cancel(); // Stop current speech
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  msg[this.name] = this.value;
  toggle();
}

voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
