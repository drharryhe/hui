<template>
    <div class="q-pa-md row">
      <q-card class="q-ma-md col-5">
        <q-card-section>
          <div class="q-gutter-y-md column justify-start" style="max-width: 300px">
            <q-toggle v-model="dense" label="Dense QInput"/>

            <q-input outlined v-model="text" :dense="dense"/>

            <q-input outlined v-model="ph" placeholder="Placeholder" hint="With placeholder" :dense="dense"/>

            <q-input outlined square v-model="text" hint="With perfect square borders" :dense="dense"/>

            <q-input outlined v-model="text" :dense="dense">
              <template v-slot:prepend>
                <q-icon name="event" size="xs"/>
              </template>
            </q-input>

            <q-input outlined v-model="text" :dense="dense">
              <template v-slot:append>
                <q-avatar size="xs">
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
                </q-avatar>
              </template>
            </q-input>

            <q-input outlined bottom-slots v-model="text" counter :dense="dense">
              <template v-slot:prepend>
                <q-icon name="place" size="xs"/>
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="text = ''" class="cursor-pointer" size="xs"/>
              </template>

              <template v-slot:hint>
                Field hint
              </template>
            </q-input>

            <q-input outlined bottom-slots v-model="text" counter maxlength="12" :dense="dense">
              <template v-slot:before>
                <q-icon name="flight_takeoff" size="xs"/>
              </template>

              <template v-slot:append>
                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" size="xs"/>
                <q-icon name="search" size="xs"/>
              </template>

              <template v-slot:hint>
                Field hint
              </template>
            </q-input>

            <q-input outlined bottom-slots v-model="text" counter maxlength="12" :dense="dense">
              <template v-slot:before>
                <q-avatar size="xs">
                  <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                </q-avatar>
              </template>

              <template v-slot:append>
                <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" size="xs"/>
                <q-icon name="schedule" size="xs"/>
              </template>

              <template v-slot:hint>
                Field hint
              </template>

              <template v-slot:after>
                <q-btn round dense flat icon="send"/>
              </template>
            </q-input>

            <q-input outlined bottom-slots v-model="text" counter maxlength="12" :dense="dense">
              <template v-slot:before>
                <q-icon name="event" size="xs"/>
              </template>

              <template v-slot:hint>
                Field hint
              </template>

              <template v-slot:append>
                <q-btn round dense flat icon="add" size="xs"/>
              </template>
            </q-input>

            <q-input outlined v-model="text" hint="Disable" :dense="dense" disable/>

            <q-input outlined v-model="text" hint="Readonly" :dense="dense" readonly/>

            <q-input outlined v-model="text" hint="Disable and readonly" :dense="dense" disable readonly/>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="q-m-md col-5">
        <q-card-section>
          <q-checkbox left-label v-model="left" label="Label on Left"/>
          <q-checkbox v-model="right" label="Label on Right"/>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import {ref} from 'vue'

export default {
  name: "InputPanel",
  setup() {
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
      left: ref(true),
      right: ref(false),
      left2: ref(true),
      right2: ref(false)
    }
  }
}
</script>

<style scoped>

</style>