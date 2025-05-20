import { Component } from '@angular/core';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
})
export class VideoCallComponent {

  requestVideoCallDemo() {
    // ask for audio and video permissions 
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
      stream.getTracks().forEach(track => track.stop());
      console.log('stream', stream);
    })
    .catch (err => {
      console.error('Error en getUserMedia', err);
    });
  }

}
