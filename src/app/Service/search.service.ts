import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  public search = new BehaviorSubject<string>('');
  public productList = new BehaviorSubject<any>([]);

  nameSearch() {
    return this.http.get<any>('http://127.0.0.1:8000/api/product/view');
  }
  colorSearch(product_color: any) {
    return this.http.get<any>(
      `http://127.0.0.1:8000/api/search/color/en/${product_color}`
    );
  }
  categorySearch(product_category: any) {
    return this.http.get<any>(
      `http://127.0.0.1:8000/api/search/category/en/{${product_category}}`
    );
  }
  maxPriceSearch(max_product_price: any) {
    return this.http.get<any>(
      `http://127.0.0.1:8000/api/search/price/{${max_product_price}}`
    );
  }
  getAllCategories(): Observable<any> {
    return this.http
      .get<any>('http://127.0.0.1:8000/api/category/view');
  }
  getAllSubCategories(): Observable<any> {
    return this.http
      .get<any>('http://127.0.0.1:8000/api/category/sub/view');
  }
}
