
export default class SpeechRecognitionService {
    constructor() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.supported = !!SR;
        if (!this.supported) return;

        this.recognition = new SR();
        this.recognition.continuous    = false;  
        this.recognition.interimResults = true; 
        this.isListening = false;
    }

    start(lang = 'tr-TR', onInterim, onFinal, onEnd) {
        if (!this.supported || this.isListening) return;

        this.recognition.lang = lang;
        this.isListening = true;

        this.recognition.onresult = (e) => {
            let interim = '', final = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const t = e.results[i][0].transcript;
                e.results[i].isFinal ? (final += t) : (interim += t);
            }
            if (interim && onInterim) onInterim(interim);
            if (final   && onFinal)   onFinal(final);
        };

        this.recognition.onerror = (e) => {
            console.warn('SpeechRecognition error:', e.error);
            this.isListening = false;
            if (onEnd) onEnd();
        };

        this.recognition.onend = () => {
            this.isListening = false;
            if (onEnd) onEnd();
        };

        this.recognition.start();
    }

    stop() {
        if (!this.supported || !this.isListening) return;
        this.recognition.stop();
        this.isListening = false;
    }
}

export const speechService = new SpeechRecognitionService();
