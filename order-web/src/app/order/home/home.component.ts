import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from '../order.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,OrderModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
}) 
export class HomeComponent implements OnInit{

  orders:Order[]=[];
  filteredOrders:Order[]=[];

  sortProperty:String='name';
  sortOrder=1;

  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data)=>{
      this.orders=data;
      this.filteredOrders=data;
    })
  }

  delete(id:Number){
    this.orderService.delete(id).subscribe((data)=>{
      this.orders=this.orders.filter(item=>item.id!==id);
    })
  }

  filterOrder(input:String){
    this.filteredOrders=this.orders.filter((itm)=>itm.name.toLowerCase().includes(input.toLowerCase())
  || itm.location.toLowerCase().includes(input.toLowerCase())
  || itm.status.toLowerCase().includes(input.toLowerCase()))

  }

  sortBy(value:string){
this.sortOrder=value===this.sortProperty?(this.sortOrder*-1):1;
this.sortProperty=value;
this.filteredOrders=[...this.orders.sort((a:any,b:any)=>{
  let result=0;
  if(a[value]<b[value]){
    result=-1
  }
  if(a[value]>b[value]){
    result=1
  }
  return (result*this.sortOrder);
})]
  }

}
