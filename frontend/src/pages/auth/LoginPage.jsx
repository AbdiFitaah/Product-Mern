import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { extractErrorMessage } from '../../util/ErrorUtils.js'

import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/auth/apiClient'
import useAuthStore from '../../lib/store/useAuthStore.js'

const LoginPage = () => {


    const navigate = useNavigate();
    const { user, token, setAuth } = useAuthStore()
    // // State for form values
    const [formValues, setFormValues] = useState({
        email: 'abdifatah@gmail.com',
        password: 'A123456a@'
    })
    const [error, setError] = useState(null);
    const [ isLoading, setIsLoading]=useState("");

    useEffect(() => {
        if (token && user) {
            if (user?.role === 'admin') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        }
    }, [token, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
          const response = await api.post("/auth/login", credentials);
          return response.data;
        },
      
        onSuccess: (data) => {
            console.log(data);
          
            if (data?.token) {
              setAuth(data.user, data.token);
          
              if (data.user?.role === "admin") {
                console.log("Going Admin");
                return navigate("/admin", { replace: true });
              } else {
                console.log("Going Dashboard");
                navigate("/dashboard", { replace: true });
              }
            }
          },
      
        onError: (err) => {
          console.log(err);
          setError(extractErrorMessage(err));
        },
      });



    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!formValues.email || !formValues.password) {
            setError('All fields are required')
            return
        }

        loginMutation.mutate({
            email: formValues.email,
            password: formValues.password
        })
    }



    return (
        <Card className="w-1/3 m-auto mt-40 border-border">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl text-center">Signin</CardTitle>
                <CardDescription className={"text-center"}>
                    Enter your credentials to access your account
                </CardDescription>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 pt-0">
                        {
                            error && (
                                <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>
                                    {error}
                                </div>
                            )
                        }

                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Email
                            </div>
                            <Input name="email" placeholder="email@email.com" required

                                value={formValues.email}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Password
                            </div>
                            <Input name="password" type={"password"} placeholder="*****" required
                                value={formValues.password}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className='py-4'>
                        <Button 
                            type="submit" 
                            disabled={loginMutation.isPending} 
                            className="w-full cursor-pointer"
                        >
                            {loginMutation.isPending ? (
                                <span className='flex items-center gap-2'>
                                    <LoaderCircle className="animate-spin" /> login account... 
                                </span>
                            ) : (
                                "Login Account"
                            )}
                        </Button>
                        </div>
                    </CardContent>

                    <CardFooter className={"flex justify-center pt-0"}>
                        <div className='text-center text-sm'>
                            Don't have an account ? <a onClick={() => navigate('/register')} className='text-primary hover:underline cursor-pointer'> Sign up</a>
                        </div>
                    </CardFooter>
                </form>
            </CardHeader>
        </Card>
    )
}

export default LoginPage