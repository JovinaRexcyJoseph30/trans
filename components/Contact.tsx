import React from 'react';
import { MapPin, Phone, Mail, Printer } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                {/* Header */}
                <div className="bg-brand-navy px-8 py-10 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform origin-bottom-right"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-white font-sans mb-2">Contact Us</h1>
                        <p className="text-blue-100 text-sm max-w-xl">
                            Get in touch with us for any queries or assistance. We are here to help.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">

                    {/* Left: Contact Details */}
                    <div className="w-full lg:w-1/3 p-8 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
                        <div className="space-y-8">

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-brand-blue flex-shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-navy mb-2">Address</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Jeppiaar Institute of Technology,<br />
                                        Kunnam, Sunguvarchatram,<br />
                                        Sriperumbudur (TK), Chennai – 631 604.
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-brand-blue flex-shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-navy mb-2">Email</h3>
                                    <div className="flex flex-col gap-1">
                                        <a href="mailto:office@jeppiaarinstitute.org" className="text-slate-600 text-sm hover:text-brand-blue transition-colors">office@jeppiaarinstitute.org</a>
                                        <a href="mailto:network@jeppiaarinstitute.org" className="text-slate-600 text-sm hover:text-brand-blue transition-colors">network@jeppiaarinstitute.org</a>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-brand-blue flex-shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="w-full">
                                    <h3 className="font-bold text-brand-navy mb-3">Phone Numbers</h3>
                                    <div className="space-y-4">

                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">College Office</p>
                                            <div className="flex flex-col text-sm font-mono text-slate-700">
                                                <a href="tel:04427159000" className="hover:text-brand-blue">044-27159000</a>
                                                <a href="tel:7401222000" className="hover:text-brand-blue">7401222000</a>
                                                <a href="tel:7401222010" className="hover:text-brand-blue">7401222010</a>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ladies Hostel</p>
                                            <a href="tel:04427159019" className="text-sm font-mono text-slate-700 hover:text-brand-blue whitespace-nowrap">044-27159019, 25</a>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Gents Hostel</p>
                                            <a href="tel:04427159014" className="text-sm font-mono text-slate-700 hover:text-brand-blue whitespace-nowrap">044-27159014, 30</a>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fax</p>
                                            <span className="text-sm font-mono text-slate-700 whitespace-nowrap">044-27159006</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right: Map */}
                    <div className="w-full lg:w-2/3 h-[500px] lg:h-auto min-h-[500px] bg-slate-100 relative">
                        <iframe
                            src="https://maps.google.com/maps?q=12.889389,79.874472&z=15&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            className="absolute inset-0"
                            title="JIT Location Map"
                        ></iframe>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
