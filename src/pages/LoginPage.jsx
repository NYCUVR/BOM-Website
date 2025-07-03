import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    
    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (email === 'admin@vr75.com' && password === 'password') {
            auth.login({ email }, () => {
                navigate(from, { replace: true });
            });
        } else {
            setError('無效的帳號或密碼。請使用測試帳號 admin@vr75.com / password');
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
            <motion.div 
                className="w-full max-w-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                     <Link to="/" className="text-3xl font-bold text-brand-pink hover:text-brand-gold transition-colors duration-300">
                        VR7.5 Racing
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-4">登入儀表板</h1>
                    <p className="text-gray-400">請輸入您的帳號以繼續</p>
                </div>

                <form 
                    onSubmit={handleLogin} 
                    className="bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6"
                >
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">電子郵件</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-pink transition"
                            placeholder="admin@vr75.com"
                            required 
                        />
                    </div>

                     <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300">密碼</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-pink transition"
                            placeholder="password"
                            required 
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button 
                        type="submit"
                        className="w-full flex items-center justify-center bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition-colors duration-300 shadow-lg transform hover:scale-105"
                    >
                        <span>登入</span>
                        <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                </form>
                 <p className="text-center text-gray-500 text-sm mt-6">
                    還沒有帳號？ <Link to="/contact" className="text-brand-pink hover:underline">聯絡我們</Link> 索取存取權限。
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage; 