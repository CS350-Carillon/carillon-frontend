import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="flex items-center justify-center">
        <Image src="/logo.svg" alt="logo" width={220} height={150} />
        <h2 className="text-center text-9xl font-bold ml-10 text-[#2F6EBA]">
          Carillon
        </h2>
      </div>

      <div className="mt-20 mx-auto w-full max-w-sm">
        <form className="space-y-6">
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#2F6EBA] px-4 py-4 text-md font-semibold text-white shadow-sm hover:bg-blue-600"
            >
              Log in
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#2F6EBA] px-4 py-4 text-md font-semibold text-white shadow-sm hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
