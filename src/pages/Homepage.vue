<template>
  <q-page class="row items-center justify-evenly">
    <q-btn rounded  color=primary label="next page" v-on:click="click"/>
    <q-btn rounded color=primary label="To y-index" @click="toyindex"/> 
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { METHODS } from 'http';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },

  setup(props, {root}) {

    function click(): void {
      root.$router.push('DinsPage')
    }
      

    return {};

  }
});
</script>
