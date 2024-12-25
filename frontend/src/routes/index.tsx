import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/context/AuthContext';
import { createFileRoute, Link } from '@tanstack/react-router';
import heroPhoto from '../../public/herophoto.webp';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {

  const { isLoggedIn } = useAuthContext();

  const successStories = [
    {
      image: '/successStories/The-Giving-Pledge.png',
      title: 'The Giving Pledge',
      description: 'The Giving Pledge is a commitment by the world\'s wealthiest individuals and families to dedicate the majority of their wealth to giving back. This campaign encourages the world’s wealthiest individuals to commit at least half of their wealth to philanthropy during their lifetime or in their will. It’s not a traditional fundraiser but an advocacy-driven commitment to giving.'
    },
    {
      image : '/successStories/red-nose-day.avif',
      title: 'Red Nose Day',
      description: 'A fundraising campaign by Comic Relief, Red Nose Day uses humor and entertainment to raise money for children and families living in poverty. Celebrities participate in skits and performances to encourage donations. The funds are distributed to charitable organizations worldwide. Over $1 billion globally (since its inception in 1988).'
    }
  ]

  const featuredCampaigns = [
    {
      image: '/successStories/successStories1.jpeg',
      title: 'Planting Futures: Grow a Greener Tomorrow',
      description: "Help us restore the planet, one tree at a time. Your contribution will go towards planting trees that provide clean air, habitats for wildlife, and a sustainable future for generations to come."
    },
    {
      image: '/successStories/successStories2.jpg',
      title: 'Rebuilding Dreams: Aid for Ukrainian Refugees',
      description: "Millions of Ukrainians displaced by war are struggling to rebuild their lives in unfamiliar countries. Your support can provide them with resources, job opportunities, and hope for a better future. Donate today to help them find stability and dignity."
    },
    {
      image: '/successStories/successStories3.png',
      title: 'Race For Life',
      description: "Real LIFE Foundation is a Philippine Christian nongovernmental organization that seeks to break the cycle of poverty in Filipino homes by providing targeted educational assistance to underserved youth and empowering them through character formation and leadership development."
    }
  ] 

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="ml-2 text-xl font-bold text-gray-900">CrowdFund</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {['Home', 'About', 'How-It-Works', 'Browse Donations'].map((item) => (
                  <Link
                    key={item}
                    href={item === 'Browse Donations' ? '/browse' : `#${item}`}
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {isLoggedIn() ? (
                <div className='space-x-4'>
                  <Link href="/dashboard/overview">
                    <Button>Dashboard</Button>
                  </Link>
                  <Button onClick={() => handleLogout()} variant="outline">
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link href="/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section id="Home" className="relative bg-gray-50 overflow-hidden flex items-center">
          <div className="max-w-7xl mx-auto flex">
            <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Make a Difference</span>{' '}
                    <span className="block text-indigo-600 xl:inline">Support a Cause</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Join our community of changemakers. Browse campaigns, donate to causes you care about, or start your own fundraiser today.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link to="/campaigns/browse" search={{ page: 1, search: '', filter: '' }} >
                        <Button size="lg" className="w-full">Browse Campaigns</Button>
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link href={isLoggedIn() ? "/dashboard/overview" : "/login"}>
                        <Button variant="outline" size="lg" className="w-full">
                          {isLoggedIn() ? "Go to Dashboard" : "Start Fundraising"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <div className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
                <img
                  className="max-w-[620px] rounded-xl"
                  src={heroPhoto}
                  alt="People helping each other"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="featured-campaigns" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Featured Campaigns
            </h2>
            <div className="mt-6 grid gap-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
              {featuredCampaigns.map((item) => (
                <div key={item.title} className="relative">
                  <div className="aspect-w-3 aspect-h-2">
                    <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden border-4 border-indigo-200">
                      {/* Placeholder for campaign image */}
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <img className='w-full h-full max-w-[375px] max-h-[200px]' src={item.image} /> 
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="About" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Empowering Change Through Community
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                CrowdFund is more than just a platform - it's a movement of people coming together to make a difference.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: "Global Reach, Local Impact",
                    description: "We connect donors with causes around the world, enabling you to make a difference wherever you are.",
                    icon: (
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Transparent and Secure",
                    description: "We ensure your donations go directly to the causes you support, with full transparency and security.",
                    icon: (
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div key={item.title} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        {item.icon}
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{item.title}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="How-It-Works" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
              <p className="mt-4 text-lg text-gray-500">
                Our platform makes it easy to support causes you care about or start your own fundraising campaign.
              </p>
            </div>
            <div className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-8">
              {[
                { title: "Browse Campaigns", description: "Explore a wide variety of causes and campaigns." },
                { title: "Make a Donation", description: "Contribute to the campaigns that resonate with you." },
                { title: "Track Your Impact", description: "See how your donation makes a real difference." }
              ].map((step, index) => (
                <Card key={step.title} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-4xl font-bold text-indigo-600 mr-4">{index + 1}</span>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="success-stories" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <div className="mt-6 grid gap-16 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
              {successStories.map((item) => (
                <div key={item.title} className="relative">
                  <div className="aspect-w-3 aspect-h-2 mb-4">
                    <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden border-4 border-indigo-200">
                      {/* Placeholder for success story image */}
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <img className='w-full h-full max-w-[585px] max-h-[290px]' src={item.image} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            {["About", "Browse Donations", "Privacy", "Terms", "Contact"].map((item) => (
              <div key={item} className="px-5 py-2">
                <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-base text-gray-400 hover:text-white">
                  {item}
                </Link>
              </div>
            ))}
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} CrowdFund, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
