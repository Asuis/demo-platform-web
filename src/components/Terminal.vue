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
    props: {
        ServerID: String,
    },
    data() {
        return {
            term: undefined,
            ws: undefined,
            token: undefined,
            command: ''
        }
    },
    mounted() {
        var term = new Terminal()
        term.open(this.$refs.terminal)
        term.onKey((arg1)=>{
            console.log(arg1)
            if(arg1.domEvent.keyCode === 13) {
                this.ws.send('\n')
                this.command = ''
                term.writeln('\n')
            } else if(arg1.domEvent.keyCode === 8) {
                term.write('\b \b')
                this.ws.send('\b \b')
            } else {
                term.write(arg1.key)
                this.ws.send(arg1.key)
            }
        })
        this.term = term
        this.initWebsocket()
    },
    methods: {
        initWebsocket() {
            const data = this.$store.getters['user/getToken']
            console.log('data', data)
            const url = `ws://localhost:8000/v1/cloud/console/${this.$route.params.container_id}/${data}`
            // const debugUrl = 'ws://localhost:8081/ws'
            console.log('data', url)
        
            var ws = new WebSocket(url)
            ws.onopen = (e) => {
                console.log(`connect ${e}`, e)
            }
            ws.onclose = (e) => {
                console.log(`disconnect e`, e)
            }
            ws.onmessage = (e) => {
                console.log(`recvie data:  ${e}`, e)
                this.term.writeln(e.data)
            }
            ws.onerror = (e) => {
                console.log(`error:${e}`, e)
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
        getToken(data) {
             this.token = data
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