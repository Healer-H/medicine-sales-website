import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import userService from '../services/api/userService';
import Spinner from '../components/Spinner';
import { Paths } from '../constants/paths';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sentEmail, setSentEmail] = useState(''); // Track email used for OTP
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoadingOtp(true);
    setError('');
    setSuccessMessage('');
  
    try {
      const response = await userService.forgotPassword(email);
      setOtpSent(true);
      setSentEmail(email);
      setSuccessMessage(response.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await userService.resetPassword({
        email: sentEmail,
        otp,
        newPassword: password
      });
      setSuccessMessage(response.message);
      navigate(Paths.Login);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section */}
      <div className="hidden md:flex md:w-1/3 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 text-white flex-col justify-center items-center p-12">
        <div className="max-w-md text-center">
          <img 
            src="/images/transparent_logo.svg" 
            alt="VitalCare Logo" 
            className="w-32 h-32 mx-auto mb-8" // Adjusted size and margin
          />
          <h1 className="text-5xl font-bold mb-6">VitalCare</h1>
          <p className="text-xl">Chăm sóc sức khỏe của bạn là trách nhiệm của chúng tôi</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Đặt lại mật khẩu</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* Email Input Group */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={otpSent}
                />
                <button
                type="button"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 whitespace-nowrap flex items-center gap-2 disabled:bg-gray-400"
                onClick={handleSendOtp}
                disabled={isLoadingOtp}
              >
                {isLoadingOtp && <Spinner size="sm" />}
                {otpSent ? 'Gửi lại OTP' : 'Gửi OTP'}
              </button>
              </div>
            </div>

            {/* OTP Input */}
            {otpSent && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mã OTP</label>
                <input
                  type="text"
                  placeholder="Nhập mã OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
              <div className="relative">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  placeholder="Xác nhận mật khẩu mới"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:bg-gray-400"
              disabled={loading || !otpSent}
            >
              {loading && <Spinner size="sm" />}
              Xác nhận đổi mật khẩu
            </button>

              {/* Back to login */}
              <div className="text-center mt-4">
                <Link to={Paths.LOGIN} className="text-sm text-blue-500 hover:underline">
                  Thử đăng nhập bằng mật khẩu cũ?
                </Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;