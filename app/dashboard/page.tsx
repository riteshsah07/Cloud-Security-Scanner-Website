"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  CheckCircle,
  Cloud,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldAlert,
  ShieldCheck,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [trialEndDate, setTrialEndDate] = useState<string>("")
  const [daysRemaining, setDaysRemaining] = useState(0)
  const [trialProgress, setTrialProgress] = useState(0)

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

    // Get trial end date
    const storedEndDate = localStorage.getItem("trialEndDate")
    if (storedEndDate) {
      const endDate = new Date(storedEndDate)
      setTrialEndDate(
        endDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )

      // Calculate days remaining
      const today = new Date()
      const diffTime = endDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysRemaining(diffDays)

      // Calculate progress (14 days total)
      const progress = 100 - (diffDays / 14) * 100
      setTrialProgress(progress)
    } else {
      // If no trial end date, set a default
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 14)
      setTrialEndDate(
        endDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )
      setDaysRemaining(14)
      setTrialProgress(0)
      localStorage.setItem("trialEndDate", endDate.toISOString())
    }
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

  if (!user) {
    return <div className="container flex h-screen items-center justify-center">Loading...</div>
  }

  const planDetails = getPlanDetails()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <Link href="/" className="flex gap-2 items-center text-xl font-bold">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>CloudGuardian</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 lg:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Cloud className="h-4 w-4" />
                  Cloud Accounts
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <ShieldAlert className="h-4 w-4" />
                  Security Issues
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Compliance
                </Link>
                <Separator className="my-4" />
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn")
                    localStorage.removeItem("user")
                    router.push("/")
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="mb-8 space-y-2">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to your CloudGuardian dashboard. Your trial is active.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Trial Status</CardTitle>
                  <CardDescription>Your free trial ends on {trialEndDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{daysRemaining} days remaining</span>
                      <span className="text-sm text-muted-foreground">{planDetails.name} Plan</span>
                    </div>
                    <Progress value={trialProgress} className="h-2" />
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <CreditCard className="h-4 w-4" />
                      Manage Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Security Score</CardTitle>
                  <CardDescription>Your overall security posture</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary text-xl font-bold">
                      78%
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Good</p>
                      <p className="text-xs text-muted-foreground">3 critical issues need attention</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Cloud Accounts</CardTitle>
                  <CardDescription>Connected cloud providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 p-1">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#FF9900]" fill="currentColor">
                          <path d="M18.75 11.35a4.32 4.32 0 0 0 .25-1.46c0-2.42-1.79-4.38-4-4.38-.7 0-1.36.18-1.92.5a5.62 5.62 0 0 0-10.58 2.5c0 .46.06.9.16 1.33A4.52 4.52 0 0 0 0 13.76C0 16.1 1.76 18 3.92 18h14.16c2.16 0 3.92-1.9 3.92-4.24a4.3 4.3 0 0 0-3.25-4.41Z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">AWS (2 accounts)</span>
                    </div>
                    <Button size="sm" className="w-full">
                      Connect Cloud Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Tabs defaultValue="issues">
                <TabsList>
                  <TabsTrigger value="issues">Security Issues</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="issues" className="mt-4 space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Security Issues</CardTitle>
                      <CardDescription>Issues detected in your cloud infrastructure</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-start gap-4">
                            <div className="rounded-full bg-red-100 p-1">
                              <ShieldAlert className="h-5 w-5 text-red-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Public S3 bucket with sensitive data</p>
                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                                  Critical
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                The S3 bucket 'customer-data-prod' is publicly accessible and contains sensitive
                                information.
                              </p>
                              <Button size="sm" variant="outline" className="mt-2">
                                Fix Issue
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-start gap-4">
                            <div className="rounded-full bg-amber-100 p-1">
                              <ShieldAlert className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">IAM user with excessive permissions</p>
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-600">
                                  High
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                The IAM user 'admin-user' has administrator access but doesn't require it for their
                                role.
                              </p>
                              <Button size="sm" variant="outline" className="mt-2">
                                Fix Issue
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-start gap-4">
                            <div className="rounded-full bg-green-100 p-1">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">Encryption at rest enabled for all databases</p>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                                  Secure
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                All RDS instances are properly configured with encryption at rest.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="compliance" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Status</CardTitle>
                      <CardDescription>Compliance with security frameworks and standards</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">CIS AWS Foundations</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">42/49 controls</span>
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-600">
                              86%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">GDPR</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">18/20 controls</span>
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                              90%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">SOC 2</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">32/40 controls</span>
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-600">
                              80%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Recent actions and events in your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-muted p-1">
                            <Cloud className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">AWS account connected</p>
                            <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-muted p-1">
                            <ShieldAlert className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Security scan completed</p>
                            <p className="text-xs text-muted-foreground">Today, 10:35 AM</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-muted p-1">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Account created</p>
                            <p className="text-xs text-muted-foreground">Today, 10:25 AM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

