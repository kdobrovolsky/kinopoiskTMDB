
import {useEffect, useState} from "react";

export const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';

        // Проверяем системные настройки
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }

        return false;
    });

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';

        // Сохраняем в localStorage
        localStorage.setItem('theme', theme);

        // Устанавливаем атрибут для CSS переменных
        document.documentElement.setAttribute('data-theme', theme);

        // Меняем meta theme-color для мобильных браузеров
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#0d253f' : '#032541');
        }
    }, [isDark]);

    return { isDark, toggleTheme };
}