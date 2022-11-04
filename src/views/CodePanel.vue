<template>
  <q-card>
    <q-card-section>
      <q-bar>
        <q-space/>
        <q-btn icon="add" flat round
        @click="fontSize++"></q-btn>
      </q-bar>
      <CodeEditor :style="editorPanelStyle" :fontSize="fontSize"></CodeEditor>
    </q-card-section>
  </q-card>
</template>

<script>
import CodeEditor from "../components/widget/codeEditor";
import scssVars from "@/assets/styles/vars.module.scss";

export default {
  name: "CodePanel",
  components: {CodeEditor},
  data() {
    return {
      fontSize: 15,
    }
  },
  computed: {
    editorPanelStyle() {
      return 'width:' + (window.innerWidth - parseInt(scssVars.verticalBarWidth)) + 'px;' +
          'height:' + (window.innerHeight - parseInt(scssVars.titleBarHeight)) + 'px;';
    },
  }
}
</script>

<style scoped lang="scss">
</style>