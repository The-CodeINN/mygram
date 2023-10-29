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
import {
    useCreateUserAccount,
    useSignInAccount,
} from '@/lib/react-query/queriesAndMutations'
import { SignupValidationSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as z from 'zod'

const SignUpForm = () => {
    const { toast } = useToast()
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
    const navigate = useNavigate()

    const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
        useCreateUserAccount()

    const { mutateAsync: signInAccount, isPending: isSigningIn } =
        useSignInAccount()

    const form = useForm<z.infer<typeof SignupValidationSchema>>({
        resolver: zodResolver(SignupValidationSchema),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
        // create a new user
        const newUser = await createUserAccount(values)

        if (!newUser) {
            return toast({
                title: 'Sign Up Failed',
                description: 'Please try again later',
            })
        }

        // redirect to sign in page
        const session = await signInAccount({
            email: values.email,
            password: values.password,
        })

        if (!session) {
            return toast({
                title: 'Sign In Failed',
                description: 'Please try again later',
            })
        }

        const isLoggedIn = await checkAuthUser()

        if (isLoggedIn) {
            form.reset()

            navigate('/')
        } else {
            return toast({
                title: 'Sign up failed',
                description: 'Please try again',
            })
        }
    }
    return (
        <Form {...form}>
            <div className=" flex-center flex-col sm:w-420">
                <img src="/assets/images/logo.svg" alt="Logo" />
                <h2 className="h3-bold pt-5 sm:pt-12">Create a new account</h2>
                <p className="small-medium md:base-regular mt-2 text-light-3">
                    Tou use MyGarm enter your details
                </p>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-4 flex w-full flex-col gap-5"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your Name"
                                        className="shad-input"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your Username"
                                        className="shad-input"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        {isCreatingUser ? (
                            <div className=" flex-center gap-2">
                                <Loader /> Loading...
                            </div>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                    <p className="text-small-regular text-center text-light-2">
                        Already have an account?{' '}
                        <Link
                            to="/sign-in"
                            className="text-small-semibold ml-1 text-primary-500"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignUpForm
