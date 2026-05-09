import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, CreditCard, Wallet, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSlots, venue } = location.state || { selectedSlots: ['06:00 PM'], venue: { name: 'Smash Arena', pricePerHour: 400, id: 'v1' } };
  
  const [paymentType, setPaymentType] = useState('full'); // full or advance
  const [paymentStep, setPaymentStep] = useState(1); // 1: summary, 2: processing, 3: success

  const totalAmount = venue.pricePerHour * selectedSlots.length;
  const advanceAmount = 100 * selectedSlots.length; // 100 min advance per slot
  
  const amountToPay = paymentType === 'full' ? totalAmount : advanceAmount;

  const handlePayment = () => {
    setPaymentStep(2);
    setTimeout(() => {
      setPaymentStep(3);
    }, 2000); // Simulate processing
  };

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  if (paymentStep === 2) {
    return (
      <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-[#39FF14] rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold">Processing Payment...</h2>
        <p className="text-gray-400 mt-2">Please do not close this window.</p>
      </div>
    );
  }

  if (paymentStep === 3) {
    return (
      <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#151b2b] p-8 rounded-3xl border border-[#39FF14]/50 max-w-md w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-[#39FF14]"></div>
          <div className="w-20 h-20 bg-[#39FF14]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-[#39FF14]" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-400 mb-6">Your slots at {venue.name} have been locked.</p>
          
          <div className="bg-[#0a0f1c] rounded-xl p-4 mb-8 text-left border border-gray-800">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Booking ID</span>
              <span className="font-bold">#BK-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Slots</span>
              <span className="font-medium text-right">{selectedSlots.join(', ')}</span>
            </div>
            <div className="flex justify-between border-t border-gray-800 pt-2 mt-2">
              <span className="text-gray-400">Amount Paid</span>
              <span className="font-bold text-[#39FF14]">₹{amountToPay}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-sm text-gray-400 mb-8">
            <ShieldCheck size={16} className="text-[#39FF14] mr-2" />
            Confirmation sent via WhatsApp & Email
          </div>

          <button onClick={handleBackToHome} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-xl hover:bg-[#32E612] transition shadow-[0_0_15px_rgba(57,255,20,0.3)]">
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-4 max-w-3xl mx-auto min-h-screen">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white mb-6 transition">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="bg-[#151b2b] rounded-2xl border border-gray-800 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-4">Booking Summary</h2>
        <div className="flex justify-between mb-3">
          <span className="text-gray-300">Venue</span>
          <span className="font-bold">{venue.name}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-gray-300">Slots Selected ({selectedSlots.length})</span>
          <span className="font-medium text-right max-w-[200px]">{selectedSlots.join(', ')}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-gray-300">Price per slot</span>
          <span className="font-medium">₹{venue.pricePerHour}</span>
        </div>
        <div className="flex justify-between font-bold text-xl mt-6 border-t border-gray-800 pt-4">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="bg-[#151b2b] rounded-2xl border border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Payment Options</h2>
        
        <div className="space-y-4">
          <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition ${paymentType === 'full' ? 'border-[#39FF14] bg-[#39FF14]/5' : 'border-gray-700 bg-[#0a0f1c] hover:border-gray-500'}`}>
            <input type="radio" name="paymentType" value="full" checked={paymentType === 'full'} onChange={() => setPaymentType('full')} className="mr-4 accent-[#39FF14] w-5 h-5" />
            <div className="flex-1">
              <div className="font-bold text-lg">Pay in Full</div>
              <div className="text-sm text-gray-400">Pay the complete amount now</div>
            </div>
            <div className="font-bold text-xl text-[#39FF14]">₹{totalAmount}</div>
          </label>

          <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition ${paymentType === 'advance' ? 'border-[#39FF14] bg-[#39FF14]/5' : 'border-gray-700 bg-[#0a0f1c] hover:border-gray-500'}`}>
            <input type="radio" name="paymentType" value="advance" checked={paymentType === 'advance'} onChange={() => setPaymentType('advance')} className="mr-4 accent-[#39FF14] w-5 h-5" />
            <div className="flex-1">
              <div className="font-bold text-lg">Pay Advance</div>
              <div className="text-sm text-gray-400">Pay ₹100 per slot to lock booking. Pay rest at venue.</div>
            </div>
            <div className="font-bold text-xl text-[#39FF14]">₹{advanceAmount}</div>
          </label>
        </div>
      </div>

      {/* Simulated Payment Methods */}
      <div className="bg-[#151b2b] rounded-2xl border border-gray-800 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-4">Select Payment Method</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-[#39FF14] bg-[#39FF14]/10 text-white transition">
            <Wallet size={24} className="mb-2 text-[#39FF14]" />
            <span className="font-medium">UPI / QR</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-700 bg-[#0a0f1c] text-gray-400 hover:text-white hover:border-gray-500 transition">
            <CreditCard size={24} className="mb-2" />
            <span className="font-medium">Card</span>
          </button>
        </div>
        
        <button onClick={handlePayment} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-xl text-lg hover:bg-[#32E612] transition shadow-[0_0_20px_rgba(57,255,20,0.4)] flex justify-center items-center">
          <ShieldCheck size={20} className="mr-2" /> Pay ₹{amountToPay} Securely
        </button>
      </div>

    </div>
  );
};

export default Booking;
