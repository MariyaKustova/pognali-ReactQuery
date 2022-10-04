import { Friend } from "../../components/NavBar/types";

export interface NavbarState {
  friends: Friend[];
}

const initialState: NavbarState = {
  friends: [
    {
      id: "1",
      name: "Sveta",
    },
    {
      id: "2",
      name: "Ann",
    },
    {
      id: "3",
      name: "Alex",
    },
  ],
};

const navbarReducer = (state = initialState, action: any) => state;

export default navbarReducer;
