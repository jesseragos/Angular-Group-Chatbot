import { Injectable } from "@angular/core";
import * as Pusher from "pusher-js";

// this is here to discourage the instantiating of pusher any where its
// needed, better to reference it from one place
@Injectable()
export class PusherService {
  private _pusher: any;
  private API_KEY = "d1ce397ca8c6ac1d4784";
  private CLUSTER = "ap1";

  constructor() {
    // Create a Pusher instance and make it a service
    this._pusher = new Pusher(this.API_KEY, {
      cluster: this.CLUSTER,
      encrypted: true
    });
  }
  // any time it is needed we simply call this method
  getPusher() {
    return this._pusher;
  }
}
