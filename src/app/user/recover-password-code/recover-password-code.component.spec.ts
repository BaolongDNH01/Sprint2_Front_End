import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswordCodeComponent } from './recover-password-code.component';

describe('RecoverPasswordCodeComponent', () => {
  let component: RecoverPasswordCodeComponent;
  let fixture: ComponentFixture<RecoverPasswordCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverPasswordCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswordCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
