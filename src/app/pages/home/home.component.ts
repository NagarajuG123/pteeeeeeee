import { Component, OnInit } from '@angular/core';
import { MetaService } from 'src/app/_core/services/meta.service';
import { ApiService } from 'src/app/_core/services/api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  publication: any = [];
  newsletterForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private metaService: MetaService,
    private apiService: ApiService,
    fb: FormBuilder
  ) {
    this.newsletterForm = fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getMeta();
    this.getPublication();
  }
  //Publication Instance
  getPublication() {
    this.apiService
      .getAPI(`1851/publication-instance`)
      .subscribe((response) => {
        this.publication = response;
      });
  }
  getMeta() {
    this.apiService.getAPI(`1851/meta`).subscribe((response) => {
      this.metaService.setSeo(response.data);
    });
  }
  onNewsletterSubmit(newsletterForm: FormGroup) {
    const subscribe_form = {
      email: this.newsletterForm.controls['email'].value,
      name: this.newsletterForm.controls['name'].value,
    };
  }
}
