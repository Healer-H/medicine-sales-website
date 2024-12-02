import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Import hàm login từ api.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    const response = await login(credentials);
    console.log(response);
    if (response.success) {
      // Chuyển hướng sang trang Dashboard
      navigate('/');
    } else {
      // Hiển thị thông báo lỗi
      setError(response.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left section */}
      <div className="flex-1 bg-gradient-to-b from-blue-400 to-blue-500 text-white flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4">Hi, Welcome! 👋</h1>
        <p className="text-lg text-center">
          Make your design looks more attractive with 3D abstract geometric digital art.
        </p>
      </div>

      {/* Right section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Đăng nhập</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email/Username */}
            <div>
              <label htmlFor="email" className="block text-gray-700">Địa chỉ email hoặc tên người dùng</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email hoặc tên người dùng"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700">Mật khẩu</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700">Ghi nhớ đăng nhập</label>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">Quên mật khẩu</a>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg transition"
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