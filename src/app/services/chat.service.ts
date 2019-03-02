// src/app/services/chat.service.ts
import { Injectable } from "@angular/core";
import { PusherService } from "./pusher.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  user: { displayName: string; email: string };
  private _channel: any;

  constructor(
    private _pusherService: PusherService,
    private _http: HttpClient
  ) {
    // Subscribe to 'chat-group' channel
    this._channel = this._pusherService.getPusher().subscribe("chat-group");
  }

  join(param): Observable<any> {
    return this._http.post(`${environment.apiUrl}/join`, param).pipe(
      tap(data => {
        this.user = param;
      })
    );
  }

  sendMessage(message: string): Observable<any> {
    const param = {
      message,
      type: "human",
      ...this.user
    };
    return this._http.post(`${environment.apiUrl}/message`, param);
  }

  getChannel() {
    return this._channel;
  }
}
