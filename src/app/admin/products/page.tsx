"use client";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { create } from "domain";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
type Products = {
  id: number;
  name: string;
  description: string;
  categoryId: string | null;
  image: string;
  category: Category | null;
};

type Category = {
  id: number;
  name: string;
};

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Invalid URL"),
  categoryId: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

function ProductsManage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProducts] = useState<Products | null>(
    null
  );
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const createForm = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    Promise.all([fetchProduct(), fetchCategories()]);
  }, []);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch post");
      }

      setProducts(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch categories");
      }

      setCategories(result.data);
      return result.data;
    } catch (err) {
      toast.error("Failed to fetch categories");
      return [];
    }
  };

  const handleCreateProduct = async (data: ProductFormValues) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          categoryId: data.categoryId || null,
        }),
      });
      console.log(data);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to create products");
      }

      toast.success("Products created successfully");
      fetchProduct();
      setIsCreateDialogOpen(false);
      createForm.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create products"
      );
    }
  };

  const handleUpdateProduct = async (data: ProductFormValues) => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          categoryId: data.categoryId || null,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to update post");
      }

      toast.success("Post updated successfully");
      fetchProduct();
      setIsUpdateDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update post");
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to delete Post");
      }

      toast.success("Post deleted successfully");
      fetchProduct();
      setIsDeleteDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete Post");
    }
  };

  const updateForm = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const openUpdateDialog = (product: Products) => {
    setSelectedProducts(product);
    updateForm.reset({
      name: product.name,
      description: product.description,
      image: product.image,
      categoryId: product.categoryId || "",
    });
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (product: Products) => {
    setSelectedProducts(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="Products Management">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Manage Products</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Products
        </Button>
      </div>

      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.id}>
                <TableCell width={200}>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={240}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell>
                  {item.category ? (
                    <span className="inline-block rounded-full px-2 py-1 text-xs bg-blue-100 text-blue-800">
                      {item.category.name}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openUpdateDialog(item)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(item)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Products</DialogTitle>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(handleCreateProduct)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    id="name"
                    {...createForm.register("name")}
                    placeholder="Enter title"
                  />
                  {createForm.formState.errors.name && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    {...createForm.register("description")}
                    placeholder="Enter description"
                  />
                  {createForm.formState.errors.description && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.description.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="categoryId">Category</Label>
                  <select
                    id="categoryId"
                    {...createForm.register("categoryId")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">None</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    {...createForm.register("image")}
                    placeholder="https://example.com/image.jpg"
                  />
                  {createForm.formState.errors.image && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.image.message}
                    </p>
                  )}
                </div>
                {createForm.watch("image") && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Image Preview:
                    </p>
                    <Image
                      width={500}
                      height={300}
                      src={createForm.watch("image")}
                      alt="Preview"
                      className="max-w-full h-32 object-contain border rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/150?text=Invalid";
                      }}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Create Products</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Products</DialogTitle>
            </DialogHeader>
            <form onSubmit={updateForm.handleSubmit(handleUpdateProduct)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    {...updateForm.register("name")}
                    placeholder="Enter title"
                  />
                  <Label htmlFor="edit-description">Description</Label>
                  <Input
                    id="edit-description"
                    {...updateForm.register("description")}
                    placeholder="Enter Description"
                  />
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    {...updateForm.register("image")}
                    placeholder="https://example.com/image.jpg"
                  />
                  {updateForm.watch("image") && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">
                        Image Preview:
                      </p>
                      <Image
                        width={500}
                        height={300}
                        src={updateForm.watch("image")}
                        alt="Preview"
                        className="max-w-full h-32 object-contain border rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150?text=Invalid";
                        }}
                      />
                    </div>
                  )}
                  <Label htmlFor="edit-categoryId">Category</Label>
                  <select
                    id="edit-categoryId"
                    {...updateForm.register("categoryId")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">None</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update products</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to delete the post "{selectedProduct?.name}
              "? This action cannot be undone.
            </p>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteProduct}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

export default ProductsManage;
