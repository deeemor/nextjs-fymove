"use client";

import { useState } from "react";
import { Check, X, HelpCircle, ArrowRight, Shield, Activity, Users, Star } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface PricingFeature {
  name: string;
  included: boolean | "partial";
  tooltip?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  currency: string;
  features: PricingFeature[];
  popular?: boolean;
  cta: string;
  color?: string;
  icon: JSX.Element;
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const plans: PricingPlan[] = [
    {
      id: "basic",
      name: "Basic",
      description: "Essential rehabilitation tracking for individuals",
      price: {
        monthly: 29.99,
        annually: 24.99,
      },
      currency: "€",
      features: [
        { name: "Personal rehabilitation plan", included: true },
        { name: "Progress tracking", included: true },
        { name: "Exercise library (50+ exercises)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Video guidance", included: "partial", tooltip: "Limited to 10 videos per month" },
        { name: "Professional consultation", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Custom exercise creation", included: false },
      ],
      cta: "Get Started",
      color: "blue",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      id: "pro",
      name: "Professional",
      description: "Complete rehabilitation solution with expert guidance",
      price: {
        monthly: 59.99,
        annually: 49.99,
      },
      currency: "€",
      features: [
        { name: "Personal rehabilitation plan", included: true },
        { name: "Progress tracking", included: true },
        { name: "Exercise library (150+ exercises)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Video guidance", included: true },
        { name: "Professional consultation", included: true, tooltip: "2 sessions per month" },
        { name: "Advanced analytics", included: true },
        { name: "Custom exercise creation", included: false },
      ],
      popular: true,
      cta: "Go Professional",
      color: "blue",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom rehabilitation solutions for clinics and teams",
      price: {
        monthly: 99.99,
        annually: 84.99,
      },
      currency: "€",
      features: [
        { name: "Personal rehabilitation plan", included: true },
        { name: "Progress tracking", included: true },
        { name: "Exercise library (300+ exercises)", included: true },
        { name: "Mobile app access", included: true },
        { name: "Video guidance", included: true },
        { name: "Professional consultation", included: true, tooltip: "Unlimited sessions" },
        { name: "Advanced analytics", included: true },
        { name: "Custom exercise creation", included: true },
      ],
      cta: "Contact Sales",
      color: "blue",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const calculateSavings = (plan: PricingPlan) => {
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.annually * 12;
    const savings = monthlyCost - annualCost;
    const savingsPercentage = Math.round((savings / monthlyCost) * 100);
    return { savings, savingsPercentage };
  };

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/5 dark:to-gray-950"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 mb-8">
            <Star className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Choose Your Perfect Plan</span>
          </div>

          <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
            Rehabilitation Plans for Everyone
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your rehabilitation journey. All plans include our core
            features to help you recover faster and more effectively.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-1 rounded-full shadow-inner">
              <span
                className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </span>
              <span
                className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                  billingCycle === "annually"
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setBillingCycle("annually")}
              >
                Annually
                <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
                  Save 16%
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const { savings, savingsPercentage } = calculateSavings(plan);
            const isHovered = hoveredPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.popular
                    ? "border-2 border-blue-500 dark:border-blue-400"
                    : "border border-gray-200 dark:border-gray-700"
                } bg-white dark:bg-gray-800 ${
                  index % 3 === 0 ? "md:translate-y-4" : 
                  index % 3 === 1 ? "" : "md:-translate-y-4"
                }`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                    {plan.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 h-12 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        {plan.currency}
                      </span>
                      <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {billingCycle === "monthly"
                          ? plan.price.monthly.toFixed(2)
                          : plan.price.annually.toFixed(2)}
                      </span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        /{billingCycle === "monthly" ? "mo" : "mo, billed annually"}
                      </span>
                    </div>

                    {billingCycle === "annually" && (
                      <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                        Save ${savings.toFixed(2)} per year ({savingsPercentage}% off)
                      </p>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.name}
                        className="flex items-start gap-3 relative group"
                        onMouseEnter={() => feature.tooltip && setHoveredFeature(feature.name)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div
                          className={`mt-0.5 flex-shrink-0 rounded-full p-1 ${
                            feature.included === true
                              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              : feature.included === "partial"
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                          }`}
                        >
                          {feature.included === true ? (
                            <Check className="w-4 h-4" />
                          ) : feature.included === "partial" ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          feature.included === false
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-700 dark:text-gray-300"
                        }`}>
                          {feature.name}
                          {feature.tooltip && (
                            <button className="ml-1 inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                              <HelpCircle className="w-4 h-4" />
                            </button>
                          )}
                        </span>

                        {feature.tooltip && hoveredFeature === feature.name && (
                          <div className="absolute left-0 top-6 z-10 w-48 rounded-md bg-gray-900 dark:bg-gray-700 p-2 text-xs text-white shadow-lg">
                            {feature.tooltip}
                            <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700"></div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need a custom solution?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            We offer tailored rehabilitation programs for healthcare providers, sports teams, and
            large organizations. Contact our team to discuss your specific needs.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-gray-200 dark:border-gray-700"
          >
            <span>Contact our team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Satisfaction Guaranteed
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try our platform risk-free with our 14-day money-back guarantee. If you're not completely
                satisfied with your rehabilitation experience, we'll provide a full refund, no
                questions asked.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg text-center">
                14-Day
                <br />
                Guarantee
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Secure Payments",
                description: "All transactions are processed securely through Stripe",
                icon: <Shield className="w-6 h-6" />,
              },
              {
                title: "Cancel Anytime",
                description: "No long-term contracts, cancel your subscription at any time",
                icon: <X className="w-6 h-6" />,
              },
              {
                title: "24/7 Support",
                description: "Our support team is available around the clock to assist you",
                icon: <Activity className="w-6 h-6" />,
              },
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}