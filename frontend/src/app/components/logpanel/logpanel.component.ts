import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input({required: true})pattern!: string;
  
  readonly messages: Message[] = []
  private subscription?: Subscription

  constructor(private readonly socketService: SocketConnectionService){}
  
  ngOnInit(): void {
    this.subscription = this.socketService
                            .observable
                            .pipe(filter(msg => !!(new RegExp(this.pattern, "g").exec(msg))))
                            .subscribe(msg => this.messages.push(msg))
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
