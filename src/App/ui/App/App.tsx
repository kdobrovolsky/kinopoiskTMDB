import '@/App.css'
import { Header } from "@/widgets/Header/Header.tsx";
import { Routing } from "@/common/Routing/Routing.tsx";
import { ThemeProvider } from "@/common/components/theme/themeProvider/themeProvider.tsx";
import { Footer } from "@/widgets/footer/Footer.tsx";
import s from './App.module.css';

export const App = () => {
    return (
        <ThemeProvider>
            <div className={s.app}>
                <Header/>
                <main className={s.main}>
                    <Routing/>
                </main>
                <Footer/>
            </div>
        </ThemeProvider>
    )
}