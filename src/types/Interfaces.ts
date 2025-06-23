export interface ToDoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface PhoneEntry {
  id: number;
  contact: number;
  firstName: string;
  lastName: string;
}

export interface Weather {
  temperature: number;
  conditionCode: number;
  dayTime: boolean;
  windSpeed: number;
  locationName: string;
}