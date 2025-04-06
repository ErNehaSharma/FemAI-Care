import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

const UserProfileForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    bodyType: "",
    concerns: "",
    targetWeight: "",
    diet: "",
    duration: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:5000/api/form/submit", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/success"); // ✅ Redirect to success page
    } catch (error) {
      alert("Submission failed.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg space-y-4">
      {/* input fields */}
    </form>
  );
};

export default UserProfileForm;
