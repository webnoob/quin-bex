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
            New tab for each search result?
            <q-toggle v-model="searchInNewTab" />
          </div>
        </q-item-label>
        <q-item-label caption>If not set, QUiN will look for an existing quasar.dev tab to load search results.</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" src="./SearchSettings.ts" />

<style lang="sass" src="./SearchSettings.sass" />
