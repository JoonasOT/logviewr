import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Buffer } from 'buffer';

export type Message = string;

@Injectable()
export class SocketConnectionService {
  private socket: WebSocketSubject<{ type:"Buffer", data: number[] }> = webSocket(environment.WEBSOCKET_URL.toString());

  constructor() {}

  get observable(): Observable<Message> {
    return this.socket.asObservable().pipe(map(msg => Buffer.from(msg.data).toString()));
  }

  disconnect(): void {
    this.socket.complete();
  }
}
