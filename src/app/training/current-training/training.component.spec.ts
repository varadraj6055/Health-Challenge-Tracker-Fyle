import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingComponent } from './training.component';
import { TrainingService } from './training.service';
import { of } from 'rxjs';  // To mock observables

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let trainingService: jasmine.SpyObj<TrainingService>;

  beforeEach(async () => {
    // Mock the TrainingService
    const trainingServiceSpy = jasmine.createSpyObj('TrainingService', ['getTrainings', 'addTraining']);

    await TestBed.configureTestingModule({
      declarations: [ TrainingComponent ],
      providers: [
        { provide: TrainingService, useValue: trainingServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;

    trainingService = TestBed.inject(TrainingService) as jasmine.SpyObj<TrainingService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTrainings on init', () => {
    // Mock the service response
    const mockTrainings = [{ id: 1, name: 'Cycling', minutes: 30 }];
    trainingService.getTrainings.and.returnValue(of(mockTrainings));

    fixture.detectChanges(); // Trigger component lifecycle

    // Verify if the service method was called
    expect(trainingService.getTrainings).toHaveBeenCalled();
    expect(component.trainings).toEqual(mockTrainings);
  });

  it('should add a new training', () => {
    // Mock the service call for adding a new training
    const newTraining = { id: 2, name: 'Running', minutes: 40 };
    trainingService.addTraining.and.returnValue(of(newTraining));

    component.addTraining(newTraining); // Call the method in the component

    // Verify that addTraining service method was called
    expect(trainingService.addTraining).toHaveBeenCalledWith(newTraining);
  });
});
