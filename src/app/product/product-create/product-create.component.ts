import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../category';
import {AuctionTime} from '../auction-time';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {Image} from '../image';
import {JwtService} from '../../login/services/jwt.service';
import {finalize} from 'rxjs/operators';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product;
  productForm: FormGroup;
  categoryList: Category[];
  auctionTimeList: AuctionTime[];
  selectedFile = new Array<File>();
  downloadURL = new Array<string>();

  constructor(private fb: FormBuilder, private productService: ProductService,
              private router: Router,
              private jwt: JwtService,
              private angularFireStorage: AngularFireStorage) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      initialPrice: ['', [Validators.required, Validators.pattern(/\d+/)]],
      eachIncrease: ['', [Validators.required, Validators.pattern(/\d+/)]],
      productDetail: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      statusId: ['7', [Validators.required]],
      timeId: ['', [Validators.required]],
      // imageURL: [this.downloadURL]
    });
  }

  ngOnInit(): void {
    this.findAllCategory();
    this.findAllAuctionTime();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.product = Object.assign({}, this.productForm.value);
    this.product.userName = this.jwt.getUsername();


    console.log(this.product);
    this.productService.save(this.product).subscribe(
      next => {
        console.log('Create process!');
      }, error => {
        console.log('Create failed!');
      }
    );
    // this.router.navigateByUrl('');
  }

  findAllCategory(): void {
    this.productService.findAllCategory().subscribe(
      next => {
        this.categoryList = next;
      }, error => {
        this.categoryList = new Array();
      }
    );
  }

  findAllAuctionTime(): void {
    this.productService.findAllAuctionTime().subscribe(
      next => {
        this.auctionTimeList = next;
      }, error => {
        this.auctionTimeList = new Array();
      }
    );
  }

  // tslint:disable-next-line:typedef
  uploadFileImg(event) {
    this.selectedFile = [];
    // this.downloadURL = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files.item(i));
    }
    console.log(this.selectedFile);
    // upload lên firebase
    // tslint:disable-next-line:prefer-for-of
    this.uploadDbImg();
  }

  // tslint:disable-next-line:typedef
  uploadDbImg() {
    for (let i = 0; i < this.selectedFile.length; i++) {
      const filePath = 'files/' + Math.random() + this.selectedFile[i];
      const fileRef = this.angularFireStorage.ref(filePath);
      const task = this.angularFireStorage.upload(filePath, this.selectedFile[i]);
      // lấy url vào mảng imageUrl
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().toPromise().then((url) => {
            this.downloadURL.push(url);
          }).catch(err => {
            console.log(err);
          });
        })
      )
        .subscribe();
    }
    console.log(this.downloadURL);
  }
}
