<script setup lang="ts">
import { useSpeechRecognition } from './composables/useSpeechRecognition';

const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <h1 class="text-2xl font-bold mb-4">🎙 Voice Recognition App</h1>

    <button
      @click="isListening ? stopListening() : startListening()"
      class="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200"
      :class="isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'"
    >
      {{ isListening ? 'Stop Listening' : 'Start Listening' }}
    </button>

    <p class="mt-6 bg-gray-800 p-4 rounded-lg w-full max-w-lg text-center text-lg">
      {{ transcript || "Your speech will appear here..." }}
    </p>
  </div>
</template>
