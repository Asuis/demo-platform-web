<template>
  <div>
      <div id="term" ref="terminal"></div>
      <el-button @click="write()">收到消息</el-button>

  </div>
</template>

<script>

import {Terminal} from 'xterm'
import 'xterm/css/xterm.css'

export default {

    name: 'Terminal',
    data() {
        return {
            term: undefined,
            ws: undefined
        }
    },
    mounted() {
        var term = new Terminal()
        term.open(this.$refs.terminal)
        term.onKey((arg1)=>{
        // eslint-disable-next-line no-console
            console.log(arg1)
            if(arg1.domEvent.keyCode === 13) {
                term.writeln('\n')
            } else if(arg1.domEvent.keyCode === 8) {
                term.write('\b \b')
            } else {
                term.write(arg1.key)
            }
        })
        this.term = term
        this.initWebsocket()
    },
    methods: {

        initWebsocket() {
            var ws = new WebSocket('ws://102.168.50.178:8000/cloud/console/xxx?t=kfjkdfjdf')
            ws.onopen = (e) => {
                console.log(`connect ${e}`)
            }
            ws.onclose = (e) => {
                console.log(`disconnect ${e}`)
            }
            ws.onmessage = (e) => {
                console.log(`recvie data:  ${e}`)
                this.term.write(e)
            }
            ws.onerror = (e) => {
                console.log(`error:${e}`)
            }
            this.ws = ws
        },
        write() {
            this.term.write("\n")
        }
    }
}
</script>

<style>
    #term{
        width: 600px;
        height: 400px;
    }
</style>