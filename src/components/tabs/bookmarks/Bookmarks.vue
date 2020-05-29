<template>
  <q-list>
    <q-item
      v-for="bookmark in bookmarks"
      :key="bookmark.url"
      class="flex flex-center"
      align="left"
      dense
      clickable
    >
      <q-item-section @click="redirectToBookmark(bookmark)" class="cursor-pointer">
        {{ bookmark.label }}
      </q-item-section>

      <q-item-section side>
        <q-btn icon="delete" color="negative" @click="deleteBookmark(bookmark)" flat />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" src="./Bookmarks.ts" />

<style lang="sass" src="./Bookmarks.sass" />
