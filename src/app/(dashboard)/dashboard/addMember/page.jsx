
import ButtonUpload from "../components/button";
import { Smile } from "@/assets/icon";
import BoardFilter from "../components/board";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";

export default function AddMember() {

  return (
    <div className="my-5">
      <BoardFilter text='Members'>
          <ButtonUpload text="Upload Multiple" icon={<Smile/>} link='uploadMember'/>
      </BoardFilter>
      <div>
      <div className="bg-white flex flex-col justify-center my-10 md:p-10 p-5 w-full md:w-2/5 shadow-sm rounded-md mx-auto items-center">
        <div className="flex flex-col gap-6 mb-12 w-full md:w-4/5">
        <div>
            <TextInput
              className="w-full block border-[#BFBFBF] text-[#3E3E3E]"
              label="First name"
              id="name"
              maxLength="255"
              placeholder="Oluwanishola"
              type="text"
              
            />
            </div>
            <div>
            <TextInput
              className="w-full block border-[#BFBFBF] text-[#3E3E3E]"
              label="Last name"
              id="name"
              maxLength="255"
              placeholder="Peter"
              type="text"
              
            />
            </div>
            <div>
            <TextInput
              className="w-full block border-[#BFBFBF] text-[#3E3E3E]"
              label="Unique number to serves as password"
              id="email"
              maxLength="255"
              placeholder="********"
              type="text"
              
            />
            </div>
            <div>
            <TextInput
              className="w-full block border-[#BFBFBF] text-[#3E3E3E]"
              label="Phone number"
              id="email"
              maxLength="255"
              placeholder="08134567945"
              type="text"
              
            />
            </div>
        
        
        <Button className=" my-2">Add </Button>
        </div>
     
      </div>
      </div>
    </div>
  );
}
