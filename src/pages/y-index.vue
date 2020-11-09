<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title=""
      active  
    ></example-component>

<div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="settings" color="primary" size="56px" />
        <div class="q-mt-md text-center">
          {{ Motivtext }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="directions_run" color="primary" size="56px" />
        <div class="q-mt-md text-center">
          {{ Motivtext }}
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <q-btn-toggle
        glossy
        v-model="slide"
        :options="[
          { label: 1, value: 'style' },
          { label: 2, value: 'tv' },
        ]"
      />
    </div>
  </div>

  </q-page>
</template>

<script lang="ts">
/* yun test */
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';
import Router from 'src/router/index.ts';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  props: {},

  data () {
    return {
      slide: 'style',
      Motivtext: 'Social distancing, self-quarantining, and the closure of many gyms have made it harder to exercise. This App will help you stay active and motivated!'
    }
  },

  setup(props, {root}) {
   
    return { };
  }
});
</script>
