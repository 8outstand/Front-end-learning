import { useState } from 'react'
import './styles/ShoppingCar.css'

const products = [
  { id: 1, name: 'iPhone 17', price: 5999, description: '智能手机' },
  { id: 2, name: 'MacBook Pro', price: 12999, description: '高性能笔记本电脑' },
  { id: 3, name: 'AirPods Pro', price: 1999, description: '无线降噪耳机' },
  { id: 4, name: 'iPad Air', price: 4799, description: '轻薄平板电脑' },
  { id: 5, name: 'Apple Watch', price: 2999, description: '智能手表' }
]

export const ProductList = ({ addToCart }) => {
  return (
    <div className="product-list">
      <h2 className="product-list-title">商品列表</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">¥{product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              className="add-to-cart-btn"
            >
              添加到购物车
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export const ShoppingCar = () => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, change) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change
        if (newQuantity <= 0) {
          return item
        }
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="shopping-car-container">
      <h1 className="shopping-car-title">购物车系统</h1>
      <ProductList addToCart={addToCart} />
      
      <div className="cart-container">
        <h2 className="cart-title">购物车</h2>
        {cart.length === 0 ? (
          <p className="cart-empty">购物车为空</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>单价: ¥{item.price}</p>
                </div>
                <div className="cart-item-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <p>总计: <span className="total-price">¥{totalPrice}</span></p>
              <button className="checkout-btn">
                结算
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
