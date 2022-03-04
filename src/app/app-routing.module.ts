import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';

const routes: Routes = [
  {path:"blogs",component:BlogsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
