export default function Footer() {
  return (
    <footer className="bg-forest-background text-forest-primary rounded-t-2xl shadow-inner mt-8">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="font-bold text-lg mb-2">About</h3>
          <p className="text-forest-soft text-sm">ForestShop is your destination for eco-friendly, beautiful products. Shop with nature in mind!</p>
        </div>
        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contact</h3>
          <ul className="text-forest-soft text-sm space-y-1">
            <li>Email: support@forestshop.com</li>
            <li>Phone: +1 234 567 890</li>
          </ul>
        </div>
        {/* Help */}
        <div>
          <h3 className="font-bold text-lg mb-2">Help</h3>
          <ul className="text-forest-soft text-sm space-y-1">
            <li><a href="#" className="hover:text-forest-light transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-forest-light transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-forest-light transition-colors">Returns</a></li>
          </ul>
        </div>
        {/* Socials */}
        <div>
          <h3 className="font-bold text-lg mb-2">Socials</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="hover:text-forest-light transition-colors">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4 1.64a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.67 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.82-.08.56 1.74 2.18 3.01 4.1 3.05A9.05 9.05 0 0 1 0 19.54a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-forest-light transition-colors">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-forest-light transition-colors">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-forest-soft pb-4">&copy; {new Date().getFullYear()} ForestShop. All rights reserved.</div>
    </footer>
  );
} 