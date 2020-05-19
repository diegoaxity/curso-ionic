import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  endpoint = 'https://crudcrud.com/api/2c40a14e738f498c9be4604b0a3ad986/items';
  items: Item[] = [];
  currentItem: Item;

  constructor(private httpClient: HttpClient) { }

  saveItem(item: Item) {
    let itemForService = {
      title: item.title,
      quantity: item.quantity.toString()
    };
    return this.httpClient.post(this.endpoint, itemForService);
  }

  getItems() {
    return this.httpClient.get<[Item]>(this.endpoint);
  }

  getSingleItem(id: string) {
    return this.httpClient.get<Item>(this.endpoint + '/' + id);
  }

  updateItem(item: Item) {
    let itemForService = {
      title: item.title,
      quantity: item.quantity.toString()
    };
    return this.httpClient.put(this.endpoint + '/' + item._id, itemForService);
  }
}
