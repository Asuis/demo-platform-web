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
    data() {
        return {
            term: undefined,
            ws: undefined,
            token: ''
        }
    },
    mounted() {
        var term = new Terminal()
        term.open(this.$refs.terminal)
        term.onKey((arg1)=>{
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
            var ws = new WebSocket(`ws://192.168.2.178:8000/v1/cloud/console/${this.$route.params.container_id}?t=${this.token}`)
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
        },
    },
    computed: {
        getToken() {
            return this.$store.getters['user/getToken']
        }
    },
    watch: {
        getToken(val) {
            this.token = val
        },
        
    }
}
</script>

<style>
    #term{
        width: 600px;
        height: 400px;
    }
</style>