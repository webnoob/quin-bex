<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar
        bg-color="primary"
      >
        <q-btn
          icon="close"
          aria-label="Menu"
          @click="close"
          class="font-size-12"
          flat
          dense
          round
        />
        <q-space />
        <q-toolbar-title class="font-size-12">QUiN v0.0.1-alpha.1</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-4 flex flex-center">
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" src="./DrawerLayout.ts" />

<style lang="sass" src="./DrawerLayout.sass" />
