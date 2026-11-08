import { useState } from 'react'

const initialMilestones = [
  {
    id: 1,
    title: 'Literature Review & Structural Framework',
    description: 'Comprehensive literature survey, conceptual framework, hypothesis drafting, and academic methodology design adhering to university thesis guidelines.',
    deliverables: ['Chapter 2 Literature Synthesis (.docx)', 'Conceptual Framework Diagram (.pdf)', '50+ Peer-Reviewed Citations List'],
    amount: 'KSh 15,000',
    numericAmount: 15000,
    status: 'completed',
    statusLabel: 'Completed & Disbursed via M-Pesa',
    disbursedDate: 'Oct 28, 2026',
    mpesaRef: 'MPESA-QK892019A',
  },
  {
    id: 2,
    title: 'Statistical Data Analysis Run (SPSS/Python)',
    description: 'Full quantitative data analysis including descriptive statistics, normality tests, Pearson correlation, multilinear regression, and ANOVA output generation with syntax scripts.',
    deliverables: ['SPSS Syntax Code (.sps)', 'Raw & Cleaned Dataset (.sav)', 'Formatted APA 7th Statistical Tables (.xlsx)', 'Draft Findings Chapter (.docx)'],
    amount: 'KSh 25,000',
    numericAmount: 25000,
    status: 'active',
    statusLabel: 'Active / Retainer Committed',
    depositDate: 'Nov 2, 2026',
    paymentRef: 'KP-STK-49210B',
    progressPercent: 75,
  },
  {
    id: 3,
    title: 'Final Proofreading & Formatting Refinements',
    description: 'Turnitin plagiarism audit (< 10%), APA 7th edition referencing validation, academic tone polishing, and university submission clearance sign-off.',
    deliverables: ['Final Submission Master (.pdf)', 'Turnitin Plagiarism Clearance Certificate', 'Defense Presentation Deck (.pptx)'],
    amount: 'KSh 8,000',
    numericAmount: 8000,
    status: 'locked',
    statusLabel: 'Locked until Phase 2 Completion',
    lockedNote: 'Funding unlocks automatically once Milestone 2 deliverable is approved by client.',
  },
]

const calendarDays = [
  { day: 'Mon', date: 10, month: 'Nov', slots: ['9:00 AM', '2:00 PM', '4:30 PM'] },
  { day: 'Tue', date: 11, month: 'Nov', slots: ['10:00 AM', '3:00 PM'] },
  { day: 'Wed', date: 12, month: 'Nov', slots: ['11:30 AM', '1:30 PM', '5:00 PM'] },
  { day: 'Thu', date: 13, month: 'Nov', slots: ['9:00 AM', '11:00 AM'] },
  { day: 'Fri', date: 14, month: 'Nov', slots: [] },
]

const AcademicBureauPage = () => {
  const [milestones, setMilestones] = useState(initialMilestones)
  const [activeStepId, setActiveStepId] = useState(2)
  const [selectedDay, setSelectedDay] = useState(10)
  const [selectedSlot, setSelectedSlot] = useState('2:00 PM')
  const [showFundModal, setShowFundModal] = useState(false)
  const [fundingTargetMilestone, setFundingTargetMilestone] = useState(null)
  const [fundPhoneNumber, setFundPhoneNumber] = useState('')
  const [fundingReceipt, setFundingReceipt] = useState('')
  const [isFunding, setIsFunding] = useState(false)
  const [fundSuccess, setFundSuccess] = useState(false)

  // Booking sync state
  const [syncBookedModal, setSyncBookedModal] = useState(false)

  // Deliverable approval state
  const [showApprovalPrompt, setShowApprovalPrompt] = useState(false)

  const handleOpenFundModal = (milestone) => {
    setFundingTargetMilestone(milestone)
    setFundPhoneNumber('')
    setIsFunding(false)
    setFundSuccess(false)
    setShowFundModal(true)
  }

  const handleExecuteFunding = (e) => {
    e.preventDefault()
    if (!fundPhoneNumber) return
    setIsFunding(true)

    setTimeout(() => {
      setIsFunding(false)
      setFundingReceipt(`KP-REC-${Math.floor(100000 + Math.random() * 900000)}`)
      setFundSuccess(true)
      if (fundingTargetMilestone.id === 3) {
        setMilestones((prev) =>
          prev.map((m) =>
            m.id === 3
              ? {
                  ...m,
                  status: 'active',
                  statusLabel: 'Active / Retainer Committed',
                }
              : m
          )
        )
      }
    }, 2000)
  }

  const handleApproveMilestone2 = () => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === 2) {
          return {
            ...m,
            status: 'completed',
            statusLabel: 'Completed & Disbursed via M-Pesa',
            disbursedDate: 'Just Now',
          }
        }
        if (m.id === 3) {
          return {
            ...m,
            status: 'active',
            statusLabel: 'Active — Ready for Milestone Funding',
          }
        }
        return m
      })
    )
    setActiveStepId(3)
    setShowApprovalPrompt(false)
  }

  const totalContract = milestones.reduce((acc, m) => acc + m.numericAmount, 0)
  const disbursedAmount = milestones
    .filter((m) => m.status === 'completed')
    .reduce((acc, m) => acc + m.numericAmount, 0)
  const milestoneFundAmount = milestones
    .filter((m) => m.status === 'active')
    .reduce((acc, m) => acc + m.numericAmount, 0)

  return (
    <div className="py-16 md:py-20 min-h-screen bg-white text-left">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        {/* INTERACTIVE TRACKING HEADERS */}
        <div className="relative mb-10 overflow-hidden rounded-[28px] border border-black/10 bg-white p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#7020e8]/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 pb-8 border-b border-black/10 lg:flex-row lg:items-center">
            {/* Project Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black text-white px-3.5 py-1 text-xs font-black">
                  <span className="h-2 w-2 rounded-full bg-[#7020e8] animate-pulse" />
                  Academic Research Retainer
                </span>
                <span className="inline-flex items-center rounded-full bg-[#faf7ff] border border-black/5 px-3.5 py-1 text-xs font-bold text-black">
                  Strathmore University • Postgrad MBA
                </span>
                <span className="inline-flex items-center rounded-full border border-[#7020e8]/30 bg-violet-50 px-3.5 py-1 text-xs font-black text-[#7020e8]">
                  Contract #KP-2026-MBA-49
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight leading-snug">
                MBA Thesis Methodology &amp; Data Run Support
              </h1>
              <p className="text-sm sm:text-base text-[#554e60] max-w-3xl leading-relaxed font-medium">
                High-Trust Milestone Agreement. Project retainers are protected by KaziPro 100% Quality Guarantee and only disbursed when you formally inspect and approve the academic deliverables.
              </p>
            </div>

            {/* Milestone Status Summary Pill (Black & Purple) */}
            <div className="flex items-center gap-4 rounded-2xl bg-black text-white p-5 shrink-0 shadow-lg">
              <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-white/10 text-2xl sm:text-3xl text-white">
                <img src="/logo-mark.png" alt="Emblem" className="h-8 w-8 object-contain" />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-black uppercase tracking-wider text-white/70">Total Contract Value</p>
                <p className="mt-0.5 text-2xl font-black text-white">KSh {totalContract.toLocaleString()}</p>
                <p className="mt-1 text-xs font-bold text-[#b58df8]">
                  KSh {milestoneFundAmount.toLocaleString()} Milestone Retainer
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
            <div className="rounded-2xl border border-black/10 bg-[#faf7ff] p-4.5 transition hover:bg-white hover:shadow-xs">
              <span className="block text-xs font-bold text-[#888194]">Disbursed to Expert</span>
              <span className="mt-1 block text-xl font-black text-black">KSh {disbursedAmount.toLocaleString()}</span>
              <span className="mt-1 block text-xs font-bold text-emerald-600">Milestone 1 Complete</span>
            </div>
            <div className="rounded-2xl border border-[#7020e8]/30 bg-violet-50/50 p-4.5 transition hover:bg-white hover:shadow-xs">
              <span className="block text-xs font-bold text-[#888194]">Committed Retainer</span>
              <span className="mt-1 block text-xl font-black text-[#7020e8]">KSh {milestoneFundAmount.toLocaleString()}</span>
              <span className="mt-1 block text-xs font-black text-[#7020e8]">Phase 2 Active Run</span>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#faf7ff] p-4.5 transition hover:bg-white hover:shadow-xs">
              <span className="block text-xs font-bold text-[#888194]">Next Milestone</span>
              <span className="mt-1 block text-xl font-black text-black">KSh 8,000</span>
              <span className="mt-1 block text-xs text-[#554e60]">Proofreading &amp; Turnitin</span>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#faf7ff] p-4.5 transition hover:bg-white hover:shadow-xs">
              <span className="block text-xs font-bold text-[#888194]">Target Submission</span>
              <span className="mt-1 block text-xl font-black text-black">Dec 18, 2026</span>
              <span className="mt-1 block text-xs font-bold text-emerald-600">On Track (42 Days left)</span>
            </div>
          </div>
        </div>

        {/* MAIN WORKSPACE: 2-COLUMN GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: MILESTONE CONTRACT PROGRESS TRACKER */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-black">Milestone Contract Progress Tracker</h2>
                  <p className="mt-1 text-xs sm:text-sm text-[#554e60]">Click each milestone stage to inspect work deliverables &amp; milestone status</p>
                </div>
                <span className="rounded-full border border-black/10 bg-black text-white px-3.5 py-1 text-xs font-bold">
                  Step {activeStepId} of 3
                </span>
              </div>

              {/* Stepper Steps Component */}
              <div className="space-y-4">
                {milestones.map((m) => {
                  const isSelected = activeStepId === m.id
                  const isCompleted = m.status === 'completed'
                  const isActive = m.status === 'active'
                  const isLocked = m.status === 'locked'

                  return (
                    <div
                      key={m.id}
                      onClick={() => setActiveStepId(m.id)}
                      className={`relative p-5 sm:p-6 rounded-[22px] border-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-black bg-[#faf7ff] shadow-[0_4px_18px_rgba(0,0,0,0.08)]'
                          : 'border-black/10 bg-white hover:border-[#7020e8] hover:bg-[#faf7ff]'
                      }`}
                    >
                      {/* Step Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          {/* Stepper Circle */}
                          <div
                            className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-all ${
                              isCompleted
                                ? 'bg-black text-white shadow-xs'
                                : isActive
                                ? 'bg-[#7020e8] text-white shadow-md ring-4 ring-[#7020e8]/20 pulse-active'
                                : 'bg-black/10 text-black/40'
                            }`}
                          >
                            {isCompleted ? '✓' : m.id}
                          </div>
                          <div>
                            <span className="block text-[11px] font-black uppercase tracking-wider text-[#7020e8]">
                              Phase {m.id}
                            </span>
                            <h3 className={`text-base sm:text-lg font-black transition-colors ${isSelected ? 'text-black' : 'text-[#332e3d]'}`}>
                              {m.title}
                            </h3>
                          </div>
                        </div>

                        {/* Amount & Status Badge */}
                        <div className="text-right shrink-0">
                          <span className="block text-base sm:text-lg font-black text-black">{m.amount}</span>
                          <span
                            className={`inline-block text-[11px] font-bold px-3 py-0.5 rounded-full mt-1 ${
                              isCompleted
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : isActive
                                ? 'bg-black text-white shadow-xs'
                                : 'bg-black/5 text-[#888194] border border-black/5'
                            }`}
                          >
                            {m.statusLabel}
                          </span>
                        </div>
                      </div>

                      {/* Detailed Description */}
                      <p className="mt-3.5 text-xs sm:text-sm text-[#554e60] leading-relaxed pl-14">
                        {m.description}
                      </p>

                      {/* Milestone Active Progress Bar if active */}
                      {isActive && m.progressPercent && (
                        <div className="pl-14 mt-4 pt-2">
                          <div className="flex justify-between text-xs text-black mb-1.5 font-bold">
                            <span>Analysis Script Progress</span>
                            <span className="text-[#7020e8] font-black">{m.progressPercent}% Complete</span>
                          </div>
                          <div className="w-full bg-black/10 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-[#7020e8] h-full rounded-full transition-all duration-500"
                              style={{ width: `${m.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Deliverables Checklist */}
                      <div className="pl-14 mt-4 pt-4 border-t border-black/10 flex flex-wrap gap-2">
                        {m.deliverables.map((deliv, dIdx) => (
                          <span
                            key={dIdx}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-xs font-bold text-black shadow-2xs"
                          >
                            <span className={isCompleted ? 'text-black font-bold' : 'text-[#7020e8] font-bold'}>
                              {isCompleted ? '✓' : '📎'}
                            </span>
                            {deliv}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Triggers */}
                      <div className="pl-14 mt-5 pt-3 flex flex-wrap items-center gap-3">
                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenFundModal(m)
                            }}
                            className="rounded-xl bg-black hover:bg-[#7020e8] px-5 py-3 text-xs sm:text-sm font-black text-white shadow-md hover:shadow-[0_8px_25px_rgba(112,32,232,0.35)] transition-all cursor-pointer flex items-center gap-2 btn-shimmer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Securely Fund Next Milestone via M-Pesa
                          </button>
                        )}

                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowApprovalPrompt(true)
                            }}
                            className="rounded-xl border border-black bg-white px-4 py-3 text-xs font-black text-black hover:bg-black hover:text-white transition cursor-pointer"
                          >
                            Approve Deliverable &amp; Release Payment
                          </button>
                        )}

                        {isCompleted && (
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-black font-bold">
                            <span>✓ Disbursed to Dr. Amina K.</span>
                            <span className="text-xs text-[#888194] font-medium font-mono">Ref: {m.mpesaRef}</span>
                          </div>
                        )}

                        {isLocked && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenFundModal(m)
                            }}
                            className="rounded-xl border border-black/15 bg-[#faf7ff] px-4 py-2.5 text-xs font-bold text-black hover:bg-white hover:border-black transition cursor-pointer"
                          >
                            Pre-Fund Milestone in Advance
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quality Guarantee Disclaimer */}
              <div className="mt-8 rounded-2xl border border-black/10 bg-[#faf7ff] p-5 flex items-center gap-3.5 text-xs sm:text-sm text-[#554e60]">
                <div className="text-2xl">🔒</div>
                <div>
                  <span className="font-black text-black">KaziPro Quality Guarantee:</span> Funds are never released to the research mentor without your formal delivery clearance. Disputed runs receive independent academic board arbitration.
                </div>
              </div>
            </div>

            {/* Live Deliverables Repository */}
            <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <h3 className="text-lg sm:text-xl font-black text-black mb-5 flex items-center gap-2.5">
                <span>📁</span>
                <span>Active Engagement Files &amp; Data Outputs</span>
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'SPSS_Syntax_Regression_Run_v2.sps', size: '24 KB', date: 'Today at 09:14 AM', author: 'Dr. Amina K.' },
                  { name: 'Descriptive_Statistics_Summary.xlsx', size: '1.4 MB', date: 'Yesterday at 4:30 PM', author: 'Dr. Amina K.' },
                  { name: 'Literature_Framework_Signed_Off.pdf', size: '3.8 MB', date: 'Oct 28, 2026', author: 'Client Approved' },
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-black/10 bg-[#faf7ff] hover:border-black transition-all">
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">📄</span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-black">{file.name}</p>
                        <p className="text-[11px] text-[#888194]">{file.size} • Uploaded by {file.author} • {file.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Simulating secure download of ${file.name}`)}
                      className="rounded-xl border border-black/15 bg-white px-3.5 py-1.5 text-xs font-bold text-black hover:bg-black hover:text-white cursor-pointer shadow-2xs transition"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: ASSIGNED EXPERT & INTERACTIVE CALENDAR MODULE */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80"
                    alt="Dr. Amina K."
                    className="h-18 w-18 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-black/10 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#7020e8] text-xs font-bold text-white border-2 border-white shadow-xs" title="Verified Expert">
                    ✓
                  </div>
                </div>
                <div className="leading-tight flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-black">Dr. Amina K.</h3>
                    <span className="rounded-md border border-black/10 bg-black text-white px-2 py-0.5 text-[11px] font-black">
                      Top 1% Mentor
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-[#7020e8]">
                    Senior Quantitative Analyst &amp; Academic Fellow
                  </p>
                  <p className="mt-1 text-xs text-[#888194]">Westlands, Nairobi • Response time: ~12 mins</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6 rounded-2xl border border-black/10 bg-[#faf7ff] p-4.5">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-black mb-2">
                  Professional Bio &amp; Pedigree
                </h4>
                <p className="text-xs sm:text-sm text-[#554e60] leading-relaxed">
                  PhD in Applied Statistics from University of Nairobi (UoN). Former research fellow at Kenya Institute for Public Policy Research and Analysis (KIPPRA). Has guided 47 postgraduate candidates through proposal defense, empirical analysis, and journal publication.
                </p>
              </div>

              {/* Verified Academic/Industry Credentials */}
              <div className="space-y-2.5 mb-8">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-black mb-3">
                  Audited Credentials &amp; Verification
                </h4>
                {[
                  { label: 'PhD Applied Statistics — University of Nairobi', status: 'Verified' },
                  { label: 'IBM Certified Specialist — SPSS Statistics', status: 'Verified' },
                  { label: '47 Completed KaziPro Milestone Engagements', status: '100% On-Time' },
                  { label: '4.98 ⭐ Overall Client Satisfaction Score', status: 'Elite Tier' },
                ].map((cred, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-3 rounded-xl border border-black/10 bg-[#faf7ff]">
                    <span className="font-bold text-black truncate pr-2">{cred.label}</span>
                    <span className="font-black text-[#7020e8] text-[11px] shrink-0">{cred.status}</span>
                  </div>
                ))}
              </div>

              {/* INTEGRATED INTERACTIVE CALENDAR MODULE */}
              <div className="pt-6 border-t border-black/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-black flex items-center gap-2">
                      <span>📅</span>
                      <span>Book a Live Sync with Dr. Amina</span>
                    </h4>
                    <p className="text-xs text-[#888194]">Select a day and available video sync slot</p>
                  </div>
                  <span className="rounded-full border border-black/10 bg-black text-white px-3 py-1 text-xs font-bold">November 2026</span>
                </div>

                {/* Day selector pills */}
                <div className="grid grid-cols-5 gap-2 mb-5">
                  {calendarDays.map((cal) => {
                    const isSelected = selectedDay === cal.date
                    const isAvailable = cal.slots.length > 0
                    return (
                      <button
                        key={cal.date}
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedDay(cal.date)
                          if (cal.slots.length > 0) {
                            setSelectedSlot(cal.slots[0])
                          }
                        }}
                        className={`p-3 rounded-2xl text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white font-black shadow-md'
                            : isAvailable
                            ? 'bg-[#faf7ff] hover:bg-slate-100 text-black border border-black/10'
                            : 'bg-[#faf7ff]/50 text-black/30 border border-transparent cursor-not-allowed'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold block">{cal.day}</span>
                        <span className="text-base sm:text-lg font-black block">{cal.date}</span>
                        <span className="text-[9px] block">
                          {isAvailable ? `${cal.slots.length} slots` : 'Full'}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Time slot buttons */}
                {selectedDay && (
                  <div className="mb-5">
                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-black mb-2.5">
                      Available Consultation Hours:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {calendarDays
                        .find((c) => c.date === selectedDay)
                        ?.slots.map((slot) => {
                          const isSlotSelected = selectedSlot === slot
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                isSlotSelected
                                  ? 'bg-[#7020e8] text-white shadow-xs font-black'
                                  : 'bg-[#faf7ff] text-black hover:bg-slate-100 border border-black/10'
                              }`}
                            >
                              {slot}
                            </button>
                          )
                        })}
                    </div>
                  </div>
                )}

                {/* Book Sync CTA */}
                <button
                  onClick={() => setSyncBookedModal(true)}
                  className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3.5 text-sm sm:text-base font-black text-white shadow-md hover:shadow-[0_8px_25px_rgba(112,32,232,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
                >
                  <span>Lock In Video Sync for Nov {selectedDay} @ {selectedSlot}</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* M-PESA MILESTONE FUNDING MODAL */}
      {showFundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white border border-black/10 rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-[0_24px_70px_rgba(0,0,0,0.3)] z-10 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowFundModal(false)}
              className="absolute top-5 right-5 text-[#888194] hover:text-black p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!fundSuccess ? (
              <form onSubmit={handleExecuteFunding}>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3.5 shadow-md">
                    <img src="/logo-mark.png" alt="Logo" className="h-8 w-8 object-contain" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-black">Fund Milestone Progress</h3>
                  <p className="text-xs sm:text-sm text-[#554e60] mt-1">Safaricom Daraja Verified Till</p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#faf7ff] p-4.5 mb-5 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#888194]">Target Milestone:</span>
                    <span className="font-black text-black truncate max-w-[220px]">
                      {fundingTargetMilestone?.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2.5 border-t border-black/5">
                    <span className="text-xs sm:text-sm font-bold text-black">Required Milestone Amount:</span>
                    <span className="text-xl font-black text-[#7020e8]">{fundingTargetMilestone?.amount}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-black mb-2">
                    M-Pesa Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-sm font-bold text-[#514858]">🇰🇪 +254</span>
                    <input
                      type="tel"
                      value={fundPhoneNumber}
                      onChange={(e) => setFundPhoneNumber(e.target.value)}
                      placeholder="712 345 678"
                      required
                      className="w-full rounded-xl border border-black/15 bg-[#faf7ff] pl-24 pr-4 py-3 text-sm text-black outline-none transition focus:border-[#7020e8] focus:bg-white focus:ring-2 focus:ring-[#7020e8]/20"
                    />
                  </div>
                  <p className="text-[11px] text-[#888194] mt-2">
                    An STK push will be transmitted to this handset to securely authorize the milestone transfer.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isFunding}
                  className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3.5 text-sm font-black text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 btn-shimmer"
                >
                  {isFunding ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Daraja STK Push...</span>
                    </>
                  ) : (
                    <>
                      <span>Fund {fundingTargetMilestone?.amount} via M-Pesa</span>
                      <span>➔</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 text-emerald-600">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-black mb-1">Milestone Funded!</h3>
                <p className="text-xs font-semibold text-[#888194] font-mono mb-5">
                  Receipt: {fundingReceipt}
                </p>
                <div className="rounded-2xl border border-black/10 bg-[#faf7ff] p-4 text-xs text-left mb-6 space-y-2">
                  <p className="text-[#514858]">
                    <strong className="text-black">Milestone:</strong> {fundingTargetMilestone?.title}
                  </p>
                  <p className="text-[#514858]">
                    <strong className="text-black">Amount Secured:</strong> {fundingTargetMilestone?.amount}
                  </p>
                  <p className="text-[#7020e8] font-bold">
                    ✓ Dr. Amina K. has been alerted that milestone funding is secured.
                  </p>
                </div>
                <button
                  onClick={() => setShowFundModal(false)}
                  className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3 text-sm font-bold text-white transition cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SYNC BOOKED CONFIRMATION MODAL */}
      {syncBookedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white border border-black/10 rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-[0_24px_70px_rgba(0,0,0,0.3)] text-center z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 text-emerald-600">
              ✓
            </div>
            <h3 className="text-2xl font-black text-black mb-1">Live Sync Scheduled!</h3>
            <p className="text-sm text-[#554e60] mb-5">
              Video conference locked for <strong>Nov {selectedDay}, 2026 at {selectedSlot} EAT</strong> with Dr. Amina K.
            </p>

            <div className="rounded-2xl border border-black/10 bg-[#faf7ff] p-4 text-xs text-left mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#554e60]">Meeting Medium:</span>
                <span className="text-black font-bold">KaziPro Encrypted Video Sync</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#554e60]">Calendar Invite:</span>
                <span className="text-[#7020e8] font-bold">Sent to your WhatsApp</span>
              </div>
            </div>

            <button
              onClick={() => setSyncBookedModal(false)}
              className="w-full rounded-xl bg-black hover:bg-[#7020e8] py-3 text-sm font-bold text-white shadow-md transition cursor-pointer"
            >
              Great, Continue Review
            </button>
          </div>
        </div>
      )}

      {/* APPROVE DELIVERABLE PROMPT MODAL */}
      {showApprovalPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white border border-black/10 rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-[0_24px_70px_rgba(0,0,0,0.3)] text-center z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-md">
              📝
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-black mb-2">Approve Phase 2 Deliverable?</h3>
            <p className="text-xs sm:text-sm text-[#554e60] mb-6 leading-relaxed">
              Confirming will release KSh 25,000 to Dr. Amina's M-Pesa till and automatically unlock Milestone 3.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApprovalPrompt(false)}
                className="flex-1 rounded-xl border border-black/20 bg-[#faf7ff] py-3 text-xs sm:text-sm font-bold text-black hover:bg-white transition cursor-pointer"
              >
                Request Revisions
              </button>
              <button
                onClick={handleApproveMilestone2}
                className="flex-1 rounded-xl bg-black hover:bg-[#7020e8] py-3 text-xs sm:text-sm font-bold text-white shadow-md transition cursor-pointer"
              >
                Yes, Release Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AcademicBureauPage
