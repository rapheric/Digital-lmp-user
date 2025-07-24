interface UserProfile {
  ID?: number;
  DeletedAt?: null | string;
  UserId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  Password?: string;
  Identification?: string;
  UserType?: string;
  UserRole?: string;
  ValidatedDetails?: string;
  UserStatus?: string;
  Bio?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  fullname?: string;
  bio?: string;
}

type ResponseData = {
  Message: string;
  Data: string;
};

type NotificationPlacement = NotificationArgsProps["placement"];

type ErrorResponse = {
  data?: {
    Message?: string; 
  };
  status?: number; 
  message?: string; 
};
