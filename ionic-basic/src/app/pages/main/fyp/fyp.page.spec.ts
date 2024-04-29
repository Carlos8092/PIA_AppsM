import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FypPage } from './fyp.page';

describe('FypPage', () => {
  let component: FypPage;
  let fixture: ComponentFixture<FypPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FypPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
