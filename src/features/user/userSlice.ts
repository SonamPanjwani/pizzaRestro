import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeolocation";
import { positionType } from "../../services/apiGeolocation";
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk<{
  position: { latitude: number; longitude: number };
  address: string;
}>("user/fetchAddress", async function () {
  //get the users location
  const positionObj: any = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality} , ${addressObj?.city} , ${addressObj?.countryName}`;

  return { position, address };
});

export type initialStateType = {
  username: string | null;
  statusLogin: string | null;
  status: string;
  display: string | null;
  position: positionType | null;
  address: string;
  error: string | undefined;
  userId: string | number | null;
};

const initialState: initialStateType = {
  username: localStorage.getItem("savedUsername"),
  statusLogin: localStorage.getItem("loginStatus"),
  status: "idle",
  position: null,
  address: "",
  error: "",
  display: localStorage.getItem("displayStatus"),
  userId: localStorage.getItem("userId"),
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
    setDisplay(state, action) {
      state.display = action.payload;
      localStorage.setItem("displayStatus", action.payload);
    },
    setUserId(state, action) {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "Failed fetching address";
      }),
});

export const { updateName, setStatusLogin, setDisplay, setUserId } =
  userSlice.actions;

export default userSlice.reducer;
