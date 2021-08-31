import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { AddComponent } from './component/add/add.component';
// import { EmployeeDetailComponent } from './component/employee-detail/employee-detail.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './material/mat/mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RepalcePipe } from './pipe/repalce.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddComponent,
    // EmployeeDetailComponent,
    HomeComponent,
    RepalcePipe
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }