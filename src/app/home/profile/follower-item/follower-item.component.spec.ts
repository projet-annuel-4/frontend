import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FollowerItemComponent } from './follower-item.component'

describe('FollowerItemComponent', () => {
  let component: FollowerItemComponent
  let fixture: ComponentFixture<FollowerItemComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FollowerItemComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
