export interface UserContacts {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
}

export interface UserPhotos {
  small: string;
  large: string;
}

export interface UserProfile {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: UserContacts;
  photos: UserPhotos;
}

export interface UserStatus {
  status: string;
  updateUserStatus: (status: string) => void;
  errorMessages: string[];
  isOwner: boolean;
  savePhoto: (photo: File) => void;
  saveProfile: (values: ProfileFormValues) => void;
}

export interface Contacts {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
}

export interface ProfileFormValues {
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  aboutMe: string;
  contacts: Contacts;
}

export type ProfileProps = UserProfile & UserStatus;

export type ProfileInfoProps = Omit<
  ProfileProps,
  "photos" | "isOwner" | "savePhoto" | "saveProfile"
>;

export interface ProfileInfoFormProps
  extends Omit<ProfileInfoProps, "userId" | "status" | "updateUserStatus"> {
  onSubmit: (values: ProfileFormValues) => void;
}

export interface RouterProps {
  location: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: string | null;
  };
  navigate: (path: string) => void;
  params: {
    [key: string]: string;
  };
}

export interface Post {
  id: string;
  message: string;
  countLikes: number;
}
