<template>
  <div v-text="chosenDate" style="margin-bottom: 40px;" />
  
  <div>
    <UiCalendar :date="chosenDate" :locale="chosenLang" @date-chosen="chosenDate = $event"/>
  </div>

  <div style="margin-top: 40px; display: flex; gap: 30px;">
    <div @click="chosenLang = 'ru'">ru</div>
    <div @click="chosenLang = 'eng'">eng</div>
  </div>

  <div style="margin-top: 40px; display: flex; gap: 30px;">
    <div @click="chosenDate = '2025-9-2'">2025-9-2</div>
    <div @click="chosenDate = '2026-4-6'">2026-4-6</div>
  </div>
</template>

<script setup lang="ts">
import { UiCalendar } from "@/components/ui"
import { ref } from "vue";

const chosenLang = ref<string>('ru')
const chosenDate = ref<string>('2026-02-15')

</script>

<style scoped></style>
