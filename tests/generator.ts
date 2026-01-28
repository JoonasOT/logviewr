import { Readable } from "node:stream";

const GENERATOR_TIMEOUT_MS = 200

console.log(process.stdout.isTTY)

class Generator extends Readable {
    private iter: number = 0
    _read(_size: number): void {
        setTimeout(
            () => this.push(Buffer.from((this.iter++).toString())),
            GENERATOR_TIMEOUT_MS
        )
    }
}

new Generator().pipe(process.stdout)