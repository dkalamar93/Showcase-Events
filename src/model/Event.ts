export type EventType = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  formattedDate: string;
  formattedTime: string;
  capacity: number;
  owner: OwnerType;
  attendees: AttendeeType[];
  createdAt: string;
  updatedAt: string;
};

export type OwnerType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AttendeeType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
