
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockCandidates = [
  {
    id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    applications: 3,
    lastActivity: "2023-08-16T10:30:00.000Z",
  },
  {
    id: "user124",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    location: "New York, NY",
    applications: 2,
    lastActivity: "2023-08-12T14:15:00.000Z",
  },
  {
    id: "user125",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    location: "Austin, TX",
    applications: 1,
    lastActivity: "2023-08-10T09:45:00.000Z",
  },
  {
    id: "user126",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    location: "Remote",
    applications: 4,
    lastActivity: "2023-08-05T11:20:00.000Z",
  },
  {
    id: "user127",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    location: "Chicago, IL",
    applications: 2,
    lastActivity: "2023-08-02T13:10:00.000Z",
  },
];

const AdminCandidatesPage = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Candidates</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search candidates..."
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Candidates</CardTitle>
          <CardDescription>
            View and manage all job applicants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Applications</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.location}</TableCell>
                  <TableCell className="text-center">{candidate.applications}</TableCell>
                  <TableCell>{formatDate(candidate.lastActivity)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Applications</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>Download Resume</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCandidatesPage;
