import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tractor, Leaf } from 'lucide-react';

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

interface RegisterPageProps {
  onRegister: (user: User) => void;
  onNavigateToLogin: () => void;
}

const districts = [
  'Pune', 'Mumbai', 'Nashik', 'Aurangabad', 'Solapur', 'Nagpur', 'Kolhapur', 'Satara'
];

const villages = {
  'Pune': ['Baramati', 'Junnar', 'Shirur', 'Indapur', 'Daund'],
  'Mumbai': ['Vasai', 'Virar', 'Bhiwandi', 'Kalyan', 'Thane'],
  'Nashik': ['Igatpuri', 'Sinnar', 'Dindori', 'Niphad', 'Yeola'],
  'Aurangabad': ['Vaijapur', 'Gangapur', 'Paithan', 'Khultabad', 'Sillod'],
  'Solapur': ['Barshi', 'Pandharpur', 'Akkalkot', 'Mangalwedha', 'Karmala'],
  'Nagpur': ['Kamptee', 'Hingna', 'Parseoni', 'Narkhed', 'Katol'],
  'Kolhapur': ['Shahuwadi', 'Shirol', 'Hatkanangale', 'Gaganbawada', 'Radhanagari'],
  'Satara': ['Wai', 'Phaltan', 'Koregaon', 'Karad', 'Mahabaleshwar']
};

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    district: '',
    village: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    // Mock registration - replace with real authentication
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: 'farmer',
        location: {
          district: formData.district,
          village: formData.village
        }
      };
      onRegister(newUser);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'district' ? { village: '' } : {})
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Tractor className="h-8 w-8 text-green-600" />
            <Leaf className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-3xl text-green-800 mb-2">FarmRent</h1>
          <p className="text-muted-foreground">Join the farming community</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Sign up to start listing or renting farm equipment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="village">Village</Label>
                  <Select 
                    value={formData.village} 
                    onValueChange={(value) => handleInputChange('village', value)}
                    disabled={!formData.district}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select village" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.district && villages[formData.district as keyof typeof villages]?.map((village) => (
                        <SelectItem key={village} value={village}>
                          {village}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={onNavigateToLogin}
                  className="text-primary hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}