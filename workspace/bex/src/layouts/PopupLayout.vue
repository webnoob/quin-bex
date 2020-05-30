<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          icon="settings"
          aria-label="Menu"
          @click="leftDrawerState = !leftDrawerState"
          class="font-size-12"
          flat
          dense
          round
        />

        <q-toolbar-title align="center" class="font-size-18">
          <q-avatar>
            <q-img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" width="25px" />
          </q-avatar>
          QUiN
        </q-toolbar-title>

        <q-btn
          icon="link"
          aria-label="Menu"
          @click="rightDrawerState = !rightDrawerState"
          class="font-size-12"
          dense
          flat
          round
        />
      </q-toolbar>

      <q-toolbar>
        <q-input
          v-model="search"
          class="search full-width doc-algolia"
          bg-color="white"
          ref="docAlgolia"
          @input="doOnSearchInput"
          @focus="$event.target.select()"
          borderless
          dense
        >
          <template #append>
            <q-btn
              icon="search"
              aria-label="Menu"
              dense
              flat
              round
            />
          </template>
        </q-input>
      </q-toolbar>

      <q-toolbar class="tabs">
        <q-tabs class="full-width" align="justify" :value="selectedTab" @input="tabChanged" dense>
          <q-tab name="search" icon="search" />
          <q-tab name="notifications" icon="notifications" />
          <q-tab name="bookmarks" icon="bookmark" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerState"
      content-class="bg-grey-1"
      behavior="mobile"
      show-if-above
      bordered
      no-swipe-close
    >
      <drawer-layout v-model="leftDrawerState">
        <settings v-model="settingsSelection" @input="settingDrawerState = !settingDrawerState" />
      </drawer-layout>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerState"
      side="right"
      show-if-above
      no-swipe-close
    >
      <drawer-layout v-model="rightDrawerState">
        <quasar-links />
      </drawer-layout>
    </q-drawer>

    <q-drawer
      v-model="settingDrawerState"
      side="right"
      show-if-above
      no-swipe-close
    >
      <drawer-layout v-model="settingDrawerState" @input="leftDrawerState = !leftDrawerState" icon="arrow_back">
        <component :is="settingsComponent" />
      </drawer-layout>
    </q-drawer>

    <q-page-container class="popup_container">
      <q-tab-panels v-model="selectedTab">
        <q-tab-panel name="search" class="q-pa-none"><search-results :data="searchResults" /></q-tab-panel>
        <q-tab-panel name="notifications" class="q-pa-none">
          <q-scroll-area
            class="flex flex-center"
            style="height: 486px; width: 100%;"
          >
            <notifications />
          </q-scroll-area>
        </q-tab-panel>
        <q-tab-panel name="bookmarks" class="q-pa-none">
          <q-scroll-area
            class="flex flex-center"
            style="height: 486px; width: 100%;"
          >
            <component :is="bookmarksComponent" :key="bookmarksComponent" />
          </q-scroll-area>
        </q-tab-panel>
      </q-tab-panels>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" src="./PopupLayout.ts" />

<style lang="sass" src="./PopupLayout.sass" />
