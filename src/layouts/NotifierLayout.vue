<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="font-size-18 flex justify-start items-center">
          <q-avatar>
            <q-img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" width="25px" />
          </q-avatar>
          <span class="on-right">QUiN - Notifier</span>
          <q-space />
          <q-btn
            v-if="$firebase.auth().currentUser !== null"
            label="Logout"
            color="white"
            class="text-black"
            @click="logout"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" src="./NotifierLayout.ts" />

<style lang="sass" src="./NotifierLayout.sass" />
