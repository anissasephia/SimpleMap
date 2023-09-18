import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
//Import simbolisasi
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';

//ACARA 4
// import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



//ACARA 5
export class HomePage implements OnInit {
  mapView: MapView | any;
  //terkait geolokasi
  userLocationGraphic: Graphic | any;
  //marker baru
  newMarkerGraphic: Graphic | any;
  //basemap
  selectedBasemap!: string;

  constructor() { }
  async ngOnInit() {

    const map = new Map({
      basemap: 'gray-vector'
      // basemap:'terrain'
    });

    //NEW MARKER
    const newMarkerGeom = new Point({
      latitude: 39.876318,  // Replace with the desired latitude
      longitude: -74.775926, // Replace with the desired longitude
    });

    //SIMBOLISASI TITIK
    const newMarkerSymbol = new SimpleMarkerSymbol({
      color: [255, 0, 255],  // Red color for the marker
      size: 20,
      style: 'circle'
    });

    //MAP VIEW
    this.mapView = new MapView({
      container: "container",
      map: map,
      zoom: 7,
      center: newMarkerGeom
    });

    //NEW MARKER
    this.newMarkerGraphic = new Graphic({
      geometry: newMarkerGeom,
      symbol: newMarkerSymbol
    });
    this.mapView.center = newMarkerGeom;
    
    //add weather service layer hanya ada di US dikarena indo belum ada
    this.mapView.graphics.add(this.newMarkerGraphic);
    let weatherServiceFL = new ImageryLayer({ url: WeatherserviceUrl });
    map.add(weatherServiceFL);

    await this.updateUserLocationOnMap();
    // this.mapView.center = this.userLocationGraphic.geometry as Point;
    // setInterval(this.updateUserLocationOnMap.bind(this), 1000);

  }

  async getLocationService(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp) => {
        resolve([resp.coords.latitude, resp.coords.longitude]);
      })
    });
  }
  async updateUserLocationOnMap() {
    let latLng = await this.getLocationService();
    let geom = new Point({ latitude: latLng[0], longitude: latLng[1] });
    if (this.userLocationGraphic) {
      this.userLocationGraphic.geometry = geom;
    } else {
      this.userLocationGraphic = new Graphic({
        symbol: new SimpleMarkerSymbol(),
        geometry: geom,

      });
      this.mapView.graphics.add(this.userLocationGraphic);
    }
  }
  //Basemap
  async changeBasemap() {
    this.mapView.map.basemap = this.selectedBasemap;
  }
}

const WeatherserviceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer';


//ACARA 4
// export class HomePage implements OnInit {

//   constructor() { }
//   private latitude: number | any;
//   private longitude: number | any;

//   public async ngOnInit(){
//     // //Geolokasi Metode Pertama
//     // this.longitude = 112.71185842040458;
//     // this.latitude = -7.294717630076805;
//     // throw new Error('Method not implemented.');
//     const map = new Map({
//       basemap: 'topo-vector'
//     });
//     //Geolokasi Metode Kedua
//     const position = await Geolocation.getCurrentPosition();
//     this.latitude = position.coords.latitude;
//     this.longitude = position.coords.longitude;
//     const view = new MapView({
//       container: "container", //container sebagai refrensi view set pada div id container
//       map: map, //objek map sebelum tampilan view
//       zoom: 10, //zoom
//       center: [this.longitude, this.latitude] // longitude, latitude
//     });


//   }
// }
