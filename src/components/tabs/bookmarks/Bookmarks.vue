<template>
  <div>
    <q-btn
      v-for="bookmark in bookmarks"
      :key="bookmark.url"
      @click="redirectToBookmark(bookmark)"
      icon="share"
      class="font-size-12 flex justify-start q-pa-xs full-width bookmark-btn"
      align="left"
      flat
      dense
      no-caps
    >
      {{ bookmark.label }}
    </q-btn>
  </div>
</template>

<script lang="ts" src="./Bookmarks.ts" />

<style lang="sass" src="./Bookmarks.sass" />
