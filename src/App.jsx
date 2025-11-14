import { useTranslation } from "react-i18next";

export default function App() {
  const {t} = useTranslation()
  return (
    <div>
      <h1>{t('appTitle')}</h1>
      <p>{t('welcomeMessage')}</p>
    </div>
  )
}


