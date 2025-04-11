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

type JobPosition = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  level: string;
  requirements: string;
  benefits: string;
  salary: string;
  createdAt: string;
  updatedAt: string;
};

const JobPositionSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  type: z.string().min(2, "Type must be at least 2 characters"),
  level: z.string().min(2, "Level must be at least 2 characters"),
  requirements: z.string().min(2, "Requirements must be at least 2 characters"),
  benefits: z.string().min(2, "Benefits must be at least 2 characters"),
  salary: z.string().min(2, "Salary must be at least 2 characters"),
});

type JobPositonFormValues = z.infer<typeof JobPositionSchema>;

function JobPositionManage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [JobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [selectedJobPosition, setSelectedJobPosition] =
    useState<JobPosition | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const createForm = useForm<JobPositonFormValues>({
    resolver: zodResolver(JobPositionSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      type: "",
      level: "",
      requirements: "",
      benefits: "",
      salary: "",
    },
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/jobPosition");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch post");
      }

      setJobPositions(result.data);
      console.log(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJobPosition = async (data: JobPositonFormValues) => {
    try {
      const response = await fetch("/api/jobPosition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to create category");
      }

      toast.success("Post created successfully");
      fetchJob();
      setIsCreateDialogOpen(false);
      createForm.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create category"
      );
    }
  };

  const handleUpdateJob = async (data: JobPositonFormValues) => {
    if (!selectedJobPosition) return;

    try {
      const response = await fetch(
        `/api/jobPosition/${selectedJobPosition.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to update Jobs");
      }

      toast.success("Jobs updated successfully");
      fetchJob();
      setIsUpdateDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update post");
    }
  };

  const handleDeleteJob = async () => {
    if (!selectedJobPosition) return;

    try {
      const response = await fetch(
        `/api/jobPosition/${selectedJobPosition.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to delete jobs");
      }

      toast.success("jobs deleted successfully");
      fetchJob();
      setIsDeleteDialogOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete jobs");
    }
  };

  const updateForm = useForm<JobPositonFormValues>({
    resolver: zodResolver(JobPositionSchema),
  });

  const openUpdateDialog = (job: JobPosition) => {
    setSelectedJobPosition(job);
    updateForm.reset({
      title: job.title,
      description: job.description,
      location: job.location,
      type: job.type,
      level: job.level,
      requirements: job.requirements,
      benefits: job.benefits,
      salary: job.salary,
    });
    setIsUpdateDialogOpen(true);
  };

  const openDeleteDialog = (job: JobPosition) => {
    setSelectedJobPosition(job);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="jobPosition">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Manage jobPosition</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Jobs
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
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Requirements</TableHead>
              <TableHead>Benefits</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>CreateAt</TableHead>
              <TableHead>UpdateAt</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {JobPositions.map((item) => (
              <TableRow key={item.id}>
                <TableCell width={200}>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.level}</TableCell>
                <TableCell>
                  {" "}
                  {item.requirements.length > 200
                    ? `${item.requirements.substring(0, 200)}...`
                    : item.requirements}
                </TableCell>
                <TableCell>{item.benefits}</TableCell>
                <TableCell>{item.salary}</TableCell>
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
              <DialogTitle>Create Job</DialogTitle>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(handleCreateJobPosition)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    id="title"
                    {...createForm.register("title")}
                    placeholder="Enter title "
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
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      {...createForm.register("location")}
                      placeholder="Enter location"
                    />
                    {createForm.formState.errors.location && (
                      <p className="text-sm text-red-500">
                        {createForm.formState.errors.location.message}
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="level">Level</Label>
                  <Input
                    id="level"
                    {...createForm.register("level")}
                    placeholder="Enter level"
                  />
                  {createForm.formState.errors.level && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.level.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    {...createForm.register("requirements")}
                    placeholder="Enter requirements"
                  />
                  {createForm.formState.errors.requirements && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.requirements.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    {...createForm.register("benefits")}
                    placeholder="Enter benefits"
                  />
                  {createForm.formState.errors.benefits && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.benefits.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Salary">Salary</Label>
                  <Textarea
                    id="Salary"
                    {...createForm.register("salary")}
                    placeholder="Enter salary"
                  />
                  {createForm.formState.errors.salary && (
                    <p className="text-sm text-red-500">
                      {createForm.formState.errors.salary.message}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Job</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={updateForm.handleSubmit(handleUpdateJob)}>
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
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    {...updateForm.register("location")}
                    placeholder="Enter location"
                  />
                  <Label htmlFor="edit-type">Type</Label>
                  <Input
                    id="edit-type"
                    {...updateForm.register("type")}
                    placeholder="Enter type"
                  />
                  <Label htmlFor="edit-level">Level</Label>
                  <Input
                    id="edit-level"
                    {...updateForm.register("level")}
                    placeholder="Enter level"
                  />
                  <Label htmlFor="edit-requirements">Requirements</Label>
                  <Input
                    id="edit-requirements"
                    {...updateForm.register("requirements")}
                    placeholder="Enter requirements"
                  />
                  <Label htmlFor="edit-benefits">Benefits</Label>
                  <Textarea
                    id="edit-benefits"
                    {...updateForm.register("benefits")}
                    placeholder="Enter benefits"
                  />
                  <Label htmlFor="edit-salary">Salary</Label>
                  <Input
                    id="edit-salary"
                    {...updateForm.register("salary")}
                    placeholder="Enter salary"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Update Jobs</Button>
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
              Are you sure you want to delete the Jobs "
              {selectedJobPosition?.title}"? This action cannot be undone.
            </p>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteJob}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

export default JobPositionManage;
