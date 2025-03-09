export type Car = {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  type: string
  transmission: string
  fuelType: string
  exteriorColor: string
  interiorColor: string
  features: string[]
  images: string[]
  location: string
  dealer: {
    name: string
    rating: number
    location: string
    phone: string
  }
  rating: number
  isNew: boolean
  bodyStyle: string
  engineSize: string
  horsepower: number
  drivetrain: string
  numberOfSeats: number
  numberOfDoors: number
  fuelEconomy: {
    city: number
    highway: number
    combined: number
  }
  safetyRating: number
  dealRating: "Great Deal" | "Good Deal" | "Fair Deal"
  daysOnMarket: number
  priceDrops: {
    amount: number
    date: string
  }[]
  vehicleHistory: {
    owners: number
    accidents: number
    serviceRecords: number
  }
  sellerType: "Dealer" | "Private" | "Certified"
  monthlyPayment?: number
  financing?: {
    apr: number
    term: number
    downPayment: number
  }
}

