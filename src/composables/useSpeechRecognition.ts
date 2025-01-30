import { ref } from 'vue';

export function useSpeechRecognition() {
  const isListening = ref(false);
  const transcript = ref('');
  const recognition = new (window as any).SpeechRecognition || new (window as any).webkitSpeechRecognition();

  recognition.lang = 'en-US';
  recognition.interimResults = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    transcript.value = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join('');
  };  

  recognition.onend = () => {
    isListening.value = false;
  };

  const startListening = () => {
    isListening.value = true;
    recognition.start();
  };

  const stopListening = () => {
    isListening.value = false;
    recognition.stop();
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
}
