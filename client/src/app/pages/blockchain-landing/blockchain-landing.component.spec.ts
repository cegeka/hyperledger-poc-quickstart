import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainLandingComponent } from './blockchain-landing.component';

describe('BlockchainLandingComponent', () => {
  let component: BlockchainLandingComponent;
  let fixture: ComponentFixture<BlockchainLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
