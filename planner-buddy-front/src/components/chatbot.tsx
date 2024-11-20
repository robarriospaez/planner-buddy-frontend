import { useState } from 'react';

interface IAResponse {
  user: string
  bot: string[]
  
}

const Chatbot = () => {
  const [messages, setMessages] = useState<IAResponse[]>([]);
  const [input, setInput] = useState<string>('');

  const sendMessage = async () => {
    const response = await fetch('/api/ai/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ preference: input }),
    });

    const data = await response.json();
    setMessages([...messages, { user: input, bot: data.suggestions }]);
    setInput('');
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index}>
            <p>User: {msg.user}</p>
            <p>Bot: {msg.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
