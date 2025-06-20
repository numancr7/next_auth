"use client"

import Header from "./components/Header";
import { NotificationProvider } from "./components/Notification";
import FileUpload from "./components/FileUpload";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "../models/Video";

export default function Home() {
  // Placeholder videos array for VideoFeed
  const videos: IVideo[] = [];

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-black via-red-800 to-red-500 flex flex-col">
        <div className="flex justify-center items-center py-6">
          <Header />
        </div>
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-lg w-full flex flex-col items-center mb-10 animate-fade-in border border-white/20 hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-white to-black mb-4 drop-shadow-lg text-center animate-pulse">
              Welcome to ReelsPro!
            </h2>
            <p className="text-lg text-gray-200 mb-8 text-center">
              Upload your images or videos and experience the magic of AI-powered video sharing.
            </p>
            <FileUpload
              onSuccess={() => {}}
              fileType="video"
            />
            <label className="block mt-6">
              <span className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-black via-red-600 to-red-400 text-white font-bold shadow-lg cursor-pointer hover:scale-110 hover:bg-red-700 transition-transform duration-200 border border-white/20">
                Choose File
              </span>
              <input
                type="file"
                className="hidden"
                onChange={() => {}}
                // The FileUpload component already handles file input, this is just for visual effect
              />
            </label>
          </div>
          <section className="w-full max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-white drop-shadow text-center tracking-wide animate-fade-in">
              Video Feed
            </h3>
            <VideoFeed videos={videos} />
          </section>
        </main>
      </div>
    </NotificationProvider>
  );
}
