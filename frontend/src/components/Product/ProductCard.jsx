import React from "react";
import { Edit, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

const ProductCard = ({
  product,
  categories = [],
  onEdit,
  onDelete,
  onAddToCart,
  user,
}) => {
  if (!product) return null;

  


  const getCategoryName = () => {
    let productNmae = "Other";
    if( product.category == "6a7032d8f8ea7fbd1a61e159"){
      productNmae = "Electronics"
    }
    if( product.category == "6a70383ff8ea7fbd1a61e15d"){
      productNmae = "Shoes"
    }
    if( product.category == "6a703851f8ea7fbd1a61e15f"){
      productNmae = "Clothes"
    }
    if( product.category == "6a70385cf8ea7fbd1a61e161"){
      productNmae = "Others"
    }
  
    return productNmae;  

  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(product);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) onEdit(product);
  };

  return (
    <div className="bg-card border rounded-xl p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full w-full">
      <div>
        {/* Product Image */}
        {product.image && (
          <div className="relative w-full h-36 sm:h-44 md:h-48 mb-3 sm:mb-4 overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name || "Product"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Category Badge & Title */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg text-foreground line-clamp-1">
            {product.name || "Unnamed Product"}
          </h3>
          <Badge variant="outline" className="capitalize text-[10px] sm:text-xs shrink-0">
            {getCategoryName()}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 sm:mb-4">
          {product.description || "No description provided."}
        </p>
      </div>

      {/* Footer: Price & Actions */}
      <div className="pt-3 sm:pt-4 border-t border-border flex flex-col xs:flex-row items-stretch xs:items-center justify-between mt-auto gap-2.5 sm:gap-2">
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground block">Price</span>
          <span className="text-lg sm:text-xl font-bold text-green-600">
            ${Number(product.price || 0).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 w-full xs:w-auto justify-end">
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
                  className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
                >
                  <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 sm:h-9 sm:w-9 shrink-0"
                  onClick={handleDelete}
                  title="Delete Product"
                >
                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              )}
            </>
          )}

          {/* Add to Cart Button */}
          <Button
            type="button"
            onClick={handleAddToCart}
            size="sm"
            className="flex-1 xs:flex-none items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="whitespace-nowrap">Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;