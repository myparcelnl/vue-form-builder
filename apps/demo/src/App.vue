<template>
  <header class="bg-pink-400 dark:bg-pink-700 py-4">
    <div class="m-auto max-w-screen-xl w-full">
      <nav class="gap-4 grid-flow-col inline-grid">
        <NLink
          class="hover:text-pink-200 transition-colors"
          to="/">
          Home
        </NLink>
        <NLink
          class="hover:text-pink-200 transition-colors"
          to="/shipment-options">
          Shipment options
        </NLink>
        <NLink
          class="hover:text-pink-200 transition-colors"
          to="/addresses/new">
          Create address
        </NLink>
        <NLink
          class="hover:text-pink-200 transition-colors"
          to="/forms/no-prop">
          Form without element props
        </NLink>
        <NLink
          class="hover:text-pink-200 transition-colors"
          to="/forms/new-form">
          New form structure
        </NLink>
      </nav>
    </div>
  </header>

  <NContainer class="py-12">
    <RouterView />
  </NContainer>
</template>

<script lang="ts" setup>
import {RouterView} from 'vue-router';
import NLink from './components/NLink.vue';
import NContainer from './components/NContainer.vue';
</script>
