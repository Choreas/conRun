<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
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
    
    function toyindex(): void {
      root.$router.push("y-index")
    }
    
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 1200
    });

    return { todos, meta, toyindex, click};

  }
});
</script>
