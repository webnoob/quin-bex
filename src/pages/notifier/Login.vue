<template>
  <q-page class="">
    <h5 class="full-width text-center">Login</h5>
    <q-form class="full-width flex justify-center q-pa-xl" @submit="login">
      <q-input v-model="emailAddress" label="Email Address" class="full-width" />
      <q-input v-model="password" label="Password" class="full-width" type="password" />

      <q-btn color="primary" class="full-width q-mt-xl" label="Login" type="submit" />
    </q-form>
  </q-page>
</template>

<script lang="ts" src="./Login.ts" />

<style lang="sass" src="./Login.sass" />
