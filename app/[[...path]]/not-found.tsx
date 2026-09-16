import { AnchorIcon, Action } from "../../components/ui";
export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-24 text-white">
      <AnchorIcon />
      <h1 className="mt-8 text-4xl font-display font-bold">
        Page not found / Η σελίδα δεν βρέθηκε
      </h1>
      <p className="mt-6 text-gray-200">
        Choose your language to return to AiAnchor.
      </p>
      <div className="mt-8 flex gap-6">
        <Action href="/en/">English</Action>
        <Action href="/gr/">Ελληνικά</Action>
      </div>
    </main>
  );
}
