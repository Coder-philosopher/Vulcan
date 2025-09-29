import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl"></div>
      
      <div className="relative  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200/50 text-blue-700 text-sm font-semibold mb-6">
            About Our Innovation
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-6">
            About Our LCA Tool
          </h1>
          <p className="text-xl text-blue-700/80 max-w-4xl mx-auto leading-relaxed font-medium">
            Advancing sustainable metallurgy through comprehensive aluminum lifecycle assessment
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-8">
                Importance of Circularity in Aluminum
              </h2>
              <div className="space-y-6 text-blue-700/80 leading-relaxed">
                <p className="text-lg">
                  Aluminum is one of the most recyclable materials on Earth, with the potential for infinite recycling
                  without quality loss. However, achieving true circularity requires comprehensive understanding of the
                  entire lifecycle - from bauxite mining to end-of-life recovery.
                </p>
                <p className="text-lg">
                  The aluminum industry faces significant environmental challenges, including high energy consumption during
                  primary production and the generation of red mud waste. Our LCA tool helps identify optimization
                  opportunities across the entire value chain.
                </p>
                <p className="text-lg">
                  By implementing circular economy principles, the aluminum sector can reduce its carbon footprint by up to
                  75% while maintaining product quality and performance standards.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits Card */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-8 border border-blue-200/50 shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-xl mr-3 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Key Benefits
            </h3>
            <ul className="space-y-4">
              {[
                "Reduce environmental impact by up to 95% through optimized recycling",
                "Lower energy consumption compared to primary aluminum production",
                "Minimize waste generation and landfill dependency",
                "Enhance resource security and supply chain resilience"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start group">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mt-1 mr-4 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-blue-700 font-medium text-lg leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-white shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <span className="text-blue-800 font-bold">Team SkyMax - NIT Raipur</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700/80 leading-relaxed text-lg">
                Proposed and developed by Team SkyMax from NIT Raipur, ensuring cutting-edge research and innovative
                approaches to sustainable aluminum lifecycle assessment and circular economy principles.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-100 to-blue-50 shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <span className="text-blue-800 font-bold">Academic Excellence</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700/80 leading-relaxed text-lg">
                Built with rigorous academic research from NIT Raipur's engineering expertise, ensuring scientific
                accuracy and industry relevance in all assessment methodologies and sustainability frameworks.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-br from-blue-100/50 to-white rounded-3xl p-10 mb-20 border border-blue-200/50 shadow-xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
            Meet Team SkyMax
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {[
              { name: "Abdullah Shaikh", role: "Team-Leader" },
              { name: "Shani Sao", role: "Design Lead" },
              { name: "Sahil Tiwari", role: "Developer" },
              { name: "Ayush Mishra", role: "Researcher" },
              { name: "Adya Singh", role: "Analyst" },
              { name: "Anshikha Pandey", role: "Engineer" }
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 border border-blue-100/50 text-center group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-blue-800 mb-2">{member.name}</h3>
                <p className="text-sm text-blue-600/80 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-blue-700/80 mb-4 text-lg">
              Contact Team SkyMax for collaboration, research partnerships, or technical inquiries.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full border border-blue-200/50">
              <span className="text-blue-700 font-semibold">National Institute of Technology, Raipur</span>
            </div>
          </div>
        </div>

        {/* Case Studies Section */}
        <section className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 border border-blue-200/50 shadow-xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-10 text-center">
            Case Studies & Applications
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Automotive Industry",
                description: "Optimizing aluminum usage in vehicle manufacturing for weight reduction and improved fuel efficiency.",
                icon: "M19 14l-7 7m0 0l-7-7m7 7V3"
              },
              {
                title: "Building & Construction", 
                description: "Sustainable aluminum applications in green building projects and infrastructure development.",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"
              },
              {
                title: "Packaging Solutions",
                description: "Circular packaging design for food and beverage industries with enhanced recyclability.",
                icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              }
            ].map((study, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={study.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-blue-800 mb-4 text-xl">{study.title}</h3>
                <p className="text-blue-700/80 leading-relaxed">{study.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
