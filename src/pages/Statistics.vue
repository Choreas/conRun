<template>
  <div>
   <div class="q-pa-md" style="max-width: 35%">
      <q-select color="blue" bg-color="gray" filled v-model="model" :options="options"/>
    </div>

    <div class="statIcons">
      <q-icon name="fas fa-flag-checkered" size="25px" color="grey"/><br>
      <q-icon name="directions_run" size="25px" color="red"/><br>
      <q-icon name="directions_walk" size="25px" color="blue"/><br>
      <q-icon name="directions_bike" size="25px" color="green"/>
    </div>

    <div class="naviDate">
      <q-btn class="return" flat round color="primary" icon="fas fa-caret-left" size="35px"/>
      Week Date
      <q-btn class="next" flat round color="primary" icon="fas fa-caret-right" size="35px"/>
    </div>

    <q-chart 
      identifier="myChart"
      stilo="height:30vh; width: 100%"
      type="bar"
      :datasets="datasets"
      
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import QChart from 'quasar-components-chart';

export default defineComponent({
  name: 'Statistics',
  components: { QChart },
  setup() {
    const datasets = [{
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50, 60, 70]
    }]
    return {
      model: null,
      options: [
        'Tag', 'Woche', 'Monat'
      ],
      datasets
    }
  }
});
</script>

<style>
.naviDate{ 
  text-align: center;
  margin-top: 85%;
}
.statIcons{ 
  margin-left: 5%;
}
</style>