import '../../../App.css'
import {Header} from "@/widgets/Header/Header.tsx";
import {Routing} from "@/common/Routing/Routing.tsx";
import {ThemeProvider} from "@/common/components/theme/themeProvider/themeProvider.tsx";


export const App = () => {
return(
    <ThemeProvider>
        <div>
            <Header/>
            <main>
                <Routing/>
            </main>
        </div>
    </ThemeProvider>
)
}


