import { useState } from 'react'
import { allExpertsData } from '../data/expertsData'

const subcategoryMap = {
  all: [
    'All Specialties',
    'SPSS & Statistics',
    'Corporate Strategy',
    'Financial Modeling',
    'Bridal & Glam',
    'Guitar & Piano',
    'Vocal Coaching',
    'Languages (French/Swahili)',
    'Marathon & Running',
    'Strength & HIIT',
    'Football Coaching',
    'Swimming & Aquatics',
  ],
  consultants: [
    'All Specialties',
    'SPSS & Statistics',
    'Corporate Strategy',
    'Financial Modeling',
    'Thesis Mentorship',
    'Board Advisory',
  ],
  creativity: [
    'All Specialties',
    'Bridal & Glam',
    'Guitar & Piano',
    'Vocal Coaching',
    'Languages (French/Swahili)',
    'Photography',
  ],
  sports: [
    'All Specialties',
    'Marathon & Running',
    'Strength & HIIT',
    'Football Coaching',
    'Swimming & Aquatics',
    'Tennis Pro',
  ],
}

const categoryMeta = {
  all: {
    kicker: 'Verified Talent Ecosystem',
    title: 'Browse Elite Kenyan Professionals',
    description: 'Explore verified Coaches, Consultants, Academic Mentors, and Creative Tutors. Inspect transparent service charges and book safely with 100% Quality Guarantee via Safaricom M-Pesa.',
  },
  consultants: {
    kicker: 'Corporate & Academic Advisory',
    title: 'Executive Consultants & Research Mentors',
    description: 'Engage vetted management consultants, SPSS doctoral advisors, CFA wealth strategists, and academic research specialists backed by milestone progress tracking.',
  },
  creativity: {
    kicker: 'Lifestyle & Artistic Mastery',
    title: 'Creativity Experts & Cultural Tutors',
    description: 'Private 1-on-1 lessons from celebrity bridal makeup artistes, multi-instrumentalists, vocal coaches, and certified French/Swahili tutors.',
  },
  sports: {
    kicker: 'Athletic Conditioning & Performance',
    title: 'Sports Coaches & Fitness Mentors',
    description: 'Train with World Athletics certified marathon coaches, NASM strength trainers, CAF licensed football tacticians, and elite swimming instructors.',
  },
}

const ExpertsPage = ({ initialCategory = 'all', onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedSubcategory, setSelectedSubcategory] = useState('All Specialties')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recommended')

  // Modal State for Profile & Booking
  const [activeProfileModal, setActiveProfileModal] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [mpesaPhone, setMpesaPhone] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState('')

  // Reset selected subcategory when changing main category
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat)
    setSelectedSubcategory('All Specialties')
  }

  // Filter logic
  const filteredExperts = allExpertsData.filter((expert) => {
    const matchesCategory = selectedCategory === 'all' || expert.category === selectedCategory

    // Subcategory matches
    let matchesSub = true
    if (selectedSubcategory !== 'All Specialties') {
      const subLower = selectedSubcategory.toLowerCase()
      matchesSub =
        expert.specialties.some((s) => s.toLowerCase().includes(subLower) || subLower.includes(s.toLowerCase())) ||
        expert.title.toLowerCase().includes(subLower)
    }

    // Search query matches
    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      expert.name.toLowerCase().includes(q) ||
      expert.title.toLowerCase().includes(q) ||
      expert.location.toLowerCase().includes(q) ||
      expert.specialties.some((s) => s.toLowerCase().includes(q)) ||
      expert.bio.toLowerCase().includes(q)

    return matchesCategory && matchesSub && matchesQuery
  })

  // Sort logic
  const sortedExperts = [...filteredExperts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.startingPriceNumeric - b.startingPriceNumeric
    }
    if (sortBy === 'price-high') {
      return b.startingPriceNumeric - a.startingPriceNumeric
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating
    }
    return b.reviewCount - a.reviewCount // Default recommended
  })

  const openProfileModal = (expert, defaultService = null) => {
    setActiveProfileModal(expert)
    setSelectedService(defaultService || expert.services[0])
    setMpesaPhone('')
    setIsBooking(false)
    setBookingSuccess(false)
  }

  const handleExecuteBooking = (e) => {
    e.preventDefault()
    if (!mpesaPhone.trim()) return
    setIsBooking(true)

    setTimeout(() => {
      setIsBooking(false)
      setReceiptNumber(`MPESA-KP-${Math.floor(100000 + Math.random() * 900000)}`)
      setBookingSuccess(true)
    }, 2000)
  }

  const currentMeta = categoryMeta[selectedCategory] || categoryMeta.all
  const availableSubcategories = subcategoryMap[selectedCategory] || subcategoryMap.all

  return (
    <div className="py-14 sm:py-20 min-h-screen bg-white text-left">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <p className="section-kicker !text-[#7020e8]">{currentMeta.kicker}</p>
          <h1 className="section-title">
            {selectedCategory === 'consultants' && (
              <>
                Executive <span className="text-[#7020e8]">Consultants</span> &amp; Mentors
              </>
            )}
            {selectedCategory === 'creativity' && (
              <>
                Creativity Experts &amp; <span className="text-[#7020e8]">Lifestyle Masters</span>
              </>
            )}
            {selectedCategory === 'sports' && (
              <>
                Certified <span className="text-[#7020e8]">Sports Coaches</span> &amp; Mentors
              </>
            )}
            {selectedCategory === 'all' && (
              <>
                Elite Kenyan <span className="text-[#7020e8]">Talent &amp; Coaches</span> Directory
              </>
            )}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#554e60] leading-relaxed font-medium">
            {currentMeta.description}
          </p>
        </div>

        {/* CATEGORY SELECTOR TABS */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8">
          {[
            { id: 'all', label: '🌟 All Experts' },
            { id: 'consultants', label: '💼 Consultants & Advisors' },
            { id: 'creativity', label: '🎨 Creativity Experts' },
            { id: 'sports', label: '⚡ Sports Coaches' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-md'
                    : 'border border-black/10 bg-white text-black hover:border-[#7020e8] hover:text-[#7020e8]'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* SEARCH & FILTER CONTROLS BAR */}
        <div className="rounded-[22px] border border-black/10 bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <span className="absolute left-4 top-3.5 text-base text-[#7020e8]">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, skill (e.g. SPSS, Marathon, Makeup, French), or location..."
                className="w-full rounded-xl border border-black/10 bg-[#faf7ff] pl-11 pr-4 py-3 text-xs sm:text-sm text-black outline-none transition focus:border-[#7020e8] focus:bg-white focus:ring-2 focus:ring-[#7020e8]/15 placeholder-[#897f94]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-[#897f94] hover:text-black p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <label className="text-xs font-bold text-black shrink-0">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-black/10 bg-[#faf7ff] px-3.5 py-2.5 text-xs font-bold text-black outline-none focus:border-[#7020e8] cursor-pointer"
              >
                <option value="recommended">Top Rated &amp; Recommended</option>
                <option value="rating">Highest Satisfaction (5.0★)</option>
                <option value="price-low">Starting Rate: Low to High</option>
                <option value="price-high">Starting Rate: High to Low</option>
              </select>
            </div>
          </div>

          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="font-extrabold text-black shrink-0 pr-1 text-[11px] uppercase tracking-wider">Specialties:</span>
            {availableSubcategories.map((sub) => {
              const isSelected = selectedSubcategory === sub
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white'
                      : 'bg-[#faf7ff] text-[#554e60] border border-black/10 hover:border-[#7020e8] hover:text-[#7020e8]'
                  }`}
                >
                  {sub}
                </button>
              )
            })}
          </div>
        </div>

        {/* RESULTS COUNT & GUARANTEE BADGE */}
        <div className="flex items-center justify-between text-xs text-[#665d70] mb-6 px-1">
          <p>
            Showing <strong className="text-black">{sortedExperts.length}</strong> verified Kenyan {selectedCategory === 'sports' ? 'coaches' : 'professionals'}
          </p>
          <div className="flex items-center gap-1.5 text-black font-extrabold bg-black/5 px-3 py-1 rounded-full border border-black/10">
            <span>🔒</span>
            <span>All bookings backed by 100% KaziPro Quality Guarantee</span>
          </div>
        </div>

        {/* EXPERTS CARDS GRID */}
        {sortedExperts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {sortedExperts.map((expert) => (
              <div
                key={expert.id}
                className="group flex flex-col justify-between rounded-[24px] border border-black/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] card-interactive overflow-hidden"
              >
                {/* Header Banner & Overlapping Headshot */}
                <div className="relative">
                  <img
                    src={expert.coverImg}
                    alt={expert.name}
                    className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge on Banner */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="rounded-full bg-black/90 text-white backdrop-blur-md px-3 py-1 text-[11px] font-black shadow-xs">
                      {expert.category === 'consultants' && '💼 Consultant'}
                      {expert.category === 'creativity' && '🎨 Creative Tutor'}
                      {expert.category === 'sports' && '⚡ Sports Coach'}
                    </span>
                  </div>

                  {/* Overlapping Avatar */}
                  <div className="absolute -bottom-7 left-5 flex items-end">
                    <div className="relative">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="h-16 w-16 rounded-2xl object-cover border-3 border-white shadow-md bg-white"
                      />
                      {expert.verified && (
                        <div
                          className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7020e8] text-[10px] font-bold text-white border-2 border-white shadow-xs"
                          title="Government ID & Audited Credentials"
                        >
                          ✓
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Information Block */}
                <div className="pt-9 p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Top Meta: Rating & Location */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="rounded-md border border-black/10 bg-black/5 px-2 py-0.5 text-[10px] font-bold text-black">
                        {expert.tier}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-black">
                        <span className="text-amber-500">★</span>
                        <span>{expert.rating}</span>
                        <span className="text-[#897f94] font-normal">({expert.reviewCount})</span>
                      </div>
                    </div>

                    {/* Name & Title */}
                    <h3 className="text-lg font-black text-black group-hover:text-[#7020e8] transition-colors leading-tight">
                      {expert.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-[#7020e8]">
                      {expert.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#554e60]">
                      📍 {expert.location} • Responds {expert.responseTime}
                    </p>

                    {/* Bio excerpt */}
                    <p className="mt-3 text-xs text-[#554e60] line-clamp-2 leading-relaxed">
                      {expert.bio}
                    </p>

                    {/* Specialty Chips */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {expert.specialties.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-lg bg-[#faf7ff] border border-black/5 px-2.5 py-1 text-[11px] font-semibold text-black"
                        >
                          {tag}
                        </span>
                      ))}
                      {expert.specialties.length > 3 && (
                        <span className="rounded-lg bg-[#faf7ff] border border-black/5 px-2 py-1 text-[10px] font-bold text-[#7020e8]">
                          +{expert.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service Charges & Action Section */}
                  <div className="mt-5 pt-4 border-t border-black/5">
                    <div className="flex items-baseline justify-between mb-3.5">
                      <div>
                        <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#665e70]">Service Rates:</span>
                        <span className="text-base font-black text-black">{expert.startingRate}</span>
                      </div>
                      <span className="text-[11px] text-[#7020e8] font-black">
                        {expert.services.length} Packages Available
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openProfileModal(expert)}
                        className="w-full rounded-xl border border-black bg-white py-2.5 px-2 text-center text-xs font-black text-black hover:bg-black hover:text-white transition cursor-pointer"
                      >
                        View Profile &amp; Rates
                      </button>
                      <button
                        onClick={() => openProfileModal(expert, expert.services[0])}
                        className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-2.5 px-2 text-center text-xs font-black text-white shadow-md hover:shadow-[0_6px_20px_rgba(112,32,232,0.35)] transition-all cursor-pointer btn-shimmer"
                      >
                        Book via M-Pesa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] border border-[#eae4ef] bg-white p-12 text-center shadow-xs">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="text-lg font-extrabold text-[#21172b]">No Experts Found Matching Criteria</h3>
            <p className="text-xs text-[#665d70] mt-1 max-w-md mx-auto">
              We couldn't find any professionals matching "{searchQuery}". Try searching for terms like "SPSS", "Marathon", "Makeup", or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedSubcategory('All Specialties')
              }}
              className="mt-4 rounded-xl bg-[#6c2bd9] px-4 py-2 text-xs font-bold text-white cursor-pointer hover:bg-[#5c21bf]"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* FULL PROFILE & SERVICE CHARGES MODAL */}
      {activeProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative bg-white border border-[#eae4ef] rounded-[28px] max-w-2xl w-full shadow-[0_24px_70px_rgba(40,15,70,.25)] z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
            {/* Close Button */}
            <button
              onClick={() => setActiveProfileModal(null)}
              className="absolute top-4 right-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#322a3c] hover:bg-white shadow-md cursor-pointer"
            >
              ✕
            </button>

            {!bookingSuccess ? (
              <>
                {/* Modal Header Banner */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={activeProfileModal.coverImg}
                    alt={activeProfileModal.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-6 right-6 flex items-end justify-between">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#6c2bd9]">
                      {activeProfileModal.categoryLabel}
                    </span>
                    <span className="text-white text-xs font-semibold">
                      📍 {activeProfileModal.location}
                    </span>
                  </div>
                </div>

                {/* Profile Bio & Details */}
                <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
                  <div className="flex items-start gap-4 -mt-12 sm:-mt-14 mb-5 relative z-10">
                    <img
                      src={activeProfileModal.avatar}
                      alt={activeProfileModal.name}
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-white shrink-0"
                    />
                    <div className="pt-8 sm:pt-10 leading-tight">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#21172b]">
                          {activeProfileModal.name}
                        </h2>
                        <span className="rounded-md border border-violet-200/80 bg-violet-50 px-2 py-0.5 text-xs font-bold text-[#6c2bd9]">
                          {activeProfileModal.tier}
                        </span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm font-semibold text-[#6c2bd9]">
                        {activeProfileModal.title}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-[#897f94]">
                        <span className="font-bold text-[#21172b]">⭐ {activeProfileModal.rating} ({activeProfileModal.reviewCount} reviews)</span>
                        <span>•</span>
                        <span>{activeProfileModal.completedJobs} engagements completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6 rounded-2xl border border-[#eae4ef] bg-[#faf7ff] p-4 text-xs sm:text-sm text-[#514858] leading-relaxed">
                    <strong className="block text-[#21172b] font-bold mb-1">About the Expert:</strong>
                    {activeProfileModal.bio}
                  </div>

                  {/* Audited Credentials */}
                  <div className="mb-6">
                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#897f94] mb-2.5">
                      Audited Credentials &amp; Certifications
                    </h4>
                    <div className="space-y-2">
                      {activeProfileModal.credentials.map((cred, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between text-xs p-3 rounded-xl border border-[#eeeaf1] bg-[#faf7ff]"
                        >
                          <div>
                            <span className="font-bold text-[#21172b]">{cred.title}</span>
                            <span className="text-[#897f94] block text-[11px]">{cred.institution}</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#6c2bd9]">{cred.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SERVICES & CHARGES BREAKDOWN */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#897f94]">
                        Select Service Package &amp; Transparent Rates:
                      </h4>
                      <span className="text-xs text-[#6c2bd9] font-bold">M-Pesa Secure Booking</span>
                    </div>

                    <div className="space-y-3">
                      {activeProfileModal.services.map((svc) => {
                        const isChosen = selectedService?.id === svc.id
                        return (
                          <div
                            key={svc.id}
                            onClick={() => setSelectedService(svc)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                              isChosen
                                ? 'border-[#6c2bd9] bg-[#faf7ff] shadow-sm'
                                : 'border-[#eae4ef] bg-white hover:border-violet-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                    isChosen ? 'border-[#6c2bd9] bg-[#6c2bd9]' : 'border-[#897f94]'
                                  }`}
                                >
                                  {isChosen && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-xs sm:text-sm font-extrabold text-[#21172b]">
                                      {svc.title}
                                    </h5>
                                    {svc.popular && (
                                      <span className="rounded-full bg-violet-100 text-[#6c2bd9] text-[9px] font-bold px-2 py-0.5">
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-xs text-[#665d70] leading-relaxed">
                                    {svc.description}
                                  </p>
                                  <span className="mt-2 inline-block text-[10px] font-bold text-[#897f94] bg-[#eeeaf1]/80 px-2.5 py-0.5 rounded-md">
                                    ⏱ Turnaround: {svc.duration}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="text-base sm:text-lg font-black text-[#7020e8] block">
                                  {svc.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* M-PESA CHECKOUT TRIGGER FORM */}
                  <form onSubmit={handleExecuteBooking} className="pt-4 border-t border-black/10">
                    <div className="rounded-2xl border border-black/10 bg-[#faf7ff] p-4.5 mb-4 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#665e70]">Selected Service:</span>
                        <span className="font-black text-black truncate max-w-[240px]">
                          {selectedService?.title}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-black/5">
                        <span className="text-xs sm:text-sm font-black text-black">Booking Total:</span>
                        <span className="text-xl font-black text-[#7020e8]">{selectedService?.price}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-[11px] font-extrabold uppercase tracking-wider text-black mb-2">
                        M-Pesa Phone Number for STK Push:
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-sm font-bold text-[#514858]">🇰🇪 +254</span>
                        <input
                          type="tel"
                          value={mpesaPhone}
                          onChange={(e) => setMpesaPhone(e.target.value)}
                          placeholder="712 345 678"
                          required
                          className="w-full rounded-xl border border-black/15 bg-[#faf7ff] pl-24 pr-4 py-3 text-sm text-black outline-none transition focus:border-[#7020e8] focus:bg-white focus:ring-2 focus:ring-[#7020e8]/20"
                        />
                      </div>
                      <p className="text-[11px] text-[#665e70] mt-1.5">
                        Your milestone payment is safely protected and only released when you approve the deliverable.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={isBooking}
                        className="flex-1 rounded-xl bg-black hover:bg-[#7020e8] py-3.5 text-sm font-bold text-white shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
                      >
                        {isBooking ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Daraja STK Push...</span>
                          </>
                        ) : (
                          <>
                            <span>Authorize {selectedService?.price} Milestone Payment</span>
                            <span>➔</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          alert(`Connecting with ${activeProfileModal.name} via KaziPro WhatsApp Concierge...`)
                        }}
                        className="rounded-xl border border-black/20 bg-white hover:bg-[#faf7ff] px-5 py-3.5 text-xs sm:text-sm font-bold text-black transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>💬</span>
                        <span>Chat First on WhatsApp</span>
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-md">
                  <img src="/logo-mark.png" alt="Logo" className="h-10 w-10 object-contain" />
                </div>
                <h3 className="text-2xl font-black text-black mb-1">Booking Confirmed!</h3>
                <p className="text-xs font-semibold text-[#665e70] font-mono mb-4">
                  Receipt: {receiptNumber}
                </p>
                <div className="rounded-2xl border border-black/10 bg-[#faf7ff] p-5 text-xs text-left mb-6 space-y-2">
                  <p className="text-[#514858]">
                    <strong className="text-black">Expert Assigned:</strong> {activeProfileModal.name}
                  </p>
                  <p className="text-[#514858]">
                    <strong className="text-black">Service Ordered:</strong> {selectedService?.title}
                  </p>
                  <p className="text-[#514858]">
                    <strong className="text-black">Milestone Amount Committed:</strong> {selectedService?.price}
                  </p>
                  <p className="text-[#7020e8] font-bold pt-1">
                    ✓ {activeProfileModal.name} has been notified and will reach out via WhatsApp within {activeProfileModal.responseTime}.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveProfileModal(null)}
                    className="flex-1 rounded-xl bg-black hover:bg-[#7020e8] py-3 text-sm font-bold text-white transition cursor-pointer btn-shimmer"
                  >
                    Done &amp; Browse More
                  </button>
                  {onNavigate && (
                    <button
                      onClick={() => {
                        setActiveProfileModal(null)
                        onNavigate('bureau')
                      }}
                      className="flex-1 rounded-xl border border-black/20 bg-white hover:bg-slate-50 py-3 text-sm font-bold text-black transition cursor-pointer"
                    >
                      View Milestone Project Workspace ➔
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpertsPage

