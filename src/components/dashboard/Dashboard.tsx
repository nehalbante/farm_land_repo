import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  XCircle,
  MessageCircle,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Eye,
  Heart,
  BarChart3
} from 'lucide-react';

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

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const mockMyListings = [
  {
    id: '1',
    title: 'John Deere 5310 Tractor',
    category: 'machines',
    price: 1500,
    priceUnit: 'day',
    status: 'active',
    bookings: 5,
    rating: 4.8,
    views: 127,
    likes: 23,
    image: 'https://images.unsplash.com/photo-1558618644-fcd25c85cd64?w=400&h=300&fit=crop',
    createdAt: '2024-01-18',
    performance: '+15%'
  },
  {
    id: '2',
    title: 'Rotary Tiller Set',
    category: 'tools',
    price: 800,
    priceUnit: 'day',
    status: 'active',
    bookings: 3,
    rating: 4.6,
    views: 89,
    likes: 15,
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop',
    createdAt: '2024-01-15',
    performance: '+8%'
  }
];

const mockBookings = [
  {
    id: '1',
    listingTitle: 'Combine Harvester',
    owner: 'Pradeep Singh',
    startDate: '2024-01-25',
    endDate: '2024-01-27',
    status: 'confirmed',
    total: 9000,
    type: 'outgoing',
    avatar: 'PS'
  },
  {
    id: '2',
    listingTitle: 'John Deere 5310 Tractor',
    renter: 'Raj Patel',
    startDate: '2024-01-28',
    endDate: '2024-01-30',
    status: 'pending',
    total: 4500,
    type: 'incoming',
    avatar: 'RP'
  },
  {
    id: '3',
    listingTitle: 'Rotary Tiller Set',
    renter: 'Mukesh Gupta',
    startDate: '2024-01-22',
    endDate: '2024-01-23',
    status: 'completed',
    total: 1600,
    type: 'incoming',
    avatar: 'MG'
  }
];

const recentActivities = [
  { type: 'booking_request', message: 'New booking request for John Deere Tractor', time: '2 hours ago' },
  { type: 'review', message: 'Received 5-star review from Raj Patel', time: '1 day ago' },
  { type: 'message', message: 'New message from Amit Sharma', time: '2 days ago' },
  { type: 'payment', message: 'Payment of ₹1,600 received', time: '3 days ago' }
];

export function Dashboard({ user, onNavigate, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleApproveBooking = (bookingId: string) => {
    console.log('Approving booking:', bookingId);
  };

  const handleDeclineBooking = (bookingId: string) => {
    console.log('Declining booking:', bookingId);
  };

  const stats = {
    totalListings: mockMyListings.length,
    activeBookings: mockBookings.filter(b => b.status === 'confirmed').length,
    totalEarnings: mockBookings
      .filter(b => b.type === 'incoming' && b.status === 'completed')
      .reduce((sum, b) => sum + b.total, 0),
    avgRating: 4.7,
    totalViews: mockMyListings.reduce((sum, listing) => sum + listing.views, 0),
    pendingRequests: mockBookings.filter(b => b.status === 'pending' && b.type === 'incoming').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9 ring-2 ring-green-100">
              <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-right">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.location.village}, {user.location.district}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8 h-12 bg-gray-100 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="listings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">My Listings</TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Bookings</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-blue-700">Total Listings</CardTitle>
                  <Package className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">{stats.totalListings}</div>
                  <p className="text-xs text-blue-600 mt-1">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-green-700">Active Bookings</CardTitle>
                  <Calendar className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900">{stats.activeBookings}</div>
                  <p className="text-xs text-green-600 mt-1">
                    Currently rented out
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-emerald-700">Total Earnings</CardTitle>
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-900">₹{stats.totalEarnings.toLocaleString()}</div>
                  <p className="text-xs text-emerald-600 mt-1">
                    +15% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-amber-700">Average Rating</CardTitle>
                  <Star className="h-5 w-5 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-900">{stats.avgRating}</div>
                  <p className="text-xs text-amber-600 mt-1">
                    Based on {mockBookings.length} reviews
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 hover:shadow-xl transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-indigo-700">Total Views</CardTitle>
                  <Eye className="h-5 w-5 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-900">{stats.totalViews}</div>
                  <p className="text-xs text-indigo-600 mt-1">
                    Across all listings
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-purple-700">Pending Requests</CardTitle>
                  <Clock className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900">{stats.pendingRequests}</div>
                  <p className="text-xs text-purple-600 mt-1">
                    Awaiting your response
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>Your latest updates and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'booking_request' ? 'bg-blue-500' :
                          activity.type === 'review' ? 'bg-yellow-500' :
                          activity.type === 'message' ? 'bg-green-500' :
                          'bg-emerald-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get things done faster</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => onNavigate('listing')} 
                    className="w-full justify-start h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Plus className="h-4 w-4 mr-3" />
                    Add New Listing
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('chat')} 
                    className="w-full justify-start h-12 border-2 hover:bg-blue-50 hover:border-blue-200"
                  >
                    <MessageCircle className="h-4 w-4 mr-3" />
                    Check Messages
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('search')} 
                    className="w-full justify-start h-12 border-2 hover:bg-purple-50 hover:border-purple-200"
                  >
                    <Package className="h-4 w-4 mr-3" />
                    Browse Equipment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">My Listings</h2>
                <p className="text-muted-foreground">Manage your equipment and land listings</p>
              </div>
              <Button 
                onClick={() => onNavigate('listing')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockMyListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'} className="shadow-lg">
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                        {listing.performance}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                        <p className="text-2xl font-bold text-green-600">
                          ₹{listing.price}<span className="text-sm text-muted-foreground">/{listing.priceUnit}</span>
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold">{listing.views}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Views</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="font-semibold">{listing.likes}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Likes</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Users className="h-4 w-4 text-green-500" />
                            <span className="font-semibold">{listing.bookings}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Bookings</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 justify-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{listing.rating}</span>
                        <span className="text-sm text-muted-foreground">rating</span>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Bookings</h2>
              <p className="text-muted-foreground">Manage your rental requests and bookings</p>
            </div>

            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                            {booking.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{booking.listingTitle}</h3>
                          <p className="text-muted-foreground">
                            {booking.type === 'incoming' 
                              ? `Rented by ${booking.renter}` 
                              : `Rented from ${booking.owner}`
                            }
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{booking.startDate} to {booking.endDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{booking.total.toLocaleString()}</p>
                          <Badge variant={
                            booking.status === 'confirmed' ? 'default' :
                            booking.status === 'pending' ? 'secondary' :
                            booking.status === 'completed' ? 'outline' : 'destructive'
                          } className="shadow-sm">
                            {booking.status}
                          </Badge>
                        </div>

                        {booking.type === 'incoming' && booking.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleApproveBooking(booking.id)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeclineBooking(booking.id)}
                              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                          </div>
                        )}

                        <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20 ring-4 ring-green-100">
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {user.location.village}, {user.location.district}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Photo
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <p className="text-muted-foreground mt-1">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <p className="text-muted-foreground mt-1">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">District</label>
                      <p className="text-muted-foreground mt-1">{user.location.district}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Village</label>
                      <p className="text-muted-foreground mt-1">{user.location.village}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}