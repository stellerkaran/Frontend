"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    exam: "PECE",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to send your question.");
      }

      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        exam: "PECE",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (submitError) {
      setSubmitting(false);
      setError(submitError.message || "Unable to send your question. Please try again.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12" id="contact-us-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title head */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Connect Helpdesk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-3 tracking-tight">
            Contact Futurely
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded"></div>
          <p className="mt-4 text-xs sm:text-sm text-gray-500">
            Have questions about admission processes, test package transactions, or branch allocations? Send us a message and our advisors will respond within 4 hours.
          </p>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-800 shadow">
              
              <div>
                <h3 className="text-lg font-bold text-white">Direct Contacts</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Call our preparation counselors directly for registration queries.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5 text-sm">
                  <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase">Support Email</span>
                    <a href="mailto:futurely.edu@gmail.com" className="font-bold text-slate-200 hover:text-white transition-colors">
                      futurely.edu@gmail.com
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Counsel card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 space-y-3 shadow-sm">
              <h4 className="font-bold text-sm text-gray-950 flex items-center space-x-2">
                <HelpCircle className="h-4.5 w-4.5 text-primary" />
                <span>Frequently Asked Questions</span>
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Before seeking help, please inspect the <strong>Exams Guide</strong> panels. Most questions about eligibility, OMR syllabus matrices, and required reservation documents are fully answered.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm">
              
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send Counselling Question</h3>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-xs font-semibold mb-6 flex items-center space-x-2 animate-fadeIn" id="contact-success-toast">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>Success! Your question has been registered. We will revert shortly.</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs font-semibold mb-6" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Mahto"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 block">Mobile No.</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">Target State Exam</label>
                  <select
                    value={formData.exam}
                    onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                    className="w-full border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="PECE">Jharkhand Polytechnic (PECE)</option>
                    <option value="D2D">Jharkhand D2D (Lateral B.Tech)</option>
                    <option value="JHPLE">Jharkhand Poly Lateral (JHPLE)</option>
                    <option value="BRP">Bihar Polytechnic (BRP)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 block">Message Details</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Write your issue or counseling question here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  id="btn-submit-contact"
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow flex justify-center items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{submitting ? "Sending Query..." : "Submit Question Details"}</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
