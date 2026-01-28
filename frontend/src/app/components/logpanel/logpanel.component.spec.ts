import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogpanelComponent } from './logpanel.component';

describe('LogpanelComponent', () => {
  let component: LogpanelComponent;
  let fixture: ComponentFixture<LogpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogpanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
