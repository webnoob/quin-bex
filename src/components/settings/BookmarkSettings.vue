<template>
  <q-list class="full-width bg-grey-4">
    <q-item>
      <q-item-label class="row justify-center items-center">
        Search Settings
      </q-item-label>
    </q-item>

    <q-item class="setting bg-white row items-center">
      <q-item-section>
        <q-item-label>
          <div class="row justify-between items-center">
            Open bookmarks in new tab?
            <q-toggle v-model="openBookmarksInNewTab" />
          </div>
        </q-item-label>
        <q-item-label caption>If not set, QUiN will look for an existing quasar.dev tab to open bookmarks in.</q-item-label>
      </q-item-section>
    </q-item>

    <q-item class="setting bg-white row items-center">
      <q-item-section>
        <q-item-label>
          <div class="row justify-between items-center">
            Group bookmarks in list?
            <q-toggle v-model="groupByList" />
          </div>
        </q-item-label>
        <q-item-label caption>Grouped by Quasar section / component</q-item-label>
      </q-item-section>
    </q-item>

    <q-item class="setting bg-white row items-center">
      <q-item-section>
        <q-item-label>
          <div class="row justify-between items-center">
            Group bookmarks in tree?
            <q-toggle v-model="groupByTree" />
          </div>
        </q-item-label>
        <q-item-label caption>Grouped by Quasar section / component</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" src="./BookmarkSettings.ts" />

<style lang="sass" src="./BookmarkSettings.sass" />
