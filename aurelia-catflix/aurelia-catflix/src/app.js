import {HttpClient} from 'aurelia-fetch-client';
const API = 'https://api.media.ccc.de/public/conferences';

export class App {
  constructor() {
    this.heading = "Catflix";
    this.conferences = [];
    this.events = [];
    this.eventdetail = [];
    this.todoDescription = '';
    this.conferencescreen = true;
    this.talkscreen = false;
    this.detailscreen = false;
    this.videoscreen = false;
    let client = new HttpClient();

    client.fetch(API)
    .then(response => response.json())
    .then(data => {
      console.log(data.conferences);
      this.conferences = data.conferences;
    });






  }

  showConference(url){
    let client = new HttpClient();
    console.log(url);
    client.fetch(url)
    .then(response => response.json())
    .then(data => {
      this.events = data;
      console.log(data);
      this.conferencescreen = false;
      this.videoscreen = false;
      this.talkscreen = true;
      
    });
    


  }

  showEvent(url){
    console.log(url);
    let client = new HttpClient();
    client.fetch(url)
    .then(response => response.json())
    .then(data => {
      this.eventdetail = data;
      console.log(data);
      this.conferencescreen = false;
      this.talkscreen = false;
      this.detailscreen = true;
      this.videoscreen = false;
      
    });


  }

  showVideo(url,width,height,mime){

    this.video = { "url":url, "width":width, "height":height, "mime": mime };
    this.conferencescreen = false;
    this.talkscreen = false;
    this.detailscreen = false;
    this.videoscreen = true;

  }


}

