import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';

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

  public constructor() {
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

  public ngOnInit() {}
}
