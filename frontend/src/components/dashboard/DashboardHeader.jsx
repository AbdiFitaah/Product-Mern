import { ClipboardCheck, ShoppingCart, LogOut, User } from 'lucide-react'
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

    const userName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase() : "User";

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-card/80 backdrop-blur-md border-b border-border/60 shadow-xs">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2">

                    {/* Left: Logo & Title */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-indigo-600 shadow-md shadow-primary/20">
                            <ClipboardCheck className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-base sm:text-lg font-bold text-foreground leading-tight tracking-tight">
                                Products Dashboard
                            </h1>
                            <p className="hidden xs:block text-[11px] text-muted-foreground">Store Management Center</p>
                        </div>
                    </div>

                    {/* Right: User Profile, Cart & Logout */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        
                        {/* User Profile Badge */}
                        <div className="hidden sm:flex items-center gap-2 bg-muted/60 border border-border/50 px-3 py-1.5 rounded-full">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <User className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-xs font-medium text-foreground">
                                {userName}
                            </span>
                        </div>

                        {/* Cart Button */}
                        <div className="relative">
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => setIsCartOpen(true)}
                                className="relative flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-xl border-border/80 hover:bg-accent transition-all cursor-pointer"
                            >
                                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                                
                                {cartItems?.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold ring-2 ring-background animate-in zoom-in-50">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Button>
                        </div>

                        {/* Logout Button */}
                        <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={handleLogout}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-9 sm:h-10 px-2.5 sm:px-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                        >
                            <LogOut className="h-4 w-4 sm:mr-1.5" />
                            <span className="hidden sm:inline">Logout</span>
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