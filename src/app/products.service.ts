import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  

  constructor(public _HttpClient:HttpClient) { }
  getProductList() :Observable<any>
  {
   return this._HttpClient.get('https://api.themoviedb.org/3/trending/movie/week?api_key=ff261f183d450283be7ddc77ccfd9ff0');
  }
}
