import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ShoppingCart, Trash2, X } from 'lucide-react';
import React from 'react';

import api from '../../lib/auth/apiClient';
import useAuthStore from '../../lib/store/useAuthStore';

const CartSheet = ({ isOpen, onClose, cartItems = [], onRemoveItem, onClearCart }) => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const totalAmount = safeCartItems.reduce((acc, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 1;
    return acc + price * quantity;
  }, 0);

  // 🛒 Checkout Mutation
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        items: safeCartItems.map((item) => {
          const validId = item?._id || item?.id;
          return {
            productId: validId,
            product: validId, 
            name: item?.name || 'Product',
            price: Number(item?.price) || 0,
            quantity: Number(item?.quantity) || 1,
          };
        }),
        totalAmount: Number(totalAmount.toFixed(2)),
      };

      console.log('📤 Payload ka baxaya Frontend-ka:', payload);

      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const response = await api.post('/sales', payload, config);
      return response.data;
    },
    onSuccess: (data) => {
      alert('Checkout completed successfully!');

      queryClient.invalidateQueries({ queryKey: ['sales'] });

      if (onClearCart) onClearCart();
      onClose();
    },
    onError: (error) => {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Failed to save to database. Please check backend schema.';

      alert(`Error: ${backendMessage}`);
    },
  });

  const handleCheckout = (e) => {
    e.stopPropagation();

    if (!token) {
      alert('Fadlan marka hore login soo samee!');
      return;
    }

    if (safeCartItems.length === 0) {
      alert('Cart-kaagu waa eber!');
      return;
    }

    checkoutMutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full max-w-md bg-card h-full shadow-xl flex flex-col p-6 border-l border-border pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Your Shopping Cart
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {safeCartItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="mx-auto h-12 w-12 mb-3 opacity-40" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            safeCartItems.map((item, index) => {
              const itemId = item?._id || item?.id || index;
              return (
                <div
                  key={itemId}
                  className="flex items-center justify-between p-3 border rounded-lg bg-background"
                >
                  <div className="flex items-center gap-3">
                    {item?.image && (
                      <img
                        src={item.image}
                        alt={item?.name || 'Product'}
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-sm text-foreground">
                        {item?.name || 'Unnamed Item'}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        ${Number(item?.price || 0).toFixed(2)} x{' '}
                        {item?.quantity || 1}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onRemoveItem && onRemoveItem(itemId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Checkout */}
        {safeCartItems.length > 0 && (
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </div>
            <Button
              type="button"
              className="w-full relative z-20 cursor-pointer"
              onClick={handleCheckout}
              disabled={checkoutMutation.isPending}
            >
              {checkoutMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Checkout'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSheet;