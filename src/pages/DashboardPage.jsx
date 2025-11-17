import { useTranslation } from "react-i18next";

export default function SignupPage(){
    const {t} = useTranslation()
    return (
        <div>
            <h1>{t('dashboardTitle')}</h1>
            <p>Dashboard content</p>
        </div>
    )
}