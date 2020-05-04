<template>
  <q-list class="full-width bg-grey-4" dense>
    <q-item>
      <q-item-label class="row justify-center items-center">
        Useful Links
      </q-item-label>
    </q-item>

    <q-item class="bg-white q-link" clickable @click="goTo('https://chat.quasar.dev')">
      <q-item-section class="text-primary" avatar="avatar">
        <q-icon :name="mdiChat"></q-icon>
      </q-item-section>
      <q-item-section>Discord Chat</q-item-section>
    </q-item>
    <q-item class="bg-white q-link" clickable @click="goTo('https://forum.quasar.dev/')">
      <q-item-section class="text-secondary" avatar="avatar">
        <q-icon :name="mdiForum"></q-icon>
      </q-item-section>
      <q-item-section>Forum</q-item-section>
    </q-item>
    <q-item class="bg-white q-link" clickable @click="goTo('https://github.com/quasarframework')">
      <q-item-section avatar="avatar">
        <q-icon :name="fabGithub"></q-icon>
      </q-item-section>
      <q-item-section>Github Repositories</q-item-section>
    </q-item>

    <q-item>
      <q-item-label class="row justify-center items-center">
        Social
      </q-item-label>
    </q-item>
    <q-item class="bg-white q-link" clickable @click="goTo('https://blog.quasar.dev')">
      <q-item-section class="text-primary" avatar="avatar">
        <q-icon :name="mdiBlogger"></q-icon>
      </q-item-section>
      <q-item-section>Blog</q-item-section>
    </q-item>
    <q-item class="bg-white q-link" clickable @click="goTo('https://forum.quasar.dev/category/1/announcements')">
      <q-item-section class="text-purple" avatar="avatar">
        <q-icon :name="mdiBullhorn"></q-icon>
      </q-item-section>
      <q-item-section>Announcements</q-item-section>
    </q-item>
    <q-item class="bg-white q-link" clickable @click="goTo('https://twitter.quasar.dev')">
      <q-item-section class="text-blue" avatar="avatar">
        <q-icon :name="fabTwitter"></q-icon>
      </q-item-section>
      <q-item-section>Twitter</q-item-section>
    </q-item>
    <q-item class="bg-white q-link" clickable @click="goTo('https://facebook.quasar.dev')">
      <q-item-section class="text-primary" avatar="avatar">
        <q-icon :name="fabFacebook"></q-icon>
      </q-item-section>
      <q-item-section>
        <div class="row no-wrap items-center"><span>Facebook</span></div>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-label class="row justify-center items-center">
        Donate
      </q-item-label>
    </q-item>
    <q-item class="bg-white q-link" clickable @click="goTo('https://donate.quasar.dev')">
      <q-item-section avatar="avatar">
        <q-icon :name="mdiCharity"></q-icon>
      </q-item-section>
      <q-item-section>Github Sponsorship</q-item-section>
    </q-item>

    <q-item class="fixed-bottom q-link" clickable @click="goTo('https://github.com/webnoob')">
      <div class="full-width flex flex-center">
        <q-item-label class="flex justify-center items-center text-center">
          Written and maintained by Allan Gaunt
        </q-item-label>
      </div>
    </q-item>
  </q-list>
</template>

<script lang="ts" src="./QuasarLinks.ts" />

<style lang="sass" src="./QuasarLinks.sass" />
