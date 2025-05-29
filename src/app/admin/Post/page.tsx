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
type Posts = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  slug: string;
  content: string;
  isLatest: boolean;
  createdAt: string;
  updatedAt: string;
};

const postSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  image: z.string().url("Invalid URL format"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  author: z.string().min(2, "Author must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  content: z.string().min(2, "Content must be at least 2 characters"),
  isLatest: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type PostFormValues = z.infer<typeof postSchema>;

function PostManage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const createForm = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
      author: "",
      slug: "",
      content: "",
      isLatest: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/post");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch post");
      }

      setPosts(result.data);
      console.log(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (data: PostFormValues) => {
    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          isLatest: data.isLatest ?? false,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to create category");
      }

      toast.success("Post created successfully");
      fetchPost();
      setIsCreateDialogOpen(false);
      createForm.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create category"
      );
    }
  };

  const handleUpdatePost = async (data: PostFormValues) => {
    if (!selectedPost) return;

    try {
      const response = await fetch(`/api/post/${selectedPost.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          isLatest: data.isLatest ?? false,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to update post");
      }

      toast.success("Post updated successfully");
      fetchPost();
      setIsUpdateDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update post");
    }
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;

    try {
      const response = await fetch(`/api/post/${selectedPost.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to delete Post");
      }

      toast.success("Post deleted successfully");
      fetchPost();
      setIsDeleteDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete Post");
    }
  };

  const updateForm = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  const openUpdateDialog = (post: Posts) => {
    setSelectedPost(post);
    updateForm.reset({
      title: post.title,
      description: post.description,
      image: post.image,
      category: post.category,
      author: post.author,
      slug: post.slug,
      content: post.content,
      isLatest: post.isLatest,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (post: Posts) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="Post">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Manage Posts</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Posts
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
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>IsLatest</TableHead>
              <TableHead>CreateAt</TableHead>
              <TableHead>UpdateAt</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((item) => (
              <TableRow key={item.id}>
                <TableCell width={200}>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Image
                    width={550}
                    height={100}
                    src={item.image}
                    alt={item.title}
                    className="w-50 h-50"
                  />
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell>
                  {" "}
                  {item.content.length > 200
                    ? `${item.content.substring(0, 200)}...`
                    : item.content}
                </TableCell>
                <TableCell>
                  {item.isLatest === true ? "true" : "false"}
                </TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.updatedAt}</TableCell>
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
              <DialogTitle>Create Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(handleCreatePost)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    id="title"
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      {...createForm.register("category")}
                      placeholder="Enter category"
                    />
                    {createForm.formState.errors.category && (
                      <p className="text-sm text-red-500">
                        {createForm.formState.errors.category.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      {...createForm.register("author")}
                      placeholder="Enter author"
                    />
                    {createForm.formState.errors.author && (
                      <p className="text-sm text-red-500">
                        {createForm.formState.errors.author.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Slug">Slug</Label>
                  <Input
                    id="slug"
                    {...createForm.register("slug")}
                    placeholder="Enter Slug"
                  />
                  {createForm.formState.errors.slug && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.slug.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    {...createForm.register("content")}
                    placeholder="Enter content"
                  />
                  {createForm.formState.errors.content && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.content.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="isLatest">Is Latest?</Label>
                  <div className="flex items-center gap-2">
                    <input
                      id="isLatest"
                      type="checkbox"
                      {...createForm.register("isLatest")}
                    />
                  </div>
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
                      width={550}
                      height={100}
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
                <Button type="submit">Create Post</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={updateForm.handleSubmit(handleUpdatePost)}>
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
                        width={550}
                        height={100}
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
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    {...updateForm.register("category")}
                    placeholder="Enter category"
                  />
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    {...updateForm.register("author")}
                    placeholder="Enter author"
                  />
                  <Label htmlFor="edit-slug">Slug</Label>
                  <Input
                    id="edit-slug"
                    {...updateForm.register("slug")}
                    placeholder="Enter slug"
                  />
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    {...updateForm.register("content")}
                    placeholder="Enter content"
                  />
                  <Label htmlFor="edit-isLatest">Is Latest?</Label>
                  <input
                    id="edit-isLatest"
                    type="checkbox"
                    {...updateForm.register("isLatest")}
                  />
                  {updateForm.formState.errors.title && (
                    <p className="text-sm text-red-500">
                      {updateForm.formState.errors.title.message}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update Post</Button>
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
              Are you sure you want to delete the post "{selectedPost?.title}"?
              This action cannot be undone.
            </p>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeletePost}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

export default PostManage;
