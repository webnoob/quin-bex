<template>
  <div class="row items-center justify-around" style="height: 486px; width: 100%;">
    <div v-if="bookmarks.length === 0" class="full-width text-center">
      <q-icon name="bookmark" style="font-size: 36px" class="full-width" />
      <span class="font-size-16">No Bookmarks</span>
    </div>
    <q-list v-else>
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
  </div>
</template>

<script lang="ts" src="./Bookmarks.ts" />

<style lang="sass" src="./Bookmarks.sass" />
