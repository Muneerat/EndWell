import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditStaff() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchStaff = async () => {
        try {
          const response = await axios.get(`/api/v1/admin/user/update-profile`, formData);
          setFormData(response.data);
        } catch (error) {
          console.error("Failed to fetch staff:", error);
        }
      };
      fetchStaff();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/v1/admin/user/${id}`, formData);
      alert("Staff updated successfully.");
      router.push("/staff");
    } catch (error) {
      console.error("Failed to update staff:", error);
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Staff</h1>
      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={() => router.push("/staff")}>Cancel</button>
    </div>
  );
}
