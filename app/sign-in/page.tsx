"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Car, Check, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  // Check if user just registered
  useEffect(() => {
    const registered = searchParams.get("registered")
    if (registered === "true") {
      setShowSuccess(true)
      toast.success("Account created successfully! Please sign in.")
    }
  }, [searchParams])

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // TODO: Implement API call to your authentication endpoint
      // Example:
      // const response = await fetch('/api/auth/signin', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
      //
      // if (!response.ok) {
      //   const data = await response.json()
      //   throw new Error(data.message || 'Failed to sign in')
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success animation before redirect
      setShowSuccess(true)

      // Redirect after animation completes
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please try again.")
      setShowSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle Google sign in
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    try {
      // TODO: Implement Google OAuth sign-in
      // Example:
      // await signInWithGoogle()
      //
      // This would typically redirect to Google's OAuth flow
      // and then back to your application with an auth code

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success animation before redirect
      setShowSuccess(true)

      // Redirect after animation completes
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (err: any) {
      setError("Google sign in failed. Please try again.")
      setShowSuccess(false)
    } finally {
      setGoogleLoading(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white max-w-md p-12"
          >
            <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
            <p className="text-xl text-white/80">
              Sign in to access your account and continue your journey to finding the perfect vehicle.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Zephyrium</span>
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                variants={successVariants}
                className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Sign In Successful!</h2>
                <p className="text-gray-600 mb-6">You are being redirected to your dashboard...</p>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                variants={containerVariants}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <motion.div variants={itemVariants}>
                      <CardTitle className="text-2xl">Sign In</CardTitle>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <CardDescription>Enter your credentials to access your account</CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-12"
                        />
                      </motion.div>
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-12"
                        />
                      </motion.div>

                      {error && (
                        <motion.div
                          className="text-sm text-red-500 mt-2 p-2 bg-red-50 rounded border border-red-200"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          {error}
                        </motion.div>
                      )}

                      <motion.div variants={itemVariants}>
                        <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Signing in...
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </motion.div>
                    </form>

                    <motion.div className="mt-6" variants={itemVariants}>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-4 h-12 text-base flex items-center justify-center gap-2"
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading}
                      >
                        {googleLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <FcGoogle className="h-5 w-5" />
                            <span>Google</span>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <motion.p className="text-sm text-gray-500" variants={itemVariants}>
                      Don't have an account?{" "}
                      <Link href="/sign-up" className="text-primary hover:underline font-medium">
                        Sign up
                      </Link>
                    </motion.p>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

