import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { WebSocketService } from '@shared/socket/web-socket.service';
import { environment } from '@env/environment.prod';

@Component({
  selector: 'socket-socket-test-test',
  templateUrl: './test.component.html',
})
export class SocketSocketTestTestComponent implements OnInit {
  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    // 订阅了服务器发送过来的消息，并把消息打印在控制台上
    this.wsService
      .createObservableSocket(environment.socketUrl)
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('流已经结束'),
      );
  }

  sendMsg() {
    this.wsService.sendMessage('hello from client');
  }
}
