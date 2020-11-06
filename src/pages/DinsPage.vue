<template>
  <q-page class="row items-center justify-evenly">
  <q-btn round icon="settings" size=17px @click="settings"/>
  <q-btn rounded color=primary label="alert info" size=17px  @click="alert = true"/>
  <q-input rounded outlined type="number" label="No. of Steps:"/>
  <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Read this alert message! This is crucial. LOL
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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

  data () {
    return {
      text: ''
    }
  },
  setup(props, {root}) {    

    return {alert};

  }
});

</script>

