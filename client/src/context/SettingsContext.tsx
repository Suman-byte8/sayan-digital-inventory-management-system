'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSettings as apiGetSettings, updateSettings as apiUpdateSettings } from '../utils/api';
import { useAuth } from './AuthContext';

interface Settings {
    shopName: string;
    taxId: string;
    address: string;
    email: string;
    phone: string;
    currency: string;
    timezone: string;
    logoUrl: string;
}

interface SettingsContextType {
    settings: Settings | null;
    loading: boolean;
    updateSettings: (data: Partial<Settings> | FormData) => Promise<void>;
    refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const data = await apiGetSettings();
            setSettings(data);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchSettings();
        } else {
            setLoading(false); // Stop loading if no user
        }
    }, [user]);

    const updateSettings = async (data: Partial<Settings> | FormData) => {
        const updatedSettings = await apiUpdateSettings(data);
        setSettings(updatedSettings);
    };

    const refreshSettings = async () => {
        await fetchSettings();
    };

    return (
        <SettingsContext.Provider value={{ settings, loading, updateSettings, refreshSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
