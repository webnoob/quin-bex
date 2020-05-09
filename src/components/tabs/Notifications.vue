<template>
  <div class="row items-center justify-around" style="height: 486px; width: 100%;">
    <div v-if="true" class="full-width text-center">
      <q-icon name="notifications" style="font-size: 36px" class="full-width" />
      <span class="font-size-16">No New Notifications!</span>
    </div>

    <q-scroll-area
      v-else
      class="flex flex-center"
      style="height: 486px; width: 100%;"
    >
      <h5 class="text-center">Latest Quasar News Coming Soon!</h5>
    </q-scroll-area>
  </div>
</template>

<script lang="ts" src="./Notifications.ts" />

<style lang="sass" src="./Notifications.sass" />
