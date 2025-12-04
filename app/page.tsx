'use client';

import { useState, useEffect, useRef } from 'react';

interface Bidder {
  name: string;
  amount: number;
}

export default function Home() {
  const [signatureCount, setSignatureCount] = useState(4322);
  const [signature, setSignature] = useState('');
  const [signedNames, setSignedNames] = useState<string[]>([]);
  const [bidName, setBidName] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSignedMessage, setShowSignedMessage] = useState(false);
  
  const initialBidders: Bidder[] = [
    { name: 'Fogarty', amount: 22000 },
    { name: 'SinRalt', amount: 21999 },
    { name: 'Mrs. Kerr', amount: 25 },
    { name: 'Ben Hill', amount: 1 },
    { name: 'Notaso', amount: 0.01 },
  ];
  
  const [bidders, setBidders] = useState<Bidder[]>(initialBidders);
  
  // Faux live tally increment
  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1;
      setSignatureCount(prev => prev + increment);
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 300);
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSignPetition = () => {
    if (signature.trim()) {
      setSignedNames(prev => [signature.trim(), ...prev].slice(0, 5));
      setSignatureCount(prev => prev + 1);
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 300);
      setSignature('');
      setShowSignedMessage(true);
      setTimeout(() => setShowSignedMessage(false), 3000);
    }
  };

  const handlePlaceBid = () => {
    if (bidName.trim() && bidAmount) {
      const amount = parseFloat(bidAmount);
      if (!isNaN(amount) && amount > 0) {
        const newBidder = { name: bidName.trim(), amount };
        const newBidders = [...bidders, newBidder].sort((a, b) => b.amount - a.amount);
        setBidders(newBidders);
        setBidName('');
        setBidAmount('');
      }
    }
  };

  const formatAmount = (amount: number) => {
    if (amount < 1) {
      return `$${amount.toFixed(2)}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen fire-gradient text-white overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Main Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 gradient-text animate-glow tracking-tight">
            PETITION TO
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black gradient-text animate-glow tracking-tight">
            UNLEASH
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black gradient-text animate-glow tracking-tight mb-8">
            NOAH KERR
          </h1>
          
          {/* Live Tally */}
          <div className="mb-8">
            <p className="text-xl text-gray-400 mb-2">SIGNATURES COLLECTED</p>
            <div 
              className={`text-6xl sm:text-8xl font-black text-yellow-400 ${isBouncing ? 'animate-bounce-subtle' : ''}`}
            >
              {signatureCount.toLocaleString()}
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-400 text-sm">LIVE</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Signature & Bid */}
          <div className="lg:col-span-2 space-y-8">
            {/* Signature Box */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-yellow-500/30 animate-pulse-border">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">✍️ SIGN THE PETITION</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSignPetition()}
                  placeholder="Enter your name..."
                  className="flex-1 px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <button
                  onClick={handleSignPetition}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all transform hover:scale-105 text-lg"
                >
                  SIGN NOW
                </button>
              </div>
              
              {showSignedMessage && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-center animate-pulse">
                  ✅ Thank you for signing! Noah Kerr&apos;s freedom is one step closer!
                </div>
              )}
              
              {signedNames.length > 0 && (
                <div className="mt-6">
                  <p className="text-gray-400 text-sm mb-2">Recent signatures:</p>
                  <div className="flex flex-wrap gap-2">
                    {signedNames.map((name, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bid Entry */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-500/30">
              <h2 className="text-2xl font-bold mb-4 text-green-400">💰 PLACE YOUR BID</h2>
              <p className="text-gray-400 mb-4">Support Noah&apos;s cause with a donation bid!</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={bidName}
                  onChange={(e) => setBidName(e.target.value)}
                  placeholder="Your name..."
                  className="flex-1 px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:border-green-500 transition-colors"
                />
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePlaceBid()}
                    placeholder="Amount..."
                    step="0.01"
                    min="0"
                    className="w-full px-6 py-4 pl-8 bg-gray-900 border-2 border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <button
                  onClick={handlePlaceBid}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all transform hover:scale-105 text-lg"
                >
                  BID
                </button>
              </div>
            </div>

            {/* Fun Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-xl p-6 text-center border border-gray-800">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-orange-400">{Math.floor((signatureCount / 5000) * 100)}%</div>
                <div className="text-xs text-gray-500">TO GOAL</div>
              </div>
              <div className="bg-black/30 rounded-xl p-6 text-center border border-gray-800">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-yellow-400">URGENT</div>
                <div className="text-xs text-gray-500">PRIORITY</div>
              </div>
              <div className="bg-black/30 rounded-xl p-6 text-center border border-gray-800 col-span-2 sm:col-span-1">
                <div className="text-3xl mb-2">🌍</div>
                <div className="text-2xl font-bold text-blue-400">GLOBAL</div>
                <div className="text-xs text-gray-500">MOVEMENT</div>
              </div>
            </div>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-500/30 sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-center">
                <span className="text-purple-400">👑 HIGHEST BIDDERS</span>
              </h2>
              
              <div className="space-y-3">
                {bidders.map((bidder, index) => (
                  <div 
                    key={`${bidder.name}-${index}`}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50' 
                        : index === 1
                        ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-500/50'
                        : index === 2
                        ? 'bg-gradient-to-r from-amber-700/20 to-amber-800/20 border border-amber-700/50'
                        : 'bg-gray-900/50 border border-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl font-bold ${
                        index === 0 ? 'text-yellow-400' : 
                        index === 1 ? 'text-gray-300' : 
                        index === 2 ? 'text-amber-600' : 
                        'text-gray-600'
                      }`}>
                        #{index + 1}
                      </span>
                      <div>
                        <p className={`font-bold ${
                          index === 0 ? 'text-yellow-400' : 
                          index === 1 ? 'text-gray-200' : 
                          'text-gray-300'
                        }`}>
                          {bidder.name}
                        </p>
                        {index === 0 && (
                          <p className="text-xs text-yellow-500">🏆 TOP BIDDER</p>
                        )}
                      </div>
                    </div>
                    <div className={`text-xl font-bold ${
                      index === 0 ? 'text-yellow-400' : 
                      index === 1 ? 'text-gray-200' : 
                      'text-green-400'
                    }`}>
                      {formatAmount(bidder.amount)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">TOTAL RAISED</p>
                  <p className="text-3xl font-bold text-green-400">
                    {formatAmount(bidders.reduce((sum, b) => sum + b.amount, 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>🔓 FREE NOAH KERR 2025 🔓</p>
          <p className="mt-2">This petition is 100% real and definitely legally binding*</p>
          <p className="text-xs mt-1">*not legally binding</p>
        </footer>
      </div>
    </div>
  );
}
