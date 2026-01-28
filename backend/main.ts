import {Writable} from "node:stream"
import WebSocket from "ws"
import express from "express"
import expressWs from "express-ws"

const port = process.env.PORT || 8080;

class WsStream extends Writable {
    private readonly socket: WebSocket
    constructor(socket: WebSocket){
        super()
        this.socket = socket
    }

    override _write(chunk: Buffer, _encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        this.socket.send(chunk.toString(), callback);
    }
}

const app = expressWs(express()).app;

app.use("/", express.static("dist/browser"));

app.ws("/ws", (socket) => {
    console.info("CONNECTED!");
    const stream = process.stdin.pipe(new WsStream(socket));
    socket.once("close", () => {
        console.info("DISCONNECTED!");
        stream.emit("close");
    })
})

app.listen(port, (err) => {
    if (err) return console.error(err);
    console.info(`Listening on port: ${port}`)
})
