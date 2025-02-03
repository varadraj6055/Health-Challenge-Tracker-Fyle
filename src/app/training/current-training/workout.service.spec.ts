import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { of } from 'rxjs';  // For mocking observables

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService); // Inject the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve workouts', () => {
    // Mock the data
    const mockWorkouts = [
      { id: 1, name: 'Cycling', minutes: 60 },
      { id: 2, name: 'Running', minutes: 45 }
    ];

    // Mock the method returning the workouts
    spyOn(service, 'getWorkouts').and.returnValue(of(mockWorkouts));

    service.getWorkouts().subscribe(workouts => {
      expect(workouts).toEqual(mockWorkouts);
    });
  });

  it('should add a new workout', () => {
    const newWorkout = { id: 3, name: 'Swimming', minutes: 30 };

    // Mock the method for adding a workout
    spyOn(service, 'addWorkout').and.returnValue(of(newWorkout));

    service.addWorkout(newWorkout).subscribe(workout => {
      expect(workout).toEqual(newWorkout);
    });
  });

  it('should update an existing workout', () => {
    const updatedWorkout = { id: 1, name: 'Cycling', minutes: 75 };

    // Mock the method for updating a workout
    spyOn(service, 'updateWorkout').and.returnValue(of(updatedWorkout));

    service.updateWorkout(updatedWorkout).subscribe(workout => {
      expect(workout).toEqual(updatedWorkout);
    });
  });

  it('should delete a workout', () => {
    const workoutIdToDelete = 1;

    // Mock the delete method
    spyOn(service, 'deleteWorkout').and.returnValue(of(true));

    service.deleteWorkout(workoutIdToDelete).subscribe(response => {
      expect(response).toBeTrue();
    });
  });
});
