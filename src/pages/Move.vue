<template>
  <q-page class="row items-center justify-evenly">
    <div class="buttons">
      <q-btn class="runbtn" rounded icon="directions_run" size="50px" @click="runbtn"/>
      <q-btn class="walkbtn" rounded icon="directions_walk" size="50px" @click="walkbtn"/>
      <q-btn class="bikebtn" rounded icon="directions_bike" size="50px" @click="bikebtn"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { METHODS } from 'http';

export default defineComponent({
  name: 'Move',
  components: { ExampleComponent },

  setup(props, {root}) {
  
    return {};

  }
});
</script>

<style>

  .runbtn{
    background-color: #E898A8;
    color: #E4032E;
    height: 160px;
    width: 350px;
    display: block;
  }

   .walkbtn{
    background-color: #8DB5DE;
    color: #004F9F;
    height: 160px;
    width: 350px;
    display: block;
    margin-top: 30px;
    margin-bottom: 30px;
  }

.bikebtn{
    background-color: #85D1A2;
    color: #00983A;
    height: 160px;
    width: 350px;
    display: block;
  }

</style>
