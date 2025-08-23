import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";


const Account = () => {
  const {
    user,
    updateProfile: updateUserProfile,
    changePassword: updateUserPassword,
  } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const result = await updateUserProfile(form.name, form.email);

    if (result.success) {
      setMessage({ text: "Profile updated successfully!", type: "success" });
      setIsEditing(false);
    } else {
      setMessage({
        text: result.message || "Failed to update profile",
        type: "error",
      });
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return setMessage({ text: "Passwords do not match", type: "error" });
    }

    const result = await updateUserPassword(
      form.currentPassword,
      form.newPassword
    );

    if (result.success) {
      setForm({
        ...form,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage({ text: "Password changed successfully!", type: "success" });
    } else {
      setMessage({
        text: result.message || "Failed to change password",
        type: "error",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Account Settings
        </h2>

        {message.text && (
          <div
            className={`flex items-center gap-2 mb-6 p-4 rounded-lg text-sm font-medium shadow-md transition ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            {message.text}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Profile Information
          </h3>

          <div className="mb-6 text-gray-700">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium">
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={updateProfile} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow transition"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({
                      ...form,
                      name: user.name,
                      email: user.email,
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow transition"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Change Password
          </h3>
          <form onSubmit={changePassword} className="space-y-4">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword[field] ? "text" : "password"}
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword(field)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword[field] ? (
                      <EyeOff className="w-5 h-5 pointer-events-none" />
                      
                    ) : (
                      <Eye className="w-5 h-5 pointer-events-none" />
                    )}
                  </button>
                </div>

              </div>
            ))}
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
