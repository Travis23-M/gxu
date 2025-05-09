import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <div className="cart-item" style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
      <img src={item.image} alt={item.name} style={{ width: 80, marginRight: 15 }} />
      <div style={{ flex: 2 }}>
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={handleQuantityChange}
          style={{ width: 50 }}
        />
        <p>Subtotal: Ksh{(item.price * item.quantity).toFixed(2)}</p>
        <button onClick={() => onRemoveItem(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
