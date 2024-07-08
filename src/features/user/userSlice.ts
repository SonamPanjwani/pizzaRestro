import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
  username: string | null;
  statusLogin: string | null;
};

const initialState: initialStateType = {
  username: localStorage.getItem("savedUsername"),
  statusLogin: localStorage.getItem("loginStatus"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
      //console.log(state);
      state.username = action.payload;
      localStorage.setItem("savedUsername", action.payload);
    },

    setStatusLogin(state, action) {
      state.statusLogin = action.payload;
      localStorage.setItem("loginStatus", action.payload);
    },
  },
});

export const { updateName, setStatusLogin } = userSlice.actions;

export default userSlice.reducer;

// type position = {
//   latitude: number;
//   longitude: number;
// };

// interface geolocationResult {
//   position: position;
//   address: string;
// }

// function getPosition(): Promise<GeolocationPosition> {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

// async function fetchAddress(): Promise<geolocationResult | null> {
//   //get the position
//   const positionObj = await getPosition();
//   const position: position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   return { position, address };
// }
// fetchAddress();
