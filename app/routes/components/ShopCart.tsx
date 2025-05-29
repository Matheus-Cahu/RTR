import { useState } from "react";
import { ShoppingCart } from "lucide-react";

// Interface esperada do Pedido
// interface Pedido {
//   user: string;
//   produto: number;
//   quantidade: number;
//   total: number;
// }

export default function ShopCart({ pedidos = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Quantidade total de itens no carrinho
  const totalItens = pedidos.reduce((acc, pedido) => acc + pedido.quantidade, 0);

  const toggleCarrinho = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={containerStyle}>
      <div style={iconWrapperStyle}>
        <ShoppingCart onClick={toggleCarrinho} style={cartStyle} />
        {totalItens > 0 && (
          <div style={itemCountStyle}>{totalItens}</div>
        )}
      </div>

      {isOpen && (
        <div style={cartListStyle}>
          <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Carrinho de Compras</h3>
          {pedidos.length === 0 ? (
            <div style={{ color: '#888', padding: '10px 0' }}>
              Carrinho vazio.
            </div>
          ) : (
            pedidos.map((pedido, index) => (
              <div key={index} style={cartItemStyle}>
                <div>
                  <strong>Produto: {pedido.produto}</strong>
                  <div>Quantidade: {pedido.quantidade}</div>
                                    <div>Total: R$ {pedido.total.toFixed(2)}</div>
                </div>
              </div>
            ))
          )}
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

const cartStyle = {
  cursor: 'pointer',
  fontSize: '60px',
  color: "black",
};

const itemCountStyle = {
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  backgroundColor: 'green',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '12px',
  borderRadius: '50%',
  minWidth: '22px',
  height: '22px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
};

const cartListStyle = {
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
  width: '320px',
};

const cartItemStyle = {
  marginBottom: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};