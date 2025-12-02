import React from 'react';
import { Target, Lightbulb, ShieldCheck, Globe } from 'lucide-react';

const Home: React.FC = () => {
    const sdgIcons = [
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-01.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-02.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-03.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-04.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-05.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-06.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-07.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-08.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-09.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-10.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-11.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-12.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-13.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-14.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-15.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-16.png",
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-17.png",
        "https://globalhope.network/wp-content/uploads/E_SDG_logo_without_UN_emblem_square_CMYK_Transparent-1920x1136.png"
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">

            {/* Vision, Mission, Quality Policy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Vision */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                        <Lightbulb className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h2 className="text-xl font-bold text-brand-navy mb-4">Vision</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Jeppiaar Institute of Technology aspires to provide technical education in futuristic technologies with the perspective of innovative, industrial, and social applications for the betterment of humanity.
                    </p>
                </div>

                {/* Mission */}
                <div className="bg-brand-navy rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-4">Mission</h2>
                    <p className="text-white text-sm leading-relaxed">
                        To produce competent and disciplined high-quality professionals with the practical skills necessary to excel as innovative professionals and entrepreneurs for the benefit of society. To improve the quality of education through excellence in teaching and learning, research, leadership, and by promoting the principles of scientific analysis, and creative thinking.
                    </p>
                </div>

                {/* Quality Policy */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                        <ShieldCheck className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h2 className="text-xl font-bold text-brand-navy mb-4">Quality Policy</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        "To pursue global standards of excellence in all our endeavours in teaching, infrastructure, resources, research and continuing education through continual improvement process and effectiveness of the Quality Management System".
                    </p>
                </div>

            </div>

            {/* SDGs Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-brand-navy p-8 text-center relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mt-10 blur-2xl"></div>
                    <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full -mr-10 -mb-10 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Globe className="w-6 h-6 text-brand-blue" />
                            <h2 className="text-sm font-bold text-brand-blue uppercase tracking-widest">Global Goals</h2>
                        </div>
                        <div className="flex justify-center mb-6 px-4">
                            <img
                                src="https://globalhope.network/wp-content/uploads/E_SDG_logo_without_UN_emblem_square_CMYK_Transparent-1920x1136.png"
                                alt="Sustainable Development Goals"
                                className="w-full max-w-md h-auto object-contain"
                            />
                        </div>
                        <p className="text-blue-100 max-w-4xl mx-auto text-sm leading-relaxed text-justify">
                            Let us unite in building a better world—where there is No Poverty and Zero Hunger, where Good Health and Well-being are safeguarded, and Quality Education is accessible to all. A world that champions Gender Equality, guarantees Clean Water and Sanitation, and ensures universal access to affordable and Clean Energy. Let us strive for Decent Work and Economic Growth, nurture Industry, Innovation and Infrastructure, and actively reduce inequalities. We envision Sustainable Cities and Communities, promote Responsible Consumption and Production, and take urgent Climate Action. We are committed to protecting Life Below Water and Life on Land, upholding Peace, Justice and Strong Institutions, and strengthening Partnerships for the Goals.
                        </p>
                    </div>
                </div>

                <div className="p-8 bg-slate-50">
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-4">
                        {sdgIcons.map((url, index) => (
                            <div
                                key={index}
                                className="aspect-square bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:scale-105 transition-transform duration-300 md:w-[calc((100%-8rem)/9)]"
                            >
                                <img
                                    src={url}
                                    alt={`SDG Goal ${index + 1}`}
                                    className={`w-full h-full ${index === 17 ? 'object-contain p-2' : 'object-cover'}`}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
