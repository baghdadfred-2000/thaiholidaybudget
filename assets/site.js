/* =========================================================
   ThaiHolidayBudget — SHARED SITE JS
   Injects the standardized 3-column footer (with MailerLite subscribe
   form) on every page. In place of the old inline <footer>, each page has:
     <div id="site-footer"></div>
     <script src="/assets/site.js" defer></script>   (before </body>)
   ========================================================= */

/* One footer ad slot (160x300, highperformanceformat). */
var THB_AD =
  '<iframe title="Advertisement" width="160" height="300" scrolling="no" frameborder="0" marginwidth="0" marginheight="0" style="border:0;display:block;overflow:hidden" srcdoc=\'<body style="margin:0;overflow:hidden"><script type="text/javascript">atOptions = {"key":"2b98a36398b21cc769231ed802fdcd1e","format":"iframe","height":300,"width":160,"params":{}};</script><script type="text/javascript" src="https://www.highperformanceformat.com/2b98a36398b21cc769231ed802fdcd1e/invoke.js"></script></body>\'></iframe>';

/* MailerLite subscribe block (same form/list as the other sites, tagged
   Company=ThaiHolidayBudget). */
function subscribeHTML() {
  return `
          <div id="mlb2-44063259" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-44063259 thb-sub">
            <div class="ml-form-embedWrapper">
              <div class="ml-form-embedBody row-form">
                <h3 class="text-cream font-semibold mb-1 text-sm">Subscribe</h3>
                <p class="thb-note">Thailand travel tips, budgets and exclusive offers by email.</p>
                <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/2528952/forms/193796763912504673/subscribe" data-code="" method="post" target="_blank">
                  <div class="ml-form-fieldRow">
                    <input aria-label="email" aria-required="true" type="email" name="fields[email]" placeholder="Enter your email" autocomplete="email" required class="thb-sub-input">
                  </div>
                  <input type="hidden" name="fields[company]" value="ThaiHolidayBudget">
                  <input type="hidden" name="ml-submit" value="1">
                  <div class="ml-form-embedSubmit">
                    <button type="submit" class="primary thb-sub-btn">Subscribe</button>
                    <button disabled="disabled" style="display:none" type="button" class="loading thb-sub-btn"><div class="ml-form-embedSubmitLoad"></div><span class="sr-only">Loading...</span></button>
                  </div>
                  <input type="hidden" name="anticsrf" value="true">
                </form>
              </div>
              <div class="ml-form-successBody row-success" style="display:none">
                <div class="ml-form-successContent">
                  <h3 class="text-cream font-semibold mb-1 text-sm">Subscribe</h3>
                  <p class="thb-ok">Thank you — you're on the list! 🎉</p>
                </div>
              </div>
            </div>
          </div>`;
}

function footerHTML() {
  var showSignup = !(document.body && document.body.hasAttribute('data-no-signup'));
  return `
  <footer class="no-print relative mt-16" style="background:#0F3D39" data-xadr-footer><div class="xadr xadr-l" aria-label="Advertisement">${THB_AD}</div><div class="xadr xadr-r" aria-label="Advertisement">${THB_AD}</div>
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 mb-10 text-xs text-cream/50">
        <p>© 2026 Genext Information Systems. All rights reserved.</p>
        <nav class="flex flex-wrap justify-center gap-4" aria-label="Legal">
          <a href="/privacy" class="hover:text-ambery transition">Privacy</a>
          <a href="/terms" class="hover:text-ambery transition">Terms</a>
          <a href="/terms" class="hover:text-ambery transition">Disclaimer</a>
          <a href="/cookies" class="hover:text-ambery transition">Cookie</a>
          <a href="/accessibility" class="hover:text-ambery transition">Accessibility</a>
          <a href="/cookie-settings" onclick="event.preventDefault();openCookieModal();" class="hover:text-ambery transition">Cookie Settings</a>
        </nav>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-cream/80">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <img src="/unclePong.jpg" alt="" loading="lazy" decoding="async" class="w-10 h-10 rounded-full object-cover object-top ring-2 ring-ambery/70 shrink-0" width="784" height="1168">
            <span class="font-display font-black text-cream text-lg leading-tight">Thailand Holiday Estimator</span>
          </div>
          ${showSignup ? subscribeHTML() : ''}
        </div>
        <div>
          <h3 class="text-cream font-semibold mb-3 text-sm uppercase tracking-wider">Explore</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/about" class="hover:text-ambery transition">About ThaiHoliday Budget</a></li>
            <li><a href="/" class="hover:text-ambery transition">Build my Budget</a></li>
            <li><a href="/#smarter" class="hover:text-ambery transition">Travel Smarter</a></li>
            <li><a href="/#how" class="hover:text-ambery transition">How it Works</a></li>
            <li><a href="/phrases" class="hover:text-ambery transition">Thai Phrases</a></li>
            <li><a href="/contact" class="hover:text-ambery transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-cream font-semibold mb-3 text-sm uppercase tracking-wider">Network Sites</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="https://thaithuk.com" target="_blank" rel="noopener" class="hover:text-ambery transition">ThaiThuk</a></li>
            <li><a href="https://thaivisafinder.com" target="_blank" rel="noopener" class="hover:text-ambery transition">ThaiVisaFinder</a></li>
            <li><a href="https://thailetters.com" target="_blank" rel="noopener" class="hover:text-ambery transition">ThaiLetters</a></li>
            <li><a href="https://thailotterynumbers.com" target="_blank" rel="noopener" class="hover:text-ambery transition">ThaiLotteryNumbers</a></li>
            <li><a href="https://thaitripplanner.com" target="_blank" rel="noopener" class="hover:text-ambery transition">ThaiTripPlanner</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>`;
}

/* Subscribe-form styles (fixed dark-teal footer → these values suit both themes). */
var THB_STYLE = `
.thb-note{color:rgba(255,251,240,.6);font-size:.78rem;margin:0 0 12px}
.thb-sub-input{width:100%;box-sizing:border-box;padding:11px 15px;border-radius:10px;background:#FFFBF0;color:#0F3D39;font:inherit;font-size:.9rem;border:1px solid transparent;outline:none;margin:0}
.thb-sub-input::placeholder{color:rgba(15,61,57,.5)}
.thb-sub-input:focus{border-color:#FBBF24;box-shadow:0 0 0 2px rgba(251,191,36,.4)}
.ml-subscribe-form .ml-form-embedSubmit{margin-top:12px}
.thb-sub-btn{display:inline-flex;align-items:center;justify-content:center;padding:11px 24px;border-radius:10px;background:#FBBF24;color:#0F3D39;font:inherit;font-size:.88rem;font-weight:800;border:1px solid #FBBF24;cursor:pointer;transition:background .15s,color .15s}
.thb-sub-btn:hover{background:#F97316;color:#fff;border-color:#F97316}
.thb-ok{color:#FBBF24;font-weight:600;font-size:.9rem;margin:0}
.ml-subscribe-form .ml-form-embedSubmitLoad{display:inline-block;width:20px;height:20px}
.ml-subscribe-form .ml-form-embedSubmitLoad:after{content:" ";display:block;width:11px;height:11px;margin:1px;border-radius:50%;border:3px solid #0F3D39;border-color:#0F3D39 #0F3D39 #0F3D39 transparent;animation:thb-sub-spin 1.2s linear infinite}
@keyframes thb-sub-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
.ml-subscribe-form .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}
`;

/* MailerLite success callback (swaps form for the thank-you message). */
window.ml_webform_success_44063259 = function () {
  var $ = window.ml_jQuery || window.jQuery;
  if ($) {
    $('.ml-subscribe-form-44063259 .row-success').show();
    $('.ml-subscribe-form-44063259 .row-form').hide();
  } else {
    document.querySelectorAll('.ml-subscribe-form-44063259 .row-success').forEach(function (el) { el.style.display = ''; });
    document.querySelectorAll('.ml-subscribe-form-44063259 .row-form').forEach(function (el) { el.style.display = 'none'; });
  }
};

function initMailerLite() {
  if (!document.querySelector('.ml-subscribe-form-44063259')) return;
  if (!document.getElementById('ml-webforms-js')) {
    var s = document.createElement('script');
    s.id = 'ml-webforms-js';
    s.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519';
    s.async = true;
    document.body.appendChild(s);
  }
  try { fetch('https://assets.mailerlite.com/jsonp/2528952/forms/193796763912504673/takel'); } catch (e) {}
}

/* ---------- BOOT ---------- */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('thb-footer-css')) {
    var st = document.createElement('style');
    st.id = 'thb-footer-css';
    st.textContent = THB_STYLE;
    document.head.appendChild(st);
  }
  var f = document.getElementById('site-footer');
  if (f) f.outerHTML = footerHTML();
  initMailerLite();
});
