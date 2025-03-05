import React from "react";
import { Bell, Radio, ArrowRight } from "lucide-react";
import { Card } from "primereact/card";
import Link from "next/link";
import { Button } from "primereact/button";

const NotificationsSoon = () => {
  return (
    <div className=" mx-auto py-4 flex flex-col items-center justify-center min-h-screen bg-amber-50">
      <Card className="w-full max-w-2xl shadow-lg border-amber-200">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-100 p-6 rounded-full">
              <Bell size={48} className="text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-amber-800">
            Notifications Coming Soon!
          </div>
        </div>

        <div className="space-y-6">
          {/* <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Radio className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-amber-800">
                  Real-time WebSocket Integration
                </h3>
                <p className="text-gray-600 mt-1">
                  Iam implementing WebSocket technology to deliver instant
                  notifications without refreshing the page.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Bell className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-amber-800">
                  Task Updates & Reminders
                </h3>
                <p className="text-gray-600 mt-1">
                  Get instant notifications for task deadlines, and upcoming due
                  dates.
                </p>
              </div>
            </div>
          </div> */}

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Radio className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-amber-800">
                  Coming in the Next Update
                </h3>
                <p className="text-gray-600 mt-1">
                 Thank You !
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Link href="/tasklist">
            <Button
              label="   Return to Tasks"
              className="border-amber-500 text-amber-700 hover:bg-amber-100"
            ></Button>
          </Link>
        </div>
      </Card>

      <div className="mt-8 text-center text-amber-600 text-sm">
        <p>Expected release: Coming soon</p>
      </div>
    </div>
  );
};

export default NotificationsSoon;
