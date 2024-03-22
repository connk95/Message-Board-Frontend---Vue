<template>
  <h1>First Page</h1>
  <h3>Single: {{ count }}</h3>
  <h3>Double: {{ doubleCount }}</h3>
  <button @click="increaseSingleCount">Single</button>
  <button @click="increaseDoubleCount">Double</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getState, setState, subscribe } from '../store'
const count = ref<number>(getState().count)
const doubleCount = ref<number>(getState().doubleCount)
function increaseSingleCount() {
  setState({ count: getState().count + 1 })
}

function increaseDoubleCount() {
  setState({ doubleCount: getState().doubleCount + 2 })
}

subscribe(() => {
  count.value = getState().count
  doubleCount.value = getState().doubleCount
})
</script>
