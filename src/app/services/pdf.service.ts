import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  imageToShow: any;
  private urlEndPoint = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  pdfToBack(file: File, num: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pags', num);
    return this.http.post(`${this.urlEndPoint}form`, formData);
  }

  getImage() {
    return this.http.get(`${this.urlEndPoint}output/img-1.jpg`, {
      responseType: 'blob',
    });
  }
}
