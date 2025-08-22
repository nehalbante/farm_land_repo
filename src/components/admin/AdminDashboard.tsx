import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  ArrowLeft,
  Users,
  Package,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  MoreVertical,
  AlertTriangle,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'admin';
  location: {
    district: string;
    village: string;
  };
};

interface AdminDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const mockStats = {
  totalUsers: 1247,
  activeListings: 542,
  totalBookings: 3891,
  monthlyRevenue: 125000
};

const mockUsers = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    email: 'ramesh@email.com',
    status: 'active',
    joinDate: '2024-01-15',
    totalListings: 3,
    totalBookings: 8,
    location: 'Pune, Maharashtra'
  },
  {
    id: '2',
    name: 'Suresh Patil',
    email: 'suresh@email.com',
    status: 'active',
    joinDate: '2024-01-10',
    totalListings: 5,
    totalBookings: 15,
    location: 'Pune, Maharashtra'
  },
  {
    id: '3',
    name: 'Amit Sharma',
    email: 'amit@email.com',
    status: 'pending',
    joinDate: '2024-01-20',
    totalListings: 2,
    totalBookings: 3,
    location: 'Mumbai, Maharashtra'
  }
];

const mockListings = [
  {
    id: '1',
    title: 'John Deere 5310 Tractor',
    owner: 'Suresh Patil',
    category: 'machines',
    price: 1500,
    status: 'active',
    dateAdded: '2024-01-18',
    bookings: 5,
    rating: 4.8,
    flagged: false
  },
  {
    id: '2',
    title: 'Suspicious Cheap Harvester',
    owner: 'Unknown User',
    category: 'machines',
    price: 100,
    status: 'pending',
    dateAdded: '2024-01-22',
    bookings: 0,
    rating: 0,
    flagged: true
  }
];

const mockBookings = [
  {
    id: '1',
    listing: 'John Deere 5310 Tractor',
    renter: 'Ramesh Kumar',
    owner: 'Suresh Patil',
    startDate: '2024-01-25',
    endDate: '2024-01-27',
    status: 'confirmed',
    amount: 4500,
    commission: 450
  },
  {
    id: '2',
    listing: 'Rotary Tiller Set',
    renter: 'Raj Patel',
    owner: 'Amit Sharma',
    startDate: '2024-01-28',
    endDate: '2024-01-30',
    status: 'disputed',
    amount: 2400,
    commission: 240
  }
];

export function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleApproveUser = (userId: string) => {
    console.log('Approving user:', userId);
  };

  const handleSuspendUser = (userId: string) => {
    console.log('Suspending user:', userId);
  };

  const handleApproveListing = (listingId: string) => {
    console.log('Approving listing:', listingId);
  };

  const handleRejectListing = (listingId: string) => {
    console.log('Rejecting listing:', listingId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => onNavigate('home')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl">Admin Dashboard</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Admin</Badge>
            <Avatar>
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{mockStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Active Listings</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{mockStats.activeListings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{mockStats.totalBookings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +24% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">₹{mockStats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +18% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.location}</p>
                          </div>
                        </div>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Flagged Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockListings.filter(listing => listing.flagged).map((listing) => (
                      <div key={listing.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="font-medium">{listing.title}</p>
                            <p className="text-sm text-muted-foreground">by {listing.owner}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Review</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">User Management</h2>
              <Button>Export Users</Button>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.totalListings}</TableCell>
                      <TableCell>{user.totalBookings}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleApproveUser(user.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Suspend
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Listing Management</h2>
              <Button>Export Listings</Button>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Listing</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {listing.flagged && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                          <div>
                            <p className="font-medium">{listing.title}</p>
                            <p className="text-sm text-muted-foreground">Added {listing.dateAdded}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{listing.owner}</TableCell>
                      <TableCell className="capitalize">{listing.category}</TableCell>
                      <TableCell>₹{listing.price}/day</TableCell>
                      <TableCell>
                        <Badge variant={
                          listing.status === 'active' ? 'default' :
                          listing.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {listing.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{listing.bookings}</TableCell>
                      <TableCell>
                        {listing.rating > 0 ? (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{listing.rating}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No reviews</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleApproveListing(listing.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRejectListing(listing.id)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Booking Management</h2>
              <Button>Export Bookings</Button>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Listing</TableHead>
                    <TableHead>Renter</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.listing}</TableCell>
                      <TableCell>{booking.renter}</TableCell>
                      <TableCell>{booking.owner}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{booking.startDate}</p>
                          <p className="text-muted-foreground">to {booking.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
                      <TableCell>₹{booking.commission.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          booking.status === 'confirmed' ? 'default' :
                          booking.status === 'disputed' ? 'destructive' : 'secondary'
                        }>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl">Reports & Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>User and listing growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Chart placeholder - Growth analytics would be displayed here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Commission and transaction data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Chart placeholder - Revenue analytics would be displayed here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                  <CardDescription>Most rented equipment types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Tractors</span>
                      <span className="text-muted-foreground">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tools</span>
                      <span className="text-muted-foreground">32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Land</span>
                      <span className="text-muted-foreground">23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Locations</CardTitle>
                  <CardDescription>Most active districts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Pune</span>
                      <span className="text-muted-foreground">156 listings</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mumbai</span>
                      <span className="text-muted-foreground">89 listings</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nashik</span>
                      <span className="text-muted-foreground">67 listings</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}