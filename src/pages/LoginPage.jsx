import { useTranslation } from "react-i18next";

export default function LoginPage(){
    const {t} = useTranslation()
    return (
        <div>
            <h1>{t('loginTitle')}</h1>
            <p>Login Form</p>
        </div>
    )
}
