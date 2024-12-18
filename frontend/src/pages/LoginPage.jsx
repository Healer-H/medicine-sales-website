import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import userService from '../services/api/userService';
import Cookies from 'js-cookie';
import { Paths } from '../constants/paths'
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      const response = await userService.login(credentials);
      Cookies.set('access_token', response.access_token); // Lưu token vào cookies
      navigate('/')
    } catch (err) {
      setError(err.message); // Lỗi đã được chuẩn hóa qua interceptor
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section */}
<div className="hidden md:flex md:w-1/3 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 text-white flex-col justify-center items-center p-12">
{/* ...existing logo and text... */}
  <div className="max-w-md text-center">
    <img 
      src="/images/transparent_logo.svg" 
      alt="VitalCare Logo" 
      className="w-32 h-32 mx-auto mb-8" // Adjusted size and margin
    />
    <h1 className="text-5xl font-bold mb-4">VitalCare</h1>
    <p className="text-xl">Chăm sóc sức khỏe của bạn là trách nhiệm của chúng tôi</p>
  </div>
</div>

      {/* Right section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Đăng nhập</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email/Username */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Địa chỉ email hoặc tên người dùng
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email hoặc tên người dùng"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Link to={Paths.FORGOT_PASSWORD} className="text-sm text-blue-500 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;