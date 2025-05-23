import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private pusher: Pusher;

  constructor() {
    // Pusher.logToConsole = true; // depuration
    this.pusher = new Pusher('682407f9d91aaf86de6f', {
      cluster: 'eu',
      forceTLS: true
    });
  }

  // subscribe to a channel
  subscribe(channelName: string) {
    return this.pusher.subscribe(channelName);
  }

  // unsubscribe to a channel
  unsubscribe(channelName: string) {
    this.pusher.allChannels().forEach(channel => {
      channel.unbind_all();
      this.pusher.unsubscribe(channelName);
    });
  }

  // obtain channel existent 
  getChannel(channelName: string) {
    return this.pusher.channel(channelName);
  }

}
