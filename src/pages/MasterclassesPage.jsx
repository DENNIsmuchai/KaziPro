import { useState } from 'react'

const eventsData = [
  {
    id: 1,
    category: 'ACADEMIC BUREAU',
    badgeStyle: 'bg-black text-white',
    title: 'Mastering SPSS & R for Postgraduate Dissertations',
    tagline: 'Statistical data runs, hypothesis testing, ANOVA & regression models for MBA and PhD researchers.',
    headerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Dr. James Ochieng, PhD',
      role: 'Lead Quantitative Analyst',
      avatarImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      verified: true,
      bio: 'Senior Lecturer & Research Fellow with 12+ years consulting on doctoral theses across East Africa.',
    },
    price: 'KSh 1,200',
    numericPrice: 1200,
    date: 'Nov 15, 2026',
    time: '2:00 PM - 5:00 PM EAT',
    seatsRemaining: 6,
    totalSeats: 35,
    isUrgent: true,
  },
  {
    id: 2,
    category: 'BEAUTY & STYLE',
    badgeStyle: 'bg-black text-white',
    title: 'Flawless Everyday Corporate Makeup',
    tagline: 'High-definition, climate-resilient professional beauty routines designed for the Nairobi executive.',
    headerImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Michelle Wanjiku',
      role: 'Celebrity & Bridal MUA',
      avatarImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      verified: true,
      bio: 'Award-winning bridal stylist featured in Kenya Fashion Week and Vogue Africa.',
    },
    price: 'KSh 750',
    numericPrice: 750,
    date: 'Nov 18, 2026',
    time: '10:00 AM - 12:30 PM EAT',
    seatsRemaining: 4,
    totalSeats: 25,
    isUrgent: true,
  },
  {
    id: 3,
    category: 'FINANCE',
    badgeStyle: 'bg-black text-white',
    title: 'Personal Finance & Investment Strategies for Kenyan Millennials',
    tagline: 'NSE equities, Money Market Funds (MMFs), Treasury bills, and tax optimization frameworks.',
    headerImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Brian Mutua, CFA',
      role: 'Senior Portfolio Manager',
      avatarImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
      verified: true,
      bio: 'Chartered Financial Analyst managing over KSh 3.2B in regional institutional assets.',
    },
    price: 'KSh 1,500',
    numericPrice: 1500,
    date: 'Nov 20, 2026',
    time: '6:00 PM - 8:30 PM EAT',
    seatsRemaining: 18,
    totalSeats: 50,
    isUrgent: false,
  },
  {
    id: 4,
    category: 'ACADEMIC BUREAU',
    badgeStyle: 'bg-black text-white',
    title: 'Research Methodology & Literature Gap Analysis Workshop',
    tagline: 'Structuring conceptual frameworks and defending literature reviews before academic boards.',
    headerImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Prof. Aisha Mohamed',
      role: 'Chair of Postgraduate Studies',
      avatarImg: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=256&q=80',
      verified: true,
      bio: 'Published author in International Journal of Economics & Management, senior thesis advisor.',
    },
    price: 'KSh 2,000',
    numericPrice: 2000,
    date: 'Nov 22, 2026',
    time: '9:00 AM - 1:00 PM EAT',
    seatsRemaining: 8,
    totalSeats: 30,
    isUrgent: true,
  },
  {
    id: 5,
    category: 'MUSIC & ARTS',
    badgeStyle: 'bg-black text-white',
    title: 'Guitar Fundamentals: From Zero to Your First Live Song',
    tagline: 'Chords progression, fingerpicking mechanics, and African rumba rhythm styling.',
    headerImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Kevin Otieno',
      role: 'Lead Guitarist & Producer',
      avatarImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      verified: true,
      bio: 'Touring musician with 10+ years session recording experience across East Africa.',
    },
    price: 'KSh 1,000',
    numericPrice: 1000,
    date: 'Nov 25, 2026',
    time: '4:00 PM - 6:30 PM EAT',
    seatsRemaining: 12,
    totalSeats: 25,
    isUrgent: false,
  },
  {
    id: 6,
    category: 'BUSINESS',
    badgeStyle: 'bg-black text-white',
    title: 'Scaling Kenyan Direct-to-Consumer (D2C) Brands',
    tagline: 'E-commerce logistics in Nairobi, WhatsApp CRM automation, and customer lifetime value optimization.',
    headerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Sarah Kamau',
      role: 'D2C Brand Founder',
      avatarImg: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=256&q=80',
      verified: true,
      bio: 'Scaled two Kenyan D2C consumer brands to 8-figure monthly revenues.',
    },
    price: 'KSh 1,800',
    numericPrice: 1800,
    date: 'Nov 28, 2026',
    time: '11:00 AM - 2:00 PM EAT',
    seatsRemaining: 15,
    totalSeats: 40,
    isUrgent: false,
  },
]

const categories = ['All', 'Academic Bureau', 'Beauty & Style', 'Finance', 'Music & Arts', 'Business']

const MasterclassesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null)
  const [selectedEventFor1on1, setSelectedEventFor1on1] = useState(null)
  const [mpesaPhone, setMpesaPhone] = useState('')
  const [bookingStatus, setBookingStatus] = useState('idle')
  const [receiptNumber, setReceiptNumber] = useState('')
  const [oneOnOneSuccess, setOneOnOneSuccess] = useState(false)

  const filteredEvents = eventsData.filter((event) => {
    const matchesCat =
      activeCategory === 'All' ||
      event.category.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch =
      !searchQuery.trim() ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.host.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const handleBookTicket = (event) => {
    setSelectedEventForBooking(event)
    setBookingStatus('idle')
    setMpesaPhone('')
  }

  const handle1on1Click = (event) => {
    setSelectedEventFor1on1(event)
    setOneOnOneSuccess(false)
  }

  const handleConfirmMpesa = (e) => {
    e.preventDefault()
    if (!mpesaPhone) return
    setBookingStatus('processing')
    setTimeout(() => {
      setReceiptNumber(`MPESA-KP-${Math.floor(100000 + Math.random() * 900000)}`)
      setBookingStatus('success')
    }, 2000)
  }

  return (
    <div className="py-16 md:py-20 min-h-screen bg-white text-left">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="section-kicker !text-[#7020e8]">Interactive Live Sessions</p>
          <h1 className="section-title">
            Masterclass Event <span className="text-[#7020e8]">Discovery Grid.</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#554e60] font-medium leading-relaxed">
            Acquire specialized skills in hyper-focused live sessions led by Kenya's top authorities. Instant booking via M-Pesa with private 1-on-1 mentorship upgrades.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white p-3.5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black transition cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-md'
                      : 'border border-black/10 bg-white text-black hover:border-[#7020e8] hover:text-[#7020e8]'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search masterclasses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-[#faf7ff] px-4 py-2 text-xs font-medium text-black outline-none placeholder:text-[#888194] focus:border-[#7020e8] focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888194] hover:text-black cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/20 bg-white py-16 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-black text-white text-xl font-bold">
              🔍
            </span>
            <h3 className="mt-4 text-lg font-black text-black">No matching masterclasses</h3>
            <p className="mt-2 text-sm text-[#554e60]">Try selecting "All" or adjusting your search keyword.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-5 text-sm font-bold text-[#7020e8] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredEvents.map((event) => {
              const seatPercentage = ((event.totalSeats - event.seatsRemaining) / event.totalSeats) * 100

              return (
                <article
                  key={event.id}
                  className="card-interactive rounded-[24px] border border-black/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Header Image Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={event.headerImage}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge Pill */}
                      <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs bg-black text-white">
                        {event.category}
                      </span>

                      {/* Urgent seats indicator */}
                      {event.isUrgent && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#7020e8] text-white shadow-xs animate-pulse">
                          🔥 Filling Fast
                        </span>
                      )}

                      {/* Overlapping Host Profile Picture */}
                      <div className="absolute -bottom-5 left-4 flex items-end gap-2.5 z-10">
                        <div className="relative">
                          <img
                            src={event.host.avatarImg}
                            alt={event.host.name}
                            className="h-14 w-14 rounded-xl object-cover border-3 border-white shadow-md bg-white"
                          />
                          {event.host.verified && (
                            <span
                              className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#7020e8] rounded-full text-white text-[9px] font-bold flex items-center justify-center border border-white"
                              title="Verified Mentor"
                            >
                              ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="pt-8 px-5 pb-5">
                      <div className="mb-2">
                        <p className="text-xs font-bold text-black flex items-center gap-1">
                          {event.host.name}
                          <span className="text-[11px] font-normal text-[#888194]">• {event.host.role}</span>
                        </p>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-black text-black leading-snug mb-2 hover:text-[#7020e8] transition-colors cursor-pointer">
                        {event.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-[#554e60] line-clamp-2 leading-relaxed mb-4">
                        {event.tagline}
                      </p>

                      {/* Meta Information */}
                      <div className="rounded-xl bg-[#faf7ff] border border-black/5 p-3 mb-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#888194]">Session Fee</span>
                          <span className="text-lg font-black text-[#7020e8]">{event.price}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#554e60] pt-1.5 border-t border-black/5">
                          <span>📅 {event.date}</span>
                          <span>🕐 {event.time.split('-')[0]}</span>
                        </div>
                        <div className="pt-1">
                          <div className="flex justify-between text-[10px] font-bold text-[#888194] mb-1">
                            <span className="text-emerald-600 font-extrabold">{event.seatsRemaining} seats left</span>
                            <span>{event.totalSeats} total</span>
                          </div>
                          <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-[#7020e8] h-full rounded-full transition-all" style={{ width: `${seatPercentage}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleBookTicket(event)}
                        className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3 text-xs sm:text-sm font-black text-white shadow-md hover:shadow-[0_8px_25px_rgba(112,32,232,0.35)] transition-all cursor-pointer flex items-center justify-center gap-1.5 btn-shimmer"
                      >
                        <span>Book Ticket via M-Pesa</span>
                        <span>➔</span>
                      </button>
                    </div>
                  </div>

                  {/* Magic Hook Bottom Banner */}
                  <div className="bg-[#faf7ff] border-t border-black/5 px-4 py-2.5 mt-auto">
                    <button
                      onClick={() => handle1on1Click(event)}
                      className="w-full text-center text-xs font-bold text-black hover:text-[#7020e8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Can&apos;t make live session? Book 1-on-1 Attention</span>
                      <span>➔</span>
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {/* M-Pesa Checkout Modal */}
      {selectedEventForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEventForBooking(null)} />
          <div className="relative bg-white border border-black/10 rounded-[28px] p-7 sm:p-9 max-w-md w-full shadow-[0_24px_70px_rgba(0,0,0,0.3)] z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
            <button
              onClick={() => setSelectedEventForBooking(null)}
              className="absolute top-5 right-5 text-[#888194] hover:text-black p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>

            {bookingStatus === 'idle' && (
              <form onSubmit={handleConfirmMpesa}>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-md">
                    <img src="/logo-mark.png" alt="Logo" className="h-8 w-8 object-contain" />
                  </div>
                  <h3 className="text-2xl font-black text-black">M-Pesa Express Checkout</h3>
                  <p className="text-xs text-[#554e60] mt-1">Instant seat reservation via Safaricom Daraja STK Push</p>
                </div>

                <div className="bg-[#faf7ff] p-4 rounded-xl border border-black/10 mb-5 space-y-2">
                  <span className="text-[10px] font-black uppercase text-[#7020e8] tracking-wider">{selectedEventForBooking.category}</span>
                  <h4 className="text-sm font-black text-black">{selectedEventForBooking.title}</h4>
                  <p className="text-xs text-[#554e60]">Host: {selectedEventForBooking.host.name}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-black/5 text-sm">
                    <span className="text-[#888194]">Ticket Price:</span>
                    <span className="font-black text-[#7020e8] text-base">{selectedEventForBooking.price}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-black text-black uppercase tracking-wider mb-2">
                    Enter M-Pesa Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-sm font-bold text-[#554e60]">🇰🇪 +254</span>
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="712 345 678"
                      required
                      className="w-full bg-[#faf7ff] border border-black/15 focus:border-[#7020e8] focus:bg-white rounded-xl pl-24 pr-4 py-2.5 text-sm outline-none font-medium text-black"
                    />
                  </div>
                  <p className="text-[11px] text-[#888194] mt-1.5">You will receive an STK prompt on this phone to enter your PIN.</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-black hover:bg-[#7020e8] text-white font-black rounded-xl shadow-md transition-all cursor-pointer text-sm btn-shimmer"
                >
                  Pay {selectedEventForBooking.price} Now
                </button>
              </form>
            )}

            {bookingStatus === 'processing' && (
              <div className="text-center py-8">
                <div className="w-14 h-14 border-4 border-black/10 border-t-[#7020e8] rounded-full animate-spin mx-auto mb-5" />
                <h4 className="text-xl font-black text-black mb-2">Prompting via M-Pesa STK...</h4>
                <p className="text-xs text-[#554e60]">Please enter your M-Pesa PIN on handset +254 {mpesaPhone}.</p>
              </div>
            )}

            {bookingStatus === 'success' && (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 text-emerald-600">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-black mb-1">Ticket Confirmed!</h3>
                <p className="text-xs text-[#888194] mb-4">Receipt: {receiptNumber}</p>
                <div className="bg-[#faf7ff] p-3.5 rounded-xl border border-black/10 text-xs text-left mb-5 space-y-1">
                  <p><strong className="text-black">Event:</strong> {selectedEventForBooking.title}</p>
                  <p><strong className="text-black">Time:</strong> {selectedEventForBooking.date} • {selectedEventForBooking.time}</p>
                  <p className="text-[#7020e8] font-bold">✓ WhatsApp calendar link dispatched.</p>
                </div>
                <button
                  onClick={() => setSelectedEventForBooking(null)}
                  className="w-full py-3 bg-black hover:bg-[#7020e8] text-white font-black rounded-xl text-sm transition"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1-on-1 Consultation Hook Modal */}
      {selectedEventFor1on1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEventFor1on1(null)} />
          <div className="relative bg-white border border-black/10 rounded-[28px] p-7 sm:p-9 max-w-lg w-full shadow-[0_24px_70px_rgba(0,0,0,0.3)] z-10 text-left">
            <button onClick={() => setSelectedEventFor1on1(null)} className="absolute top-5 right-5 text-[#888194] hover:text-black p-1.5">
              ✕
            </button>

            {!oneOnOneSuccess ? (
              <div>
                <div className="text-center mb-5">
                  <span className="inline-block px-3 py-1 bg-black text-white text-xs font-black uppercase rounded-full mb-2">
                    Exclusive 1-on-1
                  </span>
                  <h3 className="text-2xl font-black text-black">Private Attention with {selectedEventFor1on1.host.name}</h3>
                  <p className="text-xs text-[#554e60] mt-1">Get customized guidance, confidential file reviews, and bespoke deliverables.</p>
                </div>

                <div className="bg-[#faf7ff] p-3.5 rounded-xl border border-black/10 mb-4 flex items-center gap-3">
                  <img src={selectedEventFor1on1.host.avatarImg} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="font-black text-sm text-black">{selectedEventFor1on1.host.name} ✓</p>
                    <p className="text-xs text-[#554e60]">{selectedEventFor1on1.host.bio}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <div>
                    <label className="block text-xs font-black text-black uppercase tracking-wider mb-1">Project Details</label>
                    <textarea rows={2} placeholder="Describe your topic or goals..." className="w-full bg-[#faf7ff] border border-black/15 rounded-xl p-2.5 text-xs outline-none text-black focus:border-[#7020e8]" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-black uppercase tracking-wider mb-1">WhatsApp Phone Number</label>
                    <input type="tel" placeholder="0712 345 678" className="w-full bg-[#faf7ff] border border-black/15 rounded-xl px-3 py-2 text-xs outline-none text-black focus:border-[#7020e8]" />
                  </div>
                </div>

                <button
                  onClick={() => setOneOnOneSuccess(true)}
                  className="w-full py-3.5 bg-black hover:bg-[#7020e8] text-white font-black rounded-xl text-sm transition btn-shimmer"
                >
                  Request Private Consultation
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 text-emerald-600">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-black mb-1">Request Dispatched!</h3>
                <p className="text-xs text-[#554e60] mb-5">You will receive a WhatsApp message within 15 minutes to lock in your calendar slot.</p>
                <button onClick={() => setSelectedEventFor1on1(null)} className="w-full py-3 bg-black hover:bg-[#7020e8] text-white font-black rounded-xl text-sm transition">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MasterclassesPage
