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

export interface UserProfile {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: UserContacts;
  photos: {
    small: string;
    large: string;
  };
}

export interface UserStatus {
  status: string;
  updateUserStatus: (status: string) => void;
}

export type ProfileProps = UserProfile & UserStatus;

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
