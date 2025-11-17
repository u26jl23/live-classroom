import { useTranslation } from "react-i18next";

export default function SignupPage(){
    const {t} = useTranslation()
    return (
        <div>
            <h1>{t('signupTitle')}</h1>
            <p>Signup form</p>
        </div>
    )
}