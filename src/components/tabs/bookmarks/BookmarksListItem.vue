<template>
  <q-list>
    <q-expansion-item
      v-for="bookmark in bookmarks"
      :key="bookmark.label"
      :label="bookmark.label"
      :header-inset-level="(bookmark.level - 1) / 8"
      :icon="bookmark.children.length === 0 ? 'share' : ''"
      :expand-icon="bookmark.children.length === 0 ? '0' : void 0"
      @click="bookmark.children.length === 0 ? redirectToBookmark(bookmark) : void 0"
      default-opened
      expand-separator
      dense
      dense-toggle
    >
      <bookmarks-list-item v-if="bookmark.children.length > 0" :bookmarks="bookmark.children" />
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts" src="./BookmarksListItem.ts" />

<style lang="sass" src="./BookmarksListItem.sass" />
