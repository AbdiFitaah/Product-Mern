import React from "react";
import { Edit, Trash2, ShoppingCart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({
  product,
  categories = [],
  onEdit,
  onDelete,
  onAddToCart,
  user,
}) => {
  if (!product) return null;

  // Category dynamic resolver (ID, Object, ama String)
  const getCategoryName = () => {
    if (!product?.category) return "Other";
    
    // Haddii category-ga uu yahay Object backend-ka ka yimid
    if (typeof product.category === "object") {
      return product.category.name || product.category.categoryName || "Other";
    }

    const catStr = String(product.category).toLowerCase();

    if (catStr === "6a7032d8f8ea7fbd1a61e159" || catStr === "electronics") return "Electronics";
    if (catStr === "6a70383ff8ea7fbd1a61e15d" || catStr === "shoes") return "Shoes";
    if (catStr === "6a703851f8ea7fbd1a61e15f" || catStr === "clothes") return "Clothes";
    if (catStr === "6a70385cf8ea7fbd1a61e161" || catStr === "others") return "Others";

    return product.category;
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
    <div className="group relative bg-card border border-border/60 hover:border-primary/40 rounded-2xl p-4 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full w-full overflow-hidden">
      
      <div>
        {/* Product Image Wrapper */}
        <div className="relative w-full h-48 sm:h-52 mb-4 overflow-hidden rounded-xl bg-muted/50 border border-border/30">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name || "Product"}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/30">
              <Tag className="h-8 w-8 mb-1 opacity-40" />
              <span className="text-xs">No Image Available</span>
            </div>
          )}

          {/* Floating Category Badge */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <Badge className="bg-background/80 backdrop-blur-md text-foreground border-border/60 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs capitalize">
              {getCategoryName()}
            </Badge>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 mb-4">
          <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {product.name || "Unnamed Product"}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description || "No description provided for this item."}
          </p>
        </div>
      </div>

      {/* Footer Section: Price & Actions */}
      <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2 mt-auto">
        {/* Price Display */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
            Price
          </span>
          <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
            ${Number(product.price || 0).toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Admin Edit & Delete */}
          {user?.role === "admin" && (
            <>
              {onEdit && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleEdit}
                  title="Edit Product"
                  className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
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
            size="sm"
            className="rounded-xl px-3.5 h-9 font-semibold text-xs shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;