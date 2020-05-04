<template>
  <div>
    LIST!!!
    <q-list
      class="bookmarks"
      v-for="bookmark in bookmarks"
      :key="bookmark.url"
      dense
    >
      <q-item @click="redirectToBookmark(bookmark)" clickable dense>
        {{bookmark.label}}
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts" src="./BookmarksList.ts" />

<style lang="sass" src="./BookmarksList.sass" />
