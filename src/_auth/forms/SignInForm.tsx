'use client'

import Loader from '@/components/shared/Loader'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useUserContext } from '@/context/AuthContext'
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations'
import { SigninValidationSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as z from 'zod'

const SignInForm = () => {
    const { toast } = useToast()
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
    const navigate = useNavigate()

    const { mutateAsync: signInAccount, isPending: isSigningIn } =
        useSignInAccount()

    const form = useForm<z.infer<typeof SigninValidationSchema>>({
        resolver: zodResolver(SigninValidationSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function handleSignIn(user: z.infer<typeof SigninValidationSchema>) {
        const session = await signInAccount(user)

        if (!session) {
            toast({
                title: 'Login Failed',
                description: 'Please try again later',
            })
            return
        }

        const isLoggedIn = await checkAuthUser()

        if (isLoggedIn) {
            form.reset()

            navigate('/')
        } else {
            toast({
                title: 'Incorrect Credentials',
                description: 'Enter correct email and password',
            })
            return
        }
    }
    return (
        <Form {...form}>
            <div className=" flex-center flex-col sm:w-420">
                <img src="/assets/images/logo.svg" alt="Logo" />
                <h2 className="h3-bold pt-5 sm:pt-12">Login to your account</h2>
                <p className="small-medium md:base-regular mt-2 text-center text-light-3">
                    Welcome back, we missed you! Login to your account to
                    continue.
                </p>
                <form
                    onSubmit={form.handleSubmit(handleSignIn)}
                    className="mt-4 flex w-full flex-col gap-5"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your Email"
                                        className="shad-input"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your Password"
                                        className="shad-input"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary py-6">
                        {isUserLoading ? (
                            <div className=" flex-center gap-2">
                                <Loader /> Loading...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                    <p className="text-small-regular text-center text-light-2">
                        Don’t have an account?{' '}
                        <Link
                            to="/sign-up"
                            className="text-small-semibold ml-1 text-primary-500"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignInForm
