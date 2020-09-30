import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from 'rxjs';
import {InformationModel} from '../../model/informaton.model';
import {InformationService} from '../../service/information.service';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.passwordNew === v.passwordConfirm) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  editForm: FormGroup;
  url:string | ArrayBuffer;
  public subscription: Subscription;
  public information: InformationModel;

  constructor(
    private fb: FormBuilder,
    public informationService: InformationService
  ) { }

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰYÝỲỶỸỴĐáàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợuúùủũụưứừửữựýỳỷỹỵđ ]{1,40}$'), Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(25)]],
      birth: [''],
      passwordCurrent: [''],
      pwGroup: this.fb.group({
        passwordNew: ['', [Validators.required, Validators.minLength(5)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(5)]]
      }, {validator: comparePassword}),
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
      phone:  ['', [Validators.required, Validators.pattern('^[0][1-9]{9}$')]],
      address: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    });
    this.editForm = this.fb.group({
      username: [''],
      fullName: [''],
      email: [''],
      birth: [''],
      passwordCurrent: [''],
      idCard: [''],
      phone:  [''],
      address: [''],
    });
    this.subscription = this.informationService.findOne(1).subscribe((data:InformationModel)=>{
      this.information = data;
      this.url = data.url;
      this.infoForm.patchValue(data);
      console.log(this.information);
    });
    // this.url = "../../../assets/pic/avatar.png";
  }

  editInfo() {
    this.infoForm.value.username=this.editForm.value.username;
    this.infoForm.value.fullName=this.editForm.value.fullName;
    this.infoForm.value.email=this.editForm.value.email;
    this.infoForm.value.birth=this.editForm.value.birth;
    this.infoForm.value.passwordNew=this.editForm.value.passwordCurrent;
    this.infoForm.value.idCard=this.editForm.value.idCard;
    this.infoForm.value.phone=this.editForm.value.phone;
    this.infoForm.value.address=this.editForm.value.address;
    this.informationService.save(this.editForm.value).subscribe(data => {
    });
  }
  cancel() {
  }
  changeImg(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url=event.target.result;
      }
    }
  }

}
