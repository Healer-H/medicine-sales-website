import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Oops! Trang không tồn tại
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Trang bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <IoArrowBackCircle className="mr-2 text-xl" />
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default NotFound;