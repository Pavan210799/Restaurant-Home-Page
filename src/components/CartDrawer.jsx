import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartDrawer.css';

function CartDrawer({ open, onClose, panelRef }) {
  const { items, count, total, removeItem, clearCart, placeOrder } = useCart();
  const { user, openAuth } = useAuth();

  if (!open) return null;

  const handleCheckout = () => {
    if (!user) {
      onClose();
      openAuth('signin');
      return;
    }
    placeOrder();
    onClose();
  };

  return (
    <div
      className="cart-drawer"
      ref={panelRef}
      role="dialog"
      aria-label="Your bag"
    >
      <div className="cart-drawer__head">
        <h2 className="cart-drawer__title">Your Bag</h2>
        <span className="cart-drawer__count">
          {count} item{count === 1 ? '' : 's'}
        </span>
        <button
          type="button"
          className="cart-drawer__close"
          onClick={onClose}
          aria-label="Close bag"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
      </div>

      {items.length === 0 ? (
        <p className="cart-drawer__empty">
          Your bag is empty — add something tasty from the menu.
        </p>
      ) : (
        <>
          <ul className="cart-drawer__list">
            {items.map((item) => (
              <li key={item.label} className="cart-drawer__item">
                {item.image ? (
                  <img className="cart-drawer__thumb" src={item.image} alt="" />
                ) : (
                  <span className="cart-drawer__thumb cart-drawer__thumb--blank" />
                )}

                <div className="cart-drawer__info">
                  <p className="cart-drawer__name">{item.label}</p>
                  <p className="cart-drawer__meta">
                    {item.price}
                    {item.qty > 1 && (
                      <span className="cart-drawer__qty"> × {item.qty}</span>
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  className="cart-drawer__remove"
                  onClick={() => removeItem(item.label)}
                  aria-label={`Remove ${item.label} from bag`}
                >
                  <i className="fa-solid fa-trash-can" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-drawer__foot">
            <p className="cart-drawer__total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </p>
            <div className="cart-drawer__actions">
              <button
                type="button"
                className="cart-drawer__clear"
                onClick={clearCart}
              >
                Clear bag
              </button>
              <button
                type="button"
                className="cart-drawer__checkout"
                onClick={handleCheckout}
              >
                {user ? 'Place order' : 'Sign in to checkout'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartDrawer;
