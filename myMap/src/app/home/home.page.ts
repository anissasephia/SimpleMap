import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }
  private latitude: number | any;
  private longitude: number | any;

  public async ngOnInit(){
    //Geolokasi Metode Pertama
    this.longitude = 112.71185842040458;
    this.latitude = -7.294717630076805;
    // throw new Error('Method not implemented.');
    const map = new Map({
      basemap: 'topo-vector'
    });
    //Geolokasi Metode Kedua
    // const position = await Geolocation.getCurrentPosition();
    // this.latitude = position.coords.latitude;
    // this.longitude = position.coords.longitude;
    const view = new MapView({
      container: "container", //container sebagai refrensi view set pada div id container
      map: map, //objek map sebelum tampilan view
      zoom: 10, //zoom
      center: [this.longitude, this.latitude] // longitude, latitude
    });
    

  }
}
