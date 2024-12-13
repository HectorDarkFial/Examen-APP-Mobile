import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CameraService } from 'src/app/services/camera.service';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule

  ],
  providers:[CameraService],
  declarations: [HomePage]
})
export class HomePageModule {}
