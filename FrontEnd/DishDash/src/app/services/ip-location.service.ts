import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpLocationService {
  private apiKey = "9e0d0c0e14864f4db7f83b70af667c92";
  private apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${this.apiKey}`;

  constructor(private http:HttpClient) { }

  getIpLocation(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
