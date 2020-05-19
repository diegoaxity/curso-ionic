import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  formItem: FormGroup;
  id: string;

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router, private itemsService: ItemsService, private route: ActivatedRoute) {
    this.formItem = this.fb.group({
      title: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });

    console.log('ITEM DE SERVICE', this.itemsService.currentItem);

    this.route.queryParams.subscribe(params => {
      console.log('QUERY PARAMS', params);
      if (params.id) {
        this.id = params.id;
        this.itemsService.getSingleItem(params.id).subscribe(item => {
          this.formItem.get('title').setValue(item.title);
          this.formItem.get('quantity').setValue(item.quantity);
        });
      }
    });

    // if (this.itemsService.currentItem) {
    //   this.itemsService.getSingleItem(this.itemsService.currentItem._id).subscribe(item => {
    //     this.formItem.get('title').setValue(item.title);
    //     this.formItem.get('quantity').setValue(item.quantity);
    //   });
    // }
  }

  ngOnInit() {
  }

  save() {
    let item = new Item();
    item.title = this.formItem.get('title').value;
    item.quantity = this.formItem.get('quantity').value;

    if (this.id) {
      item._id = this.id;
      this.itemsService.updateItem(item).subscribe(res => {
        console.log('>>> RESULTADO UPDATE', res);
        this.router.navigate(['list']);
      }, err => {
        console.log(err);
        alert('Ocurrió un error al actualizar el item');
      });
    } else {
      this.itemsService.saveItem(item).subscribe(res => {
        console.log('>>> RESULTADO SAVE', res);
        this.router.navigate(['list']);
      }, err => {
        console.log(err);
        alert('Ocurrió un error al guardar el item');
      });
    }
  }
}
