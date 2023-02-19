import axios from 'axios';
import { useState } from 'react';

function Mailing() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const onSend = async () => {
    setLoading(true);
    await axios.post(process.env.REACT_APP_BASE_URL + 'api/users/mailing', {
      message,
    });
    setLoading(false);
  };

  return (
    <>
      <div className="form mailing-form">
        <textarea
          placeholder="Сообщение"
          className="app-input"
          cols={30}
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button onClick={onSend} disabled={loading} className="button">
          {loading ? (
            <div className="loader loader--white loader--xs"></div>
          ) : (
            'Отправить'
          )}
        </button>
      </div>
    </>
  );
}

export default Mailing;
