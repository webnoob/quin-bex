<template>
  <q-list>
    <q-expansion-item
      v-for="bookmark in groupedBookmarks"
      :key="bookmark.label"
      :label="bookmark.label"
      expand-separator
      dense
    >
      <bookmarks-list-item :bookmarks="bookmark.children" />
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts" src="./BookmarksList.ts" />

<style lang="sass" src="./BookmarksList.sass" />
