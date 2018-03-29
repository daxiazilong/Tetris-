import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeShanComponent } from './shape-shan.component';

describe('ShapeShanComponent', () => {
  let component: ShapeShanComponent;
  let fixture: ComponentFixture<ShapeShanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeShanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeShanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
