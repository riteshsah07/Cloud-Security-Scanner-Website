"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [trialEndDate, setTrialEndDate] = useState<string>("")

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
    }

    // Set trial end date (14 days from now)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 14)
    setTrialEndDate(
      endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )

    // Store trial info
    localStorage.setItem("trialEndDate", endDate.toISOString())
  }, [router])

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
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Your Free Trial Has Started!</h1>
            <p className="text-muted-foreground max-w-md">
              Thank you for choosing CloudGuardian. Your 14-day free trial of the {planDetails.name} plan has been
              activated.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Trial Information</CardTitle>
              <CardDescription>Here's what you need to know about your free trial.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Plan</p>
                  <p className="font-medium">{planDetails.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Price</p>
                  <p className="font-medium">{planDetails.price}/month after trial</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Trial End Date</p>
                  <p className="font-medium">{trialEndDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Billing Status</p>
                  <p className="font-medium text-green-600">Free Trial (No Charge)</p>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  Your card will not be charged until your trial ends on {trialEndDate}. You can cancel anytime before
                  then to avoid being charged.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" onClick={() => router.push("/dashboard")}>
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

