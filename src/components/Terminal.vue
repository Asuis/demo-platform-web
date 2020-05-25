<template>
  <div class="container">
      <div id="term" ref="terminal">
      </div>
  </div>
</template>

<script>

import {Terminal} from 'xterm'
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export default {

    name: 'Terminal',
    mounted() {
      var term = new Terminal({
        convertEol: true
      })

      var ws_host = `ws://192.168.2.213:8000/v1/cloud/console/${this.$route.params.container_id}/t`
      // var container = "test"
      term.open(this.$refs.terminal)
      // var ws = "ws://" + ws_host + "/containers/" + container + "/attach/ws?stream=true"
      var socket = new WebSocket(ws_host)

      socket.onmessage = (e)=> {
        console.log(e)
      }

      socket.onopen = (e) => {
        console.log(e)
        socket.send('\r\n')
      }

      socket.onclose = (e) => {
        console.log(e)
      }

      const attachAddon = new AttachAddon(socket)
      const fitAddon = new FitAddon()

      
      // Attach the socket to term
      term.loadAddon(fitAddon)
      term.loadAddon(attachAddon)
      fitAddon.fit()
      // term.onData((data)=> {
      //   console.log(data)
      //   term.write(data)
        
      // })
      term.onKey(({key})=> {
        console.log(key.charCodeAt(8))
        if (key.charCodeAt(0)===127) {
          term.write("\b \b")
        }  else {
          term.write(key)
        }
      })
      
      
    },
    methods: {
      
    }
}
</script>

<style scoped>
    #term{
        width: 100%;
        height: 100%;
    }
    .container{
      height: 100%;
    }
</style>