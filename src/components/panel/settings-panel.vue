<template>
  <q-list class="justify-start list" bordered dense :style="'width:'+width">
    <q-item-label header class="text-weight-bold">{{ $t('settings.general') }}</q-item-label>
    <q-separator/>
    <q-item>
      <q-item-section>
        <q-item-label>
          {{ $t('settings.language') }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-select
            filled
            v-model="selectedLang"
            :options="languages"
            color="secondary"
            options-selected-class="text-secondary"
            class="options "
            dense
            options-dense
            @update:model-value=onLangChanged(val)>
          <template v-slot:selected>
            <div class="row items-center q-gutter-md">
              <q-icon :name="selectedLang.icon"/>
              <q-item-label>{{ selectedLang.label }}</q-item-label>
            </div>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label>
          {{ $t('settings.theme') }}
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-checkbox left-label
                    v-model="dark"
                    :label="strings().darkTheme"
                    @update:model-value="onThemeChanged()"/>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import {mapWritableState} from 'pinia';
import {useStoreSetting} from '@/store/setting';
import {useQuasar} from 'quasar'
import strings from '@/utils/strings';

export default {
  name: "setting-panel",
  props: {
    width: {
      required: true,
      default: '100%',
    }
  },
  data() {
    return {
      selectedLang: {
        label: '',
        value: '',
        icon: '',
      },
      languages: [
        {
          label: '中文',
          value: 'zh-CN',
          icon: 'img:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABlUlEQVRoge2XTUsCURSGHzUqkqD8iKBFX0jLiKgsCNu17GfUIqig6IcE0aI/0jLatGhh7YIshRaBFEKMZKG2OEUp6ozOOBfhPHC5hzvM5X3nnnvPHVAURVGUHibwG1TXqZoU0i6BK9EeNC3ELd4YWIt5Mk0n9LmeYWMMtmegUoXrVw8ktYezFRgISmtEzoKTB3gueijLOc5WYGFU+kZf+MmSZghnK7AcgaWI81mT0Q7ltI/9CoQCsBj5i8s2p20qDjuzknKXeQ8ktqZxHUhGYXNc4sEQzA1LfP8OH2WJL14ap9RkGKaGIFuU/dEt4T91oHkhmx+B3QRE+2vfLHzCaQZu3romzgn2hey2AIfp2pQpV+EgbVz8f1pv4umw5H2pIi0UkDE7VvzbxK0NrMYga8FRWlrWkrFWpOKwn5DeB5qfQkEgX4LzR/iqyNjxHWxNyLNKk/eyRTjLSO8DehsFfC1c9bg3kIrDnn85X497Az7nfD3ur9M5q6sV1w79IzONGjCNGjCNGjCNGjBNzxtQFEVRlJ7mG/fbYcXNXNp6AAAAAElFTkSuQmCC'
        },
        {
          label: 'English',
          value: 'en',
          icon: 'img:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABQUlEQVRoge3WsUrDUBTG8X80qC1CCLg5uHSwQzfBxaGLiKPiW/gCdezQ1UfwCRQndRAXBQmCiw7dhFIIFdGESMUIGqcEoyK03ptw4fym3OXmfpyccwNCCCGEKI8FkCSJ1dw8/lC9+VHUVr1lZvbsygKY0PaGguQCVCs2G+sLY68bdZdG3dV53h/s9GF6apLd9jKLNYenMMa7fhhpfdd7prOzBMB265K+P+R1/1TfyV0nHyB+e+fcG+Dfv3DTDUZeB2HMhTcAoO8P9R38G61NfLC3onrLzJzrWPClAqlqxWatOc/hSW+sddoDt92Ama1VbQFSuQCq+4BI+/nzAUzsA+N7QO6Bv+6BQgPo+P6LmELyM1e2rAKPYaS8Ajr9OoVMZHyAbAoVMTF0ML4CxgeQKVQ24wPIFCqb8QGEEEIIIf7hEycURuUfhn7yAAAAAElFTkSuQmCC'
        },
      ]
    }
  },
  methods: {
    strings() {
      return {
        darkTheme: strings.t('settings.darkTheme')
      }
    },
    onLangChanged(val) {
      this.lang = this.selectedLang.value;
      this.$i18n.locale = this.lang;
    },
    onThemeChanged() {
      this.setDark(this.dark);
    }
  },
  computed: {
    ...mapWritableState(useStoreSetting, ['lang', 'dark'])
  },
  mounted() {
    switch (this.lang) {
      case "en":
        this.selectedLang = this.languages[1]
        break
      default:
        this.selectedLang = this.languages[0]
    }
  },
  setup() {
    const $q = useQuasar()
    const setDark = (dark) => {
      $q.dark.set(dark)
    }

    return {
      setDark,
    }
  }
}
</script>

<style scoped>

.list {
  min-width: 300px;
  text-align: left;
}

.options {
  width: 180px;
}

</style>