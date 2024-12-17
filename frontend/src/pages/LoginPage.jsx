import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/api/userService'; // Import login API
import Cookies from 'js-cookie';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Eye toggle state
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Navigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      const response = await userService.login(credentials);
      Cookies.set('access_token', response.access_token);
      navigate('/'); // Redirect to homepage
    } catch (err) {
      setError(err.message); // Display error
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-gradient-to-b from-blue-400 to-blue-500 text-white flex flex-col justify-start pl-16 pt-12">
        <h1 className="text-5xl font-bold mb-2">VitalCare 👋</h1>
        <p className="text-lg">Chăm sóc sức sống của bạn!</p>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Đăng nhập</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email/Username */}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Địa chỉ email hoặc tên người dùng
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email hoặc tên người dùng"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700">
              Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'} // Toggle visibility
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Eye Toggle Icon */}
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                    {passwordVisible ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </button>
              </div>
            </div>


            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Quên mật khẩu
              </a>
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
