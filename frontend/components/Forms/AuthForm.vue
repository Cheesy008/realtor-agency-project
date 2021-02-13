<template>
  <v-card width="500" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">{{ title }}</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <slot></slot>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    }
  },
};
</script>

<style>
</style>