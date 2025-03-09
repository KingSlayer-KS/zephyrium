"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, Check, ChevronLeft, ChevronRight, Loader2, Mail, User, Lock, Shield } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { Progress } from "@/components/ui/progress"

// Step type definition
type Step = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export default function SignUp() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [progress, setProgress] = useState(33)

  // Define steps
  const steps: Step[] = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Tell us a bit about yourself",
      icon: <User className="h-5 w-5" />,
    },
    {
      id: "account",
      title: "Account Details",
      description: "Set up your login credentials",
      icon: <Lock className="h-5 w-5" />,
    },
    {
      id: "verification",
      title: "Verification",
      description: "Verify your account",
      icon: <Shield className="h-5 w-5" />,
    },
  ]

  // Update progress when step changes
  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100)
  }, [currentStep, steps.length])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }))

    // Clear error when checkbox is checked
    if (errors.acceptTerms && checked) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.acceptTerms
        return newErrors
      })
    }
  }

  // Validate current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    } else if (currentStep === 1) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }

      if (!formData.password) {
        newErrors.password = "Password is required"
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    } else if (currentStep === 2) {
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "You must accept the terms and conditions"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Go to next step
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  // Go to previous step
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep()) return

    setIsLoading(true)

    try {
      // TODO: Implement API call to your registration endpoint
      // Example:
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     firstName: formData.firstName,
      //     lastName: formData.lastName,
      //     email: formData.email,
      //     password: formData.password
      //   }),
      // })
      //
      // if (!response.ok) {
      //   const data = await response.json()
      //   throw new Error(data.message || 'Failed to sign up')
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success animation
      setShowSuccess(true)

      // Redirect after animation completes
      setTimeout(() => {
        router.push("/sign-in?registered=true")
      }, 2000)
    } catch (err: any) {
      setErrors({ submit: err.message || "Failed to sign up. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle Google sign up
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true)
    try {
      // TODO: Implement Google OAuth sign-up
      // Example:
      // await signUpWithGoogle()
      //
      // This would typically redirect to Google's OAuth flow
      // and then back to your application with an auth code

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success animation
      setShowSuccess(true)

      // Redirect after animation completes
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err: any) {
      setErrors({ submit: "Google sign up failed. Please try again." })
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
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

  // Direction for animations
  const [[page, direction], setPage] = useState([0, 0])

  // Update page and direction when currentStep changes
  useEffect(() => {
    setPage([currentStep, currentStep > page[0] ? 1 : -1])
  }, [currentStep])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-black/60 to-black/30 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white max-w-md p-12"
          >
            <h1 className="text-4xl font-bold mb-6">Join Zephyrium</h1>
            <p className="text-xl text-white/80">
              Create an account to start your journey to finding the perfect vehicle with personalized recommendations.
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
                <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
                <p className="text-gray-600 mb-6">
                  Your account has been created successfully. Redirecting to sign in...
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
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
                      <CardTitle className="text-2xl">Create an Account</CardTitle>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <CardDescription>Join Zephyrium to find your perfect car</CardDescription>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-4">
                      <Progress value={progress} className="h-2" />

                      <div className="flex justify-between mt-4">
                        {steps.map((step, index) => (
                          <div
                            key={step.id}
                            className={`flex flex-col items-center ${
                              index <= currentStep ? "text-primary" : "text-gray-400"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                                index <= currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {step.icon}
                            </div>
                            <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent>
                    <AnimatePresence custom={direction} mode="wait">
                      <motion.div
                        key={page[0]}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-full"
                      >
                        {currentStep === 0 && (
                          <form className="space-y-4">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium">{steps[0].title}</h3>
                              <p className="text-sm text-gray-500">{steps[0].description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  placeholder="John"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  className={`h-12 ${errors.firstName ? "border-red-500" : ""}`}
                                />
                                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                  id="lastName"
                                  name="lastName"
                                  placeholder="Doe"
                                  value={formData.lastName}
                                  onChange={handleChange}
                                  className={`h-12 ${errors.lastName ? "border-red-500" : ""}`}
                                />
                                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                              </div>
                            </div>

                            <div className="pt-4">
                              <Button type="button" className="w-full h-12 text-base" onClick={handleNext}>
                                Continue
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </form>
                        )}

                        {currentStep === 1 && (
                          <form className="space-y-4">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium">{steps[1].title}</h3>
                              <p className="text-sm text-gray-500">{steps[1].description}</p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="name@example.com"
                                  value={formData.email}
                                  onChange={handleChange}
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                  className={`h-12 pl-10 ${errors.email ? "border-red-500" : ""}`}
                                />
                              </div>
                              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="password">Password</Label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <Input
                                  id="password"
                                  name="password"
                                  type="password"
                                  placeholder="••••••••"
                                  value={formData.password}
                                  onChange={handleChange}
                                  required
                                  className={`h-12 pl-10 ${errors.password ? "border-red-500" : ""}`}
                                />
                              </div>
                              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirm Password</Label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <Input
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  type="password"
                                  placeholder="••••••••"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                  required
                                  className={`h-12 pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                                />
                              </div>
                              {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                              )}
                            </div>

                            <div className="flex justify-between pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                className="h-12 text-base"
                                onClick={handlePrevious}
                              >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                              </Button>
                              <Button type="button" className="h-12 text-base" onClick={handleNext}>
                                Continue
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </form>
                        )}

                        {currentStep === 2 && (
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium">{steps[2].title}</h3>
                              <p className="text-sm text-gray-500">{steps[2].description}</p>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                              <div className="flex items-start">
                                <Mail className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                                <div>
                                  <h4 className="text-sm font-medium text-blue-800">Verify your email</h4>
                                  <p className="text-sm text-blue-600 mt-1">
                                    After signing up, we'll send a verification link to {formData.email || "your email"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="terms"
                                checked={formData.acceptTerms}
                                onCheckedChange={handleCheckboxChange}
                                className={errors.acceptTerms ? "border-red-500" : ""}
                              />
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                I accept the{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                  Terms and Conditions
                                </Link>
                              </label>
                            </div>
                            {errors.acceptTerms && <p className="text-sm text-red-500 -mt-2">{errors.acceptTerms}</p>}

                            {errors.submit && (
                              <div className="text-sm text-red-500 p-2 bg-red-50 rounded border border-red-200">
                                {errors.submit}
                              </div>
                            )}

                            <div className="flex justify-between pt-4">
                              <Button
                                type="button"
                                variant="outline"
                                className="h-12 text-base"
                                onClick={handlePrevious}
                              >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                              </Button>
                              <Button type="submit" className="h-12 text-base" disabled={isLoading}>
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                  </>
                                ) : (
                                  "Create Account"
                                )}
                              </Button>
                            </div>
                          </form>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {currentStep === 0 && (
                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
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
                          onClick={handleGoogleSignUp}
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
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <motion.p className="text-sm text-gray-500" variants={itemVariants}>
                      Already have an account?{" "}
                      <Link href="/sign-in" className="text-primary hover:underline font-medium">
                        Sign in
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

