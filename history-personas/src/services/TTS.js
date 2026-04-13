export default class TTSService {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }
        this.loadVoices();
    }

    loadVoices() {
        this.voices = this.synth.getVoices();
    }

    speak(text, lang = 'en-US') {
        if (this.synth.speaking) {
            this.synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
  
        const voice = this.voices.find(v => v.lang.includes(lang));
        if (voice) {
            utterance.voice = voice;
        }

        utterance.rate = 0.9; 
        utterance.pitch = 0.8;

        this.synth.speak(utterance);
    }

    stop() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
    }
}
export const ttsService = new TTSService();