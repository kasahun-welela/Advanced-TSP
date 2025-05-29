"use client";

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Book } from "lucide-react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "/uploads/courses/fullstack-thumbnail.jpg",
    logo_url: "",
    price: 0,
    difficulty_level: "beginner",
    status: "draft",
    duration_months: 1,
    course_type: "free",
    delivery_method: "online",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [iconPreview, setIconPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only JPG, PNG, and GIF allowed.");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width !== 60 || img.height !== 60) {
        setError("Course icon must be exactly 60 x 60 pixels.");
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString() || "";
        setFormData((prev) => ({ ...prev, logo_url: base64 }));
        setIconPreview(base64);
      };
      reader.readAsDataURL(file);
    };
  };
  console.log("Submitting formData:", formData);
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const requiredFields = [
      "title",
      "description",
      "price",
      "difficulty_level",
      "status",
      "duration_months",
      "course_type",
      "delivery_method",
      "logo_url",
    ];

    const missingField = requiredFields.find(
      (field) => !formData[field as keyof typeof formData]
    );
    if (missingField) {
      setError(`Please fill in the required field: ${missingField}`);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses`,
        formData
      );

      if (!res.data.success) {
        console.error("Course creation failed:", res.data);
        const errorMsg =
          res.data.message ||
          res.data.error ||
          `Course creation failed. Server responded with status ${res.status}.`;
        throw new Error(errorMsg);
      }

      toast.success("Course Created", {
        description: "Your course was successfully created.",
        className: "bg-green-50 border border-green-400 text-green-700",
      });

      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        thumbnail: "/uploads/courses/fullstack-thumbnail.jpg",
        logo_url: "",
        price: 0,
        difficulty_level: "beginner",
        status: "draft",
        duration_months: 1,
        course_type: "free",
        delivery_method: "online",
      });
      setIconPreview("");
    } catch (err: any) {
      console.error("Error occurred while creating course:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { label: "Create Course", path: "/admin/courses/createCourse" },
    { label: "Create Phase", path: "/admin/courses/createPhase" },
    { label: "Create Week", path: "/admin/courses/createWeek" },
    { label: "Week Component", path: "/admin/courses/createWeekComponent" },
  ];

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <Book className="text-green-500" />
        Create Course
      </h1>

      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 ${
              pathname === tab.path
                ? "border-b-2 border-green-500 text-green-600"
                : "hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="p-6 border border-gray-200 space-y-5">
        <div className="space-y-4 text-sm">
          <div>
            <Label>
              Course Title <span className="text-red-500">*</span>
            </Label>
            <Input
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              Upload Course Icon (60x60 JPG, PNG, GIF){" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleIconUpload}
            />
            {iconPreview && (
              <img
                src={iconPreview}
                alt="Icon Preview"
                className="mt-2 rounded border w-[60px] h-[60px] object-cover"
              />
            )}
          </div>
          <div>
            <Label>
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>
              Price <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>
              Difficulty Level <span className="text-red-500">*</span>
            </Label>
            <select
              name="difficulty_level"
              value={formData.difficulty_level}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advance">Advance</option>
            </select>
          </div>

          <div>
            <Label>
              Status <span className="text-red-500">*</span>
            </Label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="draft">Draft</option>
              <option value="pending review">Pending Review</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <Label>
              Duration (months) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              name="duration_months"
              value={formData.duration_months}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>
              Delivery Method <span className="text-red-500">*</span>
            </Label>
            <Input
              name="delivery_method"
              value={formData.delivery_method}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>
              Course Type <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-6 mt-2 text-gray-700">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="course_type"
                  value="free"
                  checked={formData.course_type === "free"}
                  onChange={handleChange}
                />
                <span>Free</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="course_type"
                  value="paid"
                  checked={formData.course_type === "paid"}
                  onChange={handleChange}
                />
                <span>Paid</span>
              </label>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Course created successfully!
            </p>
          )}

          <div className="flex justify-end gap-4 pt-4">
            {/* <Button onClick={handleSubmit} disabled={loading} variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
              {loading ? "Saving..." : "Save & Create New"}
            </Button> */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-500 hover:bg-orange-600 text-white"
            >
              {loading ? "Saving..." : "Save & Next →"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
