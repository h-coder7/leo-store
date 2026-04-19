import React from 'react';

export default function AdminDashboard() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                    مرحباً بك في لوحة التحكم
                </h1>
                <p className="text-slate-500">اختر من القائمة العلوية لإدارة نظامك</p>
            </div>
        </div>
    );
}
