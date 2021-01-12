import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  healthForm: FormGroup;
  submitted = false;
  errorMessage;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
      this.healthForm = this.formBuilder.group({
          pAge: ['', Validators.required],
          sex: ['', Validators.required],
          cp: ['', Validators.required],
          trestBPs: ['', Validators.required],
          chol: ['', Validators.required],
          fbs: ['', Validators.required],
          restecg: ['', Validators.required],
          thalach: ['', Validators.required],
          exang: ['', Validators.required],
          oldpeak: ['', Validators.required],
          slope: ['', Validators.required],
          ca: ['', Validators.required],
          Thal: ['', Validators.required]

      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.healthForm.controls; }

  onSubmit() {
      this.submitted = true;


      // stop here if form is invalid
      if (this.healthForm.invalid) {
          return;
      }

      this.http.post<any>('http://127.0.0.1:5000/inst/heartD', this.healthForm.value).subscribe({
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
      })


  }

  onReset() {
      this.submitted = false;
      this.healthForm.reset();
  }
}

