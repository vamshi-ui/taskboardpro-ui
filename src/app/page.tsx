import {
  CheckCircle,
  Calendar,
  Clock,
  Layout,
  Users,
  BarChart3,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "primereact/button";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Streamline your workflow with TaskBoard Pro
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                The intuitive task management platform designed to boost
                productivity and organize your projects with precision and ease.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button className="border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-6 text-base">
                    Start for free <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="inline-block h-8 w-8 rounded-full bg-amber-200 border-2 border-white"
                    />
                  ))}
                </div>
                <span className="ml-4 text-sm text-gray-600">
                  Trusted by <span className="font-medium">10,000+</span>{" "}
                  professionals
                </span>
              </div>
            </div>
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-amber-500/20"></div>
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
                alt="TaskBoard Pro Dashboard"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to stay organized
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              TaskBoard Pro comes with all the tools you need to manage projects
              efficiently.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="h-8 w-8 text-amber-500" />,
                title: "Intuitive Task Management",
                description:
                  "Create, organize, and prioritize tasks with our drag-and-drop interface.",
              },
              {
                icon: <Calendar className="h-8 w-8 text-amber-500" />,
                title: "Smart Scheduling",
                description:
                  "Plan your week with our intelligent scheduling system that optimizes your workflow.",
              },
              {
                icon: <Clock className="h-8 w-8 text-amber-500" />,
                title: "Time Tracking",
                description:
                  "Track time spent on tasks to improve productivity and billing accuracy.",
              },
              {
                icon: <Users className="h-8 w-8 text-amber-500" />,
                title: "Team Collaboration",
                description:
                  "Share boards, assign tasks, and communicate with your team in real-time.",
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-amber-500" />,
                title: "Analytics Dashboard",
                description:
                  "Gain insights into your productivity with visual reports and analytics.",
              },
              {
                icon: <Layout className="h-8 w-8 text-amber-500" />,
                title: "Customizable Boards",
                description:
                  "Create custom workflows that match your team's unique processes.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-amber-100 group"
              >
                <div className="p-3 bg-amber-100 rounded-lg w-fit group-hover:bg-amber-200 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Users", value: "250,000+" },
              { label: "Tasks Completed", value: "10M+" },
              { label: "Time Saved", value: "1M+ hours" },
              { label: "Satisfaction Rate", value: "99.8%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-amber-500">
                  {stat.value}
                </p>
                <p className="mt-2 text-lg text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Loved by teams worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what our users have to say about TaskBoard Pro.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "TaskBoard Pro has transformed how our marketing team collaborates. The interface is intuitive and visually appealing.",
                author: "Alex Morgan",
                role: "Marketing Director",
              },
              {
                quote:
                  "As a project manager, I've tried dozens of tools. TaskBoard Pro stands out with its perfect balance of simplicity and powerful features.",
                author: "Sam Peterson",
                role: "Senior Project Manager",
              },
              {
                quote:
                  "The customizable workflows and time tracking features have increased our team productivity by over 30%.",
                author: "Jamie Chen",
                role: "CTO, TechStart Inc.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="h-40">
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
                <div className="mt-6">
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-amber-300 p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-400 opacity-50"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Ready to transform your workflow?
              </h2>
              <p className="mt-4 text-lg text-gray-800">
                Join thousands of teams that use TaskBoard Pro to stay
                organized, focused, and productive.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white transition-all px-8 py-6 text-base">
                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button className="bg-white border-gray-300 hover:bg-gray-50 text-gray-900 px-8 py-6 text-base">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
