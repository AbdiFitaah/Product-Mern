import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import api from "../../lib/auth/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { extractErrorMessage } from "../../util/ErrorUtils";

const ProductForm = ({ product, open, onOpenChange }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [validationError, setValidationError] = useState(null);
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/category");
      return res.data?.data || res.data || [];
    },
    enabled: open, 
  });

  useEffect(() => {
    if (product) {
      setFormValues({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category:
          typeof product.category === "object"
            ? product.category?._id || ""
            : product.category || "",
        image: product.image || "",
      });
    } else {
      setFormValues({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    }

    setValidationError(null);
  }, [product, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  // Create Product
  const createProductMutation = useMutation({
    mutationFn: async (productData) => {
      const response = await api.post("/product", productData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onOpenChange?.(false);
      setFormValues({ name: "", description: "", price: "", category: "", image: "" });
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
      setValidationError(msg);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (productData) => {
      const response = await api.put(`/product/${product._id}`, productData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onOpenChange?.(false);
      setFormValues({ name: "", description: "", price: "", category: "", image: "" });
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
      setValidationError(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.name.trim()) {
      setValidationError("Product name is required");
      return;
    }

    if (!formValues.price) {
      setValidationError("Price is required");
      return;
    }

    if (!formValues.category) {
      setValidationError("Please select a category");
      return;
    }

    const productData = {
      name: formValues.name.trim(),
      description: formValues.description.trim(),
      price: Number(formValues.price),
      category: formValues.category, 
      image: formValues.image.trim(),
    };

    if (product) {
      updateProductMutation.mutate(productData);
    } else {
      createProductMutation.mutate(productData);
    }
  };

  const displayError =
    validationError ||
    (createProductMutation.error ? extractErrorMessage(createProductMutation.error) : null) ||
    (updateProductMutation.error ? extractErrorMessage(updateProductMutation.error) : null);

  const isLoading =
    createProductMutation.isPending || updateProductMutation.isPending;

  // 🔑 SHAKIGA HAKAN KA SAX: Magaca category-ga ID-gaas u dhigma soo hel
  const selectedCategoryObj = categories.find(
    (cat) => String(cat._id) === String(formValues.category)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {product ? "Update Product" : "Create New Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the product information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {displayError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {displayError}
            </div>
          )}

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleInputChange}
              placeholder="0.00"
              required
            />
          </div>

          {/* Category Dropdown (SAXAN) */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            {isLoadingCategories ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 border rounded-md">
                <Loader className="animate-spin h-4 w-4" /> Loading categories...
              </div>
            ) : (
              <Select
                value={formValues.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Category">
                    {/* Halkan ku muuji magaca haddii la doortay, ama placeholder */}
                    {selectedCategoryObj ? selectedCategoryObj.categoryName : "Select a Category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      No categories found
                    </div>
                  ) : (
                    categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formValues.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin h-4 w-4" />
                  {product ? "Updating..." : "Creating..."}
                </span>
              ) : product ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;