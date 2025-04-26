"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Trophy, Users, ArrowRight } from "lucide-react";

export default function AdminAchievementsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [
    {
      id: "awards",
      title: "Awards & Recognition",
      description: "Manage awards, certificates, and recognitions",
      icon: <Award size={32} />,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      hoverColor: "hover:bg-purple-100",
      href: "/admin/achievements/awards",
    },
    {
      id: "sports",
      title: "Sports Achievements",
      description: "Manage student sports achievements and competitions",
      icon: <Trophy size={32} />,
      color: "bg-red-50 text-red-600 border-red-200",
      hoverColor: "hover:bg-red-100",
      href: "/admin/achievements/sports",
    },
    {
      id: "alumni",
      title: "Alumni Network",
      description: "Manage alumni profiles and success stories",
      icon: <Users size={32} />,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      hoverColor: "hover:bg-blue-100",
      href: "/admin/achievements/alumni",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a] mb-2">
            Achievements Management
          </h1>
          <p className="text-gray-600">
            Manage student achievements, awards, sports records, and alumni
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`border rounded-lg shadow-sm p-6 ${card.color} ${card.hoverColor} transition-all duration-200`}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex flex-col h-full">
              <div className="p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 bg-white">
                {card.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600 mb-6 flex-grow">{card.description}</p>
              <Link
                href={card.href}
                className="inline-flex items-center font-medium mt-auto group"
              >
                Manage
                <ArrowRight
                  size={16}
                  className={`ml-2 transition-transform duration-300 ${
                    hoveredCard === card.id ? "translate-x-1" : ""
                  }`}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Quick Tips for Achievement Management
        </h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="bg-[#8b1a1a] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
              1
            </span>
            <span>
              <strong>Awards & Recognition</strong>: Add achievements with
              photos and details for showcasing on the website.
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#8b1a1a] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
              2
            </span>
            <span>
              <strong>Sports Achievements</strong>: Track student participation
              and awards in various sports competitions.
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-[#8b1a1a] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
              3
            </span>
            <span>
              <strong>Alumni Network</strong>: Feature alumni success stories
              with Instagram posts to showcase their achievements.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
