'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import handleErrors from "@/app/data/handleErrors";
import { Back } from "@/assets/icon";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import { addToast } from "@/Store/features/toastSlice";
import { useDispatch } from "react-redux";

export default function EditStaff() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Fetch the user_id from query parameters
  const user_id = searchParams.get("user_id"); 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_id) {
      const fetchStaff = async () => {
        try {
          const response = await axios.get(`/admin/user/profile`, {
            headers: {Role: 'admin'},
            // user_id as a query parameter
            params: { user_id }, 
          });
          
          // setFormData(response.data);
          setFormData({
            first_name: response.data.data.first_name || "" ,
            last_name: response.data.data.last_name || "",
            email: response.data.data.email || "",
            phone: response.data.data.phone || "",
            department: response.data.data.department || "",
            role: response.data.data.role || "",
          });
        } catch (error) {
          console.error("Failed to fetch staff:", error);
        }
      };
      fetchStaff();
    }
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 // handle Update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true); // Disable button while processing
    try {
      const response = await axios.put(`/admin/user/update-profile`, {...formData, user_id},{headers: {Role: 'admin'},});
     dispatch(addToast({
       type:'success',
       message: response.data.message
     }))
      // console.log(response.data.message)
      router.push("/dashboard/staff");
    } catch (error) {
      console.log("Failed to update staff:", error);
      handleErrors(error, setErrors);
    } finally {
      setProcessing(false); 
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="md:px-6 pt-4 sm:px-14 m-3">
      <div className="flex items-center gap-8">
        <button
          onClick={() => router.push("/dashboard/staff")}
          className="flex items-center gap-2 font-normal cursor-pointer"
        >
          <Back />
          <p>Back</p>
        </button>

        <h1 className="font-bold text-2xl">Edit Staff</h1>
      </div>
      <div className="bg-white flex flex-col my-20 p-8 w-full shadow-sm rounded-md max-w-[1050px]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full bg-[#fff] md:p-5 mt-6 pb-32 rounded-md">
            <div>
              <TextInput
                className="w-full block"
                label="First name"
                id="first_name"
                name="first_name"
                maxLength="255"
                placeholder="Enter your first name"
                type="text"
                value={formData.first_name || ""}
                onChange={handleChange}
                errorMessage={errors?.first_name}
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Last name"
                id="last_name"
                name="last_name"
                maxLength="255"
                placeholder="Enter your last name"
                type="text"
                value={formData.last_name || ""}
                onChange={handleChange}
                errorMessage={errors?.last_name}
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Email"
                id="email"
                name="email"
                maxLength="255"
                placeholder="Enter your email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                errorMessage={errors?.email}
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Phone number"
                id="phone"
                name="phone"
                maxLength="255"
                placeholder="Enter your phone number"
                type="number"
                value={formData.phone || ""}
                onChange={handleChange}
                errorMessage={errors?.phone}
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Department"
                id="department"
                name="department"
                maxLength="255"
                placeholder="Enter your department"
                type="text"
                value={formData.department || ""}
                onChange={handleChange}
                errorMessage={errors?.department}
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Role"
                id="role"
                name="role"
                maxLength="255"
                placeholder="Enter your role"
                type="text"
                value={formData.role || ""}
                onChange={handleChange}
                errorMessage={errors?.role}
                disabled
              />
            </div>
            <div>
              <Button spin={processing} disabled={processing} className="w-full mt-7">
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
