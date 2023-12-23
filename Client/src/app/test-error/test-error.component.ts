import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.development'

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {

  validationErrors: string[] = []
  baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/endpointdoesnotexist').subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'buggy/bad-request/one').subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        this.validationErrors = error
      }
    })
  }

}
