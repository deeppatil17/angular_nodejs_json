import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient:HttpClient) { }
  private baseUrl="/api/v1/orders";

  getAllOrders():Observable<Order[]>{
    return this._httpClient.get<Order[]>(`${this.baseUrl}`);
  }

  getById(id:Number){
    return this._httpClient.get<Order>(`${this.baseUrl}/${id}`)
  }

  create(data:Order){
    return this._httpClient.post<Order>(`${this.baseUrl}`,data)
  }

  update(data:Order){
    return this._httpClient.put<Order>(`${this.baseUrl}/${data.id}`,data)
  }

  delete(id:Number){
    return this._httpClient.delete<Order>(`${this.baseUrl}/${id}`)
  }
}
