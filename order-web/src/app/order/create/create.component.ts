import { Component } from '@angular/core';
import { Order } from '../order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  order:Order ={
    id:0,
    name:'',
    location:'',
    status:''
}

constructor(private orderService:OrderService,private router:Router){}

create(){
  this.orderService.create(this.order).subscribe({
    next:(data)=>{
      this.router.navigate(["order/home"]);
    },
    error:(err)=>{
      console.log(err);
      
    }
  })

}

cancel(){
  this.router.navigate(["order/home"]);
}


}
