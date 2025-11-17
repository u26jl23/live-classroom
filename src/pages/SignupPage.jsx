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

        // 【监控点 1】证明按钮被点中了
        console.log("1. 按钮被点击，开始执行 handleSignup"); 
        console.log("   -> 输入的邮箱:", email);
        console.log("   -> 输入的密码长度:", password.length);

        setError('')

        try {
            // 【监控点 2】开始调用 Firebase Auth
            console.log("2. 正在请求 Firebase Auth 创建用户...");

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // 【监控点 3】Auth 成功，准备写数据库
            console.log("3. Auth 成功！UID:", userCredential.user.uid);
            console.log("   -> 正在写入 Firestore...");

            // ▼▼▼ 加这一行 ▼▼▼
            console.log("   -> 检查 db 对象:", db); 
            // ▲▲▲▲▲▲

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: role,
                createdAt: new Date()
            })

            // 【监控点 4】全部完成
            console.log("4. 全部流程完成！");

            alert(t('form.success'))
            navigate('/login')

        }catch (err){
            // 【错误捕获】
            console.error("!!! 发生错误，详情如下 !!!")

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