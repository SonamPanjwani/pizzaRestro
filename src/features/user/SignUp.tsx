import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Form, useNavigate } from "react-router-dom";
import ButtonStyle from "../../uiComponents/ButtonStyle";
import { FormEvent, useState } from "react";
import { supabase } from "../../services/client";

function SignUp() {
  const username = useSelector((state: RootState) => state.user.username);
  console.log(username);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());
    console.log(dataObject);
    const { Email, Password, passwordConfirm, Customer, Phone } = dataObject;

    if (Password !== passwordConfirm) {
      setError("Passwords do not match");

      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: Email as string,
      password: Password as string,
      options: {
        data: {
          Customer,
          contact: Phone,
        },
      },
    });
    if (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    } else {
      navigate("/login");
      console.log(data);
    }
  }

  return (
    <div className="px-4 py-5 mt-20 bg-yellow-200 bg-opacity-35">
      <h2 className="text-[35px]  text-stone-900 font-semibold mb-8">
        New Customer Registeration
      </h2>
      <Form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
            Name
          </label>
          <input
            className="input grow  text-stone-900 capitalize"
            type="text"
            name="Customer"
            defaultValue={username}
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
            Contact No.
          </label>
          <div className="grow">
            <input
              className="input mb-8 w-full text-stone-900"
              type="tel"
              name="Phone"
              required
            />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
            EmailID
          </label>
          <div className="grow">
            <input
              className="input mb-8 w-full text-stone-900"
              type="email"
              name="Email"
              required
            />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40  text-stone-900 font-semibold text-lg">
            Password
          </label>
          <div className="grow">
            <input
              className="input mb-8 w-full text-stone-900"
              type="password"
              name="Password"
              required
            />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-10 sm:flex-row sm:items-center">
          <label className="sm:basis-40 text-stone-900 font-semibold text-lg">
            Retype Password
          </label>

          <input
            className="input w-full text-stone-900"
            type="password"
            name="passwordConfirm"
            required
          />
          <span className="bg-yellow-200 bg-opacity-35 rounded-xl text-red-900 text-lg  font-semibold px-3 py-1">
            {error}
          </span>
        </div>
        <div className="flex flex-row items-center text-center gap-3">
          <ButtonStyle type="primary">Create Account</ButtonStyle>
          <ButtonStyle type="primary" to="/">
            Cancel
          </ButtonStyle>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
