import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameplatformFormComponent } from './gameplatform-form.component';

describe('GameplatformFormComponent', () => {
  let component: GameplatformFormComponent;
  let fixture: ComponentFixture<GameplatformFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameplatformFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameplatformFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
