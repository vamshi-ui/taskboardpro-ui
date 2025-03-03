import { MoreVertical, Pause, Play } from 'lucide-react';

const Tracking = () => {
  const tasks = [
    { 
      id: 1, 
      name: 'Create wireframe', 
      time: '1h 25m 30s',
      isActive: true
    },
    { 
      id: 2, 
      name: 'Slack logo design', 
      time: '30m 18s',
      isActive: false
    },
    { 
      id: 3, 
      name: 'Dashboard design', 
      time: '1h 48m 22s',
      isActive: false
    },
    { 
      id: 4, 
      name: 'Create wireframe', 
      time: '17m 1s',
      isActive: false
    },
    { 
      id: 5, 
      name: 'Mood tracker', 
      time: '15h 5m 58s',
      isActive: false
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">My tracking</h3>
      </div>
      
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className={`flex items-center justify-between pb-3 ${task.isActive ? 'border-l-4 border-amber-400 pl-4' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 text-gray-600">
                <div className="w-5 h-5 rounded-full border border-gray-300"></div>
              </div>
              <span className="text-sm font-medium">{task.name}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm">{task.time}</span>
              <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                {task.isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracking;
