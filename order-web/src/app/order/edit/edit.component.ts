import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

 order:Order ={
    id:0,
    name:'',
    location:'',
    status:''
}

constructor(private orderService:OrderService,private router:Router,private route:ActivatedRoute){}

ngOnInit(): void {
  this.route.paramMap.subscribe((params)=>{
    let id=Number(params.get('id'));
    this.getById(id)
  })
  
}

getById(id:Number){
  this.orderService.getById(id).subscribe((data)=>{
    this.order=data;
  })
}

update(){
  this.orderService.update(this.order).subscribe({
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
