<template>
  <div>
      <div id="term" ref="terminal"></div>
  </div>
</template>

<script>

import {Terminal} from 'xterm'
import 'xterm/css/xterm.css'

export default {

    name: 'Terminal',
    mounted() {
        var term = new Terminal()
        term.open(this.$refs.terminal)
        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    }
}
</script>

<style>
    #term{
        width: 600px;
        height: 400px;
    }
</style>