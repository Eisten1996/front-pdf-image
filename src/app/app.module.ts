import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PdfComponent } from './componets/pdf/pdf.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ImageCropperComponent } from './componets/image-cropper/image-cropper.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/pdfSelected', pathMatch: 'full' },
  { path: 'pdfSelected', component: PdfComponent },
  { path: 'imageCropper', component: ImageCropperComponent },
];

@NgModule({
  declarations: [AppComponent, PdfComponent, ImageCropperComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    PdfViewerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
