"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Car,
  Star,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Fuel,
  Gauge,
  Cog,
  MapPin,
  DollarSign,
  Shield,
  Award,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import type { Car as CarType } from "@/types/car"

interface CarDetailsProps {
  car: CarType
}

export function CarDetails({ car }: CarDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  // For demo purposes, we'll use placeholder images if car doesn't have enough
  const carImages =
    car.images.length >= 5
      ? car.images
      : [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800&text=Interior",
          "/placeholder.svg?height=600&width=800&text=Front",
          "/placeholder.svg?height=600&width=800&text=Back",
          "/placeholder.svg?height=600&width=800&text=Side",
        ]

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/cars" className="hover:text-primary">
            Cars
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">
            {car.year} {car.make} {car.model}
          </span>
        </nav>
      </div>

      {/* Car Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {car.year} {car.make} {car.model}
          </h1>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{car.location}</span>
            <span className="mx-2">•</span>
            <span>ID: {car.id}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="h-10">
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="h-10">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Main Image */}
        <div className="md:col-span-2 relative rounded-lg overflow-hidden h-[300px] md:h-[500px]">
          <Image
            src={carImages[currentImageIndex] || "/placeholder.svg"}
            alt={`${car.year} ${car.make} ${car.model}`}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 h-10 w-10 rounded-full"
            onClick={handlePrevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 h-10 w-10 rounded-full"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          {car.isNew && <Badge className="absolute top-4 left-4 bg-primary text-white">New</Badge>}
        </div>

        {/* Thumbnails and Price Card */}
        <div className="flex flex-col space-y-4">
          {/* Thumbnails */}
          <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
            {carImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden h-20 cursor-pointer ${
                  currentImageIndex === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${car.year} ${car.make} ${car.model} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Price Card */}
          <Card className="border shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-primary">${car.price.toLocaleString()}</CardTitle>
              {car.monthlyPayment && (
                <p className="text-sm text-gray-500">Est. ${car.monthlyPayment}/mo with financing</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{car.rating}</span>
                  <span className="text-gray-500 ml-1">(24 reviews)</span>
                </div>
                <Badge variant={car?.dealRating === "Great Deal" ? "default" : "secondary"}>
                  {car.dealRating || "Fair Deal"}
                </Badge>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-primary">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Dealer
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setIsContactFormOpen(true)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email Dealer
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Text Dealer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Car Details Tabs */}
      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary h-10"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary h-10"
          >
            Features
          </TabsTrigger>
          <TabsTrigger
            value="specs"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary h-10"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary h-10"
          >
            Vehicle History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Vehicle Overview</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border">
                  <Calendar className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Year</span>
                  <span className="font-medium">{car.year}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border">
                  <Gauge className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Mileage</span>
                  <span className="font-medium">{car.mileage.toLocaleString()} mi</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border">
                  <Fuel className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Fuel Type</span>
                  <span className="font-medium">{car.fuelType}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border">
                  <Cog className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Transmission</span>
                  <span className="font-medium">{car.transmission}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border">
                  <Car className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Drivetrain</span>
                  <span className="font-medium">{car.drivetrain}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-gray-500">Seats</span>
                  <span className="font-medium">{car.numberOfSeats || 5}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border mb-6">
                <h3 className="text-lg font-bold mb-4">Description</h3>
                <p className="text-gray-700 mb-4">
                  This {car.year} {car.make} {car.model} is a {car.isNew ? "brand new" : "pre-owned"} vehicle with{" "}
                  {car.mileage.toLocaleString()} miles. It features a {car.engineSize} engine,
                  {car.transmission} transmission, and {car.drivetrain} drivetrain.
                </p>
                <p className="text-gray-700">
                  This vehicle comes equipped with {car.features.slice(0, 3).join(", ")}, and many other premium
                  features. Contact us today to schedule a test drive!
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-bold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              {/* Dealer Information */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">Dealer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <Car className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-bold">{car.dealer.name || "Premium Auto"}</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm ml-1">{car.dealer.rating || 4.8} (120 reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <span>{car.dealer.location || car.location}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <span>{car.dealer.phone || "(555) 123-4567"}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Dealer Page
                  </Button>
                </CardContent>
              </Card>

              {/* Vehicle History Report */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Vehicle History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Owners</span>
                        <span className="text-sm font-medium">{car.vehicleHistory?.owners || 1}</span>
                      </div>
                      <Progress
                        value={car.vehicleHistory?.owners ? (car.vehicleHistory.owners / 3) * 100 : 33}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Accidents</span>
                        <span className="text-sm font-medium">{car.vehicleHistory?.accidents || 0}</span>
                      </div>
                      <Progress
                        value={car.vehicleHistory?.accidents ? (car.vehicleHistory.accidents / 3) * 100 : 0}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Service Records</span>
                        <span className="text-sm font-medium">{car.vehicleHistory?.serviceRecords || 12}</span>
                      </div>
                      <Progress
                        value={
                          car.vehicleHistory?.serviceRecords
                            ? Math.min((car.vehicleHistory.serviceRecords / 20) * 100, 100)
                            : 60
                        }
                        className="h-2"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">CARFAX Report</span>
                      </div>
                      <Button variant="link" className="p-0 h-auto">
                        View Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-0">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-2xl font-bold mb-6">Vehicle Features</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Safety Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Lane Departure Warning
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Automatic Emergency Braking
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Blind Spot Monitoring
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Rear Cross Traffic Alert
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Adaptive Cruise Control
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Cog className="h-5 w-5 mr-2 text-primary" />
                  Comfort Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Heated Seats
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Dual-Zone Climate Control
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Power Adjustable Seats
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Keyless Entry
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    Remote Start
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  Premium Features
                </h3>
                <ul className="space-y-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="specs" className="mt-0">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-2xl font-bold mb-6">Vehicle Specifications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Engine & Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Engine</span>
                    <span className="font-medium">{car.engineSize}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Horsepower</span>
                    <span className="font-medium">{car.horsepower} hp</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Transmission</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Drivetrain</span>
                    <span className="font-medium">{car.drivetrain}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Fuel Type</span>
                    <span className="font-medium">{car.fuelType}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Dimensions & Capacity</h3>
                <div className="space-y-4">
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Seating Capacity</span>
                    <span className="font-medium">{car.numberOfSeats || 5} passengers</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Doors</span>
                    <span className="font-medium">{car.numberOfDoors || 4}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Fuel Economy (City)</span>
                    <span className="font-medium">{car.fuelEconomy?.city || 22} mpg</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Fuel Economy (Highway)</span>
                    <span className="font-medium">{car.fuelEconomy?.highway || 30} mpg</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span className="text-gray-600">Fuel Economy (Combined)</span>
                    <span className="font-medium">{car.fuelEconomy?.combined || 25} mpg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Vehicle History Report</h2>
              <Badge className="bg-primary">CARFAX Verified</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <h3 className="text-2xl font-bold">{car.vehicleHistory?.owners || 1}</h3>
                      <p className="text-gray-600">Owner{car.vehicleHistory?.owners !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {car.vehicleHistory?.owners === 0
                      ? "New vehicle with no previous owners"
                      : car.vehicleHistory?.owners === 1
                        ? "Single owner vehicle"
                        : `Vehicle has had ${car.vehicleHistory?.owners} previous owners`}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <h3 className="text-2xl font-bold">{car.vehicleHistory?.accidents || 0}</h3>
                      <p className="text-gray-600">Accident{car.vehicleHistory?.accidents !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {car.vehicleHistory?.accidents === 0
                      ? "No accidents reported"
                      : `${car.vehicleHistory?.accidents} accident${car.vehicleHistory?.accidents !== 1 ? "s" : ""} reported`}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <h3 className="text-2xl font-bold">{car.vehicleHistory?.serviceRecords || 12}</h3>
                      <p className="text-gray-600">Service Records</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {car.vehicleHistory?.serviceRecords === 0
                      ? "No service records available"
                      : `${car.vehicleHistory?.serviceRecords} service record${car.vehicleHistory?.serviceRecords !== 1 ? "s" : ""} available`}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Vehicle Timeline</h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm text-gray-500">January 2023</div>
                    <h4 className="font-bold">Vehicle Manufactured</h4>
                    <p className="text-gray-600">Vehicle was manufactured and shipped to dealer.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <Car className="h-5 w-5" />
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm text-gray-500">March 2023</div>
                    <h4 className="font-bold">First Purchase</h4>
                    <p className="text-gray-600">Vehicle was purchased by first owner in {car.location}.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <Cog className="h-5 w-5" />
                    </div>
                    <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm text-gray-500">June 2023</div>
                    <h4 className="font-bold">Regular Maintenance</h4>
                    <p className="text-gray-600">Oil change and routine maintenance performed at 5,000 miles.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Present</div>
                    <h4 className="font-bold">Available for Sale</h4>
                    <p className="text-gray-600">
                      Vehicle is now available for purchase at {car.dealer.name || "Premium Auto"}.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button className="bg-primary">
                <FileText className="h-4 w-4 mr-2" />
                Download Full CARFAX Report
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Similar Vehicles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden h-full flex flex-col premium-card border shadow-md">
              <div className="relative premium-image-container">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Similar vehicle"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover premium-image"
                />
                {index === 0 && <Badge className="absolute top-2 left-2 bg-primary">New</Badge>}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-primary"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="flex-grow p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">
                    {car.year} {car.make} {index === 0 ? car.model : index === 1 ? "Accord" : "Camry"}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{(4.5 + index * 0.1).toFixed(1)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-primary">${(car.price - 2000 * index).toLocaleString()}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-3">{(car.mileage + 1000 * index).toLocaleString()} mi</span>
                    <span>{car.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button className="w-full bg-primary">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Contact Dealer</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="w-full min-h-[100px] p-3 border rounded-md"
                    defaultValue={`I'm interested in the ${car.year} ${car.make} ${car.model}. Please contact me with more information.`}
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsContactFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary">Send Message</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

