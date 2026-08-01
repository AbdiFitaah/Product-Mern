import { ClipboardCheck, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../lib/store/useAuthStore';
import CartSheet from './CartSheet';

const DashboardHeader = ({ cartItems = [], onRemoveCartItem }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { user, clearAuth } = useAuthStore();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            clearAuth();
            queryClient.clear();
            navigate("/login", { replace: true });
        }
    }

    return (
        <>
            <header className="bg-card border-b border-border shadow-sm">
                <div className="w-full px-4 py-4 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <ClipboardCheck className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <h1 className="text-xl font-semibold text-foreground">Products Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            Welcome, <span className="font-medium text-foreground">{ user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1).toLowerCase() || "User"}</span>
                        </span>
                        <div className="relative">
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => setIsCartOpen(true)}
                                className="relative flex items-center justify-center"
                            >
                                <ShoppingCart className="h-5 w-5 text-foreground" />
                                
                                {cartItems?.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Button>
                        </div>

                        <Button variant={"outline"} onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Component-ka Cart Side Sheet */}
            <CartSheet 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                cartItems={cartItems}
                onRemoveItem={onRemoveCartItem}
            />
        </>
    )
}

export default DashboardHeader;