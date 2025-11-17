import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {doc, setDoc} from 'firebase/firestore'
import {auth, db} from '../firebase'

export default function SignupPage(){
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')
    const [error, setError] = useState('')

    const handleSignup = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: role,
                createdAt: new Date()
            })

            alert(t('form.success'))
            navigate('/login')

        }catch (err){
            console.error(err)
            setError(err.message)
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>{t('signupTitle')}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignup}>
                {/* Email */}
                <div style={{ marginBottom: '10px' }}>
                <label>{t('form.email')}</label>
                <br />
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    style={{ width: '100%', padding: '8px' }}
                />
                </div> 
                {/* Password */}
                <div style={{ marginBottom: '10px' }}>
                    <label>{t('form.password')}</label>
                    <br />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                {/* Role selection */}
                <div style={{ marginBottom: '20px' }}>
                    <label>{t('form.role')}</label>
                    <br />
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="student">{t('form.student')}</option>
                        <option value="teacher">{t('form.teacher')}</option>
                    </select>
                </div>
                <button type="submit" style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none' }}>{t('form.submitSignup')}</button>
            </form>
        </div>
    )
}