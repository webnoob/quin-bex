<template>
  <div class="row items-center justify-around" style="height: 486px; width: 100%;">
    <div v-if="data.length === 0" class="full-width text-center">
      <q-icon name="search" style="font-size: 36px" class="full-width" />
      <span class="font-size-16">Search Results</span>
    </div>

    <q-scroll-area
      class="flex flex-center"
      style="height: 486px; width: 100%;"
      v-else
    >
      <q-list class="rounded-borders">
        <q-expansion-item
          v-for="searchResult in data"
          :key="searchResult.id"
          :label="searchResult.groupName"
          header-class="bg-grey-5"
          expand-separator
          dense
          dense-toggle
          default-opened
        >
          <q-list
            class="search-result__items"
            dense
          >
            <q-item
              v-for="child in searchResult.children"
              :key="child.id"
              class="search-result__item flex items-center"
              @click="navigateTo(child.url)"
              clickable
              dense
            >
              <span
                v-for="item in child.items"
                :key="item.id"
                class="search-child-item font-size-12"
                :class="item.type"
                v-html="item.text"
              />
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script lang="ts" src="./SearchResults.ts" />

<style lang="sass" src="./SearchResults.sass" />
