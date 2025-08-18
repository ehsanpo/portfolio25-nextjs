import { NextResponse } from "next/server";

export async function GET() {
  const resume = {
    basics: {
      name: "Ehsan Pourhadi",
      label: "Full Stack Developer & Designer",
      email: "your.email@example.com",
      phone: "+46 000 000 000",
      website: "https://ehsanpourhadi.com",
      summary:
        "Experienced developer and designer with expertise in web technologies",
      location: {
        city: "Stockholm",
        countryCode: "SE",
      },
      profiles: [
        {
          network: "LinkedIn",
          username: "ehsanpourhadi",
          url: "https://linkedin.com/in/ehsanpourhadi",
        },
        {
          network: "GitHub",
          username: "ehsanpourhadi",
          url: "https://github.com/ehsanpourhadi",
        },
      ],
    },
    work: [
      {
        company: "Example Company",
        position: "Senior Developer",
        website: "https://example.com",
        startDate: "2020-01-01",
        endDate: "",
        summary: "Development and design work",
        highlights: [
          "Built scalable web applications",
          "Led development teams",
        ],
      },
    ],
    education: [
      {
        institution: "University Name",
        area: "Computer Science",
        studyType: "Bachelor",
        startDate: "2015-01-01",
        endDate: "2019-01-01",
      },
    ],
    skills: [
      {
        name: "Web Development",
        level: "Expert",
        keywords: ["React", "Next.js", "TypeScript", "Node.js"],
      },
      {
        name: "Design",
        level: "Advanced",
        keywords: ["UI/UX", "Figma", "Adobe Creative Suite"],
      },
    ],
    languages: [
      {
        language: "English",
        fluency: "Fluent",
      },
      {
        language: "Swedish",
        fluency: "Fluent",
      },
      {
        language: "Persian",
        fluency: "Native",
      },
    ],
  };

  return NextResponse.json(resume);
}
