<template>
    <q-card class="dialog" style="min-width: 50%">
        <q-toolbar >
            <q-toolbar-title class="dialog-title">App-Info</q-toolbar-title>
        </q-toolbar>
        <q-card-section>
            <div v-for="info in versionInfo" v-bind:key="info.name" class="row">
                <div class="col info-name">
                    {{info.name}}
                </div>
                <div class="col info-detail">
                    {{info.detail}}
                </div>
                <br>
                <br>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import * as version from 'src/resources/manufacturerDetail.json'

export default defineComponent( {
name:           'AppInfo',
components:     {},
setup() {
    const versionInfo = computed( () => {
        const infoArray: {name: string, detail: string}[] = [];
        infoArray.push({name: 'App-Bezeichnung', detail: version.productName});
        infoArray.push({name: 'Version', detail: version.versionNumber});
        infoArray.push({name: 'Versionsname', detail: version.versionName});
        infoArray.push({name: 'Hersteller', detail: version.manufacturerName});
        return infoArray;
    } );
    return {
        versionInfo,
    };
}
});
</script>

<style>
    .dialog-title {
        color: #264897;
        text-align: center;
        font-weight: bold;
    }
    .info-name {
        text-align: left;
        font-size: 20px;
        color: #264897;
    }
    .info-detail {
        text-align: left;
        font-size: 20px;
        font-weight: bold;
        color: black;
    }
</style>