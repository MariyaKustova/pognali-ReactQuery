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
    small: string,
    large: string,
  },
}

export interface ProfileContainerProps {
  userProfile: UserProfile,
  setUserProfile: (profile: any) => void,  
}
