<template>
  <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
    <div class="row">
      <div class="column" :style="'height:'+height">
        <q-list class="list col">
          <q-item v-for="(item,index) in top" clickable v-ripple
                  @click="item.onClick(index)">
            <q-item-section avatar>
              <q-icon :name="item.icon" :color="!!item.active?'primary':''"/>
            </q-item-section>
            <q-tooltip v-if="!!item.tip&&side==='left'" :delay="1000" anchor="center right" self="center left">
              {{ $t(item.tip) }}
            </q-tooltip>
            <q-tooltip v-if="!!item.tip&&side==='right'" :delay="1000" anchor="center left" self="center right">
              {{ $t(item.tip) }}
            </q-tooltip>
          </q-item>
        </q-list>
        <q-list class="list column justify-end">
          <q-item v-for="(item,index) in bottom" clickable v-ripple
                  @click="item.onClick(index)">
            <q-item-section avatar>
              <q-icon :name="item.icon"/>
            </q-item-section>
            <q-tooltip v-if="!!item.tip&&side==='left'" :delay="1000" anchor="center right" self="center left">
              {{ $t(item.tip) }}
            </q-tooltip>
            <q-tooltip v-if="!!item.tip&&side==='right'" :delay="1000" anchor="center left" self="center right">
              {{ $t(item.tip) }}
            </q-tooltip>
          </q-item>
        </q-list>
      </div>
      <q-separator vertical/>
    </div>
  </transition>
</template>

<script>
export default {
  name: "vertical-bar",
  props: {
    height: {
      default: '1000px',
    },
    side: {
      default: 'left',
    },
    top: {
      type: Array,
      default: [
        {
          icon: 'inbox',
          onClick: (index) => {
            console.log('default item clicked', index)
          }
        }
      ]
    },
    bottom: {
      type: Array,
      default: [
        {
          icon: 'inbox',
          tip: 'help me',
          onClick: (index) => {
            console.log('default item clicked', index)
          }
        }
      ]
    }
  }
}

</script>

<style scoped lang="scss">

.list {
  width: 40px;
  padding: 8px 0;
}

.q-item {
  min-height: 36px;
  padding: 8px 8px;
  color: inherit;
  transition: color 0.3s, background-color 0.3s;
}


.q-item__section--avatar {
  color: inherit;
  min-width: 38px;
}


.q-item__section--side {
  color: #757575;
  align-items: center;
  padding-right: 0;
  width: auto;
  min-width: 0;
  max-width: 100%;
}
</style>