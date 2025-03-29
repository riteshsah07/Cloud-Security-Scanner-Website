"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function GetStartedPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("professional")
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)

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
  }, [router])

  const handleContinue = () => {
    setIsLoading(true)

    // Store selected plan
    localStorage.setItem("selectedPlan", selectedPlan)

    // Redirect to payment page
    setTimeout(() => {
      setIsLoading(false)
      router.push("/trial/payment")
    }, 800)
  }

  if (!user) {
    return <div className="container flex h-screen items-center justify-center">Loading...</div>
  }

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
            <h1 className="text-3xl font-bold">Choose Your Plan</h1>
            <p className="text-muted-foreground">
              Select the plan that best fits your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>You can change your plan at any time from your account settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                <div
                  className={`flex items-start space-x-3 rounded-md border p-4 ${selectedPlan === "starter" ? "border-primary bg-primary/5" : ""}`}
                >
                  <RadioGroupItem value="starter" id="starter" className="mt-1" />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="starter" className="text-base font-medium">
                      Starter
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      <p>Perfect for small teams and startups</p>
                      <p className="font-medium text-foreground mt-2">$49/month</p>
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Up to 5 cloud accounts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Daily scans</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Email alerts</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-start space-x-3 rounded-md border p-4 ${selectedPlan === "professional" ? "border-primary bg-primary/5" : ""}`}
                >
                  <RadioGroupItem value="professional" id="professional" className="mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="professional" className="text-base font-medium">
                        Professional
                      </Label>
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        Popular
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>For growing businesses and teams</p>
                      <p className="font-medium text-foreground mt-2">$149/month</p>
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Up to 20 cloud accounts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Continuous scanning</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Slack & Teams integration</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-start space-x-3 rounded-md border p-4 ${selectedPlan === "enterprise" ? "border-primary bg-primary/5" : ""}`}
                >
                  <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="enterprise" className="text-base font-medium">
                      Enterprise
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      <p>For large organizations with complex needs</p>
                      <p className="font-medium text-foreground mt-2">Custom pricing</p>
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Unlimited cloud accounts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Real-time scanning</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Custom integrations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleContinue} disabled={isLoading}>
                {isLoading ? "Processing..." : "Continue to Free Trial"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

