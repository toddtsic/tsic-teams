import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { environment } from 'src/environments/environment';
import { IDeleteFile_ViewModel, IUploadFile_ViewModel } from '../models/fileupload';
import { CapacitorPhoto } from '../models/headshot';

@Injectable({
  providedIn: 'root'
})
export class HeadshotService {

  headshot: CapacitorPhoto;

  constructor(
    private http: HttpClient
  ) { }

  async updateHeadshot(userId: string, source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: source,
      saveToGallery: false,
      width: 600,
      direction: CameraDirection.Front
    });

    const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    const requestModel: IUploadFile_ViewModel = {
      file: blobData,
      userId: userId,
      regfieldName: "BUploadHeadshot"
    }

    const url = `${environment.apiUrl}/api/FileUpload/UploadFile`;

    const formData = new FormData();
    formData.append('file', requestModel.file);
    formData.append('userId', requestModel.userId);
    formData.append('regfieldName', requestModel.regfieldName);

    return this.http.post<any>(url, formData);
  }

  removeHeadshot(userId: string) {

    const url = `${environment.apiUrl}/api/FileUpload/DeleteFile`;
    const deleteModel: IDeleteFile_ViewModel = {
      userId: userId,
      regfieldName: 'BUploadHeadshot'
    }

    const result =  this.http.post<any>(url, deleteModel);

    return result;
  }

  b64toBlob(
    b64Data:any,
    contentType = '',
    sliceSize = 512
  ) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
