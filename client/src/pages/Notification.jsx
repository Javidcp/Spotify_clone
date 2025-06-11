import { useState } from "react";
import { X } from 'lucide-react';

export default function Notification() {
    const [activeTab, setActiveTab] = useState("");

    return (
        <div className="pt-10 bg-[#121212] rounded-t-lg flex items-center text-white">
        <div className="mx-auto">
            {/* Header */}
            <div className="mb-5">
            <h1 className="text-3xl font-bold mb-4">What's New</h1>
            <p className="text-gray-400 text-md">
                The latest releases from artists, podcasts, and shows you follow.
            </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4">
                <button 
                    onClick={() => setActiveTab('')}
                    className={`px-1 py-1 text-sm rounded-full transition-all duration-200 bg-[#252525]
                        ${
                            activeTab === "Music" || activeTab === "Podcast & Shows" ? "" : 'hidden'
                        }`}
                >
                    <X size={20} />
                </button>
                <button
                    onClick={() => setActiveTab("Music")}
                    className={`px-2 py-1 text-sm rounded-full transition-all duration-200 ${
                    activeTab === "Music"
                        ? "bg-white text-black"
                        : "bg-[#252525] text-white hover:bg-[#2b2b2b]"
                    } ${activeTab === "Podcast & Shows" && "hidden"}`}
                >
                    Music
                </button>
                <button
                    onClick={() => setActiveTab("Podcast & Shows")}
                    className={`px-2 py-1 text-sm rounded-full transition-all duration-200 ${
                    activeTab === "Podcast & Shows"
                        ? "bg-white text-black"
                        : "bg-[#252525] text-white hover:bg-[#2b2b2b]"
                    } ${activeTab === "Music" && "hidden"}`}
                >
                    Podcast & Shows
                </button>
            </div>

            {/* Empty State */}
            <div className=" py-16 w-3xl">
            <h2 className="text-3xl text-center font-bold mb-6 text-gray-100">
                { activeTab === "" ? "We don't have any updates for you yet" : activeTab === "Music" ? "Nothing new in music" : "Nothing new in podcasts" }
            </h2>
            <p className="text-white text-md max-w-[730px]">
                { activeTab === "" ? "When there's news, we'll post it here. Follow your favorite artists and podcasts to stay updated on them too." : activeTab === "Music" ? "Follow your favorite artists and we'll keep you updated on them." : "Follow your favorite podcasts and we'll keep you updated on them." }
            </p>
            </div>

            {/* Mock Content for Demo */}
            {/* <div className="mt-16 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 opacity-50">
                <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                <div>
                    <h3 className="font-semibold">Artist Name</h3>
                    <p className="text-gray-400 text-sm">New Album Released</p>
                </div>
                </div>
                <p className="text-gray-300">Sample update content would appear here...</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 opacity-30">
                <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg"></div>
                <div>
                    <h3 className="font-semibold">Podcast Name</h3>
                    <p className="text-gray-400 text-sm">New Episode Available</p>
                </div>
                </div>
                <p className="text-gray-300">Sample podcast update would appear here...</p>
            </div>
            </div> */}
        </div>
        </div>
    );
}
