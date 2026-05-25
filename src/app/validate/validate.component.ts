import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UploadService, UserResponse } from './upload-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validate',
  imports: [CommonModule, FormsModule],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css'
})
export class ValidateComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  selectedFile: File | null = null;
  errorRows: UserResponse[] = [];

  constructor(private uploadService: UploadService) { }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }

    this.uploadService.uploadFile(this.selectedFile).subscribe({
      next: (res) => {
        this.errorRows = res;
        console.log(this.errorRows);

      },
      error: (err) => {
        console.error('Upload error:', err);
      }
    });
  }

  validateOrSaveCorrection(errorRows: any) {

    console.log(errorRows);
    console.log("before API");
    this.uploadService.validateUsers(errorRows, "validate").subscribe({
      next: (res) => {
        console.log('Row corrected:', res);
        if (res.filter(u => u.isError).length == 0) {
          this.uploadService.validateUsers(errorRows, "save").subscribe({
            next: (saveRes) => {
              console.log("Saved successfully", saveRes);
              this.errorRows = [];
              alert("Data saved successfully");
            },
            error: (err) => {
              console.error('Save failed:', err);
            }
          });
        } else {
          this.errorRows = res;
        }
      },
      error: (err) => console.error('Correction failed:', err)
    });
  }








}
