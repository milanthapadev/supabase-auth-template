import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Link, Zap, Shield, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <>
      <Navbar data={data}/>
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="w-full min-h-screen pt-24 md:pt-32 pb-12 md:pb-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none max-w-3xl">
                Shorten Your Links, Expand Your Reach{" "}
                <span className="text-3xl inline-block animate-[takeoff_1s_ease-in-out_1s_forwards] hover:animate-[takeoff_1s_ease-in-out_forwards]">
                  🚀
                </span>
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg text-sm px-4">
                XOTO Links provides powerful URL shortening with advanced analytics and customization options.
              </p>
              <div className="w-full max-w-md space-y-2 px-4">
                <form className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    className="flex-1 bg-white" 
                    placeholder="Paste your long URL here" 
                    type="url"
                  />
                  <Button 
                    type="submit"
                    className="w-full sm:w-auto"
                  >
                    Shorten
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-24">
              Powerful Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-start">
                <div className="mb-4 p-3 rounded-lg bg-white  ring-1 animate-pulse ring-sky-400">
                  <Link className="w-5 h-5 " />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Short Links</h3>
                <p className="text-gray-500">Create memorable, branded short links that reflect your identity.</p>
              </div>
              <div className="flex flex-col items-start">
              <div className="mb-4 p-3 rounded-lg bg-white  ring-1 animate-pulse ring-sky-400">
                  <Zap className="w-5 h-5 " />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-gray-500">Gain insights with detailed click analytics and geographic data.</p>
              </div>
              <div className="flex flex-col items-start">
              <div className="mb-4 p-3 rounded-lg bg-white  ring-1 animate-pulse ring-sky-400">
                  <Shield className="w-5 h-5 " />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure and Reliable</h3>
                <p className="text-gray-500">Enterprise-grade security and 99.9% uptime for your short links.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Free</h3>
                  <p className="text-4xl font-bold mb-2">$0<span className="text-lg font-normal text-gray-500">/month</span></p>
                  <p className="text-gray-500">Perfect for personal use</p>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span>Up to 50 links per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span>Standard support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col p-6 bg-primary rounded-xl shadow-lg relative">
                <div className="absolute -top-3 right-4 bg-primary-foreground text-primary px-3 py-1 rounded-full text-sm font-medium ring-2 ring-teal-400 animate-bounce">
                  Popular
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2 text-primary-foreground">Pro</h3>
                  <p className="text-4xl font-bold mb-2 text-primary-foreground">$19<span className="text-lg font-normal text-primary-foreground/70">/month</span></p>
                  <p className="text-primary-foreground/70">For professionals & teams</p>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  <li className="flex items-center text-primary-foreground">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Unlimited links</span>
                  </li>
                  <li className="flex items-center text-primary-foreground">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-center text-primary-foreground">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Custom branded domains</span>
                  </li>
                  <li className="flex items-center text-primary-foreground">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center text-primary-foreground">
                    <Check className="w-5 h-5 mr-2" />
                    <span>Team collaboration</span>
                  </li>
                </ul>
                <Button variant="secondary" className="w-full">Start Free Trial</Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-2">Paste Your URL</h3>
                <p className="text-gray-500">Enter your long URL into our shortener input field.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">Customize (Optional)</h3>
                <p className="text-gray-500">Add a custom alias or apply advanced settings if desired.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Share and Track</h3>
                <p className="text-gray-500">Use your new short link and monitor its performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Shorten?</h2>
              <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
                Join thousands of professionals and businesses using XOTO Links to manage and track their URLs.
              </p>
              <Button variant="secondary" size="lg">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

