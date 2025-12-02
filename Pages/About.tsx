import React from 'react';
import { Award, Rocket, Users, BookOpen } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuH7ddxQ9jHC0W1_4SizfKw61VHcxIscrug&s"
                    alt="JIT Logo"
                    className="h-24 w-auto mx-auto mb-6 object-contain"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://yt3.googleusercontent.com/pDqWRSkJM6LdfkkCFByEWK4lbIZsetVP17jR_edTMLxcsUcSO4nfmEAxyF4CSZTZMUHQ_G8q=s900-c-k-c0x00ffffff-no-rj';
                    }}
                />
                <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Jeppiaar Institute of Technology</h1>
                <p className="text-xl text-brand-blue font-medium">Forging Technical Excellence</p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Main Narrative */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-2xl font-bold text-brand-navy mb-4 flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-brand-blue" />
                            Overview
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                            <p className="mb-4">
                                Jeppiaar Institute of Technology (JIT) is a Christian Minority Autonomous Institution established in 2011 by our Honourable Chairman, Late Col. Dr. Jeppiaar. Approved by AICTE and certified with ISO 9001:2015, JIT stands as a testament to technical excellence and responsible development.
                            </p>
                            <p>
                                JIT was the first institution in India to establish a laboratory featuring Innovative Cloud Computing Technology. All classrooms are Computer-Aided Instruction (CAI) enabled with multimedia LCD projectors. The college currently offers five professional undergraduate engineering programs: B.E. Computer Science and Engineering, B.E. Electronics and Communication Engineering, B.E. Electrical and Electronics Engineering, B.Tech Information Technology, and B.E. Mechanical Engineering.
                            </p>
                        </div>
                    </div>

                    <div className="bg-brand-secondary rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-2xl font-bold text-brand-navy mb-4 flex items-center gap-3">
                            <Users className="w-6 h-6 text-brand-blue" />
                            Leadership
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                            <p>
                                The institute is situated in the Electronic Belt of Sriperumbudur, offering a widespread, environment-friendly campus on 12.52 acres of land in Kunnam. The campus embodies sustainable living practices. JIT is a proud entity of the Jeppiaar Remibai Educational Trust and is driven by the Chairman’s core vision: "Aspires to provide technical education in futuristic technologies with the perspective of innovative, industrial and social application for the betterment of humanity."
                            </p>
                            <p className="mt-4">
                                Dr. N. Marie Wilson, the Managing Director, works ceaselessly to advance technical and professional education, equipping students with the right attitude and skills for success. With the support of an experienced faculty team, Jeppiaar Institute of Technology acts as a critical springboard for thousands of aspirants seeking a global career.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Highlights */}
                <div className="space-y-8">

                    {/* Accolades */}
                    <div className="bg-brand-navy text-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                            <Award className="w-5 h-5 text-yellow-400" />
                            Key Accolades
                        </h2>
                        <ul className="space-y-4 relative z-10">
                            <li className="bg-white/10 rounded-lg p-4">
                                <strong className="block text-yellow-400 text-sm mb-1">ARIIA 2020</strong>
                                <span className="text-sm text-blue-100">Secured All India rank 6th-25th (Band A).</span>
                            </li>
                            <li className="bg-white/10 rounded-lg p-4">
                                <strong className="block text-yellow-400 text-sm mb-1">AICTE – CII Survey</strong>
                                <span className="text-sm text-blue-100">Awarded the 9th AICTE – CII Survey Gold Rating.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Space Initiative */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                            <Rocket className="w-5 h-5 text-brand-blue" />
                            Space Initiatives
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            JIT successfully scheduled the launch of its own satellite, <strong>UnitySat – JIT Satellite</strong>, as part of the Polar Satellite Launch Vehicle (PSLV) – C51 mission in February 2021.
                        </p>
                        <div className="bg-blue-50 rounded-lg p-3 text-xs text-brand-blue font-medium">
                            Ground Station established in Jan 2021 for telemetry data.
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default About;
