import { useState, useRef, useEffect } from 'react'

const Navbar = ({ currentPage, setPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [loginPhone, setLoginPhone] = useState('')
  const [loginStep, setLoginStep] = useState(1)
  const [otpCode, setOtpCode] = useState('')
  const [creativityDropdownOpen, setCreativityDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCreativityDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { id: 'consultants', label: 'Consultants', isCategory: true },
    { id: 'masterclasses', label: 'Masterclass', isCategory: true },
    {
      id: 'creativity',
      label: 'Creativity Experts',
      isDropdown: true,
      subItems: [
        { id: 'creativity', label: '🎨 All Creativity Experts', desc: 'Makeup, instruments, vocals & languages' },
        { id: 'sports', label: '⚡ Sports Coaches', desc: 'Marathon, fitness, football & swimming' },
        { id: 'bureau', label: '🏛️ Academic Research Bureau', desc: 'Thesis consulting & dissertation retainers' },
      ],
    },
    { id: 'sports', label: 'Sports Coaches', isCategory: true },
    { id: 'bureau', label: 'Academic Bureau', isCategory: false },
  ]

  const handleNavClick = (pageId) => {
    setPage(pageId)
    setCreativityDropdownOpen(false)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (loginStep === 1 && loginPhone.trim()) {
      setLoginStep(2)
    } else if (loginStep === 2) {
      setLoginStep(3)
      setTimeout(() => {
        setShowLoginModal(false)
        setLoginStep(1)
        setLoginPhone('')
        setOtpCode('')
      }, 1500)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-violet-100/80 bg-white/95 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-[84px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          {/* Logo No. 6 */}
          <button
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            aria-label="KaziPro home"
          >
            <img
              src="/logo-mark.png"
              alt="KaziPro Emblem"
              className="h-14 w-14 sm:h-[58px] sm:w-[58px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-left justify-center">
              <span className="text-[24px] sm:text-[27px] font-black tracking-tight leading-none text-black flex items-center">
                Kazi<span className="text-[#7020e8]">Pro</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#7020e8] mt-1">
                Talent Ecosystem
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                const isChildActive = currentPage === 'creativity' || (currentPage === 'sports' && !navLinks.find(l => l.id === 'sports'))
                return (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setCreativityDropdownOpen(true)}
                    onMouseLeave={() => setCreativityDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('creativity')}
                      className={`nav-link flex items-center gap-1.5 cursor-pointer ${
                        isChildActive
                          ? '!text-[#7020e8] font-extrabold after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-[#7020e8] after:rounded-full'
                          : ''
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          creativityDropdownOpen ? 'rotate-180 text-[#7020e8]' : 'text-[#897f94]'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {creativityDropdownOpen && (
                      <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                        <div className="rounded-2xl border border-black/10 bg-white p-2 shadow-[0_20px_45px_rgba(112,32,232,0.14)]">
                          {link.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleNavClick(sub.id)}
                              className="w-full text-left p-3 rounded-xl hover:bg-violet-50/60 transition flex flex-col cursor-pointer group"
                            >
                              <span className="text-xs font-extrabold text-black group-hover:text-[#7020e8] transition-colors">
                                {sub.label}
                              </span>
                              <span className="text-[11px] text-[#6b6276] mt-0.5">
                                {sub.desc}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              const isActive = currentPage === link.id
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.id)}
                  className={`nav-link cursor-pointer ${
                    isActive
                      ? '!text-[#7020e8] font-extrabold after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-[#7020e8] after:rounded-full'
                      : ''
                  }`}
                >
                  {link.label}
                </button>
              )
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setShowLoginModal(true)}
              className="rounded-xl border border-black/15 bg-white px-4 py-2 text-xs font-extrabold text-black transition hover:border-[#7020e8] hover:text-[#7020e8] hover:bg-violet-50/40 cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => setShowJoinModal(true)}
              className="rounded-xl bg-black hover:bg-[#7020e8] px-5 py-2.5 text-xs font-extrabold text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_22px_rgba(112,32,232,0.35)] transition-all cursor-pointer btn-shimmer"
            >
              Join as Pro
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-violet-100 lg:hidden cursor-pointer text-[#322a3c]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-violet-100 bg-white px-5 py-5 lg:hidden animate-in fade-in duration-200">
            <div className="flex flex-col gap-2 font-semibold text-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#897f94] px-3 pt-1">
                Ecosystem Categories
              </span>

              <button
                onClick={() => handleNavClick('consultants')}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition cursor-pointer ${
                  currentPage === 'consultants' ? 'bg-violet-50 text-[#6c2bd9] font-bold' : 'text-[#322a3c] hover:bg-slate-50'
                }`}
              >
                <span>💼 Consultants &amp; Advisors</span>
                <span className="text-xs text-[#897f94]">SPSS, Strategy, CFA</span>
              </button>

              <button
                onClick={() => handleNavClick('masterclasses')}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition cursor-pointer ${
                  currentPage === 'masterclasses' ? 'bg-violet-50 text-[#6c2bd9] font-bold' : 'text-[#322a3c] hover:bg-slate-50'
                }`}
              >
                <span>🎓 Masterclass Live Events</span>
                <span className="text-xs text-[#897f94]">Tickets &amp; 1-on-1</span>
              </button>

              <button
                onClick={() => handleNavClick('creativity')}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition cursor-pointer ${
                  currentPage === 'creativity' ? 'bg-violet-50 text-[#6c2bd9] font-bold' : 'text-[#322a3c] hover:bg-slate-50'
                }`}
              >
                <span>🎨 Creativity Experts</span>
                <span className="text-xs text-[#897f94]">Makeup, Music, French</span>
              </button>

              <button
                onClick={() => handleNavClick('sports')}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition cursor-pointer ${
                  currentPage === 'sports' ? 'bg-violet-50 text-[#6c2bd9] font-bold' : 'text-[#322a3c] hover:bg-slate-50'
                }`}
              >
                <span>⚡ Sports Coaches</span>
                <span className="text-xs text-[#897f94]">Marathon, Football, Fitness</span>
              </button>

              <button
                onClick={() => handleNavClick('bureau')}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition cursor-pointer ${
                  currentPage === 'bureau' ? 'bg-violet-50 text-[#6c2bd9] font-bold' : 'text-[#322a3c] hover:bg-slate-50'
                }`}
              >
                <span>🏛️ Academic Research Bureau</span>
                <span className="text-xs text-[#897f94]">Thesis Contracts</span>
              </button>

              <div className="mt-4 pt-4 border-t border-black/10 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setShowLoginModal(true)
                  }}
                  className="w-full rounded-xl border border-black/15 bg-white py-3 text-center text-sm font-bold text-black hover:bg-slate-50 transition"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setShowJoinModal(true)
                  }}
                  className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3 text-center text-sm font-bold text-white shadow-md transition"
                >
                  Join as Pro
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white border border-black/10 rounded-[28px] p-6 sm:p-8 max-w-md w-full shadow-[0_24px_70px_rgba(0,0,0,0.3)] z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
            <button
              onClick={() => {
                setShowLoginModal(false)
                setLoginStep(1)
              }}
              className="absolute top-5 right-5 text-[#897f94] hover:text-black p-2 rounded-xl hover:bg-violet-50 cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-black text-xl font-bold text-white mx-auto mb-3 shadow-md">
                <img src="/logo-mark.png" alt="Logo" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="text-xl font-black text-black">
                {loginStep === 1 && 'Sign In to KaziPro'}
                {loginStep === 2 && 'Enter M-Pesa OTP'}
                {loginStep === 3 && 'Welcome Back!'}
              </h3>
              <p className="text-xs text-[#665d70] mt-1">
                {loginStep === 1 && 'Instant passwordless access via your Safaricom line'}
                {loginStep === 2 && `We sent a 6-digit one-time code to +254 ${loginPhone}`}
                {loginStep === 3 && 'Accessing your verified portfolio & active retainers'}
              </p>
            </div>

            {loginStep === 1 && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-black mb-2">
                    M-Pesa Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-sm font-bold text-[#514858]">🇰🇪 +254</span>
                    <input
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="712 345 678"
                      required
                      className="w-full rounded-xl border border-black/15 bg-[#faf7ff] pl-24 pr-4 py-3 text-sm text-black outline-none transition focus:border-[#7020e8] focus:bg-white focus:ring-2 focus:ring-[#7020e8]/20"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3.5 text-sm font-bold text-white shadow-lg transition-all cursor-pointer btn-shimmer"
                >
                  Send One-Time Pin ➔
                </button>
              </form>
            )}

            {loginStep === 2 && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-black mb-2 text-center">
                    6-Digit Security Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="• • • • • •"
                    required
                    className="w-full text-center tracking-[0.5em] font-mono text-xl rounded-xl border border-black/15 bg-[#faf7ff] py-3 text-black outline-none transition focus:border-[#7020e8] focus:bg-white focus:ring-2 focus:ring-[#7020e8]/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#7020e8] hover:bg-black py-3.5 text-sm font-bold text-white shadow-lg transition-all cursor-pointer btn-shimmer"
                >
                  Verify &amp; Sign In
                </button>
              </form>
            )}

            {loginStep === 3 && (
              <div className="py-4 text-center">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  ✓
                </div>
                <p className="text-sm font-bold text-emerald-700">Authenticated Successfully</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* JOIN AS PRO ONBOARDING MODAL */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white border border-black/10 rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-[0_24px_70px_rgba(0,0,0,0.3)] z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-5 right-5 text-[#897f94] hover:text-black p-2 rounded-xl hover:bg-violet-50 cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="rounded-full bg-black text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1">
                Monetize Your Craft
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black mt-2">
                Join KaziPro as a Verified Pro
              </h3>
              <p className="text-xs sm:text-sm text-[#665d70] mt-1">
                Receive direct client engagements with 100% upfront M-Pesa payment protection.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { title: 'Zero Bidding Wars', desc: 'Clients match directly with you based on verified Kenyan credentials.' },
                { title: 'Guaranteed Milestone Payouts', desc: 'Funds are secured before you begin work, disbursed directly via M-Pesa.' },
                { title: 'Host Paid Masterclasses', desc: 'Sell live skill tickets or offer private 1-on-1 mentorship upgrades.' },
              ].map((perk, pIdx) => (
                <div key={pIdx} className="flex items-start gap-3 p-3 rounded-xl border border-black/10 bg-[#faf7ff]">
                  <span className="text-[#7020e8] font-bold text-base mt-0.5">✓</span>
                  <div>
                    <h4 className="text-xs font-bold text-black">{perk.title}</h4>
                    <p className="text-[11px] text-[#665d70]">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                alert('Opening Pro Application Questionnaire. Please have your government ID and degree/certifications ready.')
                setShowJoinModal(false)
              }}
              className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3.5 text-sm font-bold text-white shadow-lg transition-all cursor-pointer btn-shimmer"
            >
              Start Expert Vetting Application ➔
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
