<template>
  <div class="fullscreen">
    <q-bar class="h-title-bar">
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="h-bar-btn"/>
      <q-toolbar-title>{{ $t('app_name') }}</q-toolbar-title>
      <q-btn flat round dense icon="settings" class="h-bar-btn">
        <q-menu  square anchor="bottom left" self="top right" :offset="[0,10]">
          <setting-panel
              :width="'300px'"/>
        </q-menu>
      </q-btn>
    </q-bar>
    <div class="fit row">
      <vertical-bar v-show="drawer" :height="verticalBarHeight()"
                    :top="mainBarItems.top"
                    :bottom="mainBarItems.bottom"/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import SettingPanel from '@/components/panel/settings-panel.vue';
import {useQuasar} from 'quasar'
import {useStoreSetting} from "@/store/setting";
import VerticalBar from "@/components/widget/vertical-bar.vue";
//@ts-ignore
import scssVars from "./assets/styles/vars.module.scss";
import router from '@/router';

export default {
  components: {VerticalBar, SettingPanel},
  data() {
    return {
      drawer: true,
      mainBarItems: {
        top: [
          {
            tip:'Tabs Panels',
            icon: 'settings',
            onClick: (item: Object) => {
              router.replace('/tabs')
            }
          },
          {
            tip:'Input Panel',
            icon: 'person',
            onClick: (item: Object) => {
              router.replace('/input')
            }
          },
          {
            tip:'Table Panel',
            icon: 'person',
            onClick: (item: Object) => {
              router.replace('/table')
            }
          },
          {
            tip:'List Panel',
            icon: 'person',
            onClick: (item: Object) => {
              router.replace('/list')
            }
          },
          {
            tip:'Bar Panel',
            icon: 'person',
            onClick: (item: Object) => {
              router.replace('/bar')
            }
          },
          {
            tip:'Code Panel',
            icon: 'person',
            onClick: (item: Object) => {
              router.replace('/code')
            }
          },
          {
            tip:'Toggle Panel',
            icon: 'person',
            onClick: (item: Object) => {
              router.replace('/toggle')
            }
          }
        ],
        bottom: [
          {
            icon: 'settings',
            onClick: (item: Object) => {
              console.log('click', item)
            }
          },
        ]
      }
    }
  },
  methods: {
    verticalBarHeight() {
      return 'calc(100% - ' + scssVars.titleBarHeight + ')'
    },
    jumpTo(path: string){
      router.replace(path)
    }
  },
  setup() {
    const scoreSetting = useStoreSetting()
    const $q = useQuasar()
    $q.dark.set(scoreSetting.dark)
  }
}
</script>

<style scoped>

</style>