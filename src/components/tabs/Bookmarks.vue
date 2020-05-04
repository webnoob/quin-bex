<template>
  <div>
    <q-list
      class="bookmarks"
      v-for="bookmark in bookmarks"
      :key="bookmark.url"
      dense
    >
      <q-item @click="redirectToBookmark(bookmark)" clickable dense>
        > {{bookmark.url.replace('https://quasar.dev/', '')}}
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts" src="./Bookmarks.ts" />

<style lang="sass" src="./Bookmarks.sass" />
