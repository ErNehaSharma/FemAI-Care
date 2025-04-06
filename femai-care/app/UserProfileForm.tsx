'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, ChangeEvent, FormEvent } from 'react';

const UserProfileForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<{
    name: string;
    age: string;
    weight: string;
    bodyType: string;
    concerns: string;
    targetWeight: string;
    diet: string;
    duration: string;
    file: File | null;
  }>({
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

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();
    for (const key in formData) {
      formPayload.append(key, formData[key as keyof typeof formData] as any);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/form/submit", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        router.push("/success");
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (error) {
      setError("Submission failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
          {/* Add other fields similarly */}
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">Submit</button>
        </>
      )}
    </form>
  );
};

export default UserProfileForm;
