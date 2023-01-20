import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SourceButtonComponent} from './source-button.component';

describe('LayoutComponent', () => {
  let component: SourceButtonComponent;
  let fixture: ComponentFixture<SourceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SourceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
