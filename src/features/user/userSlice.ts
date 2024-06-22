import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
  username: string;
};

const initialState: initialStateType = {
  username: " ",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
      console.log(state);
    },
  },
});

export const { updateName } = userSlice.actions;

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
