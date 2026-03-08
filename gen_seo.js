const fs = require('fs');
const indexStr = fs.readFileSync('index.html', 'utf8');

const heroIdx = indexStr.indexOf('<!-- Hero Section -->');
const footerIdx = indexStr.indexOf('<!-- Footer -->');

let baseTop = indexStr.substring(0, heroIdx);
let baseBottom = indexStr.substring(footerIdx);

// Modify navigation links
function processTop(topContent, title, desc) {
    let newTop = topContent.replace('<title>MyCareerX - Where Students Meet Their Future</title>', `<title>${title}</title>
    <meta name="description" content="${desc}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
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

const pages = [
    {
        filename: 'career-counselling.html',
        title: 'Career Counselling in India | Expert Guidance for Students | MyCareerX',
        desc: 'Get expert career counselling in India. Navigate your future with personalized guidance from IIT, AIIMS, and IIM alumni for proven success.',
        content: `
    <section style="padding: 10rem 1rem 4rem 1rem; background: var(--bg-body); min-height: 80vh;">
        <div class="container" style="max-width: 800px; margin: 0 auto; background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
            <div class="tagline-badge" style="background: rgba(79, 70, 229, 0.1); color: var(--primary); border: 1px solid rgba(79, 70, 229, 0.3); margin-bottom: 1.5rem;">
                <i class="fas fa-compass"></i> Career Counselling
            </div>
            <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: 800;">Expert Career Counselling in India</h1>
            
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">
                Deciding on the right career path is one of the most critical decisions in a student's life. In a rapidly evolving world, having access to proper <strong>career counselling in India</strong> is essential for students who want to maximize their potential and find a fulfilling profession. At MyCareerX, we bridge the gap between confusion and clarity by offering elite <strong>career guidance</strong> from mentors who have already walked the path to success—alumni from IITs, AIIMS, and IIMs.
            </p>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">Why Is Career Guidance Crucial for Students?</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                Many students struggle with choosing between engineering, medical, commerce, and humanities due to peer pressure or lack of awareness. Without professional <strong>career guidance</strong>, students may end up in fields that don't align with their natural aptitude or interests. Our comprehensive counselling process evaluates your strengths, highlights emerging industry trends, and designs a personalized trajectory.
            </p>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">The MyCareerX Counselling Process</h2>
            <ul style="list-style: none; margin-bottom: 2rem; padding: 0;">
                <li style="margin-bottom: 1rem; display: flex; align-items: flex-start; gap: 1rem;">
                    <i class="fas fa-check-circle" style="color: var(--success); margin-top: 0.25rem;"></i>
                    <div>
                        <strong>1. Aptitude & Interest Alignment</strong>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.25rem;">We start by understanding your core strengths and long-term aspirations.</p>
                    </div>
                </li>
                <li style="margin-bottom: 1rem; display: flex; align-items: flex-start; gap: 1rem;">
                    <i class="fas fa-check-circle" style="color: var(--success); margin-top: 0.25rem;"></i>
                    <div>
                        <strong>2. Top-Tier Mentorship</strong>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.25rem;">Connect one-on-one with experts from elite institutions to get real-world insights.</p>
                    </div>
                </li>
                <li style="margin-bottom: 1rem; display: flex; align-items: flex-start; gap: 1rem;">
                    <i class="fas fa-check-circle" style="color: var(--success); margin-top: 0.25rem;"></i>
                    <div>
                        <strong>3. Actionable Roadmaps</strong>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.25rem;">Receive a step-by-step preparation plan tailored specifically for your chosen exams or career goals.</p>
                    </div>
                </li>
            </ul>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">Request Your Career Counselling Session</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">
                Ready to take control of your future? Fill out the brief form below and our career experts will reach out to schedule your personalized session. Let's build your success story together.
            </p>

            <div style="background: var(--bg-body); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
                <form onsubmit="event.preventDefault(); submitInquiryForm(this, 'Career Counselling');" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Full Name *</label>
                        <input type="text" name="name" class="input-control" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Phone Number *</label>
                        <input type="tel" name="phone" class="input-control" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Current Grade/Stream</label>
                        <input type="text" name="college" class="input-control" placeholder="e.g. 12th Science" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; width: 100%;">Get Assesment Callback</button>
                    <p class="form-msg" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--success); font-weight: 600; display: none;"></p>
                </form>
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
        <div class="container" style="max-width: 800px; margin: 0 auto; background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
            <div class="tagline-badge" style="background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.3); margin-bottom: 1.5rem;">
                <i class="fas fa-university"></i> Direct Admission
            </div>
            <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: 800;">Direct Admission in Top Private Universities</h1>
            
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">
                Navigating the competitive landscape of Indian entrances can be overwhelming. Fortunately, for students looking to secure a seat without the extreme stress of standard cutoffs, <strong>direct admission</strong> remains a highly viable pathway. Through the management quota and institutional seats, students have the opportunity to secure their place in premier institutions like KIIT, SRM, VIT, LPU, BITS, and SOA.
            </p>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">What is Direct Admission?</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                <strong>Direct admission</strong> refers to the process of enrolling in an undergraduate or postgraduate program—such as B.Tech, MBA, or Medical degrees—via institution-reserved seats. These management quota seats ensure that capable students who missed out on minor margin rankings still gain access to quality education. The criteria often shift from entrance scores to board examination merits and overall profiles.
            </p>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">Transparent College Admission Guidance</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                At MyCareerX, our <strong>college admission guidance</strong> focuses on 100% transparency. The admission landscape is unfortunately filled with unverified agents; our mission is to cut through the noise and provide students and parents with direct, reliable information regarding fee structures, seat availabilities, and legitimate institutional processes.
            </p>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">Secure Your Seat</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">
                Don't leave your future to chance. Speak immediately with our admission experts who can outline the possibilities waiting for you at India's top private universities. Provide your contact details below, and we will arrange a secure callback.
            </p>

            <div style="background: var(--bg-body); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
                <form onsubmit="event.preventDefault(); submitInquiryForm(this, 'Direct Admission Request');" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Full Name *</label>
                        <input type="text" name="name" class="input-control" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Phone Number *</label>
                        <input type="tel" name="phone" class="input-control" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Target College</label>
                        <input type="text" name="college" class="input-control" placeholder="e.g. VIT or SRM" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; width: 100%;">Connect with Admission Expert</button>
                    <p class="form-msg" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--success); font-weight: 600; display: none;"></p>
                </form>
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
        <div class="container" style="max-width: 800px; margin: 0 auto; background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
            <div class="tagline-badge" style="background: rgba(245, 158, 11, 0.1); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.3); margin-bottom: 1.5rem;">
                <i class="fas fa-graduation-cap"></i> After 12th Guide
            </div>
            <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: 800;">Expert Career Guidance After 12th</h1>
            
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">
                The period immediately following board exams is a massive turning point. Seeking proper <strong>career guidance after 12th</strong> is fundamental because the choices made here lay the permanent groundwork for your professional trajectory. With thousands of emerging courses and specialized degrees now available, having a clear roadmap is paramount.
            </p>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">Navigating Science, Commerce, and Arts</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.5rem;">
                Each stream offers traditional stalwarts as well as high-growth modern roles. In the Science stream, engineering and medicine remain highly competitive, but fields like artificial intelligence, biotechnology, and data science are creating massive waves. In Commerce and Arts, paths spanning Chartered Accountancy, specialized business administration, design, and digital psychology are leading to lucrative and fulfilling lifelong careers.
            </p>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">Key Next Steps for 12th Pass Students</h2>
            <ol style="list-style: decimal inside; margin-bottom: 2rem; color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">
                <li style="margin-bottom: 0.5rem;"><strong>Evaluate Skillsets:</strong> Look beyond exam marks to what subjects you genuinely enjoy processing natively.</li>
                <li style="margin-bottom: 0.5rem;"><strong>Compare Degrees:</strong> Distinguish between B.Tech, B.Sc, BBA, B.Com, and integrated dual-degrees.</li>
                <li style="margin-bottom: 0.5rem;"><strong>Secure Admissions:</strong> Engage with counselling portals, monitor entrance dates, and actively apply for backups.</li>
            </ol>

            <h2 style="font-size: 1.8rem; margin-bottom: 1rem; margin-top: 2rem;">Still Undecided? Talk to a Mentor!</h2>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">
                A simple 15-minute conversation with a mentor who has successfully built their career can spark immense clarity. Request a free post-12th mentorship callback today, and we'll connect you directly with experts.
            </p>

            <div style="background: var(--bg-body); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
                <form onsubmit="event.preventDefault(); submitInquiryForm(this, 'After 12th Guidance');" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Full Name *</label>
                        <input type="text" name="name" class="input-control" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Phone Number *</label>
                        <input type="tel" name="phone" class="input-control" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; display: block;">Stream (Science, Comm, Arts)</label>
                        <input type="text" name="college" class="input-control" placeholder="e.g. 12th Science" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 8px;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-top: 0.5rem; width: 100%;">Get Post-12th Guidance</button>
                    <p class="form-msg" style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--success); font-weight: 600; display: none;"></p>
                </form>
            </div>
        </div>
    </section>
        `
    }
];

const scriptJs = `
<script>
    async function submitInquiryForm(formElement, context) {
        const btn = formElement.querySelector('button[type="submit"]');
        const msg = formElement.querySelector('.form-msg');
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        btn.disabled = true;
        msg.style.display = 'none';

        const payload = {
            name: formElement.name.value,
            phone: formElement.phone.value,
            college: formElement.college.value ? \`[\${context}] \${formElement.college.value}\` : \`[\${context}]\`
        };

        try {
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (data.success) {
                msg.innerText = 'Success! Our expert will call you shortly.';
                msg.style.color = 'var(--success)';
                msg.style.display = 'block';
                formElement.reset();
            } else {
                msg.innerText = data.message || 'Error saving request.';
                msg.style.color = '#EF4444';
                msg.style.display = 'block';
            }
        } catch (error) {
            msg.innerText = 'Network Error. Please try again.';
            msg.style.color = '#EF4444';
            msg.style.display = 'block';
        }
        
        btn.innerHTML = 'Get Assesment Callback';
        if(context === 'Direct Admission Request') btn.innerHTML = 'Connect with Admission Expert';
        if(context === 'After 12th Guidance') btn.innerHTML = 'Get Post-12th Guidance';
        btn.disabled = false;
    }
</script>
`;

pages.forEach(p => {
    const fullHtml = processTop(baseTop, p.title, p.desc) + p.content + baseBottom + scriptJs;
    fs.writeFileSync(p.filename, fullHtml);
});

console.log("Files generated successfully!");
