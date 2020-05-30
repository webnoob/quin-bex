<template>
  <div class="row items-center justify-around" style="height: 486px; width: 100%;">
    <div v-if="!notifications || notifications.length === 0" class="full-width text-center">
      <q-icon name="notifications" style="font-size: 36px" class="full-width" />
      <span class="font-size-16">No New Notifications!</span>
    </div>

    <q-scroll-area
      v-else
      class="flex flex-center"
      style="height: 486px; width: 100%;"
    >
      <q-list>
        <q-item-label class="text-center">
          <h6 class="q-ma-none q-pa-xs">Latest Quasar News</h6>
        </q-item-label>

        <q-item
          v-for="notification in notifications"
          :key="notification.id"
        >
          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">{{notification.title}}</span>
            </q-item-label>

            <q-item-label caption lines="1">
              {{notification.date}}
            </q-item-label>

            <q-item-label caption>
              <span class="text-subtitle2">{{notification.message}}</span>
            </q-item-label>

            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary full-width text-right">
              <q-btn type="a" class="text-primary" @click="viewMore(notification)" flat>View More</q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script lang="ts" src="./Notifications.ts" />

<style lang="sass" src="./Notifications.sass" />
