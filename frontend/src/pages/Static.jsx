export function About() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 flex-1">
      <h1 className="font-display font-extrabold text-4xl mb-5">About TechTales</h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-4">
        TechTales is a community-driven platform where developers share ideas, tutorials, and experiences.
      </p>
      <p className="text-[15px] text-gray-700 leading-relaxed">
        Whether you're learning to code, building production systems, or sharing hard-won lessons, TechTales is your space to write, learn, and grow.
      </p>
    </main>
  );
}

export function Contact() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 flex-1">
      <h1 className="font-display font-extrabold text-4xl mb-5">Contact</h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-4">Have feedback, questions, or ideas? We'd love to hear from you.</p>
      <p className="text-[15px] text-gray-700">
        Reach us at{' '}
        <a href="mailto:hello@techtales.dev" className="text-black font-medium underline">hello@techtales.dev</a>
      </p>
    </main>
  );
}
