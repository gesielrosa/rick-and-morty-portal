import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LangSwitchComponent} from './lang-switch.component';

describe('LayoutComponent', () => {
  let component: LangSwitchComponent;
  let fixture: ComponentFixture<LangSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LangSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LangSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
