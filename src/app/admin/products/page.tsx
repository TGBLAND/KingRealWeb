"use client";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
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
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
type Products = {
  id: number;
  title: string;
  price: string;
  priceUnit: string;
  area: string;
  address: string;
  legal: string;
  type: string;
  balconies: string;
  bedrooms: string;
  bathrooms: string;
  directionBalcony: string;
  direction: string;
  pricePerM2: string;
  floors: string;
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
  title: z.string().min(2),
  price: z.string().min(2),
  priceUnit: z.string().min(1),
  area: z.string().optional(),
  address: z.string().optional(),
  legal: z.string().optional(),
  type: z.string().optional(),
  balconies: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  directionBalcony: z.string().optional(),
  direction: z.string().optional(),
  pricePerM2: z.string(),
  floors: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.string().min(1),
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
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const createForm = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: "",
      priceUnit: "",
      area: "",
      address: "",
      legal: "",
      type: "",
      balconies: "",
      bedrooms: "",
      bathrooms: "",
      directionBalcony: "",
      direction: "",
      pricePerM2: "",
      floors: "",
      description: "",
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
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      files.forEach((file, index) => {
        formData.append("images", file);
      });

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to submit: ${errorText}`);
      }

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to create product");
      }

      toast.success("Product created successfully");
      fetchProduct();
      setIsCreateDialogOpen(false);
      createForm.reset();
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create product"
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
      title: product.title,
      price: product.price,
      priceUnit: product.priceUnit,
      area: product.area,
      address: product.address,
      legal: product.legal,
      type: product.type,
      balconies: product.balconies,
      bedrooms: product.bedrooms,
      bathrooms: product.bathrooms,
      directionBalcony: product.directionBalcony,
      direction: product.direction,
      pricePerM2: product.pricePerM2,
      floors: product.floors,
      description: product.description,
      categoryId: product.categoryId || "",
    });
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (product: Products) => {
    setSelectedProducts(product);
    setIsDeleteDialogOpen(true);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  }, []);

  useEffect(() => {
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);
    console.log(objectUrls);
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

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
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>PriceUnit</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Legal</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Balconies</TableHead>
              <TableHead>Bedrooms</TableHead>
              <TableHead>Bathrooms</TableHead>
              <TableHead>DirectionBalcony</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>PricePerM2</TableHead>
              <TableHead>Floors</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow key={item.id}>
                <TableCell width={200}>{item.title}</TableCell>
                <TableCell width={200}>{item.price}</TableCell>
                <TableCell width={200}>{item.priceUnit}</TableCell>
                <TableCell width={200}>{item.area}</TableCell>
                <TableCell width={200}>{item.address}</TableCell>
                <TableCell width={200}>{item.legal}</TableCell>
                <TableCell width={200}>{item.type}</TableCell>
                <TableCell width={200}>{item.balconies}</TableCell>
                <TableCell width={200}>{item.bedrooms}</TableCell>
                <TableCell width={200}>{item.bathrooms}</TableCell>
                <TableCell width={200}>{item.directionBalcony}</TableCell>
                <TableCell width={200}>{item.direction}</TableCell>
                <TableCell width={200}>{item.pricePerM2}</TableCell>
                <TableCell width={200}>{item.floors}</TableCell>
                <TableCell>{item.description}</TableCell>
                {/* <TableCell>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={240}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </TableCell> */}
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
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Products</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={createForm.handleSubmit(handleCreateProduct)}
              encType="multipart/form-data"
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    id="name"
                    {...createForm.register("title")}
                    placeholder="Enter title"
                  />
                  {createForm.formState.errors.title && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.title.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    {...createForm.register("price")}
                    placeholder="Enter price"
                  />
                  {createForm.formState.errors.price && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.price.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priceUnit">PriceUnit</Label>
                  <Input
                    id="priceUnit"
                    {...createForm.register("priceUnit")}
                    placeholder="Enter priceUnit"
                  />
                  {createForm.formState.errors.priceUnit && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.priceUnit.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    {...createForm.register("area")}
                    placeholder="Enter area"
                  />
                  {createForm.formState.errors.area && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.area.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    {...createForm.register("address")}
                    placeholder="Enter address"
                  />
                  {createForm.formState.errors.address && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="legal">Legal</Label>
                  <Input
                    id="legal"
                    {...createForm.register("legal")}
                    placeholder="Enter legal"
                  />
                  {createForm.formState.errors.legal && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.legal.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    {...createForm.register("type")}
                    placeholder="Enter type"
                  />
                  {createForm.formState.errors.type && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.type.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="balconies">Balconies</Label>
                  <Input
                    id="balconies"
                    {...createForm.register("balconies")}
                    placeholder="Enter balconies"
                  />
                  {createForm.formState.errors.balconies && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.balconies.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    {...createForm.register("bedrooms")}
                    placeholder="Enter bedrooms"
                  />
                  {createForm.formState.errors.bedrooms && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.bedrooms.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    {...createForm.register("bathrooms")}
                    placeholder="Enter bathrooms"
                  />
                  {createForm.formState.errors.bathrooms && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.bathrooms.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="directionBalcony">DirectionBalcony</Label>
                  <Input
                    id="directionBalcony"
                    {...createForm.register("directionBalcony")}
                    placeholder="Enter directionBalcony"
                  />
                  {createForm.formState.errors.directionBalcony && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.directionBalcony.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="direction">Direction</Label>
                  <Input
                    id="direction"
                    {...createForm.register("direction")}
                    placeholder="Enter direction"
                  />
                  {createForm.formState.errors.direction && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.direction.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pricePerM2">PricePerM2</Label>
                  <Input
                    id="pricePerM2"
                    {...createForm.register("pricePerM2")}
                    placeholder="Enter pricePerM2"
                  />
                  {createForm.formState.errors.pricePerM2 && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.pricePerM2.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="floors">Floors</Label>
                  <Input
                    id="floors"
                    {...createForm.register("floors")}
                    placeholder="Enter floors"
                  />
                  {createForm.formState.errors.floors && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.floors.message}
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
                  <Label htmlFor="image">Image</Label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                  />
                  {/* {createForm.formState.errors.image && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.image.message}
                    </p>
                  )} */}
                </div>
                {previews.slice(0, 4).map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    width={96}
                    height={96}
                    alt={`preview-${i}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}

                {previews.length > 4 && (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-sm rounded border">
                    +{previews.length - 4} ảnh
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
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    {...updateForm.register("title")}
                    placeholder="Enter title"
                  />
                  <Label htmlFor="edit-description">Description</Label>
                  <Input
                    id="edit-description"
                    {...updateForm.register("description")}
                    placeholder="Enter Description"
                  />
                  <Label htmlFor="edit-image">Image URL</Label>
                  {/* <Input
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
                  )} */}
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
              Are you sure you want to delete the post "{selectedProduct?.title}
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
