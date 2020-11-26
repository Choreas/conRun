<template>
  <div>
    <div class="q-pa-md" style="max-width: 35%">
      <q-select
        color="blue"
        bg-color="gray"
        filled
        v-model="model"
        :options="options"
      />
    </div>

    <div class="statIcons">
      <q-icon name="fas fa-flag-checkered" size="25px" color="grey" /><br />
      <q-icon name="directions_run" size="25px" color="red" /><br />
      <q-icon name="directions_walk" size="25px" color="blue" /><br />
      <q-icon name="directions_bike" size="25px" color="green" />
    </div>

    <q-chart
      identifier="myChart"
      style="height: 30vh; width: 100%; margin: 10% 0% 0% 0%"
      type="bar"
      :datasets="datasets"
      :labels="labels"
      :options="options"
    />

    <div class="naviDate">
      <q-btn
        class="return"
        flat
        round
        color="primary"
        icon="fas fa-caret-left"
        size="35px"
      />
        <input type="week" name="week" id="camp-week" min="2020-W01" max="2020-W53" required/>
      <q-btn
        class="next"
        flat
        round
        color="primary"
        icon="fas fa-caret-right"
        size="35px"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import QChart from 'quasar-components-chart';
import { ITrackResult } from 'src/helpers/track';
import moment from 'moment';
import { ActivityType } from 'src/helpers/interfaces';
import ActivityVue from './Activity.vue';

interface ITrackingRecord {
  startTimestamp: number;
  endTimestamp: number;
  activity: ActivityType;
  distance: number;
}

interface IDataSet {
  label: ActivityType;
  data: number[];
  backgroundColor: string;
  barPercentage: 0.5;
  barThickness: 6;
  maxBarThickness: 8;
  minBarLength: 2;
}

export default defineComponent({
  name: 'Statistics',
  components: { QChart },
  setup() {
    const testData: ITrackingRecord[] = [];
    testData.push({
      startTimestamp: moment().valueOf(),
      endTimestamp: moment().valueOf(),
      distance: 30,
      activity: 'walk',
    });
    const labels = ['23', '24', '25', '26', '27', '28', '29'];

    function generateDatasets(
      allTrackingRecord: ITrackingRecord[],
      startDay: number
    ): IDataSet[] {
      const allDataSets: IDataSet[] = [];
      const walkDataSet: IDataSet = {
        label: 'walk',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#004F9F',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      };
      const runDataSet: IDataSet = {
        label: 'run',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#E4032E',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      };
      const bikeDataSet: IDataSet = {
        label: 'cycle',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#00983A',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      };

      for (let trackingRecord of allTrackingRecord) {
        if (
          trackingRecord.activity == 'walk' &&
          moment(trackingRecord.startTimestamp).days() >= startDay &&
          moment(trackingRecord.startTimestamp).days() < startDay + 7
        ) {
          let i = moment(trackingRecord.startTimestamp).days() - startDay;
          walkDataSet.data[i] += trackingRecord.distance;
        }

        if (
          trackingRecord.activity == 'run' &&
          moment(trackingRecord.startTimestamp).days() >= startDay &&
          moment(trackingRecord.startTimestamp).days() < startDay + 7
        ) {
          let i = moment(trackingRecord.startTimestamp).days() - startDay;
          runDataSet.data[i] += trackingRecord.distance;
        }

        if (
          trackingRecord.activity == 'cycle' &&
          moment(trackingRecord.startTimestamp).days() >= startDay &&
          moment(trackingRecord.startTimestamp).days() < startDay + 7
        ) {
          let i = moment(trackingRecord.startTimestamp).days() - startDay;
          bikeDataSet.data[i] += trackingRecord.distance;
        }
      }
      allDataSets.push(walkDataSet);
      allDataSets.push(runDataSet);
      allDataSets.push(bikeDataSet);
      return allDataSets;
    }

    const datasets = [
      {
        label: 'Run',
        data: [30, 45, 30, 40, 50, 20, 40],
        backgroundColor: '#E4032E',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      },

      {
        label: 'Walk',
        data: [55, 30, 40, 50, 30, 45, 35],
        backgroundColor: '#004F9F',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      },

      {
        label: 'Bike',
        data: [35, 50, 35, 55, 30, 35, 55],
        backgroundColor: '#00983A',
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
      },
    ];

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return {
      model: null,
      options: ['Tag', 'Woche', 'Monat'],
      datasets,
      labels,
    };
  },
});
</script>

<style>
.naviDate {
  text-align: center;
  margin-top: 20%;
}
.statIcons {
  margin-left: 5%;
}
</style>