import { useState, useEffect, useRef } from 'react'

const HomePage = ({ onNavigate }) => {
  const [searchCategory, setSearchCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'user', text: 'Hi, I need a data analyst in Nairobi for my startup 📊', time: '10:24 AM' },
    { id: 2, type: 'bot', text: '🎯 Great! I found 3 verified Data Analysts in Nairobi. Here\'s your top match:', time: '10:24 AM' },
    {
      id: 3,
      type: 'bot-card',
      time: '10:24 AM',
      expert: {
        name: 'Dr. Amina K.',
        title: 'Senior Data Analyst & Research Fellow',
        rating: '4.98 (47 reviews)',
        location: 'Westlands, Nairobi',
        specialties: ['SPSS', 'Python', 'Financial Modeling'],
      },
    },
    {
      id: 4,
      type: 'bot',
      text: 'Would you like to:\n1️⃣ View full portfolio & methodology\n2️⃣ Book a live consultation (M-Pesa)\n3️⃣ Request custom quote',
      time: '10:25 AM',
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isTyping])

  const sampleExperts = [
    { name: 'Dr. Amina K.', category: 'consultants', role: 'SPSS & Quantitative Analyst', location: 'Nairobi', rate: 'From KSh 2,500/hr', rating: '4.98 (47)', targetPage: 'consultants' },
    { name: 'David Mutiso', category: 'consultants', role: 'C-Suite Executive Leadership Coach', location: 'Kilimani, Nairobi', rate: 'From KSh 5,000/hr', rating: '5.0 (32)', targetPage: 'consultants' },
    { name: 'Michelle Wanjiku', category: 'creativity', role: 'Celebrity & Bridal MUA', location: 'Westlands, Nairobi', rate: 'From KSh 3,500/session', rating: '4.96 (58)', targetPage: 'creativity' },
    { name: 'Coach Collins Kiprop', category: 'sports', role: 'Marathon & Distance Coach', location: 'Ngong Hills, Nairobi', rate: 'From KSh 3,000/session', rating: '4.99 (76)', targetPage: 'sports' },
    { name: 'Kevin Otieno', category: 'creativity', role: 'Acoustic Guitar Virtuoso', location: 'Lavington, Nairobi', rate: 'From KSh 2,000/hr', rating: '4.92 (44)', targetPage: 'creativity' },
    { name: 'Prof. Peter Ombati', category: 'consultants', role: 'Qualitative Thesis Consultant', location: 'Parklands, Nairobi', rate: 'From KSh 3,000/hr', rating: '4.95 (64)', targetPage: 'consultants' },
  ]

  const handleSearch = (e) => {
    e?.preventDefault()
    const query = searchQuery.toLowerCase().trim()
    const filtered = sampleExperts.filter((exp) => {
      const matchCat = searchCategory === 'all' || exp.category === searchCategory
      const matchQuery = !query || exp.name.toLowerCase().includes(query) || exp.role.toLowerCase().includes(query)
      return matchCat && matchQuery
    })
    setSearchResults(filtered)
  }

  const handleSendChat = (text) => {
    const userMsg = text || chatInput
    if (!userMsg.trim()) return

    const newMsg = {
      id: Date.now(),
      type: 'user',
      text: userMsg,
      time: '10:26 AM',
    }
    setChatMessages((prev) => [...prev, newMsg])
    setChatInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: `⚡ Found 2 available matches for "${userMsg}". Dr. Amina K. and Prof. Ombati have slots open this week in Nairobi. Tap below to inspect milestone retainers!`,
        time: '10:26 AM',
      }
      setChatMessages((prev) => [...prev, botResponse])
    }, 1200)
  }

  const handleResetChat = () => {
    setChatMessages([
      { id: 1, type: 'user', text: 'Hi, I need a data analyst in Nairobi for my startup 📊', time: '10:24 AM' },
      { id: 2, type: 'bot', text: '🎯 Great! I found 3 verified Data Analysts in Nairobi. Here\'s your top match:', time: '10:24 AM' },
      {
        id: 3,
        type: 'bot-card',
        time: '10:24 AM',
        expert: {
          name: 'Dr. Amina K.',
          title: 'Senior Data Analyst & Research Fellow',
          rating: '4.98 (47 reviews)',
          location: 'Westlands, Nairobi',
          specialties: ['SPSS', 'Python', 'Financial Modeling'],
        },
      },
      {
        id: 4,
        type: 'bot',
        text: 'Would you like to:\n1️⃣ View full portfolio & methodology\n2️⃣ Book a live consultation (M-Pesa)\n3️⃣ Request custom quote',
        time: '10:25 AM',
      },
    ])
  }

  return (
    <div className="overflow-hidden bg-white text-[#0a0a0f]">
      {/* HERO SECTION */}
      <section className="hero-grid relative overflow-hidden border-b border-black/5">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1.12fr_.88fr] lg:px-8 lg:pb-24 lg:pt-16 items-center">
          <div className="relative z-10 text-left">
            {/* Kicker badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-xs font-black uppercase tracking-[.14em] text-black shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7020e8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7020e8]" />
              </span>
              Kenya&apos;s Elite Talent Ecosystem
            </div>

            {/* Headline with Black & Purple contrast */}
            <h1 className="max-w-[720px] text-[40px] font-black leading-[1.08] tracking-[-2px] text-black sm:text-[54px] lg:text-[62px]">
              GROW YOUR SKILLS,{' '}
              <br className="hidden sm:inline" />
              <span className="relative whitespace-nowrap text-[#7020e8]">
                SCALE YOUR BUSINESS,
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 210 12" fill="none">
                  <path d="M3 8.5c49-6 129-7 204-2.5" stroke="#7020e8" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" />
                </svg>
              </span>{' '}
              <br className="hidden sm:inline" />
              MASTER YOUR CRAFT
            </h1>

            {/* Subheading */}
            <p className="mt-6 max-w-[580px] text-base sm:text-lg leading-8 text-[#554e60] font-medium">
              The Premium, WhatsApp-Native Hub for Elite Kenyan Coaches, Consultants, and Academic Mentors.
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="mt-8 flex max-w-[720px] flex-col rounded-2xl border border-black/15 bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center transition-all focus-within:border-[#7020e8] focus-within:shadow-[0_20px_50px_rgba(112,32,232,0.15)]"
            >
              {/* Category Dropdown */}
              <div className="flex min-w-0 flex-[.85] items-center gap-2 px-3 py-2.5">
                <span className="text-[#7020e8] text-base font-bold">✦</span>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-black outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="consultants">Consultants &amp; Advisory</option>
                  <option value="creativity">Creativity Experts</option>
                  <option value="sports">Sports Coaches</option>
                  <option value="masterclasses">Masterclass Events</option>
                </select>
              </div>

              <div className="mx-2 hidden h-8 w-px bg-black/10 sm:block" />

              {/* Text Input */}
              <label className="flex min-w-0 flex-1 items-center gap-2.5 border-t border-black/10 px-3 py-2.5 sm:border-0">
                <svg className="h-4 w-4 shrink-0 text-[#7020e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" strokeWidth="2.5" />
                  <path d="m20 20-4-4" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="What service or coach do you need?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-[#888194] text-black"
                />
              </label>

              {/* Search Button */}
              <button
                type="submit"
                className="rounded-xl bg-black hover:bg-[#7020e8] px-7 py-3.5 text-sm font-black text-white transition-all cursor-pointer shadow-md hover:shadow-[0_8px_25px_rgba(112,32,232,0.4)] whitespace-nowrap btn-shimmer"
              >
                Search
              </button>
            </form>

            {/* Popular Chips */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#665e70]">
              <span className="font-extrabold text-black">Popular in Kenya:</span>
              {['SPSS & R Dissertations', 'Executive Retainers', 'Bridal Artistry', 'French Tutors', 'Marathon Coach'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag)
                    handleSearch()
                  }}
                  className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-black transition hover:border-[#7020e8] hover:text-[#7020e8] cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Results Display */}
            {searchResults && (
              <div className="mt-8 rounded-2xl border border-black/15 bg-white p-5 shadow-xl animate-in fade-in duration-200">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-black/5">
                  <h4 className="font-black text-sm text-black">
                    Found {searchResults.length} Verified Kenyan {searchResults.length === 1 ? 'Expert' : 'Experts'}:
                  </h4>
                  <button
                    onClick={() => setSearchResults(null)}
                    className="text-xs font-bold text-[#665e70] hover:text-black cursor-pointer"
                  >
                    Clear ✕
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {searchResults.map((exp, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-black/10 bg-[#faf7ff] flex justify-between items-center hover:border-[#7020e8]/50 transition">
                      <div>
                        <p className="font-black text-sm text-black">{exp.name}</p>
                        <p className="text-xs text-[#554e60]">{exp.role} • {exp.location}</p>
                        <p className="text-xs text-[#7020e8] font-black mt-1">{exp.rate}</p>
                      </div>
                      <button
                        onClick={() => onNavigate(exp.targetPage || 'consultants')}
                        className="px-3.5 py-1.5 bg-black hover:bg-[#7020e8] text-white text-xs font-bold rounded-lg transition cursor-pointer"
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Hero Visual Cards */}
          <div className="relative mx-auto hidden min-h-[480px] w-full max-w-[480px] lg:block">
            {/* Rotated Hero Card */}
            <div className="absolute right-2 top-0 h-[430px] w-[370px] rotate-[3deg] overflow-hidden rounded-[38px] border-[8px] border-white bg-violet-100 shadow-[0_28px_80px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:rotate-0 hover:scale-102">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1739298061757-7a3339cee982?auto=format&fit=crop&w=1000&q=88"
                alt="KaziPro Verified Mentors & Experts"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Top Badge with Float Animation */}
            <div className="absolute -left-2 top-14 rounded-2xl border border-black/10 bg-white/95 p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur animate-float">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white font-bold text-lg">
                  <img src="/logo-mark.png" alt="Emblem" className="h-6 w-6 object-contain" />
                </span>
                <div>
                  <p className="text-sm font-black text-black">Verified Kenyan Experts</p>
                  <p className="text-xs text-[#665e70]">Government ID &amp; Credentials Vetted</p>
                </div>
              </div>
            </div>

            {/* Floating Bottom Badge with Delayed Float Animation */}
            <div className="absolute bottom-2 left-8 w-[250px] rounded-2xl border border-black/10 bg-white/95 p-4 shadow-[0_20px_48px_rgba(0,0,0,0.16)] backdrop-blur animate-float-delayed">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" className="h-8 w-8 rounded-full border-2 border-white object-cover" alt="" />
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" className="h-8 w-8 rounded-full border-2 border-white object-cover" alt="" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" className="h-8 w-8 rounded-full border-2 border-white object-cover" alt="" />
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-black text-[10px] font-black text-white">
                    +500
                  </span>
                </div>
                <span className="flex items-center gap-1 text-sm font-black text-black">
                  <span className="text-amber-500">★</span> 4.98
                </span>
              </div>
              <p className="mt-2 text-xs font-bold text-black">
                12,400+ Consultations Completed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE TWO PATHWAY PORTS */}
      <section className="py-20 px-5 lg:px-8 bg-white border-b border-black/5">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center mb-14">
            <p className="section-kicker">Curated Specialization Tracks</p>
            <h2 className="section-title">
              The Two Pathway <span className="text-[#7020e8]">Ports.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#554e60]">
              Select your domain of engagement — from institutional research retainers to lifestyle and athletic mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Card: Professional & Academic Hub */}
            <div className="card-interactive rounded-[26px] border border-black/10 bg-white p-7 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black text-white px-3 py-1 text-xs font-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7020e8] animate-ping" /> Corporate &amp; Academic
                  </span>
                  <span className="text-xs font-extrabold text-[#7020e8]">Milestone Progress Backed</span>
                </div>

                <h3 className="text-2xl font-black tracking-[-0.6px] text-black mb-3">
                  Professional &amp; Academic Hub
                </h3>
                <p className="text-sm text-[#554e60] leading-relaxed mb-6 font-medium">
                  Authoritative assistance for postgraduates, corporate enterprises, and high-stakes decision makers.
                </p>

                <div className="space-y-3.5 mb-8">
                  {[
                    { title: 'Executive Coaching', desc: 'C-suite leadership, OKR planning & board advisement' },
                    { title: 'Business Strategy', desc: 'Market entry, financial modeling & corporate pitch decks' },
                    { title: 'Academic & SPSS Data Research Assistance', desc: 'Quantitative data runs, R/Python scripts, and dissertation review' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7ff] border border-black/5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-black text-white text-[10px] font-black mt-0.5">
                        ✓
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-black">{item.title}</h4>
                        <p className="text-xs text-[#554e60] mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('consultants')}
                className="w-full rounded-xl border-2 border-black bg-white py-3.5 text-sm font-black text-black transition-all hover:bg-black hover:text-white cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Explore Consultants &amp; Advisors</span>
                <span>➔</span>
              </button>
            </div>

            {/* Right Card: Lifestyle & Creative Hub */}
            <div className="card-interactive rounded-[26px] border border-black/10 bg-white p-7 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7020e8] text-white px-3 py-1 text-xs font-black">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" /> Creative &amp; Athletic Tracks
                  </span>
                  <span className="text-xs font-extrabold text-black">Live Masterclasses &amp; 1-on-1</span>
                </div>

                <h3 className="text-2xl font-black tracking-[-0.6px] text-black mb-3">
                  Lifestyle, Creative &amp; Sports Hub
                </h3>
                <p className="text-sm text-[#554e60] leading-relaxed mb-6 font-medium">
                  Private attention and immersive masterclasses curated by recognized Kenyan masters of craft and certified coaches.
                </p>

                {/* Categories Pills */}
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  <div className="rounded-xl border border-black/10 bg-[#faf7ff] p-3 text-center">
                    <span className="text-xl">🎸</span>
                    <p className="mt-1 text-[11px] font-black text-black">Music</p>
                    <p className="text-[10px] text-[#665e70]">Guitar &amp; Piano</p>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-[#faf7ff] p-3 text-center">
                    <span className="text-xl">💄</span>
                    <p className="mt-1 text-[11px] font-black text-black">Bridal Glam</p>
                    <p className="text-[10px] text-[#665e70]">Event Styling</p>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-[#faf7ff] p-3 text-center">
                    <span className="text-xl">⚡</span>
                    <p className="mt-1 text-[11px] font-black text-black">Athletics</p>
                    <p className="text-[10px] text-[#665e70]">Sports Coaches</p>
                  </div>
                </div>

                <div className="space-y-3.5 mb-8">
                  {[
                    { title: 'Instrument & Music Tutoring', desc: '1-on-1 private lessons for guitar, piano, and vocal coaching' },
                    { title: 'Sports & Marathon Coaching', desc: 'Certified trainers for distance running, soccer, and fitness' },
                    { title: 'Event & Bridal Makeup Artistry', desc: 'Elite styling sessions and on-location beauty transformations' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#faf7ff] border border-black/5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#7020e8] text-white text-[10px] font-black mt-0.5">
                        ✓
                      </span>
                      <div>
                        <h4 className="text-sm font-black text-black">{item.title}</h4>
                        <p className="text-xs text-[#554e60] mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('creativity')}
                className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3.5 text-sm font-black text-white shadow-md hover:shadow-[0_8px_25px_rgba(112,32,232,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
              >
                <span>Explore Creativity &amp; Sports Tracks</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (Sleek Obsidian Black Contrast Block) */}
      <section className="bg-black py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7020e8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="section-kicker !text-[#7020e8]">Simple and secure</p>
            <h2 className="section-title !text-white">From search to done in three steps.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/70">
              KaziPro makes it easy to find, hire and work with verified Kenyan professionals — with 100% Quality Guarantee on M-Pesa bookings until you approve.
            </p>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {[
              {
                n: '01',
                icon: '🔍',
                title: 'Tell us what you need',
                text: 'Search via web or message our WhatsApp bot. State your specific research, sports, or consulting needs in plain English or Swahili.',
              },
              {
                n: '02',
                icon: '👥',
                title: 'Choose your verified pro',
                text: 'Review authenticated academic degrees, coaching licenses, client ratings, and transparent milestone fee structures.',
              },
              {
                n: '03',
                icon: '🛡️',
                title: 'Book with M-Pesa Protection',
                text: 'Payments are secured via Safaricom Daraja STK Push and only released once deliverables meet your standards.',
              },
            ].map((step) => (
              <div key={step.n} className="relative rounded-3xl border border-white/10 bg-white/[.04] p-7 text-left hover:border-[#7020e8]/50 transition-all card-interactive">
                <span className="absolute right-6 top-5 text-4xl font-black text-white/10">
                  {step.n}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#7020e8] text-2xl text-white shadow-md">
                  {step.icon}
                </span>
                <h3 className="mt-6 text-lg font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP ENGINE PREVIEW SECTION */}
      <section className="py-20 px-5 lg:px-8 bg-[#faf7ff] border-b border-black/5">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center mb-14">
            <p className="section-kicker">WhatsApp Native Architecture</p>
            <h2 className="section-title">
              Instant Talent Matching via <span className="text-[#7020e8]">WhatsApp.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#554e60]">
              No app store downloads. Simply message our intelligent bot, receive verified Kenyan talent portfolios, and fund engagements securely via M-Pesa.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
            {/* Left feature boxes */}
            <div className="max-w-md space-y-4 text-left">
              <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white text-xl">
                    💬
                  </span>
                  <h4 className="font-black text-base text-black">Natural Language Matching</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#554e60] leading-relaxed">
                  State your exact project requirements in plain Swahili or English. The bot identifies matching verified professionals across Nairobi, Mombasa, and Kisumu.
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white text-xl">
                    🛡️
                  </span>
                  <h4 className="font-black text-base text-black">Verified Badges &amp; Identity</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#554e60] leading-relaxed">
                  Every portfolio comes pre-screened with government ID verification, credential audits, and previous client satisfaction scores.
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white text-xl">
                    ⚡
                  </span>
                  <h4 className="font-black text-base text-black">Direct M-Pesa STK Triggers</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#554e60] leading-relaxed">
                  Lock retainers or buy workshop tickets instantly with native Daraja STK Push triggers delivered straight to your phone.
                </p>
              </div>

              <button
                onClick={handleResetChat}
                className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-xs font-black text-black shadow-xs transition hover:border-[#7020e8] hover:text-[#7020e8] cursor-pointer"
              >
                <span>↺</span> Replay WhatsApp Simulation
              </button>
            </div>

            {/* Smartphone mockup */}
            <div className="w-full max-w-[370px]">
              <div className="rounded-[40px] border-[10px] border-black bg-black p-2 shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
                <div className="h-5 w-32 bg-black mx-auto rounded-b-xl mb-1 flex items-center justify-center">
                  <div className="h-1 w-10 bg-gray-700 rounded-full" />
                </div>
                <div className="rounded-[28px] overflow-hidden bg-[#ECE5DD] flex flex-col h-[540px] text-left">
                  {/* WhatsApp top bar */}
                  <div className="bg-[#075E54] px-3.5 py-2.5 text-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5">
                        <img src="/logo-mark.png" alt="KaziPro" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-xs flex items-center gap-1">
                          KaziPro Bot <span className="text-[#25D366]">✓</span>
                        </p>
                        <p className="text-[10px] text-green-200">Verified Business</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/80">10:24 AM</span>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                    {chatMessages.map((msg) => {
                      if (msg.type === 'user') {
                        return (
                          <div key={msg.id} className="flex justify-end chat-message-animate">
                            <div className="bg-[#DCF8C6] text-gray-900 px-3 py-1.5 rounded-xl rounded-tr-xs max-w-[85%] shadow-xs">
                              <p className="text-[11px]">{msg.text}</p>
                              <p className="text-right text-[8px] text-gray-500 mt-0.5">{msg.time} ✓✓</p>
                            </div>
                          </div>
                        )
                      }
                      if (msg.type === 'bot-card') {
                        return (
                          <div key={msg.id} className="flex justify-start chat-message-animate">
                            <div className="bg-white rounded-xl rounded-tl-xs p-3 max-w-[90%] shadow-xs border border-gray-100">
                              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                                  👩🏾‍💻
                                </div>
                                <div>
                                  <p className="font-extrabold text-xs text-gray-900">{msg.expert.name} ✓</p>
                                  <p className="text-[9px] text-gray-500">{msg.expert.title}</p>
                                </div>
                              </div>
                              <div className="py-2 text-[10px] text-gray-600 space-y-0.5">
                                <p>⭐ {msg.expert.rating}</p>
                                <p>📍 {msg.expert.location}</p>
                              </div>
                              <button
                                onClick={() => onNavigate('consultants')}
                                className="w-full py-1.5 bg-black hover:bg-[#7020e8] text-white font-bold rounded-lg text-[9px] transition"
                              >
                                Inspect Milestone Retainer ➔
                              </button>
                            </div>
                          </div>
                        )
                      }
                      return (
                        <div key={msg.id} className="flex justify-start chat-message-animate">
                          <div className="bg-white text-gray-900 px-3 py-1.5 rounded-xl rounded-tl-xs max-w-[85%] shadow-xs">
                            <p className="whitespace-pre-line text-[11px]">{msg.text}</p>
                            <p className="text-right text-[8px] text-gray-400 mt-0.5">{msg.time}</p>
                          </div>
                        </div>
                      )
                    })}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs text-xs text-gray-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7020e8] animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7020e8] animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7020e8] animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Quick Action Chips */}
                  <div className="bg-[#F0F2F5] p-2 flex gap-1.5 overflow-x-auto border-t border-gray-200">
                    <button
                      onClick={() => handleSendChat('1️⃣ View portfolio')}
                      className="px-2.5 py-1 bg-white rounded-full text-[9px] font-bold text-black border border-gray-300 whitespace-nowrap"
                    >
                      1️⃣ View Portfolio
                    </button>
                    <button
                      onClick={() => onNavigate('consultants')}
                      className="px-2.5 py-1 bg-black text-white rounded-full text-[9px] font-bold whitespace-nowrap"
                    >
                      2️⃣ Book Session
                    </button>
                  </div>

                  {/* Message Input */}
                  <div className="bg-[#F0F2F5] p-2 flex items-center gap-1.5 border-t border-gray-300">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                      className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] outline-none border border-gray-200"
                    />
                    <button
                      onClick={() => handleSendChat()}
                      className="w-7 h-7 rounded-full bg-[#075E54] text-white flex items-center justify-center text-xs"
                    >
                      ➤
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <div className="overflow-hidden rounded-[32px] bg-black text-white px-6 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 text-left relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#7020e8]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <p className="section-kicker !text-[#7020e8]">Built for ambition</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-1.3px] sm:text-4xl text-white">
                Great work starts with the right expert.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                Join thousands of students, researchers, and growing businesses finding vetted Kenyan talent on KaziPro every day.
              </p>
            </div>
            <button
              onClick={() => onNavigate('consultants')}
              className="mt-7 flex items-center gap-2 rounded-xl bg-[#7020e8] hover:bg-white hover:text-black px-7 py-4 text-sm font-black text-white shadow-xl transition-all cursor-pointer lg:mt-0 btn-shimmer relative z-10"
            >
              <span>Explore All Experts</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER - With Logo No. 6 */}
      <footer className="border-t border-black/10 bg-white py-10">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-5 text-sm text-[#665e70] sm:flex-row lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo-mark.png" alt="KaziPro Logo 6" className="h-9 w-9 object-contain" />
            <span className="font-black text-xl text-black">
              Kazi<span className="text-[#7020e8]">Pro</span>
            </span>
          </div>
          <p className="text-xs font-medium">© 2026 KaziPro Technologies Ltd. Talent for every ambition. Nairobi, Kenya.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 font-bold text-xs sm:text-sm text-black">
            <button onClick={() => onNavigate('consultants')} className="hover:text-[#7020e8] cursor-pointer">Consultants</button>
            <button onClick={() => onNavigate('masterclasses')} className="hover:text-[#7020e8] cursor-pointer">Masterclass</button>
            <button onClick={() => onNavigate('creativity')} className="hover:text-[#7020e8] cursor-pointer">Creativity Experts</button>
            <button onClick={() => onNavigate('sports')} className="hover:text-[#7020e8] cursor-pointer">Sports Coaches</button>
            <button onClick={() => onNavigate('bureau')} className="hover:text-[#7020e8] cursor-pointer">Milestone Tracker</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
