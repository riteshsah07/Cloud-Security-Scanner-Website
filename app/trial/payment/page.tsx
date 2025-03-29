"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreditCard, Lock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PaymentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }

    // Get user info
    const userInfo = localStorage.getItem("user")
    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }

    // Get selected plan
    const plan = localStorage.getItem("selectedPlan")
    if (plan) {
      setSelectedPlan(plan)
    } else {
      router.push("/get-started")
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      router.push("/trial/confirmation")
    }, 2000)
  }

  const getPlanDetails = () => {
    switch (selectedPlan) {
      case "starter":
        return { name: "Starter", price: "$49" }
      case "professional":
        return { name: "Professional", price: "$149" }
      case "enterprise":
        return { name: "Enterprise", price: "Custom" }
      default:
        return { name: "Unknown", price: "$0" }
    }
  }

  if (!user || !selectedPlan) {
    return <div className="container flex h-screen items-center justify-center">Loading...</div>
  }

  const planDetails = getPlanDetails()

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <Link href="/" className="flex gap-2 items-center text-xl font-bold">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>CloudGuardian</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("isLoggedIn")
                  localStorage.removeItem("user")
                  router.push("/")
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Payment Information</h1>
            <p className="text-muted-foreground">Your card won't be charged until after your 14-day free trial ends.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your payment information to start your free trial.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      required
                      value={formData.cardName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        required
                        maxLength={19}
                        value={formData.cardNumber}
                        onChange={handleChange}
                      />
                      <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">Month</Label>
                      <Select
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, expiryMonth: value }))}
                        value={formData.expiryMonth}
                      >
                        <SelectTrigger id="expiryMonth">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = (i + 1).toString().padStart(2, "0")
                            return (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">Year</Label>
                      <Select
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, expiryYear: value }))}
                        value={formData.expiryYear}
                      >
                        <SelectTrigger id="expiryYear">
                          <SelectValue placeholder="YY" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = (new Date().getFullYear() + i).toString().slice(-2)
                            return (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        required
                        maxLength={4}
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Start Free Trial"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">{planDetails.name} Plan</span>
                    <span>{planDetails.price}/month</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Free Trial</span>
                    <span>14 days</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total due today</span>
                      <span className="text-green-600">$0.00</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your card will be charged {planDetails.price}/month after the trial ends.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Your payment information is encrypted and secure.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

