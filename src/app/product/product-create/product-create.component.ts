import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../category';
import {AuctionTime} from '../auction-time';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Image} from '../image';
import {JwtService} from '../../login/services/jwt.service';

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
  selectedFile: File = null;
  private myImage: any;
  uploadPercent;
  downloadURL: Observable<string>;
  image: Image;

  constructor(private fb: FormBuilder, private productService: ProductService,
              private router: Router,
              private jwt: JwtService,
              private angularFireStorage: AngularFireStorage,
              private angularFirestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      initialPrice: ['', [Validators.required, Validators.pattern(/\d+/)]],
      eachIncrease: ['', [Validators.required, Validators.pattern(/\d+/)]],
      productDetail: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      statusId: ['1', [Validators.required]],
      timeId: ['', [Validators.required]],
    });
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
        this.saveImage();
      }, error => {
        console.log('Create failed!');
      }
    );
    this.router.navigateByUrl('');
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
        console.log(next);
      }, error => {
        this.auctionTimeList = new Array();
      }
    );
  }

  uploadFileImg() {
    const file = this.selectedFile;
    const filePath = `${this.myImage.id}`;
    const fileRef = this.angularFireStorage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then((url) => {
          this.downloadURL = url;
          this.myImage.set({
            productId: this.product.productId,
            image: this.downloadURL,
            myId: this.myImage.id
          });
          console.log(this.downloadURL);
        }).catch(err => {
          console.log(err);
        });
      })
    )
      .subscribe();
  }

  saveImage() {
    // @ts-ignore
    this.image.imageURL = this.downloadURL;
    this.image.productId = this.product.productId;
    console.log(this.image);
    this.productService.saveImg(this.image);
  }
}
