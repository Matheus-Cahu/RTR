import { useState } from "react";
import { Bell, Trash } from "lucide-react";

export default function Notificacoes({ notifications, deleteFunction }) {
  const [isOpen, setIsOpen] = useState(false);

  // Verifique se há notificações não lidas
  const hasUnreadNotifications = notifications.some(notification => !notification.seen);

  const updateSeen = () => {
    notifications.forEach(notification => {
      if (!notification.seen) {
        // Atualize o estado da notificação para 'seen = true'
        notification.seen = true;
      }
    });
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      updateSeen();
    }
  };

  return (
    <div style={containerStyle}>
      <div style={iconWrapperStyle}>
        <Bell onClick={toggleNotifications} style={bellStyle} />
        {hasUnreadNotifications && <div style={unreadDotStyle} />}
      </div>

      {isOpen && (
        <div style={notificationStyle}>
          {notifications.map((notification, index) => (
            <div key={index} style={notificationItemStyle}>
              <strong>{notification.titulo}</strong>
              <p>{notification.conteudo}</p>
              <Trash onClick={() => deleteFunction(notification.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  position: 'relative',
  display: 'inline-block',
};

const iconWrapperStyle = {
  position: 'relative',
};

const bellStyle = {
  cursor: 'pointer',
  fontSize: '60px',
  color: "black",
};

const unreadDotStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  height: '10px',
  width: '10px',
  backgroundColor: 'red',
  borderRadius: '50%',
};

const notificationStyle = {
  position: 'absolute',
  top: '50px',
  right: '0px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  padding: '10px',
  zIndex: 1000,
  color: 'black',
  width: '300px',
};

const notificationItemStyle = {
  marginBottom: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid #eee',
};