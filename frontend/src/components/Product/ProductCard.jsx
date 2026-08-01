import React, { useEffect } from "react";
import { Edit, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ product, onEdit, onDelete, onAddToCart, user }) => {
  // 1. Data Safety Check
  if (!product) return null;

  // object of every category id to choose
  const Electronics = '6a6ca5fbcdbab9525f2b6ed1';
  const Clothes="6a6ca631cdbab9525f2b6ed3"
  const Shoes = "6a6ca640cdbab9525f2b6ed5"
  const Others = "Others6a6ca652cdbab9525f2b6ed7"

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation(); 

    if (onAddToCart) {
      console.log("🛒 Adding item to cart:", product);
      onAddToCart(product);
    } else {
      console.error("onAddToCart prop is missing or undefined in ProductCard!");
    }
  };

  // 3. Safe Delete Handler
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onEdit) {
      onEdit(product);
    }
  };

  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        {/* Product Image */}
        {product.image && (
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name || "Product"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Category Badge & Title */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-foreground line-clamp-1">
            {product.name || "Unnamed Product"}
          </h3>
          {product.category && (
            <Badge variant="outline" className="capitalize text-xs">
              { product.category == Electronics? "Electronics" : product.category == Clothes  ? "Clothes" :product.category == Shoes ? "Shoes" : product.category == Others ? "Others" : product.category}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description || "No description provided."}
        </p>
      </div>

      {/* Footer: Price & Actions */}
      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto gap-2">
        <div>
          <span className="text-xs text-muted-foreground block">Price</span>
          <span className="text-xl font-bold text-green-600">
            ${Number(product.price || 0).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Admin Buttons (Edit / Delete) */}
          {user?.role === "admin" && (
            <>
              {onEdit && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleEdit}
                  title="Edit Product"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleDelete}
                  title="Delete Product"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </>
          )}

          {/* Add to Cart Button */}
          <Button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;