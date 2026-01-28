import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { Message, SocketConnectionService } from '../../services/socket-connection.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'logpanel',
  imports: [],
  templateUrl: './logpanel.component.html',
  styleUrl: './logpanel.component.scss',
  providers: [SocketConnectionService]
})
export class LogpanelComponent implements OnInit, OnDestroy{
  pattern = input.required<RegExp>();
  
  readonly messages: Message[] = []
  private subscription?: Subscription

  constructor(private readonly socketService: SocketConnectionService){}
  
  ngOnInit(): void {
    this.subscription = this.socketService
                            .observable
                            .pipe(filter(msg => !!this.pattern().exec(msg)))
                            .subscribe(msg => this.messages.push(msg))
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
