import TextInput from "../../components/TextInput";
import React from "react";

export default function MainMenu() {
  return (
    <div className="flex justify-between w-full">
      <div className="w-full flex ">
        <h1>Hello Osa,</h1>
        <TextInput
          className="w-full block"
          label="text"
          id="text"
          maxLength="255"
          placeholder="********"
          type="text"
        />
      </div>
      <div>dd</div>
    </div>
  );
}
