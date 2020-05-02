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
          icon="bookmark"
          aria-label="Menu"
          @click="leftDrawerState = !leftDrawerState"
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
          autofocus
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
        <q-tabs class="full-width" v-model="selectedTab" dense>
          <q-tab name="notifications" no-caps>Notifications</q-tab>
          <q-tab name="bookmarks" no-caps>QBookmarks</q-tab>
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
      <q-layout view="lHh Lpr lFf">
        <q-header>
          <q-toolbar
            bg-color="primary"
          >
            <q-btn
              icon="close"
              aria-label="Menu"
              @click="leftDrawerState = !leftDrawerState"
              class="font-size-12"
              flat
              dense
              round
            />
            <q-space />
            <q-toolbar-title class="font-size-12">QUiN v0.0.1-alpha.1</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-page-container class="bg-grey-4 flex flex-center">
          <q-list class="full-width bg-grey-4">
            <q-item>
              <q-item-label class="row justify-center items-center">
                QUiN Settings
              </q-item-label>
            </q-item>

            <q-item class="setting bg-white row items-center" clickable @click="openSettings('search')">
              Search
              <q-space />
              <q-icon name="keyboard_arrow_right"></q-icon>
            </q-item>

            <q-item class="setting bg-white row items-center q-mb-xs" clickable @click="openSettings('notifications')">
              Notifications
              <q-space />
              <q-icon name="keyboard_arrow_right"></q-icon>
            </q-item>

            <q-item class="setting bg-white row items-center q-mb-xs" clickable @click="openSettings('bookmarks')">
              Bookmarks
              <q-space />
              <q-icon name="keyboard_arrow_right"></q-icon>
            </q-item>
          </q-list>
        </q-page-container>
      </q-layout>
    </q-drawer>

    <q-drawer
      v-model="settingDrawerState"
      side="right"
      show-if-above
      no-swipe-close
    >
      <q-layout view="lHh Lpr lFf">
        <q-header>
          <q-toolbar
            bg-color="primary"
          >
            <q-btn
              icon="close"
              aria-label="Menu"
              @click="leftDrawerState = !leftDrawerState"
              class="font-size-12"
              flat
              dense
              round
            />
            <q-space />
            <q-toolbar-title class="font-size-12">QUiN v0.0.1-alpha.1</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <component :is="settingsComponent" />
        </q-page-container>
      </q-layout>
    </q-drawer>

    <q-page-container class="popup_container">
      <q-tab-panels v-model="selectedTab">
        <q-tab-panel name="notifications"><notifications /></q-tab-panel>
        <q-tab-panel name="bookmarks">
          <q-list
            v-for="bookmark in bookmarks"
            :key="bookmark.url"
            dense
          >
            <q-item @click="redirectToBookmark(bookmark)" clickable dense>
              > {{bookmark.url.replace('https://quasar.dev/', '')}}
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" src="./PopupLayout.ts" />

<style lang="sass" src="./PopupLayout.sass" />
