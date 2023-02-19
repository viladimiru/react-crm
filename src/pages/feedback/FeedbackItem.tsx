import axios from 'axios';
import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { FeedbackMessage } from '../../store/feedback/feedback.api';

export function FeedbackItem(props: FeedbackMessage) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_BASE_URL + 'api/users/mailing/to/' + props.chat.id,
        {
          message,
          options: {
            reply_to_message_id: props.message_id,
          },
        },
        {
          headers: {
            Authentication: 'Bearer ' + process.env.REACT_APP_API_TOKEN
          }
        }
      )
      .then(() => {
        setLoading(false);
        setIsModalVisible(false);
        setMessage('');
      });
  };
  return (
    <>
      <div className="default__card-wrap">
        <div className="default__card">
          <span>User: {props.from.username}</span>
          <span>Firstname: {props.from.first_name}</span>
          <span>Language: {props.from.language_code}</span>
          <span>Message: {props.text}</span>
          <div className="default__card-controls">
            <button className="button" onClick={() => setIsModalVisible(true)}>
              Ответить
            </button>
            <button className="button">Удалить</button>
          </div>
        </div>
      </div>
      <Modal
        onRequestClose={() => setIsModalVisible(false)}
        isOpen={isModalVisible}
        className="feedback__answer"
      >
        <h3>Ответ на сообщение</h3>
        <p>
          <small>{props.from.username}</small>
          <br />
          <small>{props.text}</small>
        </p>
        <div className="form">
          <textarea
            placeholder="Сообщение"
            className="app-input"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            disabled={isLoading}
            className="button"
            onClick={() => onSubmit()}
          >
            {isLoading ? (
              <div className="loader loader--xs"></div>
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </Modal>
    </>
  );
}
