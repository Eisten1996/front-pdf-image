import { Component, OnInit } from '@angular/core';
import { Row } from 'src/app/models/row.model';
import { PdfService } from 'src/app/services/pdf.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PdfComponent implements OnInit {
  pdfSrc = '';
  totalPages: number;
  counter = Array;
  rows: Row[] = [];
  pages: string = '';
  reader = new FileReader();
  pdf: File;

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
          console.log(data);
          this.router.navigate(['/imageCropper']);
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

  ngOnInit(): void {}
}
