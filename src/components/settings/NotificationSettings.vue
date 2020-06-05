<template>
  <q-list class="full-width bg-grey-4">
    <q-item>
      <q-item-label class="row justify-center items-center">
        Notification Settings
      </q-item-label>
    </q-item>

    <q-item class="setting bg-white row items-center">
      <q-item-section>
        <q-item-label>
          <div class="row justify-between items-center">
            Quasar Announcements Enabled?
            <q-toggle v-model="quasarNotificationsEnabled" />
          </div>
        </q-item-label>
        <q-item-label caption>Enabling this will show desktop notifications when important Quasar announcements are made.</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" src="./NotificationSettings.ts" />

<style lang="sass" src="./NotificationSettings.sass" />
