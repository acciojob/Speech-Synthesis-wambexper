// Your script here.
  const voiceSelect = document.getElementById('voiceSelect');
        const rate = document.getElementById('rate');
        const rateValue = document.getElementById('rateValue');
        const pitch = document.getElementById('pitch');
        const pitchValue = document.getElementById('pitchValue');
        const textToSpeak = document.getElementById('textToSpeak');
        const startButton = document.getElementById('startButton');
        const stopButton = document.getElementById('stopButton');

        let synth = window.speechSynthesis;
        let voices = [];

        function populateVoiceList() {
            voices = synth.getVoices();
            voiceSelect.innerHTML = '';
            voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.textContent = voice.name + ' (' + voice.lang + ')';
                option.setAttribute('data-lang', voice.lang);
                option.setAttribute('data-name', voice.name);
                voiceSelect.appendChild(option);
            });
        }

        populateVoiceList();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = populateVoiceList;
        }

        startButton.addEventListener('click', () => {
            if (synth.speaking) {
                synth.cancel();
            }

            if (textToSpeak.value !== '') {
                const utterThis = new SpeechSynthesisUtterance(textToSpeak.value);
                const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
                const voice = voices.find((v) => v.name === selectedVoice);
                utterThis.voice = voice;
                utterThis.pitch = pitch.value;
                utterThis.rate = rate.value;
                synth.speak(utterThis);
            }
        });

        stopButton.addEventListener('click', () => {
            if (synth.speaking) {
                synth.cancel();
            }
        });

        rate.addEventListener('input', () => {
            rateValue.textContent = rate.value;
        });

        pitch.addEventListener('input', () => {
            pitchValue.textContent = pitch.value;
        });

