export const metadata = {
  title: "About",
  description: "About me",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto prose">
      <h1>About</h1>
      <p>
        This is the about page. Content can be multilingual based on the
        language switcher.
      </p>
    </div>
  );
}
