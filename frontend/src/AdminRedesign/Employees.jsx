import React, { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  Search,
  Filter,
  Plus,
} from "lucide-react";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");

  const employees = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Senior Guide",
      department: "Tour Services",
      email: "rajesh.kumar@museum.com",
      phone: "+91 98765 43210",
      joinDate: "2020-03-15",
      location: "Patna, Bihar",
      avatar: "/buddha.png",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Curator",
      department: "Collections",
      email: "priya.sharma@museum.com",
      phone: "+91 87654 32109",
      joinDate: "2019-07-22",
      location: "Bodh Gaya, Bihar",
      avatar: "/buddha.png",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Singh",
      position: "Security Officer",
      department: "Security",
      email: "amit.singh@museum.com",
      phone: "+91 76543 21098",
      joinDate: "2021-01-10",
      location: "Gaya, Bihar",
      avatar: "/buddha.png",
      status: "Active",
    },
    {
      id: 4,
      name: "Sunita Devi",
      position: "Administrative Assistant",
      department: "Administration",
      email: "sunita.devi@museum.com",
      phone: "+91 65432 10987",
      joinDate: "2020-11-05",
      location: "Patna, Bihar",
      avatar: "/buddha.png",
      status: "On Leave",
    },
    {
      id: 5,
      name: "Vikash Yadav",
      position: "IT Support",
      department: "Technology",
      email: "vikash.yadav@museum.com",
      phone: "+91 54321 09876",
      joinDate: "2022-02-14",
      location: "Bodh Gaya, Bihar",
      avatar: "/buddha.png",
      status: "Active",
    },
    {
      id: 6,
      name: "Meera Jha",
      position: "Education Coordinator",
      department: "Education",
      email: "meera.jha@museum.com",
      phone: "+91 43210 98765",
      joinDate: "2018-09-30",
      location: "Rajgir, Bihar",
      avatar: "/buddha.png",
      status: "Active",
    },
  ];

  const departments = [
    "All",
    "Tour Services",
    "Collections",
    "Security",
    "Administration",
    "Technology",
    "Education",
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "All" || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-black transition">
          <Plus size={20} />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept} >
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.position}</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <User size={16} />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={16} />
                <span>
                  Joined {new Date(employee.joinDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{employee.location}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-black transition">
                View Profile
              </button>
              <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No employees found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Employees;
