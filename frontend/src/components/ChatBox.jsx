import React, { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Cảm ơn bạn, chúng tôi sẽ hỗ trợ bạn ngay.', sender: 'ai' },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Chat với AI về Tình Hình Kinh Doanh</h2>
      <div className="border p-4 h-64 overflow-y-scroll mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block p-2 rounded-md ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="border p-2 rounded-md flex-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi về doanh thu, lợi nhuận..."
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
