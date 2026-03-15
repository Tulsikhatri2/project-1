import React, { useMemo } from "react";
import { useTodo } from "../context/TodoContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  LineChart,
  AreaChart,
  RadarChart,
  Line,
  Area,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const Reports = () => {
  const { allTodos } = useTodo();

  const statusData = useMemo(() => {
    const counts = { Pending: 0, InProgress: 0, Completed: 0 };

    allTodos.forEach((todo) => {
      if (counts[todo.status] !== undefined) {
        counts[todo.status]++;
      }
    });

    return [
      { name: "Pending", value: counts.Pending, fill: "#8b5cf6" },
      { name: "In Progress", value: counts.InProgress, fill: "#ec4899" },
      { name: "Completed", value: counts.Completed, fill: "#06b6d4" },
    ];
  }, [allTodos]);

  const priorityData = useMemo(() => {
    const counts = { High: 0, Medium: 0, Low: 0 };

    allTodos.forEach((todo) => {
      if (counts[todo.priority] !== undefined) {
        counts[todo.priority]++;
      }
    });

    return [
      { name: "High", value: counts.High },
      { name: "Medium", value: counts.Medium },
      { name: "Low", value: counts.Low },
    ];
  }, [allTodos]);

  const statusBarData = [
    { name: "Pending", value: statusData.find(s => s.name === "Pending")?.value || 0 },
    { name: "In Progress", value: statusData.find(s => s.name === "In Progress")?.value || 0 },
    { name: "Completed", value: statusData.find(s => s.name === "Completed")?.value || 0 },
  ];

  const timelineData = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 3 },
    { day: "Wed", tasks: 5 },
    { day: "Thu", tasks: 6 },
    { day: "Fri", tasks: 8 },
  ];

  const radarData = [
    { priority: "High", value: priorityData.find(p => p.name === "High")?.value || 0 },
    { priority: "Medium", value: priorityData.find(p => p.name === "Medium")?.value || 0 },
    { priority: "Low", value: priorityData.find(p => p.name === "Low")?.value || 0 },
  ];

  const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#14b8a6"];

  return (
    <div className="space-y-8 animate-fade-in-up bg-[#0d0f14] min-h-full">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">Reports</h1>
        <p className="mt-1 text-xs text-gray-500">
          Visual insights into your tasks and productivity.
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Priority Overview */}
        <div className="bg-[#161b22] border border-gray-800/50 rounded-2xl p-4 shadow-sm h-[260px] flex flex-col">
          <h2 className="text-sm font-bold text-gray-200 mb-2">Priority Overview</h2>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="priority" tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fill: '#4b5563', fontSize: 8 }} />
              <Radar dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.5} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Productivity Trend */}
        <div className="bg-[#161b22] border border-gray-800/50 rounded-2xl p-4 shadow-sm h-[260px] flex flex-col">
          <h2 className="text-sm font-bold text-gray-200 mb-2">Productivity Trend</h2>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={{ stroke: '#374151' }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={{ stroke: '#374151' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Area type="monotone" dataKey="tasks" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Task Growth */}
        <div className="bg-[#161b22] border border-gray-800/50 rounded-2xl p-4 shadow-sm h-[260px] flex flex-col">
          <h2 className="text-sm font-bold text-gray-200 mb-2">Task Growth</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={{ stroke: '#374151' }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={{ stroke: '#374151' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Line type="monotone" dataKey="tasks" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Tasks by Status */}
        <div className="bg-[#161b22] border border-gray-800/50 rounded-2xl p-4 shadow-sm h-[260px] flex flex-col">
          <h2 className="text-sm font-bold text-gray-200 mb-2">Tasks by Status</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusBarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={{ stroke: '#374151' }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={{ stroke: '#374151' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 5. Task Status Distribution */}
        <div className="bg-[#161b22] border border-gray-800/50 rounded-2xl p-4 shadow-sm h-[260px] flex flex-col">
          <h2 className="text-sm font-bold text-gray-200 mb-2">Task Status Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="45%"
              innerRadius="35%"
              outerRadius="75%"
              barSize={12}
              data={statusData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar dataKey="value" cornerRadius={6}>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </RadialBar>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                iconSize={8} 
                wrapperStyle={{ fontSize: '10px', color: '#9ca3af', paddingTop: '10px' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* 6. Tasks by Priority */}
        <div className="bg-[#161b22] border border-gray-800/50 rounded-2xl p-4 shadow-sm h-[260px] flex flex-col">
          <h2 className="text-sm font-bold text-gray-200 mb-2">Tasks by Priority</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[(index + 1) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                iconSize={8} 
                wrapperStyle={{ fontSize: '10px', color: '#9ca3af', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800/50 shadow-lg">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total Tasks</p>
          <p className="text-3xl font-black text-gray-100">{allTodos.length}</p>
        </div>

        <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800/50 shadow-lg">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Completion Rate</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-emerald-400">
              {allTodos.length
                ? Math.round(
                    ((statusData.find(d => d.name === "Completed")?.value || 0) /
                      allTodos.length) * 100
                  )
                : 0}
              %
            </p>
            <span className="text-xs text-gray-500 font-medium">of all tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
