import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tasks Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Completed</span>
            <div className="flex items-center">
              <span className="font-medium text-gray-800">12</span>
              <span className="text-xs text-green-600 ml-2">+3</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">In Progress</span>
            <div className="flex items-center">
              <span className="font-medium text-gray-800">8</span>
              <span className="text-xs text-amber-600 ml-2">+2</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Pending</span>
            <div className="flex items-center">
              <span className="font-medium text-gray-800">5</span>
              <span className="text-xs text-red-600 ml-2">-1</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <CheckSquare size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Task completed</p>
              <p className="text-xs text-gray-500">Homepage redesign</p>
            </div>
            <span className="text-xs text-gray-400 ml-auto">2h ago</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Plus size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">New task added</p>
              <p className="text-xs text-gray-500">Mobile app testing</p>
            </div>
            <span className="text-xs text-gray-400 ml-auto">5h ago</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2 lg:col-span-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Deadlines</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">API Integration</p>
              <p className="text-xs text-gray-500">Website Redesign</p>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-600">Tomorrow</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">User Testing</p>
              <p className="text-xs text-gray-500">Mobile App</p>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-600">In 3 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;