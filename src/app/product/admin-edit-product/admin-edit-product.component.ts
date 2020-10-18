import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../category';
import {AuctionTime} from '../auction-time';
import {Observable} from 'rxjs';
import {Image} from '../image';
import {User} from '../../user/User';
import {ProductService} from '../product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {JwtService} from '../../login/services/jwt.service';
import {DatePipe} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {UserService} from '../../user/user.service';
import {finalize} from 'rxjs/operators';


declare var $: any;

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit, AfterViewInit {
  product: Product;
  editForm: FormGroup;
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
  id: string;
  imageList: Image[];
  baseImgList: Image[];


  constructor(private fb: FormBuilder, private productService: ProductService,
              private router: Router,
              private jwt: JwtService,
              private datePipe: DatePipe,
              private angularFireStorage: AngularFireStorage,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.id = params.get('id');
        console.log(this.id);
        this.productService.findById(Number(this.id)).subscribe(data => {
          this.product = data;
          console.log(this.product);
          this.editForm.patchValue(this.product);
          this.productService.getListImg(this.product.productId).subscribe(
            next => {
              this.imageList = next;
            }
          );
          this.loadUser();
        });
      },
      error => {
        console.log(error);
      },
      () => {
      });
  }

  ngOnInit(): void {
    this.findAllCategory();
    this.findAllAuctionTime();
    // tslint:disable-next-line:radix
    // this.idProduct = parseInt(Math.floor(Math.random() * Math.floor(2500)) + idProductArr.join(''));
    this.editForm = this.fb.group({
      productName: ['', [Validators.required]],
      initialPrice: ['', [Validators.required, Validators.pattern(/\d+/)]],
      eachIncrease: ['', [Validators.required, Validators.pattern(/\d+/)]],
      productDetail: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      timeId: ['', [Validators.required]],
      userId: ['', Validators.required],
      detailUser: ['']
    });
    this.loadUserStatus = true;
  }

  loadUser(): void {
    if (this.editForm.value.userId != null) {
      this.userService.findUserById(this.editForm.value.userId).subscribe(
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
    this.editForm.value.userId = '';
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.editForm.valid) {
      this.product.productName = this.editForm.value.productName;
      this.product.initialPrice = this.editForm.value.initialPrice;
      this.product.eachIncrease = this.editForm.value.eachIncrease;
      this.product.productDetail = this.editForm.value.productDetail;
      this.product.categoryId = this.editForm.value.categoryId;
      this.product.statusId = this.editForm.value.statusId;
      this.product.timeId = this.editForm.value.timeId;
      this.product.userId = this.editForm.value.userId;
      console.log(this.product.timeId);
      this.productService.adminEdit(this.product).subscribe(
        next => {
          const r = confirm('Cập Nhật Thành Công');
          if (r) {
            this.router.navigateByUrl('/fc-admin/productManage').then(window.location.reload);
          }
        }, error => {
          alert('Đã xảy ra lỗi');
        }
      );
    }
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
        console.log(this.auctionTimeList);
      }
    );
  }

  // tslint:disable-next-line:typedef
  uploadFileImg(files) {
    for (let i = this.selectedFile.length; i < files.length; i++) {
      this.selectedFile.push(files.item(i));
      this.nameImg += this.selectedFile[i].name + ' ; ';
    }
    const reader = new FileReader();
    const img = new Image();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      img.imageURL = reader.result.toString();
    };
    img.productId = this.product.productId;
    img.imageId = null;
    this.imageList.push(img);
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
        .subscribe(next => {
        });
    }
  }

  ngAfterViewInit(): void {
    // this.editForm.patchValue(this.product);
  }

  removeImg(index: number): void {
    if (this.imageList[index].imageId != null) {
      const id = this.imageList[index].imageId;
      this.productService.deleteImg(id).subscribe(next => {
        },
        error => {console.log(error); });
    }
  }
}
