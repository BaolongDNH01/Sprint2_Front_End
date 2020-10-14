import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../category';
import {AuctionTime} from '../auction-time';
import {Observable} from 'rxjs';
import {Image} from '../image';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';
import {JwtService} from '../../login/services/jwt.service';
import {DatePipe} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {UserService} from '../../user/user.service';
import {User} from '../../user/User';

declare var $: any;

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  product: Product;
  productForm: FormGroup;
  categoryList: Category[];
  auctionTimeList: AuctionTime[];
  selectedFile = new Array<File>();
  downloadURL: Observable<string>;
  myDate = new Date();
  idProduct: number;
  nameImg: string;
  image = new Image();
  idUser: number;
  detailUser: any;
  loadUserStatus: boolean;
  user: User;
  userId: number;


  constructor(private fb: FormBuilder, private productService: ProductService,
              private router: Router,
              private jwt: JwtService,
              private datePipe: DatePipe,
              private angularFireStorage: AngularFireStorage,
              private userService: UserService) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      initialPrice: ['', [Validators.required, Validators.pattern(/\d+/)]],
      eachIncrease: ['', [Validators.required, Validators.pattern(/\d+/)]],
      productDetail: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      statusId: ['7', [Validators.required]],
      timeId: ['', [Validators.required]],
      userId: ['', Validators.required],
      detailUser: ['']
    });
    this.loadUserStatus = true;
  }

  ngOnInit(): void {
    this.findAllCategory();
    this.findAllAuctionTime();

    const arrDayTime = this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss').toString().split(' ');
    const idProductArr = arrDayTime[1].split(':');
    // tslint:disable-next-line:radix
    this.idProduct = parseInt(Math.floor(Math.random() * Math.floor(2500)) + idProductArr.join(''));

  }

  loadUser(): void {
    if (this.productForm.value.userId != null) {
      this.userService.findUserById(this.productForm.value.userId).subscribe(
        (data) => {
          this.user = data;
        },
        error => {
          this.loadUserStatus = false;
        },
        () => {
          const textAreaDetailUser = document.getElementById('detailUser');
          this.detailUser = 'ID: ' + this.user.userId + '\n' + 'Tên đầy đủ: ' + this.user.fullName + '\nEmail: ' + this.user.email;
          textAreaDetailUser.innerHTML = this.detailUser;
          textAreaDetailUser.style.height = textAreaDetailUser.scrollHeight + 3 + 'px';
        }
      );
    }
  }

  clearDetail(): void {
    const userDetail = document.getElementById('detailUser') as HTMLInputElement;
    userDetail.value = '';
    const id = document.getElementById('userId') as HTMLInputElement;
    id.value = '';
    this.productForm.value.userId = '';
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.product = Object.assign({}, this.productForm.value);
    this.product.fullName = this.jwt.getUsername();
    this.product.productId = this.idProduct;
    console.log(this.idProduct);
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
    this.nameImg = '';
    // this.downloadURL = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files.item(i));
      this.nameImg += this.selectedFile[i].name + ' ; ';
    }
  }

  // upload lên firebase
  // tslint:disable-next-line:typedef
  uploadDbImg() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedFile.length; i++) {
      const filePath = 'files/' + Math.random() + this.selectedFile[i];
      const fileRef = this.angularFireStorage.ref(filePath);
      const task = this.angularFireStorage.upload(filePath, this.selectedFile[i]);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().toPromise().then((url) => {
            this.downloadURL = url;
            this.image.productId = this.idProduct;
            // @ts-ignore
            this.image.imageURL = this.downloadURL;
            console.log(this.image);
            this.productService.saveImg(this.image).subscribe();
          }).catch(err => {
            console.log(err);
          });
        })
      )
        .subscribe();
    }

  }
}
