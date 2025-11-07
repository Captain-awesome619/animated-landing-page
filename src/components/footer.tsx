import Link from 'next/link'

const Footer = () => (
  <footer className="w-full bg-[#f5f6fa] text-center py-20 text-gray-600 text-sm">
    <p>
      &copy; 2025. Xtrempay is a product of{' '}
      <span className="font-semibold">
        VILLAGE ASSIST INCLUSIVE COMPANY LIMITED
      </span>
      <br />
      38, Abosan Orere Est, Off Bayeku Road, Ikorodu.
    </p>
    <div className="mt-2.5">
      <Link
        href="/privacy"
        className="text-base font-medium text-[#4257D0] hover:text-[#6d80ec] text-center transition-colors duration-300"
      >
        Privacy policy
      </Link>
    </div>
  </footer>
)

export default Footer
