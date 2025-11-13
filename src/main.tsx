import {createRoot} from 'react-dom/client'
import './index.css'

import {App} from "@/App/ui/App/App.tsx";
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "@/App/model/store.ts";


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
    <App/>
    </Provider>
  </BrowserRouter>,
)
