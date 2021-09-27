import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';
import { PdfService } from 'src/app/services/pdf.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent implements OnInit {
  @ViewChild('image')
  public imageElement: ElementRef;

  @Input('src')
  public imageSource = '';

  public imageDestination: string;
  private cropper: Cropper;

  public constructor(
    private pdfService: PdfService,
    private _DomSanitizer: DomSanitizer
  ) {
    this.imageDestination = '';
  }

  public ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestination = canvas.toDataURL('image/jpg');
      },
    });
  }

  async createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageSource = reader.result.toString();
        // console.log(reader.result.toString());
      },
      false
    );

    if (image) {
      await reader.readAsDataURL(image);
    }
  }
  public ngOnInit() {
    // this.pdfService.getImage().subscribe(async (response) => {
    //   // console.log(response);
    //   await this.createImageFromBlob(response);
    // });
  }
}
