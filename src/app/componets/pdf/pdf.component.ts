import { Component, OnInit, Input } from '@angular/core';
import { Row } from 'src/app/models/row.model';
import { PdfService } from 'src/app/services/pdf.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent implements OnInit {
  imageSource = '';
  pdfSrc = '';
  totalPages: number;
  counter = Array;
  rows: Row[] = [];
  pages: string = '';
  reader = new FileReader();
  pdf: File;
  isImagen:Boolean;

  constructor(
    private pdfService: PdfService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
  }

  isSelect(event: any) {
    if (event.target.checked) {
      this.rows.push({ page: event.target.value, checked: true });
    } else {
      const index = this.rows.findIndex((x) => x.page === event.target.value);
      this.rows.splice(index, 1);
    }
    console.log(this.rows);
  }

  submit() {
    if (this.rows.length !== 0) {
      this.rows.map((x) => {
        this.pages = x.page;
      });
      alert(this.pages);
      this.pdfService.pdfToBack(this.pdf, this.pages).subscribe(
        (data) => {
          // console.log(data);
          // this.router.navigate(['/imageCropper']);
          this.getImagen();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Seleccione uno minimo');
    }
  }

  onUpload(event) {
    this.reader.addEventListener('load', (ev) => {
      this.pdfSrc = ev.target['result'].toString();
      console.log(this.pdfSrc);
    });
    this.pdf = event.target.files.item(0);
    this.reader.readAsDataURL(event.target.files[0]);
  }

  getImagen() {
    this.pdfService.getImage().subscribe(async (response) => {
      // console.log(response);
      await this.createImageFromBlob(response);
      this.isImagen = true;
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

  ngOnInit(): void {
    this.isImagen = false;
  }
}
