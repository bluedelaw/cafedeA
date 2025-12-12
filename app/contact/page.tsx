import InquiryForm from "@/components/InquiryForm"

export const metadata = {
  title: "Contact Us | café de A",
  description: "Get in touch with café de A for catering inquiries, reservations, or general questions.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col pt-[96px]">
      {/* Removed Header and Footer since they're already in layout.tsx */}
      <InquiryForm />
    </div>
  )
}
