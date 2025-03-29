"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, Cloud, Lock, ShieldAlert, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name?: string } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // Get user info
    if (loggedIn) {
      const userInfo = localStorage.getItem("user")
      if (userInfo) {
        setUser(JSON.parse(userInfo))
      }
    }
  }, [])

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/dashboard")
    } else {
      router.push("/auth/signup")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>CloudGuardian</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#integrations"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Integrations
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Pricing
              </Link>
              {isLoggedIn ? (
                <>
                  <Button variant="outline" className="ml-4" onClick={() => router.push("/dashboard")}>
                    Dashboard
                  </Button>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="ml-4" onClick={() => router.push("/auth/login")}>
                    Log in
                  </Button>
                  <Button onClick={() => router.push("/auth/signup")}>Get Started</Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Security Configuration Auto-Checker for Cloud Deployments
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Automatically scan your cloud configurations against industry best practices. Get real-time alerts
                    for misconfigurations and integrate with all major cloud providers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1.5" onClick={handleGetStarted}>
                    {isLoggedIn ? "Go to Dashboard" : "Start Free Trial"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Schedule Demo
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 shadow-lg">
                  <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
                  <div className="relative flex h-full flex-col items-start justify-between">
                    <div className="bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-border">
                      <div className="flex items-center gap-2 text-sm font-medium text-red-500">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Critical Misconfiguration Detected</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Public S3 bucket with sensitive data found in production environment
                      </p>
                      <Button size="sm" variant="destructive" className="mt-2">
                        Fix Now
                      </Button>
                    </div>
                    <div className="grid w-full gap-2">
                      <div className="flex items-center gap-2 rounded-lg bg-background/90 backdrop-blur-sm p-3 shadow-sm border border-border">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">IAM permissions follow least privilege principle</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-background/90 backdrop-blur-sm p-3 shadow-sm border border-border">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Encryption at rest enabled for all databases</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-background/90 backdrop-blur-sm p-3 shadow-sm border border-border">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Network security groups properly configured</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comprehensive Security Scanning</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides continuous monitoring and automated scanning of your cloud infrastructure
                  against industry best practices and compliance frameworks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Automated Scanning</h3>
                <p className="text-center text-muted-foreground">
                  Continuously scan your cloud configurations against best practices and security benchmarks
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldAlert className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Real-time Alerts</h3>
                <p className="text-center text-muted-foreground">
                  Get instant notifications when misconfigurations or security vulnerabilities are detected
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multi-Cloud Support</h3>
                <p className="text-center text-muted-foreground">
                  Seamlessly integrate with AWS, Azure, Google Cloud, and other major cloud providers
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Compliance Frameworks</h3>
                <p className="text-center text-muted-foreground">
                  Validate configurations against CIS, NIST, SOC 2, HIPAA, GDPR, and other frameworks
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Risk Assessment</h3>
                <p className="text-center text-muted-foreground">
                  Prioritize issues based on severity and potential impact to your organization
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Remediation Guidance</h3>
                <p className="text-center text-muted-foreground">
                  Get actionable recommendations to fix security issues and improve your cloud posture
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="integrations" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Integrations</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Works With Your Cloud Stack</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Seamlessly integrate with all major cloud providers and DevOps tools to secure your entire
                  infrastructure.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-3 lg:grid-cols-6">
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#FF9900]" fill="currentColor">
                  <path d="M18.75 11.35a4.32 4.32 0 0 0 .25-1.46c0-2.42-1.79-4.38-4-4.38-.7 0-1.36.18-1.92.5a5.62 5.62 0 0 0-10.58 2.5c0 .46.06.9.16 1.33A4.52 4.52 0 0 0 0 13.76C0 16.1 1.76 18 3.92 18h14.16c2.16 0 3.92-1.9 3.92-4.24a4.3 4.3 0 0 0-3.25-4.41Z" />
                </svg>
                <span className="text-sm font-medium">AWS</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#0078D4]" fill="currentColor">
                  <path d="M0 12.9v-1.8h6.3L12 0h1.8l-4.2 11.1H24v1.8H9.6L4.2 24H2.4l4.2-11.1z" />
                </svg>
                <span className="text-sm font-medium">Azure</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#4285F4]" fill="currentColor">
                  <path d="M12 11.1 0 20.4V3.6L12 11.1z" fill="#EA4335" />
                  <path d="m24 11.1-12 8.3-12-8.3 12-7.5z" fill="#FBBC05" />
                  <path d="M0 3.6V20.4L12 11.1 0 3.6z" fill="#EA4335" />
                  <path d="m24 11.1-12 8.3V11.1l12-7.5v7.5z" fill="#34A853" />
                  <path d="m12 11.1 12-7.5-12-3.6v11.1z" fill="#4285F4" />
                </svg>
                <span className="text-sm font-medium">Google Cloud</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#2088FF]" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                  />
                </svg>
                <span className="text-sm font-medium">GitHub</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#2684FF]" fill="currentColor">
                  <path
                    d="M.778 1.213c-.424-.006-.761.35-.777.75-.015.41.306.751.73.757l.047-.001c.424.006.762-.35.777-.75.016-.41-.306-.75-.73-.756h-.047zm2.13.14c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.129.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.83.619c-.007-.41-.344-.751-.768-.745-.424.006-.745.362-.738.772.006.41.344.75.768.745.424-.006.745-.362.739-.772zm-7.384.431c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.13.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.129.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.83.619c-.007-.41-.344-.751-.768-.745-.424.006-.745.362-.738.772.006.41.344.75.768.745.424-.006.745-.362.739-.772zm-7.384.431c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.13.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.129.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.83.619c-.007-.41-.344-.751-.768-.745-.424.006-.745.362-.738.772.006.41.344.75.768.745.424-.006.745-.362.739-.772zm-7.384.431c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.13.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.129.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.83.619c-.007-.41-.344-.751-.768-.745-.424.006-.745.362-.738.772.006.41.344.75.768.745.424-.006.745-.362.739-.772zm-7.384.431c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.13.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.129.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.83.619c-.007-.41-.344-.751-.768-.745-.424.006-.745.362-.738.772.006.41.344.75.768.745.424-.006.745-.362.739-.772zm-7.384.431c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.13.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.129.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.83.619c-.007-.41-.344-.751-.768-.745-.424.006-.745.362-.738.772.006.41.344.75.768.745.424-.006.745-.362.739-.772zm-7.384.431c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.13.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047zm2.129.139c-.424-.006-.762.35-.777.75-.016.41.306.75.73.757l.047-.001c.424.006.761-.35.777-.75.015-.41-.306-.75-.73-.757h-.047z"
                    fill="#2684FF"
                  />
                </svg>
                <span className="text-sm font-medium">Jira</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-[#7B42BC]" fill="currentColor">
                  <path
                    d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.047-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 0 0-1.648 1.769c.03.479.226.914.494 1.206-1.048 2.038-2.621 3.536-5.005 4.795-1.603.838-3.296 1.154-4.944.914-1.378-.195-2.456-.914-3.116-2.113-.988-1.798-1.078-3.745-.255-5.693.6-1.438 1.5-2.501 2.034-3.017-.3-.958-.449-2.38-.449-3.107 0-3.257 2.342-4.59 3.296-4.59 1.078 0 2.177.809 2.177 2.113 0 1.004-.449 3.162-2.627 3.162-.449 0-.839-.075-1.049-.18-.225-.149-.539-.299-.778-.299-.3 0-.539.15-.539.299 0 .12.045.24.105.345l.255.494c.345.734 1.049 1.259 2.083 1.259 2.342 0 4.004-1.858 4.004-4.5 0-1.889-1.798-3.881-4.53-3.881-4.845 0-7.327 3.462-7.327 6.929 0 1.379.255 2.368.868 3.072C3.11 11.879 2.096 14.47 3.3 16.888c.898 1.798 2.726 2.908 4.749 2.908.898 0 1.798-.15 2.651-.449 3.431-1.124 5.934-3.072 7.312-6.195l.622 3.342Z"
                    fill="#7B42BC"
                  />
                </svg>
                <span className="text-sm font-medium">Terraform</span>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your organization. All plans include a 14-day free trial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">Perfect for small teams and startups</p>
                </div>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  $49<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
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
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Basic compliance reports</span>
                  </li>
                </ul>
                <Button className="mt-8" onClick={() => router.push("/auth/signup")}>
                  Start Free Trial
                </Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm ring-2 ring-primary">
                <div className="space-y-2">
                  <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                    Popular
                  </div>
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <p className="text-muted-foreground">For growing businesses and teams</p>
                </div>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  $149<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
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
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Advanced compliance frameworks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>API access</span>
                  </li>
                </ul>
                <Button className="mt-8" onClick={() => router.push("/auth/signup")}>
                  Start Free Trial
                </Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">For large organizations with complex needs</p>
                </div>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  Custom<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
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
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>All compliance frameworks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Custom reporting</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-8">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Secure Your Cloud?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your free trial today and see how CloudGuardian can help you identify and fix security issues in
                  your cloud infrastructure.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1.5" onClick={handleGetStarted}>
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="text-lg font-medium">Product</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-lg font-medium">Resources</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-lg font-medium">Company</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-lg font-medium">Legal</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <div className="flex gap-2 items-center text-xl font-bold">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span>CloudGuardian</span>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} CloudGuardian. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

