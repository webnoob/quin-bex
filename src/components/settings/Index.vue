<template>
  <q-list class="full-width bg-grey-4">
    <q-item>
      <q-item-label class="row justify-center items-center">
        QUiN Settings
      </q-item-label>
    </q-item>

    <q-item class="setting bg-white row items-center" clickable @click="openSetting('search')">
      Search
      <q-space />
      <q-icon name="keyboard_arrow_right"></q-icon>
    </q-item>

    <q-item class="setting bg-white row items-center q-mb-xs" clickable @click="openSetting('notifications')">
      Notifications
      <q-space />
      <q-icon name="keyboard_arrow_right"></q-icon>
    </q-item>

    <q-item class="setting bg-white row items-center q-mb-xs" clickable @click="openSetting('bookmarks')">
      Bookmarks
      <q-space />
      <q-icon name="keyboard_arrow_right"></q-icon>
    </q-item>
  </q-list>
</template>

<script lang="ts" src="./Index.ts" />

<style lang="sass" src="./Index.sass" />
