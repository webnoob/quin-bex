<template>
  <div>
    <q-tree
      :nodes="groupedBookmarks"
      node-key="label"
      default-expand-all
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <div v-if="prop.node.children.length > 0" class="text-weight-bold text-primary">
            {{ prop.node.label }}
          </div>
          <q-btn
            @click="redirectToBookmark(prop.node)"
            class="font-size-12 bookmark-btn"
            flat
            dense
            v-else
            no-caps
          >
            {{ prop.node.label }}
          </q-btn>
          <q-btn v-if="prop.node.children.length === 0" icon="delete" color="negative" @click="deleteBookmark(prop.node.bookmark)" flat />
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script lang="ts" src="./BookmarksTree.ts" />

<style lang="sass" src="./BookmarksTree.sass" />
