const fs = require('fs');
const indexStr = fs.readFileSync('index.html', 'utf8');

const heroIdx = indexStr.indexOf('<!-- Hero Section -->');
const footerIdx = indexStr.indexOf('<!-- Footer -->');

let baseTop = indexStr.substring(0, heroIdx);
let baseBottom = indexStr.substring(footerIdx);

// Modify navigation links
function processTop(topContent, title, desc) {
    let newTop = topContent.replace('<title>MyCareerX - Where Students Meet Their Future</title>', `<title>\${title}</title>
    <meta name="description" content="\${desc}">
    <meta property="og:title" content="\${title}">
    <meta property="og:description" content="\${desc}">
    <meta property="og:type" content="website">`);
    
    // Fix hash links in the top nav
    newTop = newTop.replace(/href="#paths"/g, 'href="/index.html#paths"');
    newTop = newTop.replace(/href="#admissions"/g, 'href="/index.html#admissions"');
    newTop = newTop.replace(/href="#mentors"/g, 'href="/index.html#mentors"');
    newTop = newTop.replace(/href="#how-it-works"/g, 'href="/index.html#how-it-works"');
    newTop = newTop.replace(/href="#testimonials"/g, 'href="/index.html#testimonials"');
    newTop = newTop.replace(/href="#book-session"/g, 'href="/index.html#book-session"');
    return newTop;
}

const dualFormHTML = (context, formTitle) => `
    <div style="display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; width: 100%; max-width: 900px; margin-top: 3rem; margin-left: auto; margin-right: auto;" class="reveal">
        <!-- WhatsApp Action Option -->
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: rgba(37, 211, 102, 0.04); border: 1px solid rgba(37, 211, 102, 0.2); border-radius: var(--radius-lg); padding: 2.5rem 1.5rem;">
            <i class="fab fa-whatsapp" style="font-size: 3.5rem; color: #25D366; margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem;">Instant WhatsApp Chat</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem; text-align: center;"> Get immediate answers about fees, seat availability, and application procedures right on WhatsApp.</p>
            <a href="https://wa.me/917855816174?text=Hi%20MyCareerX!%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(context)}." target="_blank" class="btn btn-whatsapp" style="font-size: 1.05rem; padding: 1rem 2rem; width: 100%; box-shadow: 0 10px 25px rgba(37, 211, 102, 0.25);">Connect on WhatsApp</a>
        </div>

        <!-- Form Action Option -->
        <div style="flex: 1; min-width: 300px; max-width: 450px; padding: 2rem; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); box-shadow: var(--shadow-md);">
            <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem; text-align: left;">${formTitle}</h3>
            <form id="seoInquiryForm${context.replace(/\s/g, '')}" onsubmit="event.preventDefault(); submitSeoForm(this, '${context}');" style="text-align: left;">
                <div class="input-group" style="margin-bottom: 1rem;">
                    <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Full Name *</label>
                    <input type="text" name="name" class="input-control" placeholder="" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                </div>
                <div class="input-group" style="margin-bottom: 1rem;">
                    <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Phone Number *</label>
                    <input type="tel" name="phone" class="input-control" placeholder="" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                </div>
                <div class="input-group" style="margin-bottom: 1.5rem;">
                    <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Target College (Optional)</label>
                    <input type="text" name="college" class="input-control" placeholder="Your Dream College" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem;">Get Free Consultation</button>
                <div class="form-msg msg-ui" style="margin-top: 1rem; text-align: center;"></div>
            </form>
        </div>
    </div>
`;


const pages = [
    {
        filename: 'career-counselling.html',
        title: 'Career Counselling in India | Expert Guidance for Students | MyCareerX',
        desc: 'Get expert career counselling in India. Navigate your future with personalized guidance from IIT, AIIMS, and IIM alumni for proven success.',
        content: `
    <section style="padding: 10rem 1rem 4rem 1rem; background: var(--bg-body); min-height: 80vh;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <div class="reveal" style="text-align: center; margin-bottom: 4rem;">
                <div class="tagline-badge" style="background: rgba(79, 70, 229, 0.1); color: var(--primary); border: 1px solid rgba(79, 70, 229, 0.3); margin-bottom: 1.5rem; display: inline-flex;">
                    <i class="fas fa-compass"></i> Career Counselling
                </div>
                <h1 style="font-size: 3rem; margin-bottom: 1.5rem; font-weight: 800;">Expert Career Counselling in India</h1>
                <p style="font-size: 1.25rem; color: var(--text-muted); line-height: 1.8; max-width: 800px; margin: 0 auto;">
                    Deciding on the right career path is one of the most critical decisions in a student's life. In a rapidly evolving world, having access to proper <strong>career counselling in India</strong> is essential for students who want to maximize their potential and find a fulfilling profession. At MyCareerX, we bridge the gap between confusion and clarity by offering elite <strong>career guidance</strong> from mentors who have already walked the path to success—alumni from IITs, AIIMS, and IIMs.
                </p>
            </div>

            <div class="reveal" style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 3rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">Why Is Career Guidance Crucial for Students?</h2>
                <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                    Many students struggle with choosing between engineering, medical, commerce, and humanities due to peer pressure or lack of awareness. Without professional <strong>career guidance</strong>, students may end up in fields that don't align with their natural aptitude or interests. Our comprehensive counselling process evaluates your strengths, highlights emerging industry trends, and designs a personalized trajectory.
                </p>
                    Our certified career experts utilize psychometric analysis mixed with real-world industry feedback to provide an accurate roadmap. Whether you're aiming for top engineering institutes or exploring untraditional avenues, we ensure your future is secure.
                </p>

                <div class="trusted-section" style="margin-top: 3rem; background: transparent; padding: 0;">
                    <p style="text-transform: uppercase; font-size: 0.85rem; letter-spacing: 2px;">Mentors From Elite Institutions</p>
                    <div class="marquee">
                        <div class="marquee-content">
                            <span class="marquee-item">IIT BOMBAY</span>
                            <span class="marquee-item">AIIMS DELHI</span>
                            <span class="marquee-item">IIM AHMEDABAD</span>
                            <span class="marquee-item">BITS PILANI</span>
                            <span class="marquee-item">NLU DELHI</span>
                            <span class="marquee-item">MIT</span>
                            <span class="marquee-item">STANFORD</span>
                        </div>
                        <div class="marquee-content" aria-hidden="true">
                            <span class="marquee-item">IIT BOMBAY</span>
                            <span class="marquee-item">AIIMS DELHI</span>
                            <span class="marquee-item">IIM AHMEDABAD</span>
                            <span class="marquee-item">BITS PILANI</span>
                            <span class="marquee-item">NLU DELHI</span>
                            <span class="marquee-item">MIT</span>
                            <span class="marquee-item">STANFORD</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="reveal" style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 3rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">The MyCareerX Counselling Process</h2>
                <ul style="list-style: none; margin-bottom: 2rem; padding: 0;">
                    <li style="margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 1rem;">
                        <i class="fas fa-check-circle" style="color: var(--success); font-size: 1.5rem; margin-top: 0.25rem;"></i>
                        <div>
                            <strong style="font-size: 1.25rem;">1. Aptitude & Interest Alignment</strong>
                            <p style="color: var(--text-muted); font-size: 1.05rem; margin-top: 0.25rem; line-height: 1.6;">We start by thoroughly understanding your core strengths, academic background, and long-term aspirations before making any suggestions.</p>
                        </div>
                    </li>
                    <li style="margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 1rem;">
                        <i class="fas fa-check-circle" style="color: var(--success); font-size: 1.5rem; margin-top: 0.25rem;"></i>
                        <div>
                            <strong style="font-size: 1.25rem;">2. Top-Tier Mentorship Network</strong>
                            <p style="color: var(--text-muted); font-size: 1.05rem; margin-top: 0.25rem; line-height: 1.6;">Connect one-on-one with experts from elite institutions to get real-world insights into what a day in the life of your dream career actually looks like.</p>
                        </div>
                    </li>
                    <li style="margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 1rem;">
                        <i class="fas fa-check-circle" style="color: var(--success); font-size: 1.5rem; margin-top: 0.25rem;"></i>
                        <div>
                            <strong style="font-size: 1.25rem;">3. Actionable Roadmaps</strong>
                            <p style="color: var(--text-muted); font-size: 1.05rem; margin-top: 0.25rem; line-height: 1.6;">Receive a step-by-step preparation plan tailored specifically for your chosen exams or career goals to ensure guaranteed success.</p>
                        </div>
                    </li>
                </ul>
        </div>
    </section>

    <!-- Mentors Section -->
    <section id="mentors" style="background: var(--surface);">
        <div class="container">
            <h2 class="reveal">100% Free Guidance. Top Minds.</h2>
            <p class="section-subtitle reveal">Book introductory sessions entirely free. Only pay if you want long-term
                dedicated mentorship.</p>

            <div class="grid-3 reveal">
                <!-- Free Mentor -->
                <div class="mentor-card">
                    <span class="mentor-badge badge-free">Free Session</span>
                    <div class="mentor-avatar"><i class="fas fa-user-astronaut"></i></div>
                    <h3 class="mentor-name">Rahul Sharma</h3>
                    <p class="mentor-role">IIT Delhi • CS Dept</p>
                    <div class="mentor-tags">
                        <span class="mentor-tag">JEE Advanced</span>
                        <span class="mentor-tag">Mock Strategy</span>
                    </div>
                    <p class="mentor-price">Free</p>
                    <a href="#book-session" onclick="prefillMentor('Rahul Sharma', 'Free')" class="btn btn-outline"
                        style="width: 100%;">Book Session</a>
                </div>

                <!-- Free Mentor -->
                <div class="mentor-card">
                    <span class="mentor-badge badge-free">Free Session</span>
                    <div class="mentor-avatar"><i class="fas fa-user-md"></i></div>
                    <h3 class="mentor-name">Dr. Priya Verma</h3>
                    <p class="mentor-role">AIIMS Delhi Alum</p>
                    <div class="mentor-tags">
                        <span class="mentor-tag">NEET UG</span>
                        <span class="mentor-tag">Biology Hack</span>
                    </div>
                    <p class="mentor-price">Free</p>
                    <a href="#book-session" onclick="prefillMentor('Dr. Priya Verma', 'Free')" class="btn btn-outline"
                        style="width: 100%;">Book Session</a>
                </div>

                <!-- Free Mentor -->
                <div class="mentor-card">
                    <span class="mentor-badge badge-free">Free Session</span>
                    <div class="mentor-avatar"><i class="fas fa-user-tie"></i></div>
                    <h3 class="mentor-name">Arjun Mehta</h3>
                    <p class="mentor-role">IIM Bangalore</p>
                    <div class="mentor-tags">
                        <span class="mentor-tag">CAT 99.9%ile</span>
                        <span class="mentor-tag">PI Prep</span>
                    </div>
                    <p class="mentor-price">Free</p>
                    <a href="#book-session" onclick="prefillMentor('Arjun Mehta', 'Free')" class="btn btn-outline"
                        style="width: 100%;">Book Session</a>
                </div>
            </div>

            <div style="margin-top: 4rem;">
                <h3 style="text-align: center; margin-bottom: 2rem;">Premium Dedicated Mentorship</h3>
                <div class="grid-3 reveal">
                    <!-- Premium Mentor -->
                    <div class="mentor-card">
                        <span class="mentor-badge badge-premium">Premium</span>
                        <div class="mentor-avatar"><i class="fas fa-user-ninja"></i></div>
                        <h3 class="mentor-name">Vikram Singh</h3>
                        <p class="mentor-role">Stanford University</p>
                        <div class="mentor-tags">
                            <span class="mentor-tag">MS CS</span>
                            <span class="mentor-tag">SOP Review</span>
                        </div>
                        <p class="mentor-price">₹500 <span
                                style="font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">/hour</span>
                        </p>
                        <a href="#book-session" onclick="prefillMentor('Vikram Singh', 'Premium')"
                            class="btn btn-primary" style="width: 100%;">Hire Mentor</a>
                    </div>

                    <!-- Premium Mentor -->
                    <div class="mentor-card">
                        <span class="mentor-badge badge-premium">Premium</span>
                        <div class="mentor-avatar"><i class="fas fa-user-graduate"></i></div>
                        <h3 class="mentor-name">Ananya Patel</h3>
                        <p class="mentor-role">NLU Delhi</p>
                        <div class="mentor-tags">
                            <span class="mentor-tag">CLAT Air 15</span>
                            <span class="mentor-tag">Legal Aptitude</span>
                        </div>
                        <p class="mentor-price">₹100 <span
                                style="font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">/hour</span>
                        </p>
                        <a href="#book-session" onclick="prefillMentor('Ananya Patel', 'Premium')"
                            class="btn btn-primary" style="width: 100%;">Hire Mentor</a>
                    </div>

                    <!-- Premium Mentor -->
                    <div class="mentor-card">
                        <span class="mentor-badge badge-premium">Premium</span>
                        <div class="mentor-avatar"><i class="fas fa-laptop-code"></i></div>
                        <h3 class="mentor-name">Karan Gupta</h3>
                        <p class="mentor-role">Google SDE-2</p>
                        <div class="mentor-tags">
                            <span class="mentor-tag">DSA</span>
                            <span class="mentor-tag">System Design</span>
                        </div>
                        <p class="mentor-price">₹250 <span
                                style="font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">/hour</span>
                        </p>
                        <a href="#book-session" onclick="prefillMentor('Karan Gupta', 'Premium')"
                            class="btn btn-primary" style="width: 100%;">Hire Mentor</a>
                    </div>
                </div>
            </div>

            <!-- Dynamic Community Mentors -->
            <div id="dynamic-mentors-container" style="display: none; margin-top: 4rem;">
                <h3 style="text-align: center; margin-bottom: 2rem;">Community Mentors <span class="badge"
                        style="background:#EEF2FF; color:var(--primary); font-size:0.8rem; vertical-align:middle; margin-left:0.5rem; padding:0.2rem 0.5rem; border-radius:10px;">New</span>
                </h3>
                <div id="dynamic-mentors-grid" class="grid-3 reveal active">
                    <!-- Approved mentors will be injected here via JS -->
                </div>
                <div style="text-align: center; margin-top: 3rem;">
                    <button id="view-more-mentors-btn" onclick="toggleMentors()" class="btn btn-outline"
                        style="min-width: 200px; display: none;">View More Mentors</button>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works">
        <div class="container reveal">
            <h2>The Roadmap to Clarity</h2>
            <p class="section-subtitle">Three steps between you and absolute conviction about your future.</p>

            <div class="pipeline">
                <div class="step">
                    <div class="step-icon"><i class="fas fa-bullseye"></i></div>
                    <h3>1. Define Your Goal</h3>
                    <p>Filter through our exclusive list of mentors by exam, college target, or career domain.</p>
                </div>
                <div class="step">
                    <div class="step-icon"><i class="fas fa-calendar-check"></i></div>
                    <h3>2. Schedule Frictionlessly</h3>
                    <p>Pick a time slot that works for you. Start with a free session to ensure the perfect match.</p>
                </div>
                <div class="step">
                    <div class="step-icon"><i class="fas fa-video"></i></div>
                    <h3>3. 1-on-1 Video Sync</h3>
                    <p>Jump on a high-fidelity video call. Get custom roadmaps, schedule reviews, and clear doubts.</p>
                </div>
            </div>
        </div>
    </section>

    \n    <!-- Book a Session (Form Section) -->
    <section id="book-session">
        <div class="container reveal">
            <div class="form-section">
                <div class="form-grid">
                    <div class="form-content">
                        <h2>Chart Your Path. <br><span style="color: var(--secondary);">Book a Session.</span></h2>
                        <p>Ready to accelerate your career? Fill out your basic details below. Our team carefully
                            reviews your background to perfectly match you with an elite mentor.</p>
                        <ul style="list-style: none; margin-top: 2rem; padding: 0;">
                            <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;"><i
                                    class="fas fa-check-circle" style="color: var(--success); font-size: 1.25rem;"></i>
                                Get a custom roadmap.</li>
                            <li style="margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem;"><i
                                    class="fas fa-check-circle" style="color: var(--success); font-size: 1.25rem;"></i>
                                Flexible scheduling options.</li>
                            <li style="display: flex; align-items: center; gap: 1rem;"><i class="fas fa-check-circle"
                                    style="color: var(--success); font-size: 1.25rem;"></i> Trusted by 10,000+ students.
                            </li>
                        </ul>
                    </div>
                    <div class="smart-form">
                        <form id="bookingForm" onsubmit="event.preventDefault(); submitBooking();">
                            <div class="input-group">
                                <label>Full Name *</label>
                                <input type="text" id="b-name" class="input-control" placeholder="Samay Raina" required>
                            </div>
                            <div class="input-group">
                                <label>School Name *</label>
                                <input type="text" id="b-school" class="input-control"
                                    placeholder="e.g. st xaviers school" required>
                            </div>

                            <div class="form-row">
                                <div class="input-group">
                                    <label>Primary Number *</label>
                                    <input type="tel" id="b-phone1" class="input-control" placeholder="+91 00000 00000"
                                        required>
                                </div>
                                <div class="input-group">
                                    <label>Secondary Number</label>
                                    <input type="tel" id="b-phone2" class="input-control" placeholder="(Optional)">
                                </div>
                            </div>

                            <div class="input-group">
                                <label>Email Address</label>
                                <input type="email" id="b-email" class="input-control"
                                    placeholder="samayraina@example.com (Optional)">
                            </div>

                            <div class="form-row">
                                <div class="input-group">
                                    <label>10th Percentile *</label>
                                    <input type="text" id="b-10th" class="input-control" placeholder="e.g. 95%"
                                        required>
                                </div>
                                <div class="input-group">
                                    <label>12th Percentile</label>
                                    <input type="text" id="b-12th" class="input-control"
                                        placeholder="(Expected or Actual)">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="input-group">
                                    <label>Session Type *</label>
                                    <select id="b-type" class="input-control" required>
                                        <option value="" disabled selected>Select...</option>
                                        <option value="Free">Free Intro Session</option>
                                        <option value="Premium">Premium Mentorship</option>
                                    </select>
                                </div>
                                <div class="input-group">
                                    <label>Select Date *</label>
                                    <input type="date" id="b-date" class="input-control" required>
                                </div>
                            </div>

                            <div class="input-group">
                                <label>Specific Mentor (Optional)</label>
                                <input type="text" id="b-mentor" class="input-control" placeholder="e.g. Rahul Sharma">
                            </div>

                            <button type="submit" id="submitBtn" class="btn btn-primary"
                                style="width: 100%; font-size: 1.125rem;">Schedule Appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `
    },
    {
        filename: 'direct-admission.html',
        title: 'Direct Admission in Top Colleges | College Admission Guidance | MyCareerX',
        desc: 'Secure direct admission in top private engineering and medical colleges. Get transparent college admission guidance with MyCareerX.',
        content: `
    <section style="padding: 10rem 1rem 4rem 1rem; background: var(--bg-body); min-height: 80vh;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <div class="reveal" style="text-align: center; margin-bottom: 4rem;">
                <div class="tagline-badge" style="background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: 1.5rem; display: inline-flex;">
                    <i class="fas fa-university"></i> Direct Admission 2026
                </div>
                <h1 style="font-size: 3rem; margin-bottom: 1.5rem; font-weight: 800;">Direct Admission in Top Private Universities</h1>
                <p style="font-size: 1.25rem; color: var(--text-muted); line-height: 1.8; max-width: 800px; margin: 0 auto;">
                    Navigating the competitive landscape of Indian entrances can be overwhelmingly stressful. Fortunately, for students looking to secure a seat without the extreme stress of standard cutoffs, <strong>direct admission</strong> remains a highly viable pathway. Through the management quota and institutional seats, students have the opportunity to secure their place in premier institutions like KIIT, SRM, VIT, LPU, BITS, SOA, etc.
                </p>
            </div>

            <div class="reveal" style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 3rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">What is Direct Admission?</h2>
                <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                    <strong>Direct admission</strong> refers to the process of enrolling in an undergraduate or postgraduate program—such as B.Tech, MBA, or Medical degrees—via institution-reserved seats. These management quota seats ensure that capable students who missed out on minor margin rankings still gain access to quality education. 
                </p>
                <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8;">
                    The criteria for these seats often shift from strict entrance scores to a combination of board examination merits, personal interviews, and overall profiles. Securing a seat early eliminates the immense pressure of unpredictable counseling rounds and guarantees your academic future.
                </p>
            </div>

            <div class="reveal" style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 3rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">100% Transparent College Admission Guidance</h2>
                <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                    At MyCareerX, our <strong>college admission guidance</strong> focuses on 100% transparency. The admission landscape is unfortunately filled with unverified agents and hidden fee structures; our absolute mission is to cut through the noise and provide students and parents with direct, reliable, and verified information.
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <div style="background: var(--bg-body); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border);">
                        <i class="fas fa-file-invoice-dollar" style="color: var(--primary); font-size: 2rem; margin-bottom: 1rem;"></i>
                        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Transparent Fee Structures</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Clear breakdowns of management quotas, tuition fees, and hostel deposits without any hidden surprises.</p>
                    </div>
                    <div style="background: var(--bg-body); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border);">
                        <i class="fas fa-chair" style="color: var(--success); font-size: 2rem; margin-bottom: 1rem;"></i>
                        <h4 style="font-size: 1.15rem; margin-bottom: 0.5rem;">Real-Time Seat Tracking</h4>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">We provide accurate, up-to-date availability for highly demanded programs like Computer Science Engineering.</p>
                    </div>
                </div>
            </div>

            <div class="reveal" style="text-align: center; margin-top: 4rem;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Secure Your Seat at India's Top Universities</h2>
                <p style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.8; max-width: 700px; margin: 0 auto;">
                    Don't leave your future to chance. Speak immediately with our admission experts to explore confirmed placement opportunities. Connect directly via WhatsApp or request a dedicated callback.
                </p>
                
                <div class="trusted-section" style="margin-top: 3rem; margin-bottom: 3rem; background: transparent; padding: 0;">
                    <p style="text-transform: uppercase; font-size: 0.85rem; letter-spacing: 2px;">Direct Admissions Across Top Institutions</p>
                    <div class="marquee">
                        <div class="marquee-content">
                            <span class="marquee-item">KIIT</span>
                            <span class="marquee-item">VIT</span>
                            <span class="marquee-item">SRM</span>
                            <span class="marquee-item">LPU</span>
                            <span class="marquee-item">BITS</span>
                            <span class="marquee-item">MIT PUNE</span>
                            <span class="marquee-item">SOA</span>
                        </div>
                        <div class="marquee-content" aria-hidden="true">
                            <span class="marquee-item">KIIT</span>
                            <span class="marquee-item">VIT</span>
                            <span class="marquee-item">SRM</span>
                            <span class="marquee-item">LPU</span>
                            <span class="marquee-item">BITS</span>
                            <span class="marquee-item">MIT PUNE</span>
                            <span class="marquee-item">SOA</span>
                        </div>
                    </div>
                </div>

                ${dualFormHTML('Direct Admission Enquiry', 'Request a Free Admission Callback')}
            </div>
        </div>
    </section>
        `
    },
    {
        filename: 'career-guidance-after-12th.html',
        title: 'Career Guidance after 12th | Streams, Courses & Steps | MyCareerX',
        desc: 'Stuck looking for career guidance after 12th? Discover top courses in Engineering, Medical, & Commerce streams. Get clear next steps for your future goals.',
        content: `
    <section style="padding: 10rem 1rem 4rem 1rem; background: var(--bg-body); min-height: 80vh;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <div class="reveal" style="text-align: center; margin-bottom: 4rem;">
                <div class="tagline-badge" style="background: rgba(245, 158, 11, 0.1); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.3); margin-bottom: 1.5rem; display: inline-flex;">
                    <i class="fas fa-graduation-cap"></i> After 12th Guide
                </div>
                <h1 style="font-size: 3rem; margin-bottom: 1.5rem; font-weight: 800;">Expert Career Guidance After 12th</h1>
                <p style="font-size: 1.25rem; color: var(--text-muted); line-height: 1.8; max-width: 800px; margin: 0 auto;">
                    The period immediately following board exams is a massive turning point. Seeking proper <strong>career guidance after 12th</strong> is fundamental because the choices made here lay the permanent groundwork for your professional trajectory. With thousands of emerging courses and specialized degrees now available, having a clear roadmap is paramount.
                </p>
            </div>

            <div class="reveal" style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 3rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">Navigating Science, Commerce, and Arts</h2>
                <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                    Each stream offers traditional stalwarts as well as high-growth modern roles. The age of limiting yourself to just engineering and medicine is over.
                </p>
                <ul style="list-style: none; margin-bottom: 1rem; padding: 0;">
                    <li style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                        <strong style="font-size: 1.2rem; color: var(--primary);">Science (PCM/PCB)</strong>
                        <p style="color: var(--text-muted); font-size: 1.05rem; margin-top: 0.5rem; line-height: 1.6;">While securing admission into top tier institutions for Computer Science and MBBS remains highly competitive, exciting fields like Artificial Intelligence, Data Science, Biotechnology, and Aerospace design are creating massive super-cycles of career growth.</p>
                        
                        <div class="trusted-section" style="margin-top: 2rem; background: transparent; padding: 0;">
                            <div class="marquee">
                                <div class="marquee-content">
                                    <span class="marquee-item">KIIT</span>
                                    <span class="marquee-item">VIT</span>
                                    <span class="marquee-item">SRM</span>
                                    <span class="marquee-item">LPU</span>
                                    <span class="marquee-item">BITS</span>
                                    <span class="marquee-item">SOA</span>
                                </div>
                                <div class="marquee-content" aria-hidden="true">
                                    <span class="marquee-item">KIIT</span>
                                    <span class="marquee-item">VIT</span>
                                    <span class="marquee-item">SRM</span>
                                    <span class="marquee-item">LPU</span>
                                    <span class="marquee-item">BITS</span>
                                    <span class="marquee-item">SOA</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                        <strong style="font-size: 1.2rem; color: var(--primary);">Commerce</strong>
                        <p style="color: var(--text-muted); font-size: 1.05rem; margin-top: 0.5rem; line-height: 1.6;">Beyond traditional B.Com, pathways like Chartered Accountancy (CA), specialized business administration (BBA in FinTech), and quantitative finance are leading to incredibly lucrative lifelong careers.</p>
                    </li>
                    <li>
                        <strong style="font-size: 1.2rem; color: var(--primary);">Arts & Humanities</strong>
                        <p style="color: var(--text-muted); font-size: 1.05rem; margin-top: 0.5rem; line-height: 1.6;">The digital era has exponentially boosted demand for design (UI/UX), corporate psychology, mass communication, and digital law experts.</p>
                    </li>
                </ul>
            </div>

            <div class="reveal" style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 3rem;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">Key Next Steps for 12th Pass Students</h2>
                <ol style="list-style: decimal inside; margin-bottom: 0; color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
                    <li style="margin-bottom: 1rem; padding: 0.5rem 0;"><strong>Evaluate Skillsets:</strong> Look beyond standard exam marks to analyze what subjects you genuinely enjoy processing natively.</li>
                    <li style="margin-bottom: 1rem; padding: 0.5rem 0;"><strong>Compare Degrees:</strong> Distinguish between B.Tech, B.Sc, BBA, B.Com, and integrated dual-degrees to find the highest ROI.</li>
                    <li style="padding: 0.5rem 0;"><strong>Secure Admissions:</strong> Engage with counselling portals, monitor entrance dates meticulously, and actively apply for backups in reliable private universities.</li>
                </ol>
            </div>

            <div class="reveal" style="text-align: center; margin-top: 4rem;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Still Undecided? Talk to a Mentor!</h2>
                <p style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.8; max-width: 700px; margin: 0 auto;">
                    A simple 15-minute conversation with a mentor who has successfully navigated their post-12th journey can spark immense clarity. Request a free post-12th mentorship callback today, and we'll connect you directly with experts!
                </p>
                
                ${dualFormHTML('After 12th Guidance', 'Request Post-12th Guidance')}
            </div>
        </div>
    </section>
        `
    }
];

const scriptJs = `
<script>
    async function submitSeoForm(formElement, context) {
        const btn = formElement.querySelector('button[type="submit"]');
        const msg = formElement.querySelector('.msg-ui');
        
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        const payload = {
            name: formElement.name.value,
            phone: formElement.phone.value,
            college: formElement.college.value ? \`[\${context}] \${formElement.college.value}\` : \`[\${context}] Target Not Specified\`
        };

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (data.success) {
                formElement.innerHTML = \`
                    <div style="text-align: center; padding: 1rem; animation: reveal 0.5s ease;">
                        <i class="fas fa-check-circle" style="font-size: 3.5rem; color: var(--success); margin-bottom: 1rem;"></i>
                        <h3 style="color: var(--success); margin-bottom: 0.5rem; font-size: 1.3rem;">Request Received!</h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5;">Our counseling expert will call you shortly on \${payload.phone}.</p>
                    </div>
                \`;
            } else {
                alert('Error: ' + data.message);
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Connection error. Please try again.');
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    }
</script>
`;

pages.forEach(p => {
    const fullHtml = processTop(baseTop, p.title, p.desc) + p.content + baseBottom + scriptJs;
    fs.writeFileSync(p.filename, fullHtml);
});

console.log("SEO HTML files generated successfully!");
