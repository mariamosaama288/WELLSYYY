import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function HomePage() {
  const navigate = useNavigate();
  const sections = [
    {
      title: "Mood",
      desc: "Sometimes we don't really understand how we feel, that's why WELLSY starts with a mood tracker.",
      extra: "Track your emotions daily, reflect on patterns, and learn to understand yourself better."
    },
    {
      title: "Vital",
      desc: "Your health is the code of your energy. In the vital section, you can:",
      extra: "Log your sleep, hydration, nutrition, and exercise to keep balanced energy."
    },
    {
      title: "Habbit",
      desc: "Changing habbits isn't easy, but it's possible when you take small steps.",
      extra: "Build daily micro-habits that support long-term transformation."
    },
    {
      title: "Garden",
      desc: "Come here, Let's go to the garden.",
      extra: "A calm space to relax, meditate, and recharge your inner energy."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Welcome to WELLSY 🌊</h1>
        <p className="description">
          WELLSY is designed to be light, engaging, and encouraging—helping you
          improve both body and mind.
        </p>

        <div className="sections">
          {sections.map((section, index) => (
            <div className="section-card" key={index}>
              <h2>{section.title}</h2>
              <p>{section.desc}</p>
              <button
                className="view-more"
                onClick={() => toggleSection(index)}
              >
                {openIndex === index ? "View less" : "View more"}
              </button>

              {openIndex === index && (
                <div className="extra">
                  <p>{section.extra}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}