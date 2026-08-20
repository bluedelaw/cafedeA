export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img src="/images/logo.png" alt="café de A" className="w-32 h-auto mx-auto opacity-75" />
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>

        <p className="text-gray-600 font-tempus">Loading...</p>
      </div>
    </div>
  )
}
