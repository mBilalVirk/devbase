import React, { useState } from 'react';
import { useDevBase } from '../context/DevBaseContext';
import { Mail, Send, CheckCircle2, MessageSquare, MapPin } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { sendContactMessage } = useDevBase();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    sendContactMessage(name.trim(), email.trim(), subject.trim() || 'General Inquiry', message.trim());
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
          Get in Touch
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact the DevBase Editorial Team
        </h1>
        <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
          Have an errata report, a tutorial proposal, or platform feedback? Reach out directly using the form below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Information (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Editorial Guidelines</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We review community suggestions for technical accuracy, clarity of explanation, and strict adherence to modern browser standards.
            </p>

            <div className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>editorial@devbase.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Response time: &lt; 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form (7 cols) */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm"
          >
            <h3 className="text-base font-bold text-white mb-2">Send Message</h3>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-semibold">Message delivered successfully!</div>
                  <div className="text-emerald-400/80">Our editors have received your dispatch and will respond promptly.</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-300 font-medium mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Topic or tutorial proposal title"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="text-xs">
              <label className="block text-slate-300 font-medium mb-1">Message Body</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry, suggestion, or question..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Submit Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
