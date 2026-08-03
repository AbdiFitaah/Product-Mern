import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardTitle, Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoaderCircle, User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/auth/apiClient.js'
import { extractErrorMessage } from '../../util/ErrorUtils.js'

const RegisterPage = () => {
  const navigate = useNavigate();

  // State for form values
  const [formValues, setFormValues] = useState({
    name: 'abdifatah',
    email: 'abdifatah@gmail.com',
    password: 'A123456a@',
    confirmPassword: 'A123456a@'
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/create', userData)
      return response.data
    },
    onSuccess: (data) => {
      console.log(data);
      navigate('/login');
    },
    onError: (err) => {
      console.log("err", err);
      setError(extractErrorMessage(err));
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!formValues.name || !formValues.email || !formValues.password) {
      setError('All fields are required')
      return
    }

    if (formValues.password !== formValues.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    registerMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 py-8 sm:py-12 bg-gray-200 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md border border-border/40 shadow-2xl bg-card/95 backdrop-blur-md rounded-2xl transition-all duration-300">
        <CardHeader className="space-y-2 pb-4 pt-6 text-center">
          
          {/* Top Icon Badge */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-inner mb-1">
            <UserPlus className="h-6 w-6" />
          </div>

          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Create an Account
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs sm:text-sm">
            Enter your details below to register your new account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className='p-3.5 bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm rounded-xl animate-in fade-in-50'>
                {error}
              </div>
            )}

            {/* Full Name Input */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-foreground/80 tracking-wide'>
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="name"
                  placeholder="John Doe"
                  required
                  className="pl-10 h-11 rounded-xl border-border/60 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary/50 text-sm"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-foreground/80 tracking-wide'>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  className="pl-10 h-11 rounded-xl border-border/60 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary/50 text-sm"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-foreground/80 tracking-wide'>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="pl-10 pr-10 h-11 rounded-xl border-border/60 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary/50 text-sm"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-foreground/80 tracking-wide'>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="pl-10 pr-10 h-11 rounded-xl border-border/60 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary/50 text-sm"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className='pt-2'>
              <Button 
                type="submit" 
                disabled={registerMutation.isPending} 
                className="w-full h-11 rounded-xl text-sm font-semibold shadow-md shadow-primary/25 cursor-pointer transition-all duration-200"
              >
                {registerMutation.isPending ? (
                  <span className='flex items-center justify-center gap-2'>
                    <LoaderCircle className="animate-spin h-4 w-4" /> 
                    Creating account... 
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center pb-6 pt-2">
            <p className='text-center text-xs sm:text-sm text-muted-foreground'>
              Already have an account?{" "}
              <span 
                onClick={() => navigate('/login')} 
                className='text-primary font-semibold hover:underline cursor-pointer transition-all'
              >
                Sign in
              </span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage