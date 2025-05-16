// NotificationBell.jsx
import { useState } from "react";
import { Bell } from "lucide-react";
import { color } from "motion";

export default function Notificacoes({ notifications }) {
  const [isOpen, setIsOpen] = useState(false);

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
  top: '50px',  // Altere conforme necessário
  right: '0px', // Alinhado à direita do ícone
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  padding: '10px',
  zIndex: 1000,
  color: 'black',
  width: '300px', // Largura fixa para o menu
};

const notificationItemStyle = {
  marginBottom: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid #eee'
};