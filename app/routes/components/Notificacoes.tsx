// NotificationBell.jsx
import { useState } from "react";
import { Bell, Trash } from "lucide-react";

export default function Notificacoes({ notifications, deleteFunction}){
  const [isOpen, setIsOpen] = useState(false);
  console.log("Tipo de deleteFunction:", typeof deleteFunction);
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={containerStyle}>
      <Bell onClick={toggleNotifications} style={bellStyle} />

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

const bellStyle = {
  cursor: 'pointer',
  fontSize: '60px',
  color: "black",
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