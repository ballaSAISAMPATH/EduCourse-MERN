import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PlusIcon, ArrowLeftIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/solid';
import { UsersIcon, CalendarDaysIcon, CurrencyRupeeIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function MyCourses() {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth.user);
  const [enrolledCourses,setEnrollCourses] = useState(null);
  console.log(import.meta.env.VITE_SERVER_URL+"/api/admin/student/enrolledcourses")
  useEffect(()=>{
    async function getCourses(){
      console.log(user);
      try{
        const response = await axios.get(import.meta.env.VITE_SERVER_URL+"/api/admin/student/enrolledcourses",{params:{studentId:user.id}});
        console.log(response.data.enrolledCourses);
        setEnrollCourses(response.data.enrolledCourses);
      }
      catch(err){
        console.log(err);
      }
    }
    getCourses();
  },[])

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-800 rounded-full blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-800 rounded-full blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      
      <style>
          {`
          @keyframes blob {
              0% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0, 0) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite ease-in-out; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          `}
      </style>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-violet-400 mb-8">My Enrolled Courses</h1>
        {(enrolledCourses) ? (
          (enrolledCourses.length === 0) ? (
            <div className="flex flex-col justify-center items-center bg-zinc-900/70 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-zinc-800">
              <BookOpenIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses found</h3>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">request access for the courses here</h3>
              <Link className='w-35 h-10 border-violet-600 border-1 px-4 py-2 rounded-md transition duration-200 text-violet-600 hover:bg-violet-600 hover:text-white' to="/student/new-course">request access</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrolledCourses.map((individual, index) => {
                return (
                  <div
                    key={individual.courseId._id}
                    onClick={() => navigate(`/student/courses/${individual.courseId._id}`)}
                    className="group bg-zinc-900/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-zinc-800 hover:scale-105 cursor-pointer"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={individual.courseId.coverImage}
                        alt={individual.courseId.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-zinc-900/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowLeftIcon className="h-4 w-4 text-violet-400 rotate-180" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-lg font-bold text-gray-200 mb-3 group-hover:text-violet-400 transition-colors duration-200 line-clamp-2">
                        {individual.courseId.title}
                      </h2>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-400 bg-zinc-800 rounded-full px-3 py-1">
                            <UsersIcon className="h-4 w-4 mr-2 text-violet-400" />
                            <span className="font-medium">{individual.courseId.studentCount}</span>
                            <span className="ml-1">students</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-400 bg-green-900/40 rounded-full px-3 py-1">
                            <CurrencyRupeeIcon className="h-4 w-4 mr-1 text-green-400" />
                            <span className="font-bold text-green-400">₹{individual.courseId.cost}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-xs text-gray-500 bg-zinc-800 rounded-full px-3 py-2">
                          <CalendarDaysIcon className="h-4 w-4 mr-2" />
                          <span>Created {new Date(individual.courseId.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <button onClick={() => navigate(`/student/courses/${individual.courseId._id}`)} className="w-full py-2 cursor-pointer text-violet-400 border border-violet-600 hover:bg-violet-600 hover:text-white transition rounded-2xl mt-4">
                          View Course
                        </button> 
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center bg-zinc-900/70 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-zinc-800">
            <BookOpenIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No courses found</h3>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">request access for the courses here <Link className=' w-35 h-10 border-violet-600 border-1 px-4 py-2 rounded-md transition duration-200 text-violet-600 hover:bg-violet-600 hover:text-white' to="/student/new-course">request access</Link></h3>
          </div>
        )}
      </div>
    </div>
  );
}
