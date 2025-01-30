import { ref } from 'vue';

export function useSpeechRecognition() {
  const isListening = ref(false);
  const transcript = ref('');

  // Ensure compatibility with different browsers
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error('SpeechRecognition is not supported in this browser.');
    return {
      isListening,
      transcript,
      startListening: () => console.warn('Speech recognition not supported'),
      stopListening: () => console.warn('Speech recognition not supported'),
    };
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'hu-HU';
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
