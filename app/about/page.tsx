import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our LCA Tool</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advancing sustainable metallurgy through comprehensive aluminum lifecycle assessment
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Importance of Circularity in Aluminum</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Aluminum is one of the most recyclable materials on Earth, with the potential for infinite recycling
              without quality loss. However, achieving true circularity requires comprehensive understanding of the
              entire lifecycle - from bauxite mining to end-of-life recovery.
            </p>
            <p>
              The aluminum industry faces significant environmental challenges, including high energy consumption during
              primary production and the generation of red mud waste. Our LCA tool helps identify optimization
              opportunities across the entire value chain.
            </p>
            <p>
              By implementing circular economy principles, the aluminum sector can reduce its carbon footprint by up to
              75% while maintaining product quality and performance standards.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Benefits</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Reduce environmental impact by up to 95% through optimized recycling
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Lower energy consumption compared to primary aluminum production
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Minimize waste generation and landfill dependency
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Enhance resource security and supply chain resilience
            </li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              Team SkyMax - NIT Raipur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Proposed and developed by Team SkyMax from NIT Raipur, ensuring cutting-edge research and innovative
              approaches to sustainable aluminum lifecycle assessment and circular economy principles.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              Academic Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Built with rigorous academic research from NIT Raipur's engineering expertise, ensuring scientific
              accuracy and industry relevance in all assessment methodologies and sustainability frameworks.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Meet Team SkyMax</h2>
        <div className="grid md:grid-cols-5 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-1">Abdullah Shaikh</h3>
            <p className="text-sm text-gray-600">Team-Leader</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-1">Shani Sao</h3>
            <p className="text-sm text-gray-600">Design Lead</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-1">Sahil Tiwari</h3>
            <p className="text-sm text-gray-600">Developer</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-1">Ayush Mishra</h3>
            <p className="text-sm text-gray-600">Researcher</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-1">Adya Singh</h3>
            <p className="text-sm text-gray-600">Analyst</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-1">Anshikha Pandey</h3>
            <p className="text-sm text-gray-600">Engineer</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-4">
            Contact Team SkyMax for collaboration, research partnerships, or technical inquiries.
          </p>
          <div className="text-sm text-gray-500">National Institute of Technology, Raipur</div>
        </div>
      </div>

      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Case Studies & Applications</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Automotive Industry</h3>
            <p className="text-sm text-gray-600">
              Optimizing aluminum usage in vehicle manufacturing for weight reduction and improved fuel efficiency.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Building & Construction</h3>
            <p className="text-sm text-gray-600">
              Sustainable aluminum applications in green building projects and infrastructure development.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Packaging Solutions</h3>
            <p className="text-sm text-gray-600">
              Circular packaging design for food and beverage industries with enhanced recyclability.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
