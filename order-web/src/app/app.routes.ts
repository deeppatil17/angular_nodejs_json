import { Routes } from '@angular/router';
import { HomeComponent } from './order/home/home.component';
import { CreateComponent } from './order/create/create.component';
import { EditComponent } from './order/edit/edit.component';

export const routes: Routes = [
    {path:"order/home",component:HomeComponent},
    {path:"order",redirectTo:"order/home",pathMatch:"full"},
    {path:"",redirectTo:"order/home",pathMatch:"full"},
    {path:"order/create",component:CreateComponent},
    {path:"order/edit/:id",component:EditComponent}
    
];
