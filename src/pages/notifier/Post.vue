<template>
  <q-page class="">
    <h5 class="full-width text-center">Create new notification</h5>
    <div class="full-width flex justify-center q-pa-xl">
      <q-input v-model="model.title" label="Title" class="full-width" />

      <q-input v-model="model.message" label="Message" type="textarea" class="full-width" rows="1" />

      <q-input v-model="model.link" label="Link" class="full-width" />

      <q-input v-model="date" class="full-width">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-field class="full-width" borderless>
        <q-toggle v-model="model.postNotification" label="Show popout notification in BEX"/>
      </q-field>

      <q-btn color="primary" class="full-width" label="Post Notification" @click="postNotification" />
    </div>
  </q-page>
</template>

<script lang="ts" src="./Post.ts" />

<style lang="sass" src="./Post.sass" />
