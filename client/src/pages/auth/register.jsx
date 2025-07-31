import CommonForm from "@/components/common/form"; 
import { toast } from "sonner";  
import { registerFormControls } from "../../config"; 
import { registerUser } from "@/store/auth-slice"; 
import { useState } from "react"; 
import { useDispatch } from "react-redux"; 
import { Link, useNavigate } from "react-router-dom"; 
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, XCircle } from "lucide-react";
import { MdPeopleAlt } from "react-icons/md";
const initialState = { 
  userName: "", 
  email: "", 
  password: "", 
  confirmPassword: "",
}; 

function AuthRegister() { 
  const [formData, setFormData] = useState(initialState); 
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  function validatePassword(password) {
    const errors = [];
    
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    
    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      errors.push("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)");
    }
    
    return errors;
  }

  function handleInputChange(field, value) {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    if (field === 'password') {
      const errors = validatePassword(value);
      setPasswordErrors(errors);
    }
  }
 
  function onSubmit(event) { 
    event.preventDefault(); 
    
    const passwordValidationErrors = validatePassword(formData.password);
    if (passwordValidationErrors.length > 0) {
      toast.error("Please fix password requirements");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    const { confirmPassword, ...submitData } = formData;
    
    dispatch(registerUser(submitData)).then((data) => { 
      if (data?.payload?.success) { 
        toast.success(data?.payload?.message); 
        navigate("/auth/login"); 
      } else { 
        toast.error(data?.payload?.message); 
      } 
    }); 
  } 

  const isFormValid = formData.userName && 
                     formData.email && 
                     formData.password && 
                     formData.confirmPassword &&
                     formData.password === formData.confirmPassword &&
                     passwordErrors.length === 0;

  const passwordRequirements = [
    { text: "At least 8 characters", test: formData.password.length >= 8 },
    { text: "One lowercase letter", test: /(?=.*[a-z])/.test(formData.password) },
    { text: "One uppercase letter", test: /(?=.*[A-Z])/.test(formData.password) },
    { text: "One number", test: /(?=.*\d)/.test(formData.password) },
    { text: "One special character", test: /(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password) }
  ];
 
  return ( 
    <div className="w-full h-screen bg-black flex items-center justify-center px-12 py-8 overflow-y-auto">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
          <MdPeopleAlt className="text-4xl text-purple-500 "/>
          </div>
          <p className="text-gray-400 text-xl">
           Let's get started with your account
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              value={formData.userName}
              onChange={(e) => handleInputChange('userName', e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {formData.password && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-300 mb-3">Password Requirements:</p>
              <div className="grid grid-cols-1 gap-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className={`flex items-center text-xs ${req.test ? 'text-green-400' : 'text-red-400'}`}>
                    {req.test ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    {req.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.confirmPassword && (
            <div className={`flex items-center text-xs ${
              formData.password === formData.confirmPassword ? 'text-green-400' : 'text-red-400'
            }`}>
              {formData.password === formData.confirmPassword ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <XCircle className="w-4 h-4 mr-2" />
              )}
              {formData.password === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
            </div>
          )}


          <button
            onClick={onSubmit}
            disabled={!isFormValid}
            className={`w-full font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md ${
              isFormValid
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Create Account
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">or sign up with</span>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition duration-200 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            <button className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition duration-200 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#F25022" d="M11.4 11.4H2.6V2.6h8.8v8.8z"/>
                <path fill="#00A4EF" d="M21.4 11.4h-8.8V2.6h8.8v8.8z"/>
                <path fill="#7FBA00" d="M11.4 21.4H2.6v-8.8h8.8v8.8z"/>
                <path fill="#FFB900" d="M21.4 21.4h-8.8v-8.8h8.8v8.8z"/>
              </svg>
            </button>

            <button className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition duration-200 shadow-sm">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>

            <button className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-700 transition duration-200 shadow-sm">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-purple-500 hover:text-purple-400 font-medium"
            >
              Sign in.
            </Link>
          </p>
        </div>
      </div>
    </div>
  ); 
} 
 
export default AuthRegister;