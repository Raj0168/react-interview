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

export interface JobDetails {
  id: number;
  by: string;
  text: string;
  time: number;
  type: string;
  url: string;
  title: string;
}

export interface Users {
  id: number;
  name: string;
  age: number;
  occupation: string;
}
