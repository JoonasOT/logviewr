import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Buffer } from 'buffer';

export type Message = string;

@Injectable()
export class SocketConnectionService {
  private socket: WebSocketSubject<Message> = webSocket({ url: environment.WEBSOCKET_URL.toString(), deserializer: (event) => event.data.toString()});

  constructor() {}

  get observable(): Observable<Message> {
    return this.socket.asObservable()
  }

  disconnect(): void {
    this.socket.complete();
  }
}
