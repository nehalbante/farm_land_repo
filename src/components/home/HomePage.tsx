import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Search,
  Tractor,
  Wrench,
  MapPin,
  Star,
  Menu,
  MessageCircle,
  LayoutDashboard,
  Plus,
  Settings,
  LogOut,
  Leaf,
  TrendingUp,
  Users,
  Clock,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type User = {
  id: string;
  name: string;
  email: string;
  role: "farmer" | "admin";
  location: {
    district: string;
    village: string;
  };
};

interface HomePageProps {
  user: User;
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
}

const mockListings = [
  {
    id: "1",
    title: "John Deere 5310 Tractor",
    category: "machines",
    price: 1500,
    priceUnit: "day",
    location: { district: "Pune", village: "Baramati" },
    rating: 4.8,
    reviews: 23,
    owner: "Suresh Patil",
    image:
      "https://images.unsplash.com/photo-1558618644-fcd25c85cd64?w=400&h=300&fit=crop",
    availability: "Available",
    distance: "5 km away",
    featured: true,
  },
  {
    id: "2",
    title: "Rotary Tiller - 7ft",
    category: "tools",
    price: 800,
    priceUnit: "day",
    location: { district: "Pune", village: "Shirur" },
    rating: 4.6,
    reviews: 15,
    owner: "Amit Sharma",
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop",
    availability: "Available",
    distance: "12 km away",
  },
  {
    id: "3",
    title: "5 Acre Farmland for Crop Sharing",
    category: "land",
    price: 2000,
    priceUnit: "month",
    location: { district: "Pune", village: "Indapur" },
    rating: 4.9,
    reviews: 8,
    owner: "Rajesh Kale",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    availability: "Available",
    distance: "18 km away",
    featured: true,
  },
  {
    id: "4",
    title: "Combine Harvester",
    category: "machines",
    price: 3000,
    priceUnit: "day",
    location: { district: "Pune", village: "Baramati" },
    rating: 4.7,
    reviews: 31,
    owner: "Pradeep Singh",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    availability: "Booked",
    distance: "3 km away",
  },
];

const categories = [
  {
    id: "machines",
    name: "Machines",
    icon: Tractor,
    count: 45,
    color: "bg-red-50 text-red-600 border-red-200",
    description: "Tractors, harvesters, and heavy equipment",
  },
  {
    id: "tools",
    name: "Tools",
    icon: Wrench,
    count: 67,
    color: "bg-amber-50 text-amber-600 border-amber-200",
    description: "Hand tools, power tools, and implements",
  },
  {
    id: "land",
    name: "Land",
    icon: Leaf,
    count: 23,
    color: "bg-green-50 text-green-600 border-green-200",
    description: "Farmland, orchards, and storage spaces",
  },
];

const stats = [
  { label: "Active Farmers", value: "1,200+", icon: Users },
  { label: "Equipment Listed", value: "135", icon: Tractor },
  {
    label: "Successful Rentals",
    value: "850+",
    icon: TrendingUp,
  },
  { label: "Avg Response Time", value: "2 hrs", icon: Clock },
];

export function HomePage({
  user,
  onNavigate,
  onSearch,
  onLogout,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const nearbyListings = mockListings.filter(
    (listing) =>
      listing.location.district === user.location.district,
  );

  const featuredListings = mockListings.filter(
    (listing) => listing.featured,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-background to-blue-50/30">
      {/* Enhanced Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
              <Tractor className="h-6 w-6" />
              <span className="text-lg font-bold">
                FarmRent
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onNavigate("chat")}
              className="flex items-center space-x-2 hover:bg-green-50 hover:border-green-200 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden md:inline">Messages</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">
                    {user.name}
                  </span>
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => onNavigate("dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onNavigate("listing")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Listing
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem
                    onClick={() => onNavigate("admin")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Panel
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Enhanced Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 bg-clip-text text-transparent">
              Welcome back, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect equipment for your farm or list
              your own to help fellow farmers in your community
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row gap-4"
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for tractors, tools, land, or equipment..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    className="pl-12 h-12 text-base border-2 border-gray-100 focus:border-green-300 transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    className="h-12 px-6 border-2 border-gray-100 hover:border-green-300 hover:bg-green-50 transition-colors"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button
                    type="submit"
                    className="h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg transition-all duration-200"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200"
              >
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enhanced Categories */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Discover equipment and resources in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 group overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-xl ${category.color} group-hover:scale-110 transition-transform duration-200`}
                    >
                      <category.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">
                          {category.count}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          listings
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        {featuredListings.length > 0 && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">
                Featured Equipment
              </h2>
              <p className="text-muted-foreground">
                Hand-picked premium listings from trusted
                farmers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white group"
                >
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 shadow-lg">
                        ⭐ Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={
                          listing.availability === "Available"
                            ? "default"
                            : "secondary"
                        }
                        className="shadow-lg"
                      >
                        {listing.availability}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {listing.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {listing.location.village},{" "}
                            {listing.location.district}
                          </span>
                          <span>•</span>
                          <span>{listing.distance}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-bold text-green-600">
                            ₹{listing.price}
                          </span>
                          <span className="text-muted-foreground">
                            /{listing.priceUnit}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">
                            {listing.rating}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({listing.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-muted-foreground">
                          by {listing.owner}
                        </span>
                        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                          {listing.availability === "Available"
                            ? "Book Now"
                            : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Nearby Listings */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Near You</h2>
              <p className="text-muted-foreground">
                Equipment available in {user.location.district}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onSearch("")}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyListings.slice(0, 6).map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-200 group"
              >
                <div className="aspect-video bg-muted overflow-hidden relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`border-0 shadow-sm ${
                        listing.category === "machines"
                          ? "bg-red-100 text-red-700"
                          : listing.category === "tools"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {listing.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold line-clamp-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{listing.distance}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-green-600">
                          ₹{listing.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{listing.priceUnit}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {listing.rating}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      disabled={
                        listing.availability !== "Available"
                      }
                    >
                      {listing.availability === "Available"
                        ? "Book Now"
                        : "View Details"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to List Your Equipment?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of farmers who are earning extra
                income by sharing their equipment with the
                community
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate("listing")}
                className="bg-white text-green-600 hover:bg-gray-50 font-semibold px-8 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                List Your Equipment
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}