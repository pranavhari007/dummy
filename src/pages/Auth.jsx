import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Upload, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState(1); // 1: Phone/Email, 2: OTP, 3: Profile Setup, 4: Success
  const [formData, setFormData] = useState({ phone: '', name: '', avatar: null });
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [generatedId, setGeneratedId] = useState('');
  
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (formData.phone.length === 10) setStep(2);
    else alert("Please enter a valid 10-digit mobile number");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpValues.join('').length === 4) setStep(3);
  };

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (/[^0-9]/.test(value)) return;
    
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    
    // Auto focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleSetupProfile = (e) => {
    e.preventDefault();
    if (formData.name) {
      const newId = `PN-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedId(newId);
      setStep(4);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    login({ name: formData.name, phone: formData.phone, id: generatedId, role: 'user', avatar: formData.avatar });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14] rounded-full blur-[120px] opacity-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#151b2b]/80 backdrop-blur-xl rounded-3xl border border-gray-800 p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto bg-gradient-energetic rounded-xl flex items-center justify-center border border-[#39FF14] mb-4">
            <span className="text-[#39FF14] font-bold italic text-xl">PN</span>
          </div>
          <h2 className="text-2xl font-bold">Welcome to Play Now</h2>
          <p className="text-gray-400 text-sm mt-2 flex items-center justify-center">
            <ShieldCheck size={16} className="text-[#39FF14] mr-1" />
            Verified players only. No fake bookings.
          </p>
        </div>

        {step === 1 && (
          <motion.form initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
              <input 
                type="tel" 
                required
                maxLength={10}
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) {
                    setFormData({...formData, phone: val});
                  }
                }}
                placeholder="Enter 10-digit mobile number" 
                className="w-full bg-[#0a0f1c] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#39FF14] transition-colors"
              />
            </div>
            <button type="submit" className="w-full bg-[#39FF14] text-black font-bold rounded-xl py-3 hover:bg-[#32E612] transition flex justify-center items-center">
              Send OTP <ArrowRight size={18} className="ml-2" />
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Enter 4-digit OTP sent to {formData.phone}</label>
              <div className="flex justify-between gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <input 
                    key={index} 
                    ref={otpRefs[index]}
                    type="text" 
                    inputMode="numeric"
                    maxLength={1} 
                    required 
                    value={otpValues[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-16 h-16 bg-[#0a0f1c] border border-gray-700 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:border-[#39FF14]" 
                  />
                ))}
              </div>
            </div>
            <button type="submit" className="w-full bg-[#39FF14] text-black font-bold rounded-xl py-3 hover:bg-[#32E612] transition">
              Verify OTP
            </button>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onSubmit={handleSetupProfile} className="space-y-6">
            <div className="flex flex-col items-center">
              <label className="w-24 h-24 rounded-full bg-[#0a0f1c] border border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-[#39FF14] transition group relative overflow-hidden">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload size={24} className="text-gray-500 group-hover:text-[#39FF14]" />
                    <span className="absolute bottom-2 text-[10px] text-gray-500 group-hover:text-[#39FF14]">Upload</span>
                  </>
                )}
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name" 
                className="w-full bg-[#0a0f1c] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#39FF14] transition-colors"
              />
            </div>
            <button type="submit" className="w-full bg-[#39FF14] text-black font-bold rounded-xl py-3 hover:bg-[#32E612] transition">
              Create Profile
            </button>
          </motion.form>
        )}

        {step === 4 && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
            <div className="w-20 h-20 bg-[#39FF14]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-[#39FF14]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Verification Complete</h3>
            <p className="text-gray-400 mb-6">Your unique PlayNow ID is:</p>
            <div className="bg-[#0a0f1c] border border-[#39FF14] rounded-xl py-4 px-6 mb-8 inline-block shadow-[0_0_20px_rgba(57,255,20,0.2)]">
              <span className="text-3xl font-extrabold tracking-widest text-white">{generatedId}</span>
            </div>
            <button onClick={handleComplete} className="w-full bg-[#39FF14] text-black font-bold rounded-xl py-3 hover:bg-[#32E612] transition">
              Let's Play
            </button>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default Auth;
