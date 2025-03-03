"use client";

import { format } from "date-fns";
import { User, Mail, Calendar, Info } from "lucide-react";
import { useEffect, useState } from "react";
interface IUser {
  userName: string;
  emailId: string;
  joinedDate: string;
  role: string;
  bio: string;
}
const UserInfo = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <p className="text-gray-500">No user data found.</p>;
  }

  return (
    <main className="flex-1 flex items-center justify-center p-4 sm:p-2">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow-md border border-gray-100 rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="md:text-2xl text-xl font-bold text-gray-900">
              User Profile
            </h1>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-amber-200 flex items-center justify-center">
                  <span className="text-4xl font-semibold text-amber-600">
                    {user.userName
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-lg font-medium text-gray-900">
                    {user.userName}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Email Address
                </p>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-lg text-gray-900">{user.emailId}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Joined</p>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-lg text-gray-900">
                    {" "}
                    {format(new Date(user.joinedDate), "dd MMM yyyy, hh:mm a")}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Role</p>
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-lg text-gray-900">{user.role}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bio</h3>
              <p className="text-gray-700">
                Full-stack developer with 4+ years of experience in web design,
                development, and project management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserInfo;
