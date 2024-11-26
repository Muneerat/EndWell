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

export default function EditMember() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const member_id = searchParams.get("member_id");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (member_id) {
      const fetchMember = async () => {
        try {
          const response = await axios.get(`/admin/member/profile`, {
            headers: {Role: 'admin'},
            // user_id as a query paramete
            params: { member_id },
          });
          setFormData({
            first_name: response.data.data.first_name || "",
            last_name: response.data.data.last_name || "",
            email: response.data.data.email || "",
            phone: response.data.data.phone || "",
            role: response.data.data.role || "",
          });
        } catch (error) {
          console.error("Failed to fetch member:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMember();
    }
  }, [member_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await axios.put(`/admin/member/update-profile`, {
        ...formData,
        member_id,
      },{ headers: {Role: 'admin'},});
      dispatch(
        addToast({
          type: "success",
          message: response.data.message,
        })
      );
      router.push("/dashboard/members");
    } catch (error) {
      console.log("Failed to update member:", error);
      handleErrors(error, setErrors);
    } finally {
      setProcessing(false);
    }
  };

   if (loading) return <p>Loading...</p>;

  return (
    <div className="md:px-6 pt-4 sm:px-14 m-3">
      <div className="flex items-center gap-8">
        <button
          onClick={() => router.push("/dashboard/members")}
          className="flex items-center gap-2 font-normal cursor-pointer"
        >
          <Back />
          <p>Back</p>
        </button>
        <h1 className="font-bold text-2xl">Edit Member</h1>
      </div>
      <div className="bg-white flex flex-col my-20 p-8 w-full shadow-sm rounded-md max-w-[1050px]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full bg-[#fff] md:p-5 mt-6 pb-32 rounded-md">
            <TextInput
              label="First name"
              id="first_name"
              name="first_name"
              placeholder="Enter your first name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              errorMessage={errors?.first_name}
            />
            <TextInput
              label="Last name"
              id="last_name"
              name="last_name"
              placeholder="Enter your last name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              errorMessage={errors?.last_name}
            />
            <TextInput
              label="Phone number"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              errorMessage={errors?.phone}
            />
            {/* <TextInput
              label="Role"
              id="role"
              name="role"
              placeholder="Enter your role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              errorMessage={errors?.role}
            /> */}
          </div>
            <Button spin={processing} disabled={processing} className="w-3/6 mt-7">
              Update
            </Button>
        </form>
      </div>
    </div>
  );
}
