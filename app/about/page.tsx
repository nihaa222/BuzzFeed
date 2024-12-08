import React from "react";

function About() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        About BuzzFeed
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Welcome to{" "}
        <span className="font-semibold text-pink-500">NewsSphere</span>, your
        go-to destination for staying informed and inspired! Our application is
        designed to bring you the latest and most relevant news from around the
        globe, all in one place. With a focus on simplicity and user experience,
        NewsSphere makes it easy to search, filter, and explore stories that
        matter to you. Whether it’s breaking news, trending topics, or niche
        interests, we aim to deliver content that keeps you engaged and
        up-to-date. Join us in exploring a world of information, where every
        story finds its audience.
      </p>
    </div>
  );
}

export default About;
