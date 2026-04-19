export class SoundEngine {
  private ctx: AudioContext | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
       this.voices = window.speechSynthesis.getVoices();
       window.speechSynthesis.onvoiceschanged = () => {
         this.voices = window.speechSynthesis.getVoices();
       };
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  speak(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    const englishVoices = this.voices.filter(v => v.lang.startsWith('en'));
    // Attempt to find a deep UK or Male voice for that ominous feel
    const preferred = englishVoices.find(v => v.name.toLowerCase().includes('uk') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('great britain')) || englishVoices[0];
    
    if (preferred) {
        utterance.voice = preferred;
    }
    
    // Aesthetic creepy voice settings
    utterance.pitch = 0.3; 
    utterance.rate = 0.8; 
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  }
}

export const soundEngine = new SoundEngine();
